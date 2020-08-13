import os
import json

files = os.listdir("data")
files = sorted(
    [file for file in files if file.endswith('csv')], reverse=True)
if len(files) == 0:
    print('Error: no files found')
    exit(1)
latest_file = files[0]

output_data = []
first_line_skipped = False
with open(f'./data/{latest_file}', 'r') as file:
    for line in file:
        if not first_line_skipped:
            first_line_skipped = True
            continue
        date, year, new_cases, total_cases, recovered, deaths, active_cases = line.strip().split(',')
        output_data.append(
            {
                'date': f'{date}-{year}',
                'new_cases': int(new_cases),
                'total_cases': int(total_cases),
                'recovered': int(recovered),
                'deaths': int(deaths),
                'active_cases': int(active_cases)
            }
        )

print(output_data)
output_file_path = './data/latest_data.json'

with open(output_file_path, 'w') as file:
    file.write(json.dumps(output_data, indent=2))
