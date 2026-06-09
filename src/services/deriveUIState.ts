import Phase, { type BreathPattern, type BreathState } from "../models/Breathings";
import type { BreathUIState } from "../models/BreathUIState";

export function deriveState(
    state: BreathState,
    pattern: BreathPattern,
): BreathUIState {

    return {
        running:state.running,
        phase: state.phase,
        remaining: state.remaining,
        cycle: state.cycle,
        label: mapPhase(state.phase),
        progress: state.remaining / getDuration(pattern, state.phase),
        scale: getScale(state.phase, state.remaining),
        color: getColor(state.phase),
        all_dura: getDuration(pattern, state.phase),
    };
}

function mapPhase(phase: Phase) {
    switch (phase) {
        case Phase.INHALE:
            return "吸气";
        case Phase.EXHALE:
            return "呼气";
        case Phase.HOLD1:
        case Phase.HOLD2:
            return "屏息";
        default:
            return "未定义";
    }
}

function getDuration(pattern:BreathPattern, phase:Phase) {
    switch (phase){
        case Phase.INHALE:
            return pattern.inhale;
        case Phase.EXHALE:
            return pattern.exhale;
        case Phase.HOLD1:
            return pattern.hold1;
        case Phase.HOLD2:
            return pattern.hold2;
        default:
            return 4;
    }
}

function getScale(phase: Phase, remaining: number) {
    if (phase === Phase.INHALE) {
        return remaining > 0 ? 1.3 : 1;
    }

    if (phase === Phase.HOLD1) {
        return 1.3;
    }

    return 1;
}


function getColor(phase: Phase){
    switch (phase) {
        case Phase.INHALE:
        case Phase.HOLD1:
            return "#60a5fa";
        default:
            return "#34d399";
    }
}
