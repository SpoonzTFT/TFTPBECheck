const fetch = require("node-fetch");

const API_KEY = process.env.PUSHCUT_API_KEY;

(async () => {
  const res = await fetch("https://api.pushcut.io/v1/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "API-Key": API_KEY,
    },
    body: JSON.stringify({
      title: "Pushcut Test Notification",
      text: "If you see this, your API key is working!",
      actions: [
        {
          title: "Test Action",
          url: "https://example.com"
        }
      ]
    }),
  });

  const result = await res.text();
  console.log("Pushcut response:", result);
})();
