import React, { useState } from "react";
import { graphql } from "gatsby";
import { LineSeriesPoint, MarkSeriesPoint } from "react-vis";
import { Helmet } from "react-helmet";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";
import * as Icons from "@fortawesome/free-solid-svg-icons";

import "../../node_modules/react-vis/dist/style.css";

import {
  CountChartData,
  CountChart,
  MeasuresData,
  CaseData,
} from "../components/types";
import Counters from "../components/Counters";

import latestData from "../../../data/latest_data.json";
import measuresData from "../../../data/measures.json";
import SituationChart from "../components/SituationChart";
import SituationDataVisual from "../components/SituationDataVisual";

const iconList = Object.keys(Icons)
  .filter((key) => key !== "fas" && key !== "prefix")
  .map((icon) => (Icons as any)[icon]);

library.add(...iconList);

interface RawMeasuresData {
  date: string;
  measures: string[];
}

const parsedMeasuresData: MeasuresData[] = (measuresData as RawMeasuresData[]).map(
  (md) => ({
    date: new Date(`${md.date} 12:00:00 GMT+2`),
    measures: md.measures,
  })
);

const parsedData: CaseData[] = latestData.map((d) => {
  const [day, month, year] = d.date.split("-");
  const date = new Date(`${day} ${month} ${year} 12:00:00 GMT+2`);
  return {
    ...d,
    date,
    events:
      parsedMeasuresData.find((pmd) => pmd.date.getTime() === date.getTime())
        ?.measures || [],
  };
});

// const totalCasesData = parsedData.map((d) => ({ x: d.date.getTime(), y: d.total_cases }))
const activeCasesData = parsedData.map((d) => ({
  x: d.date.getTime(),
  y: d.active_cases,
}));
// const recoveriesData = parsedData.map((d) => ({ x: d.date.getTime(), y: d.recovered }))
const deathsData = parsedData.map((d) => ({
  x: d.date.getTime(),
  y: d.deaths,
}));
const sevenDayMovingAverageData: LineSeriesPoint[] = parsedData.map((d) => ({
  x: d.date.getTime(),
  y: d.seven_day_moving_average,
}));

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    currentBuildDate: {
      currentDate: string;
    };
  };
}

const data: CountChartData[] = [
  { title: CountChart.ACTIVE_CASES, data: activeCasesData, colour: "#1261a0" },
  // { title: CountChart.RECOVERIES, data: recoveriesData },
  // { title: CountChart.TOTAL_CASES, data: totalCasesData },
  { title: CountChart.DEATHS, data: deathsData, colour: "#b53737" },
];

export default (props: IndexPageProps) => {
  const [nearestPoint, setNearestPoint] = useState<MarkSeriesPoint | null>(
    null
  );
  return (
    <div style={{ width: "100%", height: "100%", margin: 0, padding: 0 }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{props.data.site.siteMetadata.title}</title>
        <link rel="canonical" href="https://c19.mt" />
      </Helmet>
      <div style={{ height: "10vh" }}>
        <h1>Covid-19 in Malta</h1>
        <div>
          <p style={{ margin: 0 }}>
            Website by <a href="https://simonam.dev">Simon Agius Muscat</a>.
            Data is retrieved from the{" "}
            <a href="https://github.com/COVID19-Malta/COVID19-Cases">
              Public Health Open Dataset
            </a>
            , combined with the{" "}
            <a href="https://github.com/owid/covid-19-data/tree/master/public/data">
              OWID Dataset
            </a>
            . Last updated:{" "}
            {new Date(
              props.data.currentBuildDate.currentDate
            ).toLocaleDateString()}{" "}
            {new Date(
              props.data.currentBuildDate.currentDate
            ).toLocaleTimeString()}
          </p>
        </div>
        <Counters activeCasesData={activeCasesData} deathsData={deathsData} />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ height: "85vh", width: "85vw" }}>
          <SituationChart
            caseData={parsedData}
            onSetNearestPoint={setNearestPoint}
          />
        </div>
        <div style={{ height: "85vh", width: "15vw" }}>
          {nearestPoint ? (
            <SituationDataVisual
              caseData={parsedData}
              nearestPoint={nearestPoint}
            />
          ) : (
            <h3 style={{ marginTop: "2em" }}>
              ⬅️ Hover over the chart to see data for a specific day
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    currentBuildDate {
      currentDate
    }
  }
`;
