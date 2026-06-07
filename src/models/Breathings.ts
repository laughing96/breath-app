export enum Phase {
    START = "START",
    INHALE = "INHALE",
    HOLD1 = "HOLD1",
    EXHALE = "EXHALE",
    HOLD2 = "HOLD2",
}
export default Phase;

export interface BreathPattern {
    name: string;
    inhale: number;
    hold1: number;
    exhale: number;
    hold2: number;
}

export interface BreathState {
    phase: Phase;
    remaining: number;
    cycle: number;
    running: boolean;
}

export type StateListener = (state: BreathState) => void;
