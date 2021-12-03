Devember 2021 submittion, treepoll

# First iteration of objectives

A tool for community managers or steamers to create interactive polling to get fast feedback from a community
This will be a hosted service that is intended to be used as in the following scenario:
Imaging you are a steamer that is doing a live event of something non-digital, example a poker (texas hold em) game.
You want the players to be you, other players and your viewers,
Most games follow a predictable pattern or trigger points.
Before your steam the application can be configured with the needed sequences and triggers.
The service has no intention to store user data and so should work without needing an account.
As the steamer you would go to the service, hosted or self hosted and start a new session.
A random ID will be created that is accessable by URL. As the creater you'll also create a password.
Start configuring at treepoll.tech/rngid/admin , enter the password

Texas hold'em follows a set sequence of events, the configuration maybe something like:
Represented in JSON, however should be configured via a UI. Could be exported/imported as JSON or YAML.
{
  betting: {
    type: "poll",
    triggers: ["playeractions raise"],
    title: "Betting",
    description: "Place your bets now"
    time: 15,
    options: ["5", "8", "13", "21", "34", "55", "89", "All-in"]
  },
  playeractions: {
    type: "poll",
    triggers: ["start"],
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
  end: {
    type: "event",
    triggers: ["stop", "betting all-in"],
    action: "end"
  }
}
