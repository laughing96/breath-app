import type Phase from "./Breathings";

export type BreathUIState = {
    running: boolean,
    phase: Phase,
    label: string,
    remaining: number,
    progress:number,
    scale: number,
    cycle:number,
    color:string,
    all_dura:number,
};
