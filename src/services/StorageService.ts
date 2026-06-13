import type { Statistics } from "../models/Statistics";

const STAISTICS_KEY = "breath_statistics";

export class StorageService {
    static loadStatistics(): Statistics {
        const raw = localStorage.getItem(STAISTICS_KEY);
        if (!raw) {
            return { totalSessions: 0, totalCycles: 0, totalMinutes: 0 };
        }

        try {
            return JSON.parse(raw);
        } catch {
            return {
                totalSessions: 0,
                totalCycles: 0,
                totalMinutes: 0,
            };
        }
    }

    static saveStatistics(statistics: Statistics) {
        localStorage.setItem(STAISTICS_KEY, JSON.stringify(statistics))
    }
}
