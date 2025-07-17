const fetch = require("node-fetch");

const API_KEY = process.env.PUSHCUT_API_KEY;
const TESTFLIGHT_URL = "https://testflight.apple.com/join/q79npPHz";
const PUSHCUT_NOTIFICATION_NAME = "TFT_PBE_Alert"; // must match what you named it in the app

(async () => {
  try {
    const res = await fetch(TESTFLIGHT_URL);
    const text = await res.text();

    const isFull = text.includes("This beta is full");
    console.log(isFull ? "TestFlight is still full." : "Slot might be open — sending notification!");

    if (!isFull) {
      const notify = await fetch(`https://api.pushcut.io/v1/notification/${PUSHCUT_NOTIFICATION_NAME}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "API-Key": API_KEY,
        },
      });

      const result = await notify.text();
      console.log("Pushcut response:", result);
    }
  } catch (err) {
    console.error("Error checking TestFlight or sending Pushcut notification:", err);
  }
})();
