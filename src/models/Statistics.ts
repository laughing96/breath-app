export interface Statistics{
    totalSessions: number;
    totalCycles: number;
    totalMinutes: number;
}

export interface StatisticsRecord {
    timestamp: number;
    cycles: number;
    minutes: number;
    patternName: string;
}


interface StatisticsStore {
    summary : Statistics;
    records: StatisticsRecord[];
}
