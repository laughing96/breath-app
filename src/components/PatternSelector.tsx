import { type BreathPattern } from "../models/Breathings";

interface Props {
    value: string;

    patterns: BreathPattern[];

    onChange: (name: string) => void;
}

export function PatternSelector({ value, patterns, onChange }: Props) {
    return (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
            {patterns.map((pattern) => (
                <option key={pattern.name} value={pattern.name}>
                    {pattern.name}
                </option>
            ))}
        </select>
    );
}
