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
import SituationData from "./SituationData";

interface CaseCountChartProps {
  caseData: CaseData[];
}

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
          onNearestX={(p) => setNearestPoint(p)}
        />
        <LineSeries
          key="Deaths"
          data={caseData.map((cd) => ({
            x: cd.date.getTime(),
            y: cd.deaths,
          }))}
          color="red"
        />
        <MarkSeries data={marksData} strokeWidth={0.5} color="#00b300" />
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
          <SituationData caseData={caseData} nearestPoint={nearestPoint} />
        )}
      </FlexibleXYPlot>
    </>
  );
};
