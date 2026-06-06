import { useBreathing } from "./hooks/useBreathing";

import { BreathingCircle } from "./components/Breathingcircle";
import { PhaseLabel } from "./components/PhaseLabel";
import { Countdown } from "./components/Countdown";
import { ControlPanel } from "./components/ControlPanel";

export default function App() {
    const { state, start, pause, resume, stop } = useBreathing();

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 24,
            }}
        >
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
