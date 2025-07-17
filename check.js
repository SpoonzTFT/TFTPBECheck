const fetch = require("node-fetch");

const API_KEY = process.env.PUSHCUT_API_KEY;
const TESTFLIGHT_URL = "https://example.com"; // fake URL for test

(async () => {
  // Force trigger notification
  const isFull = false;

  if (!isFull) {
    console.log("Simulated open slot — sending notification");

    await fetch("https://api.pushcut.io/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-Key": API_KEY,
      },
      body: JSON.stringify({
        title: "TFT PBE Slot Open!",
        text: "Click to join the TestFlight now.",
        actions: [
          {
            title: "Join Now",
            url: TESTFLIGHT_URL
          }
        ]
      }),
    });
  } else {
    console.log("Still full. Will check again soon.");
  }
})();
