import { BreathingEngine  } from "./services/BreathingEngine";

const engine = new BreathingEngine({
    name: "Box",
    inhale: 4,
    hold1: 4,
    exhale:4,
    hold2:4,
});

// engine.subscribe((state) => {
//     // console.clear();
//
//     console.log(
//         state.phase,
//         state.remaining,
//         "cycle:",
//         state.cycle
//     );
// });
//
// engine.start();
//
// setTimeout(() => {
//   console.log("===== PAUSE =====");
//   engine.pause();
// }, 5000);
//
// setTimeout(() => {
//   console.log("===== RESUME =====");
//   engine.resume();
// }, 10000);
engine.subscribe(console.log);
engine.start();
(window as any).engine = engine;

