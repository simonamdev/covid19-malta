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
        <p>{data?.swab_count.toLocaleString() || "N/A"} Swabs</p>
        <p>{data?.positivity_rate.toFixed(1) || "N/A"}% Positivity Rate</p>
        <p>{data?.deaths || "N/A"} Deaths</p>
        <p>Seven Day Moving Averages:</p>
        <ul>
          <li>Cases: {data?.seven_day_moving_average || "N/A"} </li>
          <li>
            Positivity Rate:{" "}
            {data?.seven_day_moving_average_positivity.toFixed(2) || "N/A"}%
          </li>
        </ul>
        {data?.first_dose_count && data?.second_dose_count && (
          <>
            <p>Vaccines:</p>
            <ul>
              <li>{data?.first_dose_count.toLocaleString()} First Doses</li>
              <li>{data?.second_dose_count.toLocaleString()} Second Doses</li>
            </ul>
          </>
        )}
        {data?.events && <p>Notable Events:</p>}
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
