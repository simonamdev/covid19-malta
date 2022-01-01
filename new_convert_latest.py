import os
import json

from dataclasses import dataclass
from typing import List, Optional, Union

files = os.listdir("data")
csv_files = [file for file in files if file.endswith('csv')]
cases_files = [file for file in csv_files if 'cases' in file]
swabs_files = [file for file in csv_files if 'swabs' in file]
vaccines_files = [file for file in csv_files if 'vaccines' in file]
owid_files = [file for file in csv_files if 'owid' in file]

latest_cases_file = csv_files[0]
latest_swabs_file = swabs_files[0]
latest_vaccines_file = vaccines_files[0]
latest_owid_file = owid_files[0]

print('--- Latest Files ---')
print(latest_cases_file)
print(latest_swabs_file)
print(latest_vaccines_file)
print(latest_owid_file)


def read_all_lines(file_path: str) -> List[str]:
    lines: List[str] = []
    with open(file_path, 'r') as file:
        for line in file:
            lines.append(line.strip().replace('\n', ''))
    return lines

def format_date_correctly(day_month_year_date: str) -> str:
    day, month, year = day_month_year_date.split('/')
    return f'{year}-{month}-{day}'

@dataclass
class CasesData:
    date: str
    new_cases: int
    total_cases: int
    recovered: int
    deaths: int
    active_cases: int

cases_raw_data: List[str] = read_all_lines(latest_cases_file)
cases_data: List[CasesData] = []

for raw_case_line in cases_raw_data:
    split_line = raw_case_line.split(',')
    cases_data.append(
        CasesData(
            format_date_correctly(split_line[0]),
            int(split_line[1]),
            int(split_line[2]),
            int(split_line[3]),
            int(split_line[4]),
            int(split_line[5])
        )
    )


@dataclass
class SwabsData:
    date: str
    previous_day_pcr_tests: int
    total_pcr_tests: int
    previous_day_rapid_tests: Optional[int]
    total_rapid_tests: Optional[int]
    previous_day_pcr_and_rapid_tests: int
    total_pcr_and_rapid_tests: int 


swabs_raw_data: List[str] = read_all_lines(latest_swabs_file)
swabs_data: List[SwabsData] = []

for raw_swab_line in swabs_raw_data:
    split_line = raw_swab_line.split(',')
    swabs_data.append(
        SwabsData(
            format_date_correctly(split_line[0]),
            int(split_line[1]),
            int(split_line[2]),
            int(split_line[3]) if split_line[3] != '' else None,
            int(split_line[4]) if split_line[4] != '' else None,
            int(split_line[5]),
            int(split_line[6]),
        )
    )


@dataclass
class VaccinesData:
    date: str
    total_vaccination_doses: int
    fully_vaccinated: Optional[int]
    received_one_dose: Optional[int]
    total_boosters: Optional[int]


vaccines_raw_data: List[str] = read_all_lines(latest_vaccines_file)
vaccines_data: List[VaccinesData] = []

for raw_vaccine_line in vaccines_raw_data:
    split_line = raw_vaccine_line.split(',')
    vaccines_data.append(
        VaccinesData(
            format_date_correctly(split_line[0]),
            int(split_line[1]),
            int(split_line[2]) if split_line[2] != '' else None,
            int(split_line[3]) if split_line[3] != '' else None,
            int(split_line[4]) if split_line[4] != '' else None,
        )
    )



month_number_name_map = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec'
}

"""
Sample output data:
{
    "date": "20-Oct-2021",
    # "date_formatted": "2021-10-20",
    "new_cases": 20,
    "total_cases": 37508,
    "recovered": 36391,
    "recovered_diff": 30,
    "deaths": 459,
    "deaths_diff": 0,
    "active_cases": 262,
    "seven_day_moving_average": 16,
    "seven_day_moving_average_deaths": 0.0,
    "swab_count": 1949,
    "swab_diff": 156,
    "positivity_rate": 1.026167265264238,
    "seven_day_moving_average_positivity": 0.8939135502044063,
    "first_dose_count": 860910,
    "second_dose_count": 425734,
    "first_dose_diff": 2052,
    "second_dose_diff": 240,
    "total_dose_diff": 2292,
    "seven_day_moving_average_first_dose": 2019.2857142857142,
    "seven_day_moving_average_second_dose": 207.0
  },
"""



@dataclass
class OutputData:
    date: str
    # date_formatted: str
    new_cases: int
    total_cases: int
    recovered: int
    recovered_diff: int
    deaths: int
    deaths_diff: int
    active_cases: int
    active_cases_diff: int
    seven_day_moving_average_new_cases: int
    seven_day_moving_average_deaths: int
    swab_count: int
    swab_count_diff: int
    positivity_rate: int
    seven_day_moving_average_positivity_rate: int
    total_doses: int
    received_one_dose: int
    received_both_doses: int
    received_booster_dose: int
    total_doses_diff: int
    received_one_dose_diff: int
    received_both_doses_diff: int
    received_booster_dose_diff: int


output_data: List[OutputData] = []


def get_relevant_data_point(date: str, data: List[Union[CasesData, SwabsData, VaccinesData]]) -> Optional[Union[CasesData, SwabsData, VaccinesData]]:
    for row in data:
        if date == row.date:
            return row
    return None


for case_data in cases_data:

    relevant_swabs_data: Optional[SwabsData] = get_relevant_data_point(case_data.date, swabs_data)
    relevant_vaccine_data: Optional[VaccinesData] = get_relevant_data_point(case_data.date, vaccines_data)

    swabs_data_found = relevant_swabs_data is not None
    vaccine_data_found = relevant_swabs_data is not None

    recovered_diff = 0
    deaths_diff = 0
    active_cases_diff = 0
    swab_count_diff = 0
    positivty_rate = 0

    if swabs_data_found:
        positivty_rate = (
            case_data.new_cases / relevant_swabs_data.previous_day_pcr_and_rapid_tests
        ) * 100.0

    seven_day_moving_average_new_cases = 0
    seven_day_moving_average_deaths = 0
    seven_day_moving_positivity_rate = 0

    output_data.append(
        OutputData(
            case_data.date,
            case_data.new_cases,
            case_data.total_cases,
            case_data.recovered,
            recovered_diff,
            case_data.deaths,
            deaths_diff,
            case_data.active_cases,
            active_cases_diff,
            seven_day_moving_average_new_cases,
            seven_day_moving_average_deaths,
            relevant_swabs_data.total_pcr_and_rapid_tests if swabs_data_found else None,
            swab_count_diff,
            positivty_rate,

        )
    )



def extract_seven_day_average(last_seven_days):
    if len(last_seven_days) == 0:
        return 0
    return sum([x['new_cases'] for x in last_seven_days]) // len(last_seven_days)


def extract_seven_day_average_positivity(last_seven_days):
    if len(last_seven_days) == 0:
        return 0
    # Not all days may have positivity rates, so if we do not have them all, do not provide an incorrect calculation
    positivity_rates = [x['positivity_rate'] for x in last_seven_days]
    if len(positivity_rates) != 7:
        return 0
    return sum([x for x in positivity_rates]) / len(positivity_rates)


def extract_seven_day_average_deaths(last_seven_days):
    if len(last_seven_days) == 0:
        return 0
    return sum([x['deaths_diff'] for x in last_seven_days]) / len(last_seven_days)


def extract_seven_day_average_vaccine_doses(last_seven_days):
    if len(last_seven_days) == 0:
        return dict(first=0, second=0)
    return dict(
        first=sum([x['first_dose_diff']
                   for x in last_seven_days]) / len(last_seven_days),
        second=sum([x['second_dose_diff']
                    for x in last_seven_days]) / len(last_seven_days)
    )




output_data = []
first_line_skipped = False
with open(f'./data/{latest_file}', 'r') as file:
    print(latest_file)
    last_seven_days = []
    previous_line = None
    for line in file:
        if not first_line_skipped:
            first_line_skipped = True
            continue
        # Skip empty lines
        if len(line.split()) == 0:
            continue
        # newest version encodes year in the date
#         comma_count = len(line.strip().split(','))
#         new_version = comma_count == 6
#         if new_version:
        date, new_cases, total_cases, recovered, deaths, active_cases = line.strip().split(',')
        deaths_diff = 0
        recovered_diff = 0
        if previous_line is not None:
            _, _, _, previous_recovered, previous_deaths, _ = previous_line.strip().split(',')
            deaths_diff = max(int(deaths) - int(previous_deaths), 0)
            recovered_diff = max(int(recovered) - int(previous_recovered), 0)
        day, month, year = date.split('/')
        date = f'{day}-{month_number_name_map[month]}-{year}'
        date_formatted = f'{year}-{month}-{day}'
#         else:
#             date, year, new_cases, total_cases, recovered, deaths, active_cases = line.strip().split(',')
#             date = f'{date}-{year}'
        data = {
            'date': date,
            'date_formatted': date_formatted,
            'new_cases': int(new_cases),
            'total_cases': int(total_cases),
            'recovered': int(recovered),
            'recovered_diff': int(recovered_diff),
            'deaths': int(deaths),
            'deaths_diff': deaths_diff,
            'active_cases': int(active_cases),
            'seven_day_moving_average': int(extract_seven_day_average(last_seven_days=last_seven_days)),
            'seven_day_moving_average_deaths': extract_seven_day_average_deaths(last_seven_days=last_seven_days)
        }
        last_seven_days.append(data)
        if len(last_seven_days) > 7:
            last_seven_days.pop(0)
        output_data.append(data)
        previous_line = line


# Get swabs data and append
first_line_skipped = False
with open(f'./data/{latest_swabs_file}', 'r') as file:
    last_seven_days = []
    previous_line = None
    for line in file:
        if not first_line_skipped:
            first_line_skipped = True
            continue
        # Skip empty lines
        if len(line.split()) == 0:
            continue
        date, pcr_previous_day, total_pcr, rapid_previous_day, total_rapid, total_tests_previous_day, total_tests = line.strip().split(',')
        day, month, year = date.split(' ')[0].split('/')
        month_name = month_number_name_map[month]
        formatted_date = f'{day}-{month_name}-{year}'
        swab_diff = 0
        if previous_line is not None:
            _, _, _, _, _, _, previous_total_tests = line.strip().split(',')
            swab_diff = int(total_tests) - \
                int(previous_total_tests)
        for i, data in enumerate(output_data):
            if data['date'] == formatted_date:
                new_case_count = output_data[i]["new_cases"]
                swab_count = int(total_tests_previous_day)
                positivty_rate = (
                    new_case_count / swab_count
                ) * 100.0
                output_data[i]['swab_count'] = swab_count
                output_data[i]['swab_diff'] = swab_diff
                output_data[i]['positivity_rate'] = positivty_rate
                output_data[i]['seven_day_moving_average_positivity'] = float(
                    extract_seven_day_average_positivity(last_seven_days=last_seven_days))
                last_seven_days.append(
                    dict(swab_count=swab_count, positivity_rate=positivty_rate))
                if len(last_seven_days) > 7:
                    last_seven_days.pop(0)


# Get vaccine data and append
first_line_skipped = False
with open(f'./data/{latest_vaccines_file}', 'r') as file:
    last_seven_days = []
    previous_line = None
    for line in file:
        if not first_line_skipped:
            first_line_skipped = True
            continue
        # Skip empty lines
        if len(line.split()) == 0:
            continue
        split_line = line.strip().split(',')
        # print(split_line, len(split_line))
        if len(split_line) == 4:
            date, first_dose_count, second_dose_count, _ = split_line
        else:
            date, first_dose_count, second_dose_count, _, _ = split_line
        first_dose_count = int(
            first_dose_count) if not first_dose_count == '' else 0
        second_dose_count = int(
            second_dose_count) if not second_dose_count == '' else 0
        day, month, year = date.split('/')
        month_name = month_number_name_map[month]
        formatted_date = f'{day}-{month_name}-{year}'

        first_dose_diff = 0
        second_dose_diff = 0

        if previous_line is not None:
            if len(split_line) == 4:
                _, prev_first_dose_count, prev_second_dose_count, _ = previous_line.strip().split(',')
            else:
                _, prev_first_dose_count, prev_second_dose_count, _, _ = previous_line.strip().split(',')
            prev_first_dose_count = int(
                prev_first_dose_count) if not prev_first_dose_count == '' else 0
            prev_second_dose_count = int(
                prev_second_dose_count) if not prev_second_dose_count == '' else 0
            first_dose_diff = int(first_dose_count) - \
                int(prev_first_dose_count)
            second_dose_diff = int(second_dose_count) - \
                int(prev_second_dose_count)
        for i, data in enumerate(output_data):
            if data['date'] == formatted_date:
                output_data[i]['first_dose_count'] = int(
                    first_dose_count) if not first_dose_count == '' else 0
                output_data[i]['second_dose_count'] = int(
                    second_dose_count) if not second_dose_count == '' else 0
                output_data[i]['first_dose_diff'] = int(first_dose_diff)
                output_data[i]['second_dose_diff'] = int(second_dose_diff)
                output_data[i]['total_dose_diff'] = int(
                    first_dose_diff) + int(second_dose_diff)
                seven_day_moving_averages = extract_seven_day_average_vaccine_doses(
                    last_seven_days=last_seven_days)
                output_data[i]['seven_day_moving_average_first_dose'] = seven_day_moving_averages['first']
                output_data[i]['seven_day_moving_average_second_dose'] = seven_day_moving_averages['second']
                last_seven_days.append(output_data[i])
        if len(last_seven_days) > 7:
            last_seven_days.pop(0)
        previous_line = line


# Integrate OWID data
with open(f'./data/{latest_owid_file}', 'r') as file:
    malta_data = []
    for line in file:
        data = line.strip().replace('\n', '').split(',')
        isocode = data[0]
        if isocode == 'MLT':
            malta_data.append(
                dict(
                    date=data[3],
                    total_cases=data[4],
                    new_cases=data[5],
                    total_deaths=data[7],
                    new_deaths=data[8],
                    icu_patients=data[17],
                    hosp_patients=data[19],
                    new_tests=data[25],
                    total_tests=data[26],
                    strigency_index=data[43]
                )
            )
    for data in malta_data:
        for key, value in data.items():
            data[key] = value if not value == '' else None
    # print(malta_data)
    for output in output_data:
        for day_data in malta_data:
            if output['date_formatted'] == day_data['date']:
                # print(output)
                if ('swab_count' not in output.keys() or output['swab_count'] is None) and day_data['new_tests'] is not None:
                    output['swab_count'] = int(float(day_data['new_tests']))


# Calculate positivty rate


# Get swabs data and append
last_seven_days = []
previous_day = None
for i, data in enumerate(output_data):
    if i > 0:
        previous_day = output_data[i-1]
    if 'swab_count' not in data.keys() or (previous_day and 'swab_count' not in previous_day.keys()):
        continue
    swab_count = data['swab_count']
    previous_swab_count = 0 if previous_day is None else previous_day['swab_count']
    swab_diff = swab_count - previous_swab_count
    new_case_count = data["new_cases"]
    positivty_rate = (
        new_case_count / swab_count) * 100.0
    data['swab_count'] = swab_count
    data['swab_diff'] = swab_diff
    data['positivity_rate'] = positivty_rate
    data['seven_day_moving_average_positivity'] = float(
        extract_seven_day_average_positivity(last_seven_days=last_seven_days))
    last_seven_days.append(
        dict(swab_count=swab_count, positivity_rate=positivty_rate))
    if len(last_seven_days) > 7:
        last_seven_days.pop(0)


print(f'{len(output_data)} entries processed')
output_file_path = './data/latest_data.json'

with open(output_file_path, 'w') as file:
    file.write(json.dumps(output_data, indent=2))
