import os

files = os.listdir("data")
files = sorted([file for file in files if not file ==
                '.gitkeep'], reverse=True)
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
                'date': f'{date}-{year}'
            }
        )

print(output_data)
