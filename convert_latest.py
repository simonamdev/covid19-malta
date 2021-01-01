import os
import json

files = os.listdir("data")
files = sorted(
    [file for file in files if file.endswith('csv') and not 'swabs' in file], reverse=True)
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


def extract_seven_day_average(last_seven_days):
    if len(last_seven_days) == 0:
        return 0
    return sum([x['new_cases'] for x in last_seven_days]) // len(last_seven_days)


output_data = []
first_line_skipped = False
with open(f'./data/{latest_file}', 'r') as file:
    last_seven_days = []
    for line in file:
        if not first_line_skipped:
            first_line_skipped = True
            continue
        date, year, new_cases, total_cases, recovered, deaths, active_cases = line.strip().split(',')
        data = {
            'date': f'{date}-{year}',
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

# Get swabs data and append
first_line_skipped = False
with open(f'./data/{latest_swabs_file}', 'r') as file:
    for line in file:
        if not first_line_skipped:
            first_line_skipped = True
            continue
        entity, isocode, date, source_url, change_cumulative_total, _, _, _, _ = line.strip().split(',')
        day, month, year = date.split(' ')[0].split('/')
        month_name = month_number_name_map[month]
        formatted_date = f'{day}-{month_name}-{year}'
        for i, data in enumerate(output_data):
            if data['date'] == formatted_date:
                new_case_count = output_data[i]["new_cases"]
                output_data[i]['swab_count'] = int(change_cumulative_total)
                output_data[i]['positivity_rate'] = (
                    new_case_count / int(change_cumulative_total)) * 100.0


print(output_data)
output_file_path = './data/latest_data.json'

with open(output_file_path, 'w') as file:
    file.write(json.dumps(output_data, indent=2))
