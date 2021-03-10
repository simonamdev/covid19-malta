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
  const numberOfDaysAgo = Math.floor(
    (new Date().getTime() - new Date(nearestPoint.x).getTime()) /
      (1000 * 3600 * 24)
  );
  const daysAgoText =
    numberOfDaysAgo > 0
      ? `${numberOfDaysAgo} day${numberOfDaysAgo === 1 ? "" : "s"} ago`
      : "Today";
  return (
    <>
      <p>
        {new Date(nearestPoint.x).toLocaleDateString()} ({daysAgoText})
      </p>
      <p>Cases:</p>
      <ul>
        <li>{data.total_cases.toLocaleString()} Total Cases</li>
        <li>{data.recovered.toLocaleString()} Recoveries</li>
        <li>{data.active_cases.toLocaleString()} Active Cases</li>
        <li>{data.new_cases.toLocaleString()} New Cases</li>
      </ul>
      <p>{nearestPoint.y.toLocaleString()} Active Cases</p>
      <p>{data?.swab_count?.toLocaleString() || "N/A"} Swabs</p>
      <p>{data?.positivity_rate?.toFixed(1) || "N/A"}% Positivity Rate</p>
      <p>{data?.deaths || "N/A"} Deaths</p>
      <p>Seven Day Moving Averages:</p>
      <ul>
        <li>Cases: {data?.seven_day_moving_average || "N/A"} </li>
        <li>
          Deaths: {data?.seven_day_moving_average_deaths.toFixed(2) || "N/A"}{" "}
        </li>
        <li>
          Positivity Rate:{" "}
          {data?.seven_day_moving_average_positivity?.toFixed(2) || "N/A"}%
        </li>
      </ul>
      <p>Vaccines:</p>
      <ul>
        <li>
          {data.first_dose_count
            ? data.first_dose_count.toLocaleString()
            : "N/A"}{" "}
          First Doses{" "}
          {data?.first_dose_diff &&
            `(⬆️ ${data?.first_dose_diff.toLocaleString()})`}
        </li>
        <li>
          {data.second_dose_count
            ? data.second_dose_count.toLocaleString()
            : "N/A"}{" "}
          Second Doses{" "}
          {data?.second_dose_diff &&
            `(⬆️ ${data?.second_dose_diff.toLocaleString()})`}
        </li>
      </ul>
      {data?.events && data.events.length > 0 && <p>Notable Events:</p>}
      <ul>
        {(data?.events || []).map((measure, i) => (
          <li key={`m-list-${i}`} style={{ margin: 0, padding: 0 }}>
            {measure}
          </li>
        ))}
      </ul>
    </>
  );
};
