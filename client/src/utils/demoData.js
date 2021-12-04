export const demoSequence = {
  default: {
    id: "default",
    triggers: [
      "betting allin",
      "stop"
    ],
    title: "Waiting for Dealer",
    description: "Starting soon",
  },
  betting: {
    id: "betting",
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
    id: "playeractions",
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
    id: "start",
    type: "button",
    title: "Start"
  },
  stop: {
    id: "stop",
    type: "button",
    title: "Stop"
  },
}

export const demoServerUnitTime = Date.now() + (Math.floor(Math.random() * (1200000 - 0 + 1) - 600000))

export const demoServerEvents = [{
  eventId: "start",
  time: Date.now() - 1000
}]
