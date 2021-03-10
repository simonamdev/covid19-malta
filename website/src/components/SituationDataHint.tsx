import React from "react";
import "../../node_modules/react-vis/dist/style.css";
import { MarkSeriesPoint, Hint } from "react-vis";
import { CaseData } from "./types";
import SituationData from "./SituationData";

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
    <Hint {...props} value={nearestPoint}>
      <div className="rv-hint__content">
        <SituationData caseData={caseData} nearestPoint={nearestPoint} />
      </div>
    </Hint>
  );
};
