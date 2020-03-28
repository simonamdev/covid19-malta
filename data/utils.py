import os
import json


def parse_date(date):
    if date is None or date == '?' or date == '':
        return None
    day, month, year = date.split('/')
    day = day if len(day) == 2 else f'0{day}'
    month = month if len(month) == 2 else f'0{month}'
    year = f'20{year}' if len(year) == 2 else year
    return f'{year}-{month}-{day}'


def create_file(file_name, data):
    with open(os.path.join('.', 'data', 'files', f'{file_name}.json'), 'w') as file:
        file.write(json.dumps(data, indent=2))
