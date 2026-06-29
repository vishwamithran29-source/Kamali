// Utility shortcuts
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ✨ Cursor glow
const glow = $('.cursor-glow');
document.addEventListener('mousemove', (event) => {
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

// 🎵 Music toggle
const musicBtn = $('#musicBtn');
const music = $('#bg-music');
music?.pause();

function fadeIn(audio, duration = 3000) {
  audio.volume = 0;
  audio.play();
  const step = 0.05;
  const interval = setInterval(() => {
    if (audio.volume < 1) {
      audio.volume = Math.min(1, audio.volume + step);
    } else {
      clearInterval(interval);
    }
  }, duration / (1 / step));
}

// Toggle play/pause with symbols (♫ → 🔊)
musicBtn?.addEventListener('click', () => {
  if (music.paused) {
    fadeIn(music, 3000); // smooth fade‑in
    musicBtn.textContent = '🔊'; // speaker when playing
  } else {
    music.pause();
    musicBtn.textContent = '♫'; // back to music note when paused
  }
});

// 🎉 Auto‑recurring countdown (July 4, 12:00 noon every year)
function getNextBirthday() {
  const now = new Date();
  let year = now.getFullYear();
  let target = new Date(year, 6, 4, 0, 0, 0); // July = 6 (0‑based)

  if (now.getTime() > target.getTime()) {
    target = new Date(year + 1, 6, 4, 0, 0, 0);
  }
  return target.getTime();
}

let targetDate = getNextBirthday();

function updateCountdown() {
  const countdown = $('#countdown');
  if (!countdown) return;

  const now = Date.now();
  const distance = targetDate - now;

  if (distance > 0) {
    const days = Math.floor(distance / 86400000);
    const hours = Math.floor((distance % 86400000) / 3600000);
    const mins = Math.floor((distance % 3600000) / 60000);
    const secs = Math.floor((distance % 60000) / 1000);

    $('#days').textContent = String(days).padStart(2, '0');
    $('#hours').textContent = String(hours).padStart(2, '0');
    $('#mins').textContent = String(mins).padStart(2, '0');
    $('#secs').textContent = String(secs).padStart(2, '0');
  } else {
    targetDate = getNextBirthday(); // reset to next year
  }
}
setInterval(updateCountdown, 1000);
updateCountdown();



// 💌 Letter page
const envelope = $('#envelope');
const letterText = `you are one of those rare people who make the world feel gentler just by being in it...
Happy Birthday Babuuuuuuuuuuu 💖 You are special in ways you may never fully realize.`;
let hasTypedLetter = false;

envelope?.addEventListener('click', () => {
  envelope.classList.add('open');
  if (hasTypedLetter) return;
  hasTypedLetter = true;

  let i = 0;
  const typedLetter = $('#typedLetter');
  const typing = setInterval(() => {
    typedLetter.textContent += letterText[i] || '';
    i++;
    if (i > letterText.length) clearInterval(typing);
  }, 35);
});

// 🎂 Cake page
const cake = $('#birthdayCake') || $('.cake');
const cutCakeBtn = $('.cut-cake-btn');
const cakeStageText = $('#cakeStageText');
let cakeAnimationStarted = false;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

cutCakeBtn?.addEventListener('click', async () => {
  if (!cake || cakeAnimationStarted) return;
  cakeAnimationStarted = true;
  cutCakeBtn.disabled = true;

  cakeStageText.textContent = 'blowing the candles... 🌬️';
  cutCakeBtn.textContent = 'Blowing Candles...';
  cake.classList.add('blow');
  await wait(1500);

  cakeStageText.textContent = 'cake is cutting 🔪';
  cutCakeBtn.textContent = '';
  cake.classList.add('knife-in');
  await wait(1200);

  cakeStageText.textContent = 'into a slice... 🍰';
  cutCakeBtn.textContent = 'Cutting Slice...';
  cake.classList.add('sliced');
  await wait(900);

  cakeStageText.textContent = 'First slice for you Thangowww😘🎉';
  cutCakeBtn.textContent = 'Cake Cut 🎉';

  if (typeof confetti === 'function') {
    confetti({ particleCount: 280, spread: 115, origin: { y: 0.62 } });
  }
});
