import type { Statistics, StatisticsRecord } from "../models/Statistics";
import { StorageService } from "./StorageService";

export class StatisticsService {
    static getStatistics():Statistics {
        return StorageService.loadStatistics()
    }

    static recordSession(
        cycles: number,
        minutes: number
    ): Statistics{
        const statistics = StorageService.loadStatistics();

        const updated: Statistics = {
            totalCycles: statistics.totalCycles + cycles,
            totalMinutes: statistics.totalMinutes + minutes,
            totalSessions : statistics.totalSessions + 1,
        };

        StorageService.saveStatistics(updated);
        return updated;
    }

    static reset(): void {
        StorageService.saveStatistics({
            totalMinutes: 0,
            totalSessions: 0,
            totalCycles: 0,
        })
    }
}

