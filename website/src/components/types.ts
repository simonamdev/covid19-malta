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
  seven_day_moving_average_deaths: number;
  seven_day_moving_average_positivity?: number;
  first_dose_count?: number;
  second_dose_count?: number;
  first_dose_diff?: number;
  second_dose_diff?: number;
  total_dose_diff?: number;
  seven_day_moving_average_first_dose?: number;
  seven_day_moving_average_second_dose?: number;
  swab_count?: number;
  positivity_rate?: number;
  events: string[];
}
