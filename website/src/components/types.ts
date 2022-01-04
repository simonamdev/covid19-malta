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
  recovered_diff: number;
  deaths: number;
  deaths_diff: number;
  active_cases: number;
  seven_day_moving_average_new_cases: number;
  seven_day_moving_average_deaths: number;
  seven_day_moving_average_positivity_rate?: number;
  total_doses: number;
  received_one_dose: number;
  received_both_doses: number;
  received_booster_dose: number;
  total_doses_diff: number;
  received_one_dose_diff: number;
  received_both_doses_diff: number;
  received_booster_dose_diff: number;
  seven_day_moving_average_first_dose?: number;
  seven_day_moving_average_second_dose?: number;
  swab_count?: number;
  swab_count_diff?: number;
  positivity_rate?: number;
  positivity_rate_diff?: number;
  events: string[];
}
