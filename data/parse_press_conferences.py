import os
import json

from typing import List
from csv import DictReader
from pprint import pprint

from utils import parse_date, create_file


directory = 'data/input/press_conferences'
files: List[str] = os.listdir(directory)
# may need sorting
raw_csv_files: List[str] = [file for file in files if '.csv' in file]

# take the latest one
latest_file_path = os.path.join(directory, raw_csv_files[0])

print(f'Parsing {latest_file_path}')

data = DictReader(open(latest_file_path))

press_conferences_with_links = [row for row in data if not row['Number'] == '']
press_conferences = [{'number': int(p['Number']), 'date': parse_date(p['Date']),
                      'link': p['Link']} for p in press_conferences_with_links]
pprint(press_conferences)

create_file('press_conferences', press_conferences)
