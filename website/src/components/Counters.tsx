import React from "react";
import { LineSeriesPoint } from "react-vis";

interface CountersProps {
  activeCasesData: LineSeriesPoint[];
  deathsData: LineSeriesPoint[];
}

export default ({ activeCasesData, deathsData }: CountersProps) => {
  const diffCount =
    activeCasesData[activeCasesData.length - 1].y -
    activeCasesData[activeCasesData.length - 2].y;
  const casesAreUp = diffCount > 0;
  const casesAreSame = diffCount === 0;
  const diffDeathCount =
    deathsData[deathsData.length - 1].y - deathsData[deathsData.length - 2].y;
  const deathsIsUp = diffDeathCount > 0;
  const deathsIsSame = diffDeathCount === 0;
  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <h3>
        {activeCasesData[activeCasesData.length - 1].y.toLocaleString()} Active
        Cases{" "}
        {!casesAreSame && (
          <span>
            ({casesAreUp ? "⬆" : "⬇"} {Math.abs(diffCount)})
          </span>
        )}
        ,
      </h3>
      <h3 style={{ paddingLeft: "0.25em" }}>
        {deathsData[deathsData.length - 1].y} Deaths{" "}
        {!deathsIsSame && (
          <span>
            ({deathsIsUp ? "⬆" : "⬇"} {Math.abs(diffDeathCount)})
          </span>
        )}
      </h3>
    </div>
  );
};
