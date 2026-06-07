import type { BreathUIState } from "../models/BreathUIState";

export function BreathingCircle({ uiState }: { uiState: BreathUIState }) {
    const scale = uiState.scale;

    const color = uiState.color;
    return (
        <div
            style={{
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: color,
                transform: `scale(${scale})`,
                transition: "transform 4s linear",
            }}
        />
    );
}
