import os
import json

from typing import List
from csv import DictReader
from pprint import pprint

from utils import parse_date, create_file, get_latest_csv_data


directory = 'data/input/press_conferences'
data = get_latest_csv_data(directory)

press_conferences_with_links = [row for row in data if not row['Number'] == '']
press_conferences = [{'number': int(p['Number']), 'date': parse_date(p['Date']),
                      'link': p['Link']} for p in press_conferences_with_links]


def parse_press_conferences():
    create_file('press_conferences', press_conferences)


parse_press_conferences()
