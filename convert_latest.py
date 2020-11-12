import os
import json

files = os.listdir("data")
files = sorted(
    [file for file in files if file.endswith('csv')], reverse=True)
if len(files) == 0:
    print('Error: no files found')
    exit(1)
latest_file = files[0]


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

print(output_data)
output_file_path = './data/latest_data.json'

with open(output_file_path, 'w') as file:
    file.write(json.dumps(output_data, indent=2))
