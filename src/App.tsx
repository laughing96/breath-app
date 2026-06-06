import { useBreathing } from "./hooks/useBreathing";

export default function App() {
    const { state, start, pause, resume, stop } = useBreathing();

    return (
        <div style={{ padding: 40 }}>
            <h1>Breath App </h1>
            <h2> Phase: {state.phase}</h2>
            <h2> Remaining: {state.remaining}</h2>
            <h2> Cycle: {state.cycle}</h2>
            <h2> Runing: {state.running}</h2>
            <div style={{ display: "flex", gap: 8 }}>
                <button onClick={start}> Start </button>
                <button onClick={pause}> Pause </button>
                <button onClick={resume}> Resume</button>
                <button onClick={stop}> Stop</button>
            </div>
        </div>
    );
}
