export const demoSequence = {
  default: {
    key: "default",
    triggers: [
      "betting allIn",
      "stop"
    ],
    title: "Waiting for Dealer",
    description: "Starting soon",
  },
  betting: {
    key: "betting",
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
    key: "playeractions",
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
    key: "start",
    type: "button",
    title: "Start"
  },
  stop: {
    key: "stop",
    type: "button",
    title: "Stop"
  },
}

export const demoServerUnitTime = Date.now() + (Math.floor(Math.random() * (1200000 - 0 + 1) - 600000))

let demoEventList = [{
  eventId: "start",
  time: Date.now() - 1000
}]
export function demoServerEvents(eventToAdd) {
  if (eventToAdd) {
    demoEventList = [{ eventId: eventToAdd, time: Date.now() }, ...demoEventList]
  }
  return demoEventList
}
