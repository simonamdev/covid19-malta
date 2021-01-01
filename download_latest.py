import requests

from datetime import datetime

cases_url = 'https://raw.githubusercontent.com/COVID19-Malta/COVID19-Cases/master/COVID-19%20Malta%20-%20Aggregate%20Data%20Set.csv'

print('Downloading Case Data...')
response = requests.get(cases_url)

if response.status_code == 200:
    filename = '{0:%Y-%m-%d_%H:%M:%S}_data.csv'.format(datetime.now())
    with open(f'./data/{filename}', 'w') as file:
        file.write(response.text)
else:
    print(f'Non 200 status code for case data: {response.status_code}')

swabs_url = 'https://raw.githubusercontent.com/COVID19-Malta/COVID19-Cases/master/COVID-19%20Malta%20-%20Number%20of%20PCR%20Tests%20by%20Date.csv'

print('Downloading Swabs...')
response = requests.get(swabs_url)

if response.status_code == 200:
    filename = '{0:%Y-%m-%d_%H:%M:%S}_swabs_data.csv'.format(datetime.now())
    with open(f'./data/{filename}', 'w') as file:
        file.write(response.text)
else:
    print(f'Non 200 status code for case data: {response.status_code}')

print('Done :)')
