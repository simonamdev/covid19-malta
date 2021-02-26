import React, { useState, useEffect } from "react";
import "../../node_modules/react-vis/dist/style.css";
import {
  FlexibleXYPlot,
  LineSeries,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  MarkSeries,
  LineSeriesPoint,
  MarkSeriesPoint,
  Hint,
} from "react-vis";
import { CaseData } from "./types";

interface CaseCountChartProps {
  caseData: CaseData[];
}

const getSevenDayMovingAverage = (data: CaseData[], date: Date): string =>
  data
    .find((d) => d.date.getTime() === date.getTime())
    ?.seven_day_moving_average.toString() || "N/A";

const getEvents = (data: CaseData[], date: Date): string[] =>
  data.find((d) => d.date.getTime() === date.getTime())?.events || [];

const getDeaths = (data: CaseData[], date: Date): string =>
  data.find((d) => d.date.getTime() === date.getTime())?.deaths.toString() ||
  "N/A";

export default ({ caseData }: CaseCountChartProps) => {
  const [] = useState<LineSeriesPoint[]>([]);
  const [nearestPoint, setNearestPoint] = useState<MarkSeriesPoint | undefined>(
    undefined
  );
  const marksData = caseData
    .filter((cd) => cd.events.length > 0)
    .map((cd) => ({ y: cd.active_cases, x: cd.date }));

  return (
    <>
      <FlexibleXYPlot
        margin={50}
        xType="time"
        onMouseLeave={() => setNearestPoint(undefined)}
      >
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title="Date" />
        <YAxis />
        <LineSeries
          key="ActiveCases"
          data={caseData.map((cd) => ({
            x: cd.date.getTime(),
            y: cd.active_cases,
          }))}
          color="#1261a0"
        />
        <LineSeries
          key="Deaths"
          data={caseData.map((cd) => ({
            x: cd.date.getTime(),
            y: cd.deaths,
          }))}
          color="red"
        />
        <MarkSeries
          data={marksData}
          strokeWidth={0.5}
          color="#00b300"
          onNearestX={(p) => setNearestPoint(p)}
        />
        {nearestPoint && (
          <LineSeries
            key={`measure-${nearestPoint.x}-${nearestPoint.y}`}
            data={[
              { x: nearestPoint.x as number, y: nearestPoint.y as number },
              { x: nearestPoint.x as number, y: 0 },
            ]}
            color="black"
            stroke="black"
          />
        )}
        {nearestPoint && (
          <Hint value={nearestPoint}>
            <div className="rv-hint__content">
              <p>
                {new Date(nearestPoint.x).toLocaleDateString()} (
                {Math.floor(
                  (new Date().getTime() - new Date(nearestPoint.x).getTime()) /
                    (1000 * 3600 * 24)
                )}{" "}
                day/s ago).
              </p>
              <p>{nearestPoint.y.toLocaleString()} Active Cases</p>
              <p>{getDeaths(caseData, nearestPoint.x as Date)} Deaths</p>
              <p>
                Seven Day Moving Average:{" "}
                {getSevenDayMovingAverage(caseData, nearestPoint.x as Date)}{" "}
                Cases
              </p>
              <ul>
                {getEvents(caseData, nearestPoint.x as Date).map(
                  (measure, i) => (
                    <li key={`m-list-${i}`} style={{ margin: 0, padding: 0 }}>
                      {measure}
                    </li>
                  )
                )}
              </ul>
            </div>
          </Hint>
        )}
      </FlexibleXYPlot>
    </>
  );
};
