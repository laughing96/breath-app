import type { Statistics } from "../models/Statistics";

interface StatisticsPanelProps {
    statistics: Statistics;
}

export function StatisticsPanel({ statistics }: StatisticsPanelProps) {
    return (
        <div
            style={{
                padding: 16,
                border: "1px solid #ddd",
                borderRadius: 8,
                minWidth: 260,
            }}
        >
            <h3>Statistics</h3>

            <div>
                Sessions:
                {""}
                {statistics.totalSessions}
            </div>
            <div>
                Cycles:
                {""}
                {statistics.totalCycles}
            </div>
            <div>
                Minutes:
                {""}
                {statistics.totalMinutes.toFixed(2)}
            </div>
        </div>
    );
}
