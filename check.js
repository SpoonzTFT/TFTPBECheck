const fetch = require("node-fetch");

const API_KEY = process.env.PUSHCUT_API_KEY;
const PUSHCUT_NOTIFICATION_NAME = "TFT_PBE_Alert";

(async () => {
  try {
    console.log("Sending test notification...");

    const notify = await fetch(`https://api.pushcut.io/v1/notification/${PUSHCUT_NOTIFICATION_NAME}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-Key": API_KEY,
      },
    });

    const result = await notify.text();
    console.log("Pushcut response:", result);
  } catch (err) {
    console.error("Error sending Pushcut notification:", err);
  }
})();
