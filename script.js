
"use strict";

// ======================================
// 1. HERO BUTTON - SCROLL TO MEMORIES
// ======================================

const startBtn = document.getElementById("startBtn");

if (startBtn) {
  startBtn.addEventListener("click", () => {
    document.getElementById("memories").scrollIntoView({
      behavior: "smooth"
    });
  });
}


// ======================================
// 2. FUNNY QUESTIONS - ALL QUESTIONS
// ======================================

// Every question has its own answer message.
// Selecting an option updates only that question.

document.querySelectorAll(".question-card").forEach((card) => {

  const buttons = card.querySelectorAll(".answer-btn");
  const message = card.querySelector(".answer-message");

  buttons.forEach((button) => {

    button.addEventListener("click", () => {

      if (!message) return;

      // Show the selected answer below its own question
      message.textContent =
        button.dataset.message || "That's a lovely choice! 💗";

      // Restart the animation
      message.classList.remove("show");
      void message.offsetWidth;
      message.classList.add("show");

      // Highlight the selected option
      buttons.forEach((item) => {
        item.classList.remove("selected");
        item.setAttribute("aria-pressed", "false");
      });

      button.classList.add("selected");
      button.setAttribute("aria-pressed", "true");

    });

  });

});


// ======================================
// 3. FLOATING HEARTS
// ======================================

const floatingBackground =
  document.getElementById("floatingBackground");

function createFloatingHeart() {

  if (!floatingBackground) return;

  const heart = document.createElement("span");

  heart.className = "float-heart";

  heart.textContent =
    Math.random() > 0.5 ? "♡" : "♥";

  heart.style.left = `${Math.random() * 100}%`;

  heart.style.fontSize =
    `${12 + Math.random() * 17}px`;

  heart.style.animationDuration =
    `${8 + Math.random() * 7}s`;

  floatingBackground.appendChild(heart);

  window.setTimeout(() => {
    heart.remove();
  }, 16000);
}

// Initial floating hearts
for (let i = 0; i < 12; i++) {
  window.setTimeout(createFloatingHeart, i * 350);
}

// Continuously create new hearts
window.setInterval(createFloatingHeart, 1100);


// ======================================
// 4. HAPPY BIRTHDAY BACKGROUND MUSIC
// ======================================

let audioContext = null;
let musicTimer = null;
let noteIndex = 0;
let musicPlaying = false;

const musicBtn = document.getElementById("musicBtn");

// Happy Birthday melody (frequency in Hz, duration in seconds)
const melody = [
  [392.00, 0.35], [392.00, 0.35], [440.00, 0.7],
  [392.00, 0.7], [523.25, 0.7], [493.88, 1.0],

  [392.00, 0.35], [392.00, 0.35], [440.00, 0.7],
  [392.00, 0.7], [587.33, 0.7], [523.25, 1.0],

  [392.00, 0.35], [392.00, 0.35], [783.99, 0.7],
  [659.25, 0.7], [523.25, 0.7], [493.88, 0.7],
  [440.00, 1.0],

  [698.46, 0.35], [698.46, 0.35], [659.25, 0.7],
  [523.25, 0.7], [587.33, 0.7], [523.25, 1.0]
];

function playNote(frequency, duration) {
  if (!audioContext || audioContext.state !== "running") return;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.08,
    audioContext.currentTime + 0.04
  );
  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    audioContext.currentTime + duration
  );

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration + 0.05);
}

function playNextNote() {
  if (!musicPlaying) return;

  const [frequency, duration] = melody[noteIndex];

  playNote(frequency, duration);

  noteIndex = (noteIndex + 1) % melody.length;

  musicTimer = window.setTimeout(
    playNextNote,
    duration * 1000 + 100
  );
}

async function startMusic() {
  const AudioContextClass =
    window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) return;

  try {
    if (!audioContext) {
      audioContext = new AudioContextClass();
    }

    await audioContext.resume();

    if (musicPlaying) return;

    musicPlaying = true;
    noteIndex = 0;

    if (musicBtn) {
      musicBtn.textContent = "♫ Pause Music";
      musicBtn.setAttribute("aria-pressed", "true");
    }

    playNextNote();

  } catch (error) {
    console.warn("Music could not start:", error);
  }
}

async function stopMusic() {
  musicPlaying = false;
  window.clearTimeout(musicTimer);
  musicTimer = null;

  if (audioContext && audioContext.state === "running") {
    await audioContext.suspend();
  }

  if (musicBtn) {
    musicBtn.textContent = "♫ Play Music";
    musicBtn.setAttribute("aria-pressed", "false");
  }
}

// Music button
if (musicBtn) {
  musicBtn.addEventListener("click", () => {
    if (musicPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  });
}

// Try automatic playback when the website opens
window.addEventListener("load", () => {
  startMusic();
});


// ======================================
// 5. CONFETTI EFFECT
// ======================================

function launchConfetti() {

  const symbols = [
    "💗",
    "✨",
    "🌸",
    "🎀",
    "💕"
  ];

  for (let i = 0; i < 34; i++) {

    const piece = document.createElement("span");

    piece.className = "float-heart";

    piece.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    piece.style.left = `${Math.random() * 100}%`;

    piece.style.bottom =
      `${10 + Math.random() * 30}px`;

    piece.style.fontSize =
      `${14 + Math.random() * 18}px`;

    piece.style.animationDuration =
      `${3 + Math.random() * 3}s`;

    if (floatingBackground) {
      floatingBackground.appendChild(piece);
    }

    window.setTimeout(() => {
      piece.remove();
    }, 6500);

  }

}


// ======================================
// 6. FINAL GIFT AND LETTER REVEAL
// ======================================

const surpriseOpen =
  document.getElementById("surpriseOpen");

const birthdayReveal =
  document.getElementById("birthdayReveal");

if (surpriseOpen && birthdayReveal) {

  surpriseOpen.addEventListener("click", () => {

    // Reveal final birthday letter
    birthdayReveal.classList.add("show");

    // Update button
    surpriseOpen.textContent = "Surprise Opened 💗";

    surpriseOpen.disabled = true;

    surpriseOpen.setAttribute("aria-expanded", "true");

    // Trigger celebration
    launchConfetti();

    // Scroll to the revealed letter
    birthdayReveal.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  });

}
