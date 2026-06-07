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
        scale: getScale(state.phase),
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
    }
}

function getScale(phase: Phase) {
    switch (phase) {
        case Phase.INHALE:
        case Phase.HOLD1:
            return 1.3;
        case Phase.EXHALE:
        case Phase.HOLD2:
            return 1;
        default:
            return 1.15;
    }
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
