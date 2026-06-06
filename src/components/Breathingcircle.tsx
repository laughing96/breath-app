import { Phase } from "../models/Breathings";

interface Props {
    phase: string;
}

export function BreathingCircle({ phase }: Props) {
    let scale = 1;
    const color =
        phase === Phase.INHALE || phase === Phase.HOLD1 ? "#60a5fa" : "#34d399";
    switch (phase) {
        case Phase.INHALE:
            scale = 1.3;
            break;
        case Phase.HOLD1:
            scale = 1.3;
            break;
        case Phase.EXHALE:
            scale = 1;
            break;
        case Phase.HOLD2:
            scale = 1;
            break;
    }
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
