import type { BreathUIState } from "../models/BreathUIState";
import "./BreathingCircle.css";

export function BreathingCircle({ uiState }: { uiState: BreathUIState }) {
    const scale = uiState.scale;

    const color = uiState.color;
    const all_dura = uiState.all_dura;
    return (
        <div
        className="breathing-circle"
        style={{
            background:color,
            transform:`scale(${scale})`,
            transition: `transform ${all_dura}s linear`,
        }}
        />
    );
}
