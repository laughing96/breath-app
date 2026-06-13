import { StorageService } from "../services/StorageService";

StorageService.saveStatistics({
    totalCycles:100,
    totalMinutes:23.5,
    totalSessions:5,
})

console.log(StorageService.loadStatistics())
