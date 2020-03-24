import os
import json

from typing import List
from csv import DictReader
from pprint import pprint

files: List[str] = os.listdir('data')
# may need sorting
raw_csv_files: List[str] = [file for file in files if '.raw.csv' in file]

# take the latest one
latest_file_path = os.path.join('data', raw_csv_files[0])

print(f'Parsing {latest_file_path}')

data = DictReader(open(latest_file_path))

output_data = {
    'case_count': 0,
    'cases': [],
    'case_proportion_by_date': {}
}


def data_present(value):
    return value if not value == '?' or value == '' else None


def parse_date(date):
    if date is None or date == '?' or date == '':
        return None
    day, month, year = date.split('/')
    day = day if len(day) == 2 else f'0{day}'
    month = month if len(month) == 2 else f'0{month}'
    year = f'20{year}' if len(year) == 2 else year
    return f'{year}-{month}-{day}'


for row in data:
    output_data['case_count'] += 1

    case_type = None
    imported = row['Imported'] == 'YES'
    local = row['Local'] == 'YES'
    if imported:
        case_type = 'Imported'
    elif local:
        case_type = 'Local Transmission'
    else:
        case_type = 'Exposure to Imported Case'

    output_data['cases'].append(
        {
            'date_announced': parse_date(data_present(row['Date Announced'])),
            'case_number': int(row['Case']),
            'date_symptom_start': parse_date(data_present(row['Symptom Start Date'])),
            'gender': row['Gender'],
            'age': int(data_present(row['Age'])) if data_present(row['Age']) else None,
            'case_type': case_type,
            'nationality': data_present(row['Nationality'])
        }
    )
    # break


def split_cases_by_date(cases):
    dates = sorted(list(set([case['date_announced'] for case in cases])))
    cases_by_date = {}
    for date in dates:
        cases_by_date[date] = [
            case for case in cases if case['date_announced'] == date]
    return cases_by_date


def get_empty_proportion():
    return {
        'Imported': {'count': 0, 'percentage': 0.0},
        'Local Transmission': {'count': 0, 'percentage': 0.0},
        'Exposure to Imported Case': {'count': 0, 'percentage': 0.0},
    }


cases_by_date = split_cases_by_date(output_data['cases'])
for date, cases in cases_by_date.items():
    output_data['case_proportion_by_date'][date] = get_empty_proportion()
    for case in cases:
        proportion = output_data['case_proportion_by_date'][date][case['case_type']]
        proportion['count'] += 1
        # could just calculate once at the end
        percentage = proportion['count'] / output_data['case_count'] * 100.0
        proportion['percentage'] = percentage

# print(output_data)
pprint(output_data)
with open('data/output.json', 'w') as file:
    file.write(json.dumps(output_data, indent=4))
