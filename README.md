# Covid 19 in Malta

## Project Aim

This project is aimed at serving as a visual reference for the progress of the Covid-19 Pandemic in Malta over the years 2020 and 2021.
Particular focus is placed on notable events that happened in the country which are visible if you hover over a particular day on the graph which has a green dot on the active cases graph.

I host the latest version at https://www.c19.mt

## FAQ

1. Why does this update slower than other sources such as news sites?

I rely solely on the open dataset published by the Public Health department of Malta, hosted at https://github.com/COVID19-Malta/COVID19-Cases. It is not updated as soon as the daily new set of numbers are released.

2. Why do more recent days lack positivty rate information?

The parts of the open dataset that are mostly kept up to date are the case numbers and the vaccination counts. Rather than relying on manually input numbers every day, I chose instead to omit data if it is not available. Since the PCR Test Count data may not be updated, positvity rate cannot be calculated reliably.

3. What do you hope to achieve with this project?

I believe that, due to the deluge of news articles and information about the pandemic, it has become too easy to forget when certain events occurred. By overlaying these events visually with the case and vaccination count data we can have more informed conversations about the effect of events and the introduction of measures.

4. Why is event X missing?

I update the events occasionally of my own volition. If you believe there is an every worthy of being displayed on the graph, feel free to open a pull request. These are stored in the `data` directory under the `measures.json` file.

5. What is this project built with?

- The data retrieval, parsing and calculation is a set of Python 3 scripts which retrieve from the Public Health open dataset.
- The visualisation is generated using GatsbyJS and react-vis.
- The automation of updating depended on GitHub Actions until it was moved to Jenkins instead to avoid having to update the repository with the data generated every day.

## How to run

### Data Retrieval

You will need Python 3:

`pip3 install -r requirements.txt`

`python3 download_latest.py`

This should result in a number of `csv` files being downloaded in the `data` folder

`python3 convert_latest.py`

This should result in the following file being generated in the `data` folder: `latest_data.json`

### Visualisation

In the `website` directory:

- Run `yarn` to install dependencies
- Run `yarn run develop` to see the changes locally with hot-reload
- Run `yarn run build` to build a final version that will be placed in the `website/public` folder

### Automation

To run the automation in Jenkins, create a new pipeline job from SCM and point it to the Jenkinsfile. You may need to update the jenkinsfile to point to folders that make sense for your setup as well as a configuration setup matching the names used.

It assumes you have the following available:

- Docker
- Publish over SSH plugin

## Licence

MIT
