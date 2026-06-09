import { useEffect, useRef, useState } from "react";

import { BreathingEngine } from "../services/BreathingEngine";
import { deriveState } from "../services/deriveUIState";

import {
    type BreathState,
    // Phase,
} from "../models/Breathings";

import { type BreathPattern } from "../models/Breathings";
import { BOX_BREATHING } from "../models/Patterns";
import type { BreathUIState } from "../models/BreathUIState";

export function useBreathing() {
    const engineRef = useRef<BreathingEngine | null>(null);
    if (!engineRef.current) {
        engineRef.current = new BreathingEngine(BOX_BREATHING);
    }
    const engine = engineRef.current;

    const [pattern, setPattern] = useState(BOX_BREATHING);

    const [state, setState] = useState<BreathState>(engine.getState());

    // const [uiState, setUIState] = useState<BreathUIState>(() =>
    //     deriveState(engine.getState(), pattern),
    // );
    const uiState = deriveState(state, pattern);

    useEffect(() => {
        const unsubscribe = engine.subscribe((newState) => {
            setState(newState);
            // setUIState(deriveState(newState, newpattern));
        });
        return () => {
            unsubscribe();
        };
    }, [engine]);

    const changePattern = (pattern: BreathPattern) => {
        // console.log("change pattern:", pattern.name);
        // engine.updatePattern(pattern);
        engineRef.current?.stop();
        engineRef.current?.updatePattern(pattern);
        // me:告诉UI
        setPattern(pattern);
        // setUIState(deriveState(newState, pattern));
    };

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
        engine.stop();
    };
    return {
        state,
        uiState,
        pattern,

        start,
        pause,
        resume,
        stop,

        changePattern,
    };
}
