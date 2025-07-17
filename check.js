const fetch = require("node-fetch");

const API_KEY = process.env.PUSHCUT_API_KEY;
const TESTFLIGHT_URL = "https://testflight.apple.com/join/q79npPHz";

// Replace with your actual Pushcut notification ID (just the UUID part)
const PUSHCUT_NOTIFICATION_ID = "TFT_PBE_Alert";

(async () => {
  try {
    // Fetch the TestFlight page HTML
    const res = await fetch(TESTFLIGHT_URL);
    const text = await res.text();

    // Check if the page includes "This beta is full"
    const isFull = text.includes("This beta is full");

    if (!isFull) {
      console.log("Slot might be open — sending notification!");

      // Send Pushcut notification
      const notify = await fetch(`https://api.pushcut.io/v1/notifications/${PUSHCUT_NOTIFICATION_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "API-Key": API_KEY,
        },
      });

      const result = await notify.text();
      console.log("Pushcut response:", result);
    } else {
      console.log("TestFlight is still full.");
    }
  } catch (err) {
    console.error("Error checking TestFlight or sending Pushcut notification:", err);
  }
})();
