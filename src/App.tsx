import { useBreathing } from "./hooks/useBreathing";

import { BreathingCircle } from "./components/Breathingcircle";
import { PhaseLabel } from "./components/PhaseLabel";
import { Countdown } from "./components/Countdown";
import { ControlPanel } from "./components/ControlPanel";
import { PatternSelector } from "./components/PatternSelector";
import { PATTERNS } from "./models/Patterns";

export default function App() {
    const { state,pattern, start, pause, resume, stop, changePattern } = useBreathing();
    // const { pattern, changePattern } = useBreathing();

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 30,
            }}
        >
        <div style={{minHeight:"20vh",alignItems:"start"}}>
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
            <BreathingCircle phase={state.phase} />
            <PhaseLabel phase={state.phase} />
            <Countdown remaining={state.remaining} />
            <div> Cycle:{state.cycle} </div>
            <ControlPanel
                running={state.running}
                onStart={start}
                onPause={pause}
                onResume={resume}
                onStop={stop}
            />
        </div>
    );
}
