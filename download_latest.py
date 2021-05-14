import requests

from datetime import datetime

cases_url = 'https://raw.githubusercontent.com/COVID19-Malta/COVID19-Cases/master/COVID-19%20Malta%20-%20Aggregate%20Data%20Set.csv'

print('Downloading Case Data...')
response = requests.get(cases_url)

if response.status_code == 200:
    filename = '{0:%Y-%m-%d_%H:%M:%S}_cases_data.csv'.format(datetime.now())
    with open(f'./data/{filename}', 'w') as file:
        file.write(response.text)
else:
    print(f'Non 200 status code for case data: {response.status_code}')

swabs_url = 'https://raw.githubusercontent.com/COVID19-Malta/COVID19-Cases/master/COVID-19%20Malta%20-%20Number%20of%20Swabs%20Tests%20by%20Date%20Performed.csv'

print('Downloading Swabs...')
response = requests.get(swabs_url)

if response.status_code == 200:
    filename = '{0:%Y-%m-%d_%H:%M:%S}_swabs_data.csv'.format(datetime.now())
    with open(f'./data/{filename}', 'w') as file:
        file.write(response.text)
else:
    print(f'Non 200 status code for swab data: {response.status_code}')


vaccines_url = 'https://raw.githubusercontent.com/COVID19-Malta/COVID19-Cases/master/COVID-19%20Malta%20-%20Vaccination%20Data.csv'

print('Downloading Vaccines...')
response = requests.get(vaccines_url)

if response.status_code == 200:
    filename = '{0:%Y-%m-%d_%H:%M:%S}_vaccines_data.csv'.format(datetime.now())
    with open(f'./data/{filename}', 'w') as file:
        file.write(response.text)
else:
    print(f'Non 200 status code for vaccine data: {response.status_code}')

print('Downloading OWID data...')

owid_url = 'https://covid.ourworldindata.org/data/owid-covid-data.csv'
response = requests.get(owid_url)

if response.status_code == 200:
    filename = '{0:%Y-%m-%d_%H:%M:%S}_owid.csv'.format(datetime.now())
    with open(f'./data/{filename}', 'w') as file:
        file.write(response.text)
else:
    print(f'Non 200 status code for owid data: {response.status_code}')


print('Done!')
