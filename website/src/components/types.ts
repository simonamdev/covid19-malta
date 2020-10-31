import { LineSeriesPoint } from "react-vis";

export enum CountChart {
    TOTAL_CASES = 'Total Cases',
    ACTIVE_CASES = 'Active Cases',
    DEATHS = `Deaths`,
    RECOVERIES = `Recoveries`
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