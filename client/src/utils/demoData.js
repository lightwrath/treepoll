export const demoSequence = {
  default: {
    triggers: [
      "betting All-in",
      "stop"
    ],
    title: "Waiting for Dealer",
    description: "Starting soon",
  },
  betting: {
    type: "poll",
    triggers: [
      "playeractions Raise"
    ],
    title: "Betting",
    description: "Place your bets now",
    time: 15,
    options: ["5", "8", "13", "21", "34", "55", "89", "All-in"],
  },
  playeractions: {
    type: "poll",
    triggers: [
      "start"
    ],
    title: "Player Actions",
    description: "What do?",
    time: 20,
    options: ["Check", "Raise", "Fold"]
  },
  start: {
    type: "button",
    title: "Start"
  },
  stop: {
    type: "button",
    title: "Stop"
  },
}

export const demoServerUnitTime = Date.now() + (Math.floor(Math.random() * (6000 - 0 + 1) - 3000))

let demoSignalList = [{
  eventId: "start",
  time: Date.now() - 1000
}]
export function demoServerSignals(signalToAdd) {
  if (signalToAdd) {
    demoSignalList = [
      {
        eventId: signalToAdd,
        details: {
          [signalToAdd]: 1024,
          "Other Option": 512,
          "Less Popular Option": 256,
          "Undecided": 128
        },
        time: Date.now()
      },
      ...demoSignalList
    ]
  }
  return demoSignalList
}
