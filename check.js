// check.js
const fetch = require('node-fetch');
const Pushcut = require('pushcut');

const TESTFLIGHT_URL = process.env.TESTFLIGHT_URL;
const API_KEY = process.env.PUSHCUT_API_KEY;
const pushcut = new Pushcut(API_KEY);
const JOIN_URL = TESTFLIGHT_URL;

async function check() {
  const res = await fetch(TESTFLIGHT_URL);
  const html = await res.text();
  if (!/This beta (is full|isn’t accepting|is closed)/i.test(html)) {
    await pushcut.notify({
      title: '🎯 TFT PBE is OPEN!',
      text: 'Tap to join now',
      actions: [{ title: 'Join Now' }],
    });
    console.log('OPEN detected — notification sent.');
  } else {
    console.log('Still full or closed.');
  }
}

check().catch(console.error);
