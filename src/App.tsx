import { useBreathing } from "./hooks/useBreathing";

import { BreathingCircle } from "./components/Breathingcircle";
import { PhaseLabel } from "./components/PhaseLabel";
import { Countdown } from "./components/Countdown";
import { ControlPanel } from "./components/ControlPanel";
import { PatternSelector } from "./components/PatternSelector";
import { PatternPreview } from "./components/PatternPrevies";
import { PATTERNS } from "./models/Patterns";
import "./App.css";
import { PatternEditor } from "./components/PatternEditor";
import { useState } from "react";
import { StatisticsPanel } from "./components/StatisticsPanel";
import { StatisticsService } from "./services/StatisticsService";

export default function App() {
    const {
        uiState,
        pattern,
        session,
        statistic,
        saved,
        start,
        pause,
        resume,
        stop,
        changePattern,
    } = useBreathing();
    // const { pattern, changePattern } = useBreathing();
    // const statistics = StatisticsService.getStatistics();

    return (
        <div className="app">
            <div className="sidebar">
                <StatisticsPanel statistics={statistic} />
                <PatternSelector
                    value={pattern.name}
                    patterns={PATTERNS}
                    onChange={(name) => {
                        const pattern = PATTERNS.find((p) => p.name === name);
                        if (pattern) {
                            changePattern(pattern, session);
                        }
                    }}
                />
                {/* <PatternPreview pattern={pattern} /> */}
                <PatternEditor
                    pattern={pattern}
                    session={session}
                    saved={saved}
                    onApply={changePattern}
                />
            </div>
            <div className="main">
                <BreathingCircle uiState={uiState} />
                <PhaseLabel phase={uiState.phase} />
                <Countdown remaining={uiState.remaining} />
                <div> Cycle:{uiState.cycle} </div>
                <ControlPanel
                    running={uiState.running}
                    onStart={start}
                    onPause={pause}
                    onResume={resume}
                    onStop={stop}
                />
            </div>
        </div>
    );
}
