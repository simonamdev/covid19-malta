import os
import json

files = os.listdir("data")
files = sorted(
    [file for file in files if file.endswith('csv') and 'cases' in file], reverse=True)
if len(files) == 0:
    print('Error: no files found')
    exit(1)
latest_file = files[0]

files = os.listdir("data")
files = sorted(
    [file for file in files if file.endswith('csv') and 'swabs' in file], reverse=True)
if len(files) == 0:
    print('Error: no swab files found')
    exit(1)
latest_swabs_file = files[0]

files = os.listdir("data")
files = sorted(
    [file for file in files if file.endswith('csv') and 'vaccines' in file], reverse=True)
if len(files) == 0:
    print('Error: no vaccines files found')
    exit(1)
latest_vaccines_file = files[0]


files = os.listdir("data")
files = sorted(
    [file for file in files if file.endswith('csv') and 'owid' in file], reverse=True)
if len(files) == 0:
    print('Error: no owid files found')
    exit(1)
latest_owid_file = files[0]

print(latest_file)
print(latest_swabs_file)
print(latest_vaccines_file)
print(latest_owid_file)


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
        entity, isocode, date, source_url, change_cumulative_total, _, _, _, _, _ = line.strip().split(',')
        day, month, year = date.split(' ')[0].split('/')
        month_name = month_number_name_map[month]
        formatted_date = f'{day}-{month_name}-{year}'
        swab_diff = 0
        if previous_line is not None:
            _, _, _, _, previous_change_cumulative_total, _, _, _, _ = line.strip().split(',')
            swab_diff = int(change_cumulative_total) - \
                int(previous_change_cumulative_total)
        for i, data in enumerate(output_data):
            if data['date'] == formatted_date:
                new_case_count = output_data[i]["new_cases"]
                swab_count = int(change_cumulative_total)
                positivty_rate = (
                    new_case_count / int(change_cumulative_total)) * 100.0
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
        if len(split_line) == 4:
            date, first_dose_count, second_dose_count, _ = split_line
        else:
            date, first_dose_count, second_dose_count, _, _ = split_line
        day, month, year = date.split('/')
        month_name = month_number_name_map[month]
        formatted_date = f'{day}-{month_name}-{year}'

        first_dose_diff = 0
        second_dose_diff = 0

        if previous_line is not None:
            _, prev_first_dose_count, prev_second_dose_count, _ = previous_line.strip().split(',')
            first_dose_diff = int(first_dose_count) - \
                int(prev_first_dose_count)
            second_dose_diff = int(second_dose_count) - \
                int(prev_second_dose_count)
        for i, data in enumerate(output_data):
            if data['date'] == formatted_date:
                output_data[i]['first_dose_count'] = int(first_dose_count)
                output_data[i]['second_dose_count'] = int(second_dose_count)
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
    if 'swab_count' not in data.keys():
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
