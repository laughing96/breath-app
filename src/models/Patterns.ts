import { type BreathPattern } from "./Breathings";

export const BOX_BREATHING: BreathPattern = {
    name: "Box",
    inhale: 4,
    hold1: 4,
    exhale:4,
    hold2:4,
};

export const RELAX_BREATHING: BreathPattern = {
    name: "Relax",
    inhale: 4,
    hold1:2,
    exhale:6,
    hold2:2,
}


export const PATTERN_478: BreathPattern = {
  name: "4-7-8",
  inhale: 4,
  hold1: 7,
  exhale: 8,
  hold2: 0,
};

export const PATTERNS = [
  BOX_BREATHING,
  RELAX_BREATHING,
  PATTERN_478,
];
