import { useEffect, useState } from "react";
import type { BreathPattern } from "../models/Breathings";
import type { SessionConfig } from "../models/SessionConfig";
// todo apply 后不确定是否真的apply, 需要回显

interface PatternEditorProps {
    pattern: BreathPattern;
    session: SessionConfig;
    saved: boolean;
    onApply: (pattern: BreathPattern, session: SessionConfig) => void;
}

export function PatternEditor({
    pattern,
    session,
    saved,
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
    const updateSessionField = (field: keyof SessionConfig, value: number) => {
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
        gridTemplateColumns: "150px 1fr",
        rowGap: 8,
        columnGap: 8,
    };

    const fields = ["inhale", "hold1", "exhale", "hold2"] as const;

    const session_fields = ["maxCycles", "maxTimeMin"] as const;

    const total = pattern.inhale + pattern.hold1 + pattern.exhale + pattern.hold2;

    const cycle = session.maxCycles;

    // const all_time = (total * cycle / 60 ).toFixed(2) ; // str
    const all_time_sec = total * cycle;
    const all_time = Math.round(total * cycle / 60 *100) /100;


    const dirty =
        JSON.stringify(draft) !== JSON.stringify(pattern) ||
        JSON.stringify(session_draft) !== JSON.stringify(session);

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
            <hr />
            {session_fields.map((field) => (
                <div key={field} style={rowStyle}>
                    <span> {field} </span>
                    <input
                        type="number"
                        value={session_draft[field]}
                        onChange={(e) => updateSessionField(field, Number(e.target.value))}
                    />
                </div>
            ))}
            <hr />

            <div>Total: {total}s X {cycle} = {all_time_sec}s = {all_time} min</div>
            <button
                style={{
                    marginTop: 12,
                }}
                disabled={!dirty}
                onClick={() => {
                    onApply(draft, session_draft);
                }}
            >
                {/*{saved ? <div>✓ Applied</div> : <div> Apply </div>} */}
                {dirty ? <div> Apply</div> : <div> ✓ Applied </div>}
            </button>
        </div>
    );
}
