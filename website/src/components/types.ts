import { LineSeriesPoint } from "react-vis";

export enum CountChart {
  TOTAL_CASES = "Total Cases",
  ACTIVE_CASES = "Active Cases",
  DEATHS = `Deaths`,
  RECOVERIES = `Recoveries`,
}

export interface CountChartData {
  title: CountChart;
  data: LineSeriesPoint[];
  colour?: string;
}

export interface MeasuresData {
  date: Date;
  measures: string[];
}

export interface CaseData {
  date: Date;
  new_cases: number;
  total_cases: number;
  recovered: number;
  deaths: number;
  active_cases: number;
  seven_day_moving_average: number;
  first_dose_vaccinations: number;
  second_dose_vaccinations: number;
  events: string[];
}
