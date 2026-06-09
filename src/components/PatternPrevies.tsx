import type { BreathPattern } from "../models/Breathings";

interface PatternPreviewProps {
    pattern: BreathPattern;
}

export function PatternPreview({ pattern }: PatternPreviewProps) {
    const total = pattern.inhale + pattern.hold1 + pattern.exhale + pattern.hold2;

    return (
        <div
            style={{
                padding: 16,
                border: "1px solid #ddd",
                borderRadius: 8,
                minWidth: 240,
            }}
        >
            <h3
                style={{
                    marginTop: 0,
                }}
            >
                {" "}
                {pattern.name}
            </h3>
            <div>Inhale: {pattern.inhale}s</div>
            <div>Hold1: {pattern.hold1}s</div>
            <div>Exhale: {pattern.exhale}s</div>
            <div>Hold2: {pattern.hold2}s</div>
            <hr />
            <div>
            Total: {total}s
            </div>
        </div>
    );
}
