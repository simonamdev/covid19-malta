import os
import json

from pprint import pprint
from copy import deepcopy

from utils import parse_date, create_file, get_latest_csv_data

directory = os.path.join('.', 'data', 'input', 'cases')

data = get_latest_csv_data(directory)

all_cases = []
case_proportion_by_date = {}


def data_present(value):
    return value if not value == '?' or value == '' or 'N/A' in value else None


for row in data:
    case_type = None
    imported = row['Imported'] == 'YES'
    local = row['Local'] == 'YES'
    if imported:
        case_type = 'Imported'
    elif local:
        case_type = 'Local Transmission'
    else:
        case_type = 'Exposure to Imported Case'

    all_cases.append(
        {
            'date_announced': parse_date(data_present(row['Date Announced'])),
            'date_arrived': parse_date(data_present(row['Arrival Date'])),
            'date_symptom_start': parse_date(data_present(row['Symptom Start Date'])),
            'case_number': int(row['Case']),
            'date_recovered': parse_date(data_present(row['Date recovered'])),
            'gender': row['Gender'],
            'age': int(data_present(row['Age'])) if data_present(row['Age']) else None,
            'case_type': case_type,
            'nationality': data_present(row['Nationality'])
        }
    )


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


cases_by_date = split_cases_by_date(all_cases)
for date, cases in cases_by_date.items():
    case_proportion_by_date[date] = get_empty_proportion()
    for case in cases:
        proportion = case_proportion_by_date[date][case['case_type']]
        proportion['count'] += 1
        # could just calculate once at the end
        percentage = proportion['count'] / len(cases) * 100.0
        proportion['percentage'] = percentage

# Gender related
case_proportion_by_gender = {
    'male': {'count': 0, 'proportion': 0},
    'female': {'count': 0, 'proportion': 0},
    'other': {'count': 0, 'proportion': 0}
}
for case in all_cases:
    if case['gender'] == 'M':
        case_proportion_by_gender['male']['count'] += 1
    elif case['gender'] == 'F':
        case_proportion_by_gender['female']['count'] += 1
    else:
        case_proportion_by_gender['other']['count'] += 1
    case_proportion_by_gender['male']['proportion'] = case_proportion_by_gender['male']['count'] / len(
        all_cases) * 100.0
    case_proportion_by_gender['female']['proportion'] = case_proportion_by_gender['female']['count'] / len(
        all_cases) * 100.0
    case_proportion_by_gender['other']['proportion'] = case_proportion_by_gender['other']['count'] / len(
        all_cases) * 100.0


def extract_case_type_counts(cases):
    imported_cases = [
        case for case in cases if case['case_type'] == 'Imported']
    local_cases = [case for case in cases if case['case_type']
                   == 'Local Transmission']
    exposure_cases = [
        case for case in cases if case['case_type'] == 'Exposure to Imported Case']
    # case for case in cases if case['date_recovered'] is not None]
    return {
        'count': len(cases),
        # 'count_recovered': len(recovered_cases),
        # 'count_active': len(cases) - len(recovered_cases),
        'count_imported': len(imported_cases),
        'count_local': len(local_cases),
        'count_exposure': len(exposure_cases),
    }


def extract_case_date_counts(cases):
    arrived_cases = [
        case for case in cases if case['date_arrived'] is not None]
    symptom_started_cases = [
        case for case in cases if case['date_symptom_start'] is not None]
    return {
        'count_arrived': len(arrived_cases),
        'count_symptom_start': len(symptom_started_cases),
    }


all_case_type_counts = extract_case_type_counts(all_cases)

total_recovered = len(
    [case for case in all_cases if case['date_recovered'] is not None])
case_counts = {
    'total': len(all_cases),
    'total_recovered': total_recovered,
    'total_active': len(all_cases) - total_recovered,
    'per_day': []
}

cumulative_counts = {
    'count': 0,
    'count_imported': 0,
    'count_local': 0,
    'count_exposure': 0,
}

for date, cases in cases_by_date.items():
    date_case_type_counts = extract_case_type_counts(cases)
    for count in cumulative_counts.keys():
        cumulative_counts[count] += date_case_type_counts[count]
    # date_case_date_counts = extract_case_date_counts(cases)
    # for count in date_case_type_counts.keys():
    #     cumulative_counts[count] += date_case_type_counts[count]
    case_counts['per_day'].append(
        {
            'date': date,
            'counts': deepcopy(date_case_type_counts),
            'counts_cumulative': deepcopy(cumulative_counts),
            # 'counts_of_dates': deepcopy(date_case_date_counts)
        }
    )

# Trying to answer the question: How many happened on this specific day?


def get_default_on_date_counts():
    return {
        'total': 0,
        'recovered': 0,
        'active': 0,
        'arrived': 0,
        'symptom_start': 0,
        'died': 0
    }


def extract_counts_on_date(date, cases):
    on_date_counts = deepcopy(get_default_on_date_counts())
    on_date_counts['total'] = len(
        [case for case in cases if case['date_announced'] == date])
    on_date_counts['recovered'] = len(
        [case for case in cases if case['date_recovered'] == date])
    on_date_counts['active'] = on_date_counts['total'] - \
        on_date_counts['recovered']
    on_date_counts['arrived'] = len(
        [case for case in cases if case['date_arrived'] == date])
    on_date_counts['symptom_start'] = len(
        [case for case in cases if case['date_symptom_start'] == date])
    return on_date_counts


all_on_date_counts = {}
for date in cases_by_date.keys():
    all_on_date_counts[date] = extract_counts_on_date(date, all_cases)


cumulative_date_counter = get_default_on_date_counts()
cumulative_counts_by_date = {}
for date, cases in cases_by_date.items():
    current_date_all_case_counts = extract_counts_on_date(date, all_cases)
    for key in cumulative_date_counter.keys():
        cumulative_date_counter[key] += current_date_all_case_counts[key]
    cumulative_counts_by_date[date] = deepcopy(cumulative_date_counter)


# Source: http://weekly.chinacdc.cn/en/article/id/e53946e2-c6c4-41e9-9a9b-fea8db1a8f51
# both numbers inclusive
mortality_rates_by_age_group = [
    {'low': 0, 'high': 9, 'risk_percentage': 0},
    {'low': 10, 'high': 19, 'risk_percentage': 0.2},
    {'low': 20, 'high': 29, 'risk_percentage': 0.2},
    {'low': 30, 'high': 39, 'risk_percentage': 0.2},
    {'low': 40, 'high': 49, 'risk_percentage': 0.4},
    {'low': 50, 'high': 59, 'risk_percentage': 1.3},
    {'low': 60, 'high': 69, 'risk_percentage': 3.6},
    {'low': 70, 'high': 79, 'risk_percentage': 8},
    # marked as 80+, so took a large age to try and cover even the oldest possible patient
    {'low': 80, 'high': 110, 'risk_percentage': 14.8},


]

cases_by_age_groups = {}
case_counts_by_age_group = {}

for rates in mortality_rates_by_age_group:
    low, high = rates['low'], rates['high']
    cases_by_age_groups[f'{low}-{high}'] = []
    case_counts_by_age_group[f'{low}-{high}'] = []

# separate the cases by age group
for case in all_cases:
    if case['age']:
        for rates in mortality_rates_by_age_group:
            low, high = rates['low'], rates['high']
            if low <= case['age'] <= high:
                cases_by_age_groups[f'{low}-{high}'].append(case)

for age_group, cases in cases_by_age_groups.items():
    case_counts_by_age_group[age_group] = extract_case_type_counts(cases)

at_risk_count_by_age_group = []
for age_group in mortality_rates_by_age_group:
    low, high, risk_percentage = age_group['low'], age_group['high'], age_group['risk_percentage']
    relevant_cases = [case for case in all_cases if case['age']
                      is not None and low <= case['age'] <= high]
    case_count = len(relevant_cases)
    at_risk_count = (risk_percentage / 100.0) * case_count
    at_risk_count_by_age_group.append(
        {
            'low': low,
            'high': high,
            'count': case_count,
            'at_risk_count': at_risk_count,
            'risk_percentage': risk_percentage
        }
    )

    # print(output_data)
# pprint(cases)
# pprint(case_proportion_by_date)


def parse_cases():
    create_file('cases', all_cases)
    create_file('case_counts', case_counts)
    create_file('cases_by_date', cases_by_date)
    create_file('at_risk_count_by_age_group', at_risk_count_by_age_group)
    create_file('all_case_type_counts', all_case_type_counts)
    create_file('cases_by_age_groups', cases_by_age_groups)
    create_file('case_counts_by_age_group', case_counts_by_age_group)
    create_file('case_proportion_by_date', case_proportion_by_date)
    create_file('case_proportion_by_gender', case_proportion_by_gender)
    create_file('all_on_date_counts', all_on_date_counts)
    create_file('cumulative_counts_by_date', cumulative_counts_by_date)


parse_cases()
