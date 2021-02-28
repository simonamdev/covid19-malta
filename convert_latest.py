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

print(latest_file)
print(latest_swabs_file)
print(latest_vaccines_file)


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
        day, month, year = date.split('/')
        date = f'{day}-{month_number_name_map[month]}-{year}'
#         else:
#             date, year, new_cases, total_cases, recovered, deaths, active_cases = line.strip().split(',')
#             date = f'{date}-{year}'
        data = {
            'date': date,
            'new_cases': int(new_cases),
            'total_cases': int(total_cases),
            'recovered': int(recovered),
            'deaths': int(deaths),
            'active_cases': int(active_cases),
            'seven_day_moving_average': int(extract_seven_day_average(last_seven_days=last_seven_days))
        }
        last_seven_days.append(data)
        if len(last_seven_days) > 7:
            last_seven_days.pop(0)
        output_data.append(data)


# Get swabs data and append
first_line_skipped = False
with open(f'./data/{latest_swabs_file}', 'r') as file:
    last_seven_days = []
    for line in file:
        if not first_line_skipped:
            first_line_skipped = True
            continue
        # Skip empty lines
        if len(line.split()) == 0:
            continue
        entity, isocode, date, source_url, change_cumulative_total, _, _, _, _ = line.strip().split(',')
        day, month, year = date.split(' ')[0].split('/')
        month_name = month_number_name_map[month]
        formatted_date = f'{day}-{month_name}-{year}'
        for i, data in enumerate(output_data):
            if data['date'] == formatted_date:
                new_case_count = output_data[i]["new_cases"]
                swab_count = int(change_cumulative_total)
                positivty_rate = (
                    new_case_count / int(change_cumulative_total)) * 100.0
                output_data[i]['swab_count'] = swab_count
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
    for line in file:
        if not first_line_skipped:
            first_line_skipped = True
            continue
        # Skip empty lines
        if len(line.split()) == 0:
            continue
        date, first_dose_count, second_dose_count = line.strip().split(',')
        day, month, year = date.split('/')
        month_name = month_number_name_map[month]
        formatted_date = f'{day}-{month_name}-{year}'
        for i, data in enumerate(output_data):
            if data['date'] == formatted_date:
                output_data[i]['first_dose_count'] = int(first_dose_count)
                output_data[i]['second_dose_count'] = int(second_dose_count)


print(output_data)
output_file_path = './data/latest_data.json'

with open(output_file_path, 'w') as file:
    file.write(json.dumps(output_data, indent=2))
