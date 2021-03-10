import React from "react";
import "../../node_modules/react-vis/dist/style.css";
import { MarkSeriesPoint, Hint } from "react-vis";
import { CaseData } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <FontAwesomeIcon icon="calendar" size="lg" />{" "}
        {new Date(nearestPoint.x).toLocaleDateString()}
      </p>
      <p>{daysAgoText}</p>
      <h4>Cases</h4>
      <li>{data.total_cases.toLocaleString()} Total Cases</li>
      <li>{data.recovered.toLocaleString()} Recoveries</li>
      <li>{data.active_cases.toLocaleString()} Active Cases</li>
      <li>{data.new_cases.toLocaleString()} New Cases</li>
      <li>{data?.swab_count?.toLocaleString() || "N/A"} Swabs</li>
      <li>{data?.positivity_rate?.toFixed(1) || "N/A"}% Positivity Rate</li>
      <li>{data?.deaths || "N/A"} Deaths</li>
      <h4>Seven Day Moving Averages</h4>
      <li>New Cases: {data?.seven_day_moving_average || "N/A"} </li>
      <li>
        Deaths: {data?.seven_day_moving_average_deaths.toFixed(2) || "N/A"}{" "}
      </li>
      <li>
        Positivity Rate:{" "}
        {data?.seven_day_moving_average_positivity?.toFixed(2) || "N/A"}%
      </li>
      <h4>Vaccines</h4>
      <li>
        {data.first_dose_count ? data.first_dose_count.toLocaleString() : "N/A"}{" "}
        First Doses{" "}
        {data.first_dose_diff &&
          `(⬆️ ${data.first_dose_diff.toLocaleString()})`}
      </li>
      <li>
        {data.second_dose_count
          ? data.second_dose_count.toLocaleString()
          : "N/A"}{" "}
        Second Doses{" "}
        {data.second_dose_diff &&
          `(⬆️ ${data.second_dose_diff.toLocaleString()})`}
      </li>
      {data?.events && data.events.length > 0 && <h4>Notable Events</h4>}
      {(data?.events || []).map((measure, i) => (
        <li key={`m-list-${i}`} style={{ margin: 0, padding: 0 }}>
          {measure}
        </li>
      ))}
    </>
  );
};
