export const demoSequence = {
  betting: {
    type: "poll",
    triggers: [
      "playeractions raise"
    ],
    title: "Betting",
    description: "Place your bets now",
    time: 15,
    options: {
      five: "5",
      eight: "8",
      thirteen: "13",
      twentyOne: "21",
      thirtyFour: "34",
      fiftyfive: "55",
      eightynine: "89",
      allIn: "All-in"
    }
  },
  playeractions: {
    type: "poll",
    triggers: [
      "start"
    ],
    title: "Player Actions",
    description: "What do?",
    time: 20,
    options: {
      check: "Check",
      raise: "Raise",
      fold: "Fold"
    }
  },
  start: {
    type: "button",
    title: "Start"
  },
  stop: {
    type: "button",
    title: "Stop"
  },
  end: {
    type: "event",
    triggers: [
      "stop",
      "betting all-in"
    ],
    action: "exit"
  }
}

export const demoServerUnitTime = Date.now() + (Math.floor(Math.random() * (1200000 - 0 + 1) - 600000))
