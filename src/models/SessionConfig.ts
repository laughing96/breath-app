export interface SessionConfig {
  maxCycles: number;

  maxTimeMin: number;

  autoStart: boolean;
}

export const MySession : SessionConfig = {
    maxCycles : 5,
    maxTimeMin : 5,
    autoStart: false,
}
