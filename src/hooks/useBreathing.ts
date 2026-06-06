import { useEffect,useRef, useState } from "react";

import { BreathingEngine } from "../services/BreathingEngine";

import {
    type BreathState,
    // Phase,
} from "../models/Breathings"

import {type BreathPattern } from "../models/Breathings";
import { BOX_BREATHING } from "../models/Patterns";


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

     const [pattern, setPattern] = 
         useState(BOX_BREATHING);

     useEffect(() => {
         const unsubscribe = engine.subscribe((newState) => {
             setState(newState);
         });
         return () => {
             unsubscribe();
         };
     }, [engine]);

    const changePattern = (
        pattern: BreathPattern
    ) => {
        console.log('change pattern:', pattern.name)
        // engine.updatePattern(pattern);
        engineRef.current?.updatePattern(pattern);

        setPattern(pattern);
    }

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
        pattern,

        start,
        pause,
        resume,
        stop,

        changePattern,
    };

}
