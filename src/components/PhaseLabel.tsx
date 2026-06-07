import Phase from "../models/Breathings.ts";

const phaseMap = {
    START:"开始",
    INHALE: "吸气",
    HOLD1: "屏息",
    EXHALE: "呼气",
    HOLD2: "屏息",
};

export function PhaseLabel({ phase }: { phase: Phase }) {
    return <h1> {phaseMap[phase]} </h1>;
}
