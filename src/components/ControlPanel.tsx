import "./ControlPanel.css"

interface ControlPaneProps {
    running: boolean;
    onStart: () => void;
    onPause: () => void;
    onResume: () => void;
    onStop: () => void;
}

export function ControlPanel({
    running,
    onStart,
    onPause,
    onResume,
    onStop,
}: ControlPaneProps) {
    return (
        // <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <div className="control-panel">
            {!running ? (
                <>
                    <button onClick={onStart}>Start</button>
                    <button onClick={onResume}>Resume</button>
                </>
            ) : (
                <>
                    <button onClick={onPause}>Pause</button>
                    <button onClick={onStop}>Stop</button>
                </>
            )}
        </div>
    );
}
