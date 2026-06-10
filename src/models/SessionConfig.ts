export interface SessionConfig {
  maxCycles: number;

  maxDuration: number;

  autoStart: boolean;
}

export const MySession : SessionConfig = {
    maxCycles : 5,
    maxDuration : 5,
    autoStart: false,
}
