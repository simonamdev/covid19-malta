import React from "react";
import "../../node_modules/react-vis/dist/style.css";
import { MarkSeriesPoint, Hint } from "react-vis";
import { CaseData } from "./types";

interface SituationDataProps {
  caseData: CaseData[];
  nearestPoint: MarkSeriesPoint;
}

const getDateData = (data: CaseData[], date: Date): CaseData | undefined =>
  data.find((d) => d.date.getTime() === date.getTime());

export default (props: SituationDataProps) => {
  const { nearestPoint, caseData } = props;
  const data = getDateData(caseData, new Date(nearestPoint.x));
  return (
    <Hint {...props} value={nearestPoint}>
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
        <p>{data?.positivity_rate.toFixed(1) || "N/A"}% Positivity Rate</p>
        <p>{data?.deaths || "N/A"} Deaths</p>
        <p>
          Seven Day Moving Average: {data?.seven_day_moving_average || "N/A"}{" "}
          Cases
        </p>
        {data?.first_dose_count && data?.second_dose_count && (
          <p>
            Vaccines: {data?.first_dose_count.toLocaleString()} First Doses,{" "}
            {data?.second_dose_count.toLocaleString()} Second Doses
          </p>
        )}
        <ul>
          {(data?.events || []).map((measure, i) => (
            <li key={`m-list-${i}`} style={{ margin: 0, padding: 0 }}>
              {measure}
            </li>
          ))}
        </ul>
      </div>
    </Hint>
  );
};
