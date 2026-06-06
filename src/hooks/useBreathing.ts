import { useEffect,useRef, useState } from "react";

import { BreathingEngine } from "../services/BreathingEngine";

import {
    type BreathState,
    Phase,
} from "../models/Breathings"


const DEFAUKT_PATTERN = {
    name: "Box",
    inhale :4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
};

export function useBreathing() {
    const engineRef = useRef<BreathingEngine | null>(null);
    if (!engineRef.current) {
        engineRef.current = new BreathingEngine(DEFAUKT_PATTERN);
    }
     const engine = engineRef.current;

     const [state ,setState] = 
         useState<BreathState>(
             engine.getState()
     );

     useEffect(() => {
         const unsubscribe = engine.subscribe((newState) => {
             setState(newState);
         });
         return () => {
             unsubscribe();
         };
     }, [engine]);

    const start = () => {
        engine.start();
    };
    const pause = () => {
        engine.pause();
    };
    const resume = () => {
        engine.resume();
    };
    const stop = () => {
        engine.stop()
    };
    return {
        state,
        start,
        pause,
        resume,
        stop,
    };

}
