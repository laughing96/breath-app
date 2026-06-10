import { useEffect, useState } from "react";
import type { BreathPattern } from "../models/Breathings";
import type { SessionConfig } from "../models/SessionConfig";
// todo apply 后不确定是否真的apply, 需要回显

interface PatternEditorProps {
    pattern: BreathPattern;
    session: SessionConfig;
    onApply: (pattern: BreathPattern, session:SessionConfig) => void;
}

export function PatternEditor({
    pattern,
    session,
    onApply,
}: PatternEditorProps) {
    const [draft, setDraft] = useState<BreathPattern>(pattern);
    const [session_draft, setSessionDraft] = useState<SessionConfig>(session);
    useEffect(() => {
        setDraft(pattern);
    }, [pattern]);

    const updateField = (field: keyof BreathPattern, value: number) => {
        setDraft((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    const updateCycle = (field: keyof SessionConfig, value: number) => {
        setSessionDraft((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    const rowStyle = {
        // display: "flex",
        // alignItems: "center",
        // gap: 40,
        // marginBottom: 8,
        display: "grid",
        gridTemplateColumns: " 80px 120px",
        rowGap: 8,
        columnGap: 8,
    };

    const fields = ["inhale", "hold1", "exhale", "hold2"] as const;

    const total = pattern.inhale + pattern.hold1 + pattern.exhale + pattern.hold2;

    return (
        <div
            style={{
                padding: 16,
                border: "1px solid #ddd",
                borderRadius: 8,
                minWidth: 260,
            }}
        >
            <h3> {draft.name}</h3>
            {fields.map((field) => (
                <div key={field} style={rowStyle}>
                    <span> {field}</span>
                    <input
                        type="number"
                        value={draft[field]}
                        onChange={(e) => updateField(field, Number(e.target.value))}
                    />
                </div>
            ))}
            <div style={rowStyle}>
                <span> cycle </span>
                <input
                    type="number"
                    value={session_draft["maxCycles"]}
                    onChange={(e) => updateCycle("maxCycles", Number(e.target.value))}
                />
            </div>
            <hr />

            <div>Total: {total}s </div>
            <button
                style={{
                    marginTop: 12,
                }}
                onClick={() => onApply(draft, session_draft)}
            >
                Apply
            </button>
        </div>
    );
}
