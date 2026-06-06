import {
    type BreathPattern,
    type BreathState,
    Phase,
    type StateListener,
} from "../models/Breathings";

export class BreathingEngine {
    private pattern: BreathPattern;
    private phase: Phase = Phase.INHALE;
    private remaining = 0;
    private cycle = 0;
    private running = false;
    private timer: number | null = null;
    private listeners: StateListener[] = [];
    constructor(pattern: BreathPattern) {
        this.pattern = pattern;
    }

    updatePattern(
        pattern: BreathPattern
    ){
        this.pattern = pattern;
        // this.stop();
        console.log("pattern is ",this.pattern.name);
        console.log("pattern is", this.pattern);
        // this.start();
    }

    // why
    subscribe(listener: StateListener) {
        this.listeners.push(listener);

        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    start() {
        if (this.running) {
            return;
        }
        this.phase = Phase.INHALE;
        this.remaining = this.pattern.inhale;
        this.cycle = 1;
        this.running = true;
        this.emit();

        this.timer = window.setInterval(() => this.tick(), 1000);
    }
    pause() {
        if (!this.running) {
            return;
        }
        this.running = false;
        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.emit();
    }

    resume() {
        if (this.running) {
            return;
        }
        this.running = true;
        this.emit();
        this.timer = window.setInterval(() => this.tick(), 1000);
    }
    stop() {
        this.running = false;
        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.phase = Phase.INHALE;
        this.remaining = 0;
        this.cycle = 0;

        this.emit();
    }

    getState(): BreathState {
        return {
            phase: this.phase,
            remaining: this.remaining,
            cycle: this.cycle,
            running: this.running,
        };
    }
    private tick() {
        if (!this.running) {
            return;
        }
        this.remaining--;
        if (this.remaining <= 0) {
            this.moveToNextPhase();
        }
        this.emit();
    }

    private moveToNextPhase() {
        switch (this.phase) {
            case Phase.INHALE:
                this.phase = Phase.HOLD1;
                break;
            case Phase.HOLD1:
                this.phase = Phase.EXHALE;
                break;
            case Phase.EXHALE:
                this.phase = Phase.HOLD2;
                break;
            case Phase.HOLD2:
                this.phase = Phase.INHALE;
                this.cycle++;
                break;
        }
        this.remaining = this.durationOf(this.phase);
    }

    private durationOf(
        phase: Phase
    ): number {
        console.log("durationof",this.pattern);
        switch (phase) {
            case Phase.INHALE:
                return this.pattern.inhale;
            case Phase.HOLD1:
                return this.pattern.hold1;
            case Phase.EXHALE:
                return this.pattern.exhale;
            case Phase.HOLD2:
                return this.pattern.hold2;
        }
    }

    private emit() {
        const state = this.getState();
        this.listeners.forEach((listener) =>
            listener(state));
    }
}
