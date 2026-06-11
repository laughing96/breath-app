import { useEffect, useRef, useState } from "react";

import { BreathingEngine } from "../services/BreathingEngine";
import { deriveState } from "../services/deriveUIState";
import type { SessionConfig } from "../models/SessionConfig"

import {
    type BreathState,
    // Phase,
} from "../models/Breathings";

import { type BreathPattern } from "../models/Breathings";
import { BOX_BREATHING } from "../models/Patterns";
// import { MySession } from "../models/SessionConfig";
// import type { BreathUIState } from "../models/BreathUIState";

export function useBreathing() {
    const engineRef = useRef<BreathingEngine | null>(null);
    if (!engineRef.current) {
        engineRef.current = new BreathingEngine(BOX_BREATHING);
    }
    const engine = engineRef.current;

    const [pattern, setPattern] = useState(BOX_BREATHING);

    const [state, setState] = useState<BreathState>(engine.getState());

    const [session, setSession] = useState<SessionConfig>(engine.getSession())

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


    const [saved, setSaved] = useState(false)


    const changePattern = (pattern: BreathPattern, session: SessionConfig) => {
        // console.log("change pattern:", pattern.name);
        // engine.updatePattern(pattern);
        engineRef.current?.stop();
        engineRef.current?.updatePattern(pattern);
        engineRef.current?.updateSession(session);
        // me:告诉UI
        setPattern(pattern);
        setSession(session);
        setSaved(true);
        console.log(`apply ${session}`);
        // setUIState(deriveState(newState, pattern));
    };

    // const get_session = () => {
    //     engine.getSession();
    // };

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
        session,
        saved,

        start,
        pause,
        resume,
        stop,

        changePattern,
    };
}
