import os
import json

from typing import List
from csv import DictReader
from pprint import pprint

from utils import parse_date, create_file, get_latest_csv_data


def parse_case_locations():
    directory = 'data/input/case_locations'
    data = get_latest_csv_data(directory)
    locations_by_date = []
    for row in data:
        locations_by_date.append(
            {
                'date': row['Date'],
                'total': row['Total'],
                'MDH Intensive Therapy Unit': row['ITU'],
                'MDH Infectious Diseases Unit': row['IDU'],
                'St. Thomas Hospital': row['STH'],
                'At Home': row['Home']
            }
        )
    create_file('case_locations_by_date', locations_by_date)


# parse_case_locations()
