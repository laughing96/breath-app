import { useBreathing } from "./hooks/useBreathing";

import { BreathingCircle } from "./components/Breathingcircle";
import { PhaseLabel } from "./components/PhaseLabel";
import { Countdown } from "./components/Countdown";
import { ControlPanel } from "./components/ControlPanel";
import { PatternSelector } from "./components/PatternSelector";
import { PATTERNS } from "./models/Patterns";
import "./App.css"

export default function App() {
    const { uiState, pattern, start, pause, resume, stop, changePattern } =
        useBreathing();
    // const { pattern, changePattern } = useBreathing();

    return (
        <div className="app">
            <div className="sidebar">
                <PatternSelector
                    value={pattern.name}
                    patterns={PATTERNS}
                    onChange={(name) => {
                        const pattern = PATTERNS.find((p) => p.name === name);
                        if (pattern) {
                            changePattern(pattern);
                        }
                    }}
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
