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

const getDiffString = (amount: number): string => amount == 0 ? '' : amount > 0 ? `⬆️ ${Number(amount.toFixed(2)).toLocaleString()}` : `⬇️ ${Number(Math.abs(amount).toFixed(2)).toLocaleString()}`

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
      <li>
        {data.recovered.toLocaleString()} Recoveries{" "}
        {data.recovered_diff != 0 &&
          `(${getDiffString(data.recovered_diff)})`}
      </li>
      <li>{data.active_cases.toLocaleString()} Active Cases {data.new_cases - data.recovered_diff != 0 && `(${getDiffString(data.new_cases - data.recovered_diff)})`}</li>
      <li>{data.new_cases.toLocaleString()} New Cases</li>
      <li>{data?.swab_count?.toLocaleString() || "N/A"} Swabs {data?.swab_count != 0 && `(${getDiffString(data.swab_count_diff)})`}</li>
      <li>{data?.positivity_rate?.toFixed(1) || "N/A"}% Positivity Rate {data?.positivity_rate_diff != 0 && `(${getDiffString(data.positivity_rate_diff)}%)`}</li>
      <li>
        {data?.deaths || "N/A"} Deaths{" "}
        {data.deaths_diff != 0 && `(${getDiffString(data.deaths_diff)})`}
      </li>
      <h4>Seven Day Moving Averages</h4>
      <li>
        New Cases:{" "}
        {data.seven_day_moving_average_new_cases
          ? Number(
            data.seven_day_moving_average_new_cases.toFixed(2)
          ).toLocaleString()
          : "N/A"}{" "}
      </li>
      <li>
        Deaths:{" "}
        {data.seven_day_moving_average_deaths
          ? Number(
            data.seven_day_moving_average_deaths.toFixed(2)
          ).toLocaleString()
          : "N/A"}{" "}
      </li>
      <li>
        Positivity Rate:{" "}
        {data.seven_day_moving_average_positivity_rate
          ? Number(
            data.seven_day_moving_average_positivity_rate.toFixed(2)
          ).toLocaleString()
          : "N/A"}
        %
      </li>
      <h4>Vaccines</h4>
      {data.total_doses_diff > 0 && (
        <li>{data.total_doses_diff.toLocaleString()} New Doses given</li>
      )}
      <li>
        {data.received_one_dose
          ? data.received_one_dose.toLocaleString()
          : "N/A"}{" "}
        First Doses{" "}
        {data?.received_one_dose_diff > 0 &&
          `(⬆️ ${data?.received_one_dose_diff.toLocaleString()})`}
      </li>
      <li>
        {data.received_both_doses
          ? data.received_both_doses.toLocaleString()
          : "N/A"}{" "}
        Both Doses{" "}
        {data?.received_both_doses_diff > 0 &&
          `(⬆️ ${data?.received_both_doses_diff.toLocaleString()})`}
      </li>
      <li>
        {data.received_booster_dose
          ? data.received_booster_dose.toLocaleString()
          : "N/A"}{" "}
        Booster Doses{" "}
        {data?.received_booster_dose_diff > 0 &&
          `(⬆️ ${data?.received_booster_dose_diff.toLocaleString()})`}
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
