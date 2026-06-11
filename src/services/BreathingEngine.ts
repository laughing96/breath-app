import Phase, {
    type BreathPattern,
    type BreathState,
} from "../models/Breathings";
import { type SessionConfig, MySession } from "../models/SessionConfig";
import { EventEmitter } from "../utils/EventEmitter";

export class BreathingEngine extends EventEmitter<BreathState> {
    private pattern: BreathPattern;
    private timer: number | null = null;
    private state: BreathState;
    private session: SessionConfig;

    constructor(pattern: BreathPattern) {
        //  初始化 对象 赋值
        super();
        this.pattern = pattern;
        this.session = MySession;
        this.state = {
            phase: Phase.START,
            remaining: pattern.inhale,
            cycle: 0,
            running: false,
        };
    }

    private tick() {
        // this.state.remaining--;
        this.state = {
            ...this.state,
            remaining: this.state.remaining - 1,
        };
        // console.log(this.state);

        if (this.state.remaining <= 0) {
            this.moveToNextPhase();
        }

        this.emit(this.state);
    }

    updatePattern(pattern: BreathPattern) {
        this.pattern = pattern;
    }

    updateSession(session: SessionConfig) {
        // console.log(`update session ${session.maxCycles}`);
        this.session = session;
    }

    start() {
        this.state = {
            phase: Phase.INHALE,
            remaining: this.pattern.inhale,
            cycle: 0,
            running: true,
        };
        this.emit(this.state);
        // 每隔1000ms执行一次箭头函数
        // window 明确表明 setInterval 是浏览器API
        // 浏览器 的 setInterval 返回number, node.js 里面返回 NodeJS.Timeout
        // console.log(this.state);
        this.timer = window.setInterval(() => this.tick(), 1000);
    }
    pause() {
        this.state = {
            phase: this.state.phase,
            remaining: this.state.remaining,
            cycle: this.state.cycle,
            running: false,
        };
        if (this.timer !== null) {
            // 浏览器 和 Node 都有有这个函数
            clearInterval(this.timer);
            this.timer = null;
        }
        this.emit(this.state);
    }

    resume() {
        this.state = {
            phase: this.state.phase,
            remaining: this.state.remaining,
            cycle: this.state.cycle,
            running: true,
        };
        this.emit(this.state);
        this.timer = window.setInterval(() => this.tick(), 1000);
    }
    stop() {
        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.state = {
            phase: Phase.INHALE,
            remaining: 0,
            cycle: 0,
            running: false,
        };

        this.emit(this.state);
    }

    getState(): BreathState {
        return this.state;
    }

    getSession(): SessionConfig {
        return this.session;
    }
    private moveToNextPhase() {
        switch (this.state.phase) {
            case Phase.START:
                this.state.phase = Phase.INHALE;
                break;
            case Phase.INHALE:
                this.state.phase = Phase.HOLD1;
                break;
            case Phase.HOLD1:
                this.state.phase = Phase.EXHALE;
                break;
            case Phase.EXHALE:
                this.state.phase = Phase.HOLD2;
                break;
            case Phase.HOLD2:
                this.state.phase = Phase.INHALE;
                this.state.cycle++;
                break;
        }
        this.state.remaining = this.durationOf(this.state.phase);
        // console.log(`state ${this.state.cycle} max ${this.session.maxCycles}`)
        if (this.state.cycle >= this.session.maxCycles) {
            console.log('cycle');
            this.stop();
        }

        if (this.state.phase === Phase.INHALE) {
            const pattern_all_time =
                this.pattern.exhale +
                this.pattern.inhale +
                this.pattern.hold1 +
                this.pattern.hold2;
            // 最大时间按分钟
            const pass_time = pattern_all_time * this.state.cycle / 60;

            if (pass_time > this.session.maxTimeMin) {
                console.log(`phase ${this.state.phase} ${pass_time}`);
                this.stop();
            }
        }
    }

    private durationOf(phase: Phase): number {
        // console.log("durationof", this.pattern);
        switch (phase) {
            case Phase.INHALE:
                return this.pattern.inhale;
            case Phase.HOLD1:
                return this.pattern.hold1;
            case Phase.EXHALE:
                return this.pattern.exhale;
            case Phase.HOLD2:
                return this.pattern.hold2;
            default:
                return 0;
        }
    }
}
