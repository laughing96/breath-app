import { useEffect, useRef, useState } from "react";

import { BreathingEngine } from "../services/BreathingEngine";
import { deriveState } from "../services/deriveUIState";
import type { SessionConfig } from "../models/SessionConfig";

import {
    type BreathState,
    // Phase,
} from "../models/Breathings";

import { type BreathPattern } from "../models/Breathings";
import { Resonance } from "../models/Patterns";
import { StatisticsService } from "../services/StatisticsService";
import type { Statistics } from "../models/Statistics";
// import { MySession } from "../models/SessionConfig";
// import type { BreathUIState } from "../models/BreathUIState";

export function useBreathing() {
    const engineRef = useRef<BreathingEngine | null>(null);
    if (!engineRef.current) {
        engineRef.current = new BreathingEngine(Resonance);
    }
    const engine = engineRef.current;

    const [pattern, setPattern] = useState(Resonance);

    const [state, setState] = useState<BreathState>(engine.getState());

    const [session, setSession] = useState<SessionConfig>(engine.getSession());
    const [statistic, setStatistic] = useState<Statistics>(engine.getStatics());

    // const [uiState, setUIState] = useState<BreathUIState>(() =>
    //     deriveState(engine.getState(), pattern),
    // );
    const uiState = deriveState(state, pattern);

    useEffect(() => {
        const unsubscribe = engine.subsscribeState((newState) => {
            setState(newState);
            // setUIState(deriveState(newState, newpattern));
        });

        const unsubscribeSessionComplete = engine.subscribeSessionComplete(
            (event) => {
                const updated = StatisticsService.recordSession(event.cycles, event.minutes);
                setStatistic(updated);
            },
        );
        return () => {
            unsubscribe();
            unsubscribeSessionComplete();
        };
    }, [engine]);

    const [saved, setSaved] = useState(false);

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
        statistic,

        start,
        pause,
        resume,
        stop,

        changePattern,
    };
}
