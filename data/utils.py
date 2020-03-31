import os
import json

from typing import List
from csv import DictReader


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


def get_latest_file_from_directory(dir):
    files: List[str] = os.listdir(dir)
    csv_files: List[str] = sorted(
        [file for file in files if '.csv' in file], reverse=True)

    # take the latest one
    latest_file_path = os.path.join(dir, csv_files[0])
    return latest_file_path


def get_latest_csv_data(dir):
    latest_file_path = get_latest_file_from_directory(dir)
    print(f'Parsing {latest_file_path}')
    return DictReader(open(latest_file_path))
