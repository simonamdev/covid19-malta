import dataclasses
import os
import json

from dataclasses import dataclass
from typing import Any, List, Optional, Tuple, Union

files = os.listdir("data")
csv_files = sorted(
    [file for file in files if file.endswith('csv')], reverse=True)
cases_files = [file for file in csv_files if 'cases' in file]
swabs_files = [file for file in csv_files if 'swabs' in file]
vaccines_files = [file for file in csv_files if 'vaccines' in file]
owid_files = [file for file in csv_files if 'owid' in file]

latest_cases_file = cases_files[0]
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
    print(f'Reading file: {file_path}')
    with open(file_path, 'r') as file:
        for line in file:
            clean_line = line.strip().replace('\n', '')
            lines.append(clean_line)
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


cases_raw_data: List[str] = read_all_lines(f'./data/{latest_cases_file}')
cases_data: List[CasesData] = []

for raw_case_line in cases_raw_data[1:]:
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


swabs_raw_data: List[str] = read_all_lines(f'./data/{latest_swabs_file}')
swabs_data: List[SwabsData] = []

for raw_swab_line in swabs_raw_data[1:]:
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


vaccines_raw_data: List[str] = read_all_lines(f'./data/{latest_vaccines_file}')
vaccines_data: List[VaccinesData] = []

for raw_vaccine_line in vaccines_raw_data[1:]:
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
    seven_day_moving_average_new_cases: float
    seven_day_moving_average_deaths: float
    swab_count: int
    swab_count_diff: int
    positivity_rate: float
    seven_day_moving_average_positivity_rate: float
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


def get_previous_data_point(date: str, data: List[Union[CasesData, SwabsData, VaccinesData]]) -> Optional[Union[CasesData, SwabsData, VaccinesData]]:
    for i, row in enumerate(data):
        if date == row.date:
            if i == 0:
                return None
            return data[i-1]
    return None


def calculate_seven_day_moving_average(data_last_seven_days: List[float]) -> float:
    return sum(data_last_seven_days) / len(data_last_seven_days)


@dataclass
class SevenDayValues:
    date: str
    new_cases: int
    positivity_rate: float
    deaths: int


# Keep a moving window of seven days of data for seven day moving averages
last_seven_days: List[SevenDayValues] = []

for i, case_data in enumerate(cases_data):
    previous_case_data: Optional[CasesData] = None
    if i != 0:
        previous_case_data = cases_data[i - 1]

    # get relevant data if we have it available
    relevant_swabs_data: Optional[SwabsData] = get_relevant_data_point(
        case_data.date, swabs_data)
    relevant_vaccine_data: Optional[VaccinesData] = get_relevant_data_point(
        case_data.date, vaccines_data)

    # get the previous datapoint for diff calculations
    previous_relevant_swabs_data: Optional[SwabsData] = get_previous_data_point(
        case_data.date, swabs_data)
    previous_relevant_vaccine_data: Optional[VaccinesData] = get_previous_data_point(
        case_data.date, vaccines_data)

    swabs_data_found = relevant_swabs_data is not None
    vaccine_data_found = relevant_vaccine_data is not None

    previous_cases_data_found = previous_case_data is not None
    previous_swabs_data_found = previous_relevant_swabs_data is not None
    previous_vaccines_data_found = previous_relevant_vaccine_data is not None

    recovered_diff = case_data.recovered - \
        previous_case_data.recovered if previous_cases_data_found else 0
    deaths_diff = case_data.deaths - \
        previous_case_data.deaths if previous_cases_data_found else 0
    active_cases_diff = case_data.active_cases - \
        previous_case_data.active_cases if previous_cases_data_found else 0
    swab_count_diff = relevant_swabs_data.total_pcr_and_rapid_tests - \
        previous_relevant_swabs_data.total_pcr_and_rapid_tests if swabs_data_found and previous_swabs_data_found else 0

    total_swab_count = 0
    positivty_rate: float = 0.0
    if swabs_data_found:
        total_swab_count = relevant_swabs_data.total_pcr_and_rapid_tests
        positivty_rate = (
            case_data.new_cases / relevant_swabs_data.previous_day_pcr_and_rapid_tests
        ) * 100.0

    total_doses = 0
    received_one_dose = 0
    received_all_doses = 0
    booster_doses_given = 0

    total_doses_diff = 0
    received_one_dose_diff = 0
    received_all_doses_diff = 0
    booster_doses_diff = 0

    if vaccine_data_found:
        total_doses = relevant_vaccine_data.total_vaccination_doses
        received_one_dose = relevant_vaccine_data.received_one_dose
        received_all_doses = relevant_vaccine_data.fully_vaccinated
        booster_doses_given = relevant_vaccine_data.total_boosters

    def none_to_zero(value: Optional[Any]) -> int:
        return value if value is not None else 0

    if vaccine_data_found and previous_vaccines_data_found:
        total_doses_diff = relevant_vaccine_data.total_vaccination_doses - \
            previous_relevant_vaccine_data.total_vaccination_doses
        received_one_dose_diff = none_to_zero(relevant_vaccine_data.received_one_dose) - \
            none_to_zero(previous_relevant_vaccine_data.received_one_dose)
        received_all_doses_diff = none_to_zero(relevant_vaccine_data.fully_vaccinated) - \
            none_to_zero(previous_relevant_vaccine_data.fully_vaccinated)
        booster_doses_diff = none_to_zero(relevant_vaccine_data.total_boosters) - \
            none_to_zero(previous_relevant_vaccine_data.total_boosters)

    seven_day_moving_average_new_cases = None
    seven_day_moving_average_deaths = None
    seven_day_moving_average_positivity_rate = None

    # To maintain the window of seven days, add the current day at the end and if we end up with more than seven, remove the oldest one
    last_seven_days.append(
        SevenDayValues(
            case_data.date,
            case_data.new_cases,
            positivty_rate,
            deaths_diff
        )
    )
    if len(last_seven_days) > 7:
        last_seven_days.pop(0)

    if len(last_seven_days) == 7:
        seven_day_moving_average_new_cases = sum(
            [d.new_cases for d in last_seven_days]) / 7
        seven_day_moving_average_deaths = sum(
            [d.deaths for d in last_seven_days]) / 7
        seven_day_moving_average_positivity_rate = sum(
            [d.positivity_rate for d in last_seven_days]) / 7

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
            total_swab_count,
            swab_count_diff,
            positivty_rate,
            seven_day_moving_average_positivity_rate,
            total_doses,
            received_one_dose,
            received_all_doses,
            booster_doses_given,
            total_doses_diff,
            received_one_dose_diff,
            received_all_doses_diff,
            booster_doses_diff
        )
    )

print(f'{len(output_data)} entries processed')
output_file_path = './data/latest_data.json'

with open(output_file_path, 'w') as file:
    file.write(json.dumps([dataclasses.asdict(data)
               for data in output_data], indent=2))
