import requests

from datetime import datetime

url = 'https://raw.githubusercontent.com/COVID19-Malta/COVID19-Cases/master/COVID-19%20Malta%20-%20Aggregate%20Data%20Set.csv'

print('Downloading...')
response = requests.get(url)

if response.status_code == 200:
    filename = '{0:%Y-%m-%d_%H:%M:%S}_data.csv'.format(datetime.now())
    with open(f'./data/{filename}', 'w') as file:
        file.write(response.text)
    print('Done :)')
else:
    print(f'Non 200 status code: {response.status_code}')
