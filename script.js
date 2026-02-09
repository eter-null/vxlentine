/* ═══════════════════════════════════════
   ~*~ neocities valentine script ~*~
   ═══════════════════════════════════════ */

let noDodgeCount = 0;
let musicPlaying = false;
let proximityLoop = null;
let lastMousePos = { x: -9999, y: -9999 };

const noTexts = [
    "no",
    "u sure??",
    "really??",
    "pls reconsider",
    "think again!!",
    "u cant click me",
    "im too fast 4 u",
    "hehe try again",
    "nope nope nope",
    "getting dizzy yet?",
    "just give up lol",
    "ok fine... YES!!"
];

const hintTexts = [
    "( the no button is scared of u... )",
    "( it RAN away omg )",
    "( its literally impossible )",
    "( u will never catch it )",
    "( just press yes already!! )",
    "( the button has superpowers )",
    "( its mocking u... )"
];

const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const hintText = document.getElementById('hintText');
const buttonsArea = document.getElementById('buttonsArea');
const successPage = document.getElementById('successPage');
const bgMusic = document.getElementById('bgMusic');
const playPauseBtn = document.getElementById('playPause');
const vinyl = document.getElementById('vinyl');
const nowPlayingLyric = document.getElementById('nowPlayingLyric');

/* ---- LYRICS SYNC ---- */
const lrcRaw = `[00:11.08]Valentine, where did you go?
[00:16.23]Ive been fiending for a minute
[00:18.02]No i dont need forgiveness
[00:19.35]Yeah i just want you back in my arms yeah
[00:22.46]Girl i seen the guy that you replaced me with
[00:24.88]You say you love him but you lie
[00:26.19]You know youre stuck on this
[00:27.69]Yeah im just a call away babe im waiting for you
[00:30.83]Yeah hes not for you anyway
[00:32.32]But girl im made for you
[00:33.98]All these bitches in my dm's
[00:34.98]Girl i only want you
[00:36.20]You try to tell me that you need him
[00:37.81]Girl i know thats not true
[00:39.36]I know you wanna get a taste
[00:40.94]Come with me we'll get away
[00:42.26]Anywhere you wanna go
[00:45.63]Valentine, where did you go?
[00:50.26]Ive been fiending for a minute
[00:51.86]No i dont need forgiveness
[00:53.19]Yeah i just want you back in my arms yeah
[00:56.77]Valentine, where did you go?
[01:01.57]Ive been fiending for a minute
[01:03.38]No i dont need forgiveness
[01:04.67]Yeah i just want you back in my arms yeah
[01:07.93]Valentine, whys your heart so cold?
[01:13.01]I aint stopping till your mine
[01:14.86]But im running out of time
[01:16.15]Tell me hes not the one that you love
[01:19.28]If i see you with him then im going insane
[01:21.85]Dont know what id do baby
[01:23.19]All these thoughts in my brain
[01:24.43]Yeah i need to get him out
[01:27.38]I just gotta find a way how
[01:30.44]All these bitches in my dm's
[01:31.59]Girl i only want you
[01:32.85]You try to tell me that you need him
[01:34.33]Girl i know thats not true
[01:35.77]I know you wanna get a taste
[01:37.07]Come with me we'll get away
[01:38.56]Anywhere you wanna go
[01:41.97]Valentine, where did you go?
[01:46.97]Ive been fiending for a minute
[01:48.76]No i dont need forgiveness
[01:50.16]Yeah i just want you back in my arms yeah
[01:53.23]Valentine, where did you go?
[01:58.30]Ive been fiending for a minute
[01:59.83]No i dont need forgiveness
[02:01.45]Yeah i just want you back in my arms yeah
[02:04.55]Valentine, whys your heart so cold?
[02:09.29]I aint stopping till your mine
[02:11.34]But im running out of time
[02:12.63]Tell me hes not the one that you love
[02:17.45]`;

function parseLrc(raw) {
    const lines = raw.trim().split('\n');
    const result = [];
    const tag = /^\[(\d{2}):(\d{2})\.(\d{2})\](.*)$/;
    for (const line of lines) {
        const m = line.match(tag);
        if (m) {
            const time = parseInt(m[1], 10) * 60 + parseInt(m[2], 10) + parseInt(m[3], 10) / 100;
            const text = m[4].trim();
            if (text) result.push({ time, text });
        }
    }
    return result;
}
const lrcLines = parseLrc(lrcRaw);

function updateSyncedLyrics(t) {
    let i = -1;
    for (let j = lrcLines.length - 1; j >= 0; j--) {
        if (t >= lrcLines[j].time) { i = j; break; }
    }
    if (i >= 0) {
        nowPlayingLyric.textContent = lrcLines[i].text;
        nowPlayingLyric.classList.add('has-lyric');
    } else {
        nowPlayingLyric.textContent = '♪';
        nowPlayingLyric.classList.remove('has-lyric');
    }
}

/* ---- MUSIC CONTROLS ---- */
playPauseBtn.addEventListener('click', () => {
    if (musicPlaying) {
        bgMusic.pause();
        playPauseBtn.textContent = '▶ play';
        vinyl.classList.remove('spinning');
        musicPlaying = false;
    } else {
        bgMusic.play();
        playPauseBtn.textContent = '❚❚ pause';
        vinyl.classList.add('spinning');
        musicPlaying = true;
    }
});
bgMusic.addEventListener('timeupdate', () => updateSyncedLyrics(bgMusic.currentTime));
bgMusic.addEventListener('play', () => vinyl.classList.add('spinning'));
bgMusic.addEventListener('pause', () => vinyl.classList.remove('spinning'));

function tryAutoplay() {
    if (musicPlaying) return;
    const p = bgMusic.play();
    if (p && typeof p.then === 'function') {
        p.then(() => {
            musicPlaying = true;
            playPauseBtn.textContent = '❚❚ pause';
            vinyl.classList.add('spinning');
        }).catch(() => {});
    }
}

/* ---- SPLASH PAGE / CLICK TO ENTER ---- */
const splashPage = document.getElementById('splashPage');
const enterBtn = document.getElementById('enterBtn');

enterBtn.addEventListener('click', () => {
    splashPage.classList.add('hidden');
    setTimeout(() => { splashPage.style.display = 'none'; }, 900);
    // autoplay music on user interaction
    tryAutoplay();
});
// also allow clicking anywhere on splash
splashPage.addEventListener('click', (e) => {
    if (e.target === splashPage || e.target.closest('.splash-inner')) {
        splashPage.classList.add('hidden');
        setTimeout(() => { splashPage.style.display = 'none'; }, 900);
        tryAutoplay();
    }
});

/* ---- YES BUTTON (success!) ---- */
yesBtn.addEventListener('click', () => {
    const container = document.getElementById('confettiCanvas');
    const colors = ['#ff69b4', '#ffb6c1', '#ffc0cb', '#dda0dd', '#ff1493', '#e8b0ff'];
    for (let i = 0; i < 80; i++) {
        const d = document.createElement('div');
        d.className = 'confetti-piece';
        d.style.left = Math.random() * 100 + '%';
        d.style.background = colors[Math.floor(Math.random() * colors.length)];
        d.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
        d.style.animationDelay = Math.random() * 0.4 + 's';
        if (Math.random() > 0.4) d.style.borderRadius = '50%';
        d.style.width = (Math.random() * 8 + 6) + 'px';
        d.style.height = d.style.width;
        container.appendChild(d);
        setTimeout(() => d.remove(), 3500);
    }
    setTimeout(() => {
        successPage.classList.add('show');
        setTimeout(() => {
            for (let i = 0; i < 50; i++) {
                const d = document.createElement('div');
                d.className = 'confetti-piece';
                d.style.left = Math.random() * 100 + '%';
                d.style.background = colors[Math.floor(Math.random() * colors.length)];
                d.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
                container.appendChild(d);
                setTimeout(() => d.remove(), 3500);
            }
        }, 300);
    }, 400);
});

/* ═══════════════════════════════════════
   NO BUTTON: ALMOST IMPOSSIBLE TO CATCH
   - huge proximity detection (200px)
   - instant teleport (no transition)
   - continuous flee on mousemove
   - random auto-teleport every 400ms when near
   - shrinks dramatically
   - moves to random spots aggressively
   ═══════════════════════════════════════ */

const FLEE_RADIUS = 120;  // start fleeing when mouse is this close
const AUTO_FLEE_MS = 300; // check proximity every 300ms

function getPointerPos(e) {
    if (e.touches && e.touches.length) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
}

function dist(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

function moveNoButton() {
    // smooth animated move to a random position away from mouse + yes btn
    noBtn.classList.add('fleeing');
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const bw = noBtn.offsetWidth || 60;
    const bh = noBtn.offsetHeight || 30;
    const pad = 20;

    const yesRect = yesBtn.getBoundingClientRect();
    const yesCenter = { x: yesRect.left + yesRect.width / 2, y: yesRect.top + yesRect.height / 2 };

    let bestX = 0, bestY = 0, bestDist = 0;
    for (let attempt = 0; attempt < 20; attempt++) {
        const rx = pad + Math.random() * (vw - bw - pad * 2);
        const ry = pad + Math.random() * (vh - bh - pad * 2);
        const center = { x: rx + bw / 2, y: ry + bh / 2 };
        const dMouse = dist(center, lastMousePos);
        const dYes = dist(center, yesCenter);
        const minD = Math.min(dMouse, dYes);
        if (minD > bestDist) {
            bestDist = minD;
            bestX = rx;
            bestY = ry;
        }
    }

    // use the CSS transition for smooth movement!
    noBtn.style.position = 'fixed';
    noBtn.style.left = bestX + 'px';
    noBtn.style.top = bestY + 'px';
}

function dodgeAndUpdate() {
    noDodgeCount++;
    if (noDodgeCount < noTexts.length) {
        noBtn.textContent = noTexts[Math.min(noDodgeCount, noTexts.length - 1)];
        // shrink playfully
        const scale = Math.max(0.3, 1 - noDodgeCount * 0.1);
        noBtn.style.setProperty('--no-scale', scale);
        hintText.textContent = hintTexts[Math.min(noDodgeCount, hintTexts.length - 1)];
        moveNoButton();
    } else {
        // finally give in
        noBtn.classList.remove('fleeing');
        noBtn.textContent = 'YES!! ♡';
        noBtn.style.background = 'linear-gradient(180deg, #ff85b0, #ff4d8a)';
        noBtn.style.color = '#fff';
        noBtn.style.borderColor = '#b8336a';
        noBtn.style.setProperty('--no-scale', '1');
        noBtn.style.fontSize = '20px';
        noBtn.style.padding = '10px 24px';
        noBtn.style.animation = 'none';
        noBtn.onclick = () => yesBtn.click();
        stopFleeing();
    }
}

function stopFleeing() {
    if (proximityLoop) {
        clearInterval(proximityLoop);
        proximityLoop = null;
    }
}

// on hover - dodge with smooth animation
noBtn.addEventListener('mouseenter', (e) => {
    if (noDodgeCount < noTexts.length) dodgeAndUpdate();
});
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (noDodgeCount >= noTexts.length) {
        yesBtn.click();
    } else {
        dodgeAndUpdate();
    }
});
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (noDodgeCount >= noTexts.length) {
        yesBtn.click();
    } else {
        // on mobile, dodge IMMEDIATELY when touched
        dodgeAndUpdate();
        // and also move right after to make it extra hard
        setTimeout(() => {
            if (noDodgeCount < noTexts.length) moveNoButton();
        }, 150);
    }
}, { passive: false });

// proximity check - flee when mouse/touch gets close (smooth slide away)
function startProximityFlee() {
    proximityLoop = setInterval(() => {
        if (noDodgeCount >= noTexts.length) { stopFleeing(); return; }

        const rect = noBtn.getBoundingClientRect();
        const btnCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
        const d = dist(btnCenter, lastMousePos);

        if (d < FLEE_RADIUS) {
            moveNoButton(); // smooth slide away
        }
    }, AUTO_FLEE_MS);
}

// track mouse globally
document.addEventListener('mousemove', (e) => {
    lastMousePos = { x: e.clientX, y: e.clientY };
});

// track touch/finger position globally (MOBILE)
document.addEventListener('touchstart', (e) => {
    if (e.touches.length && e.target !== noBtn) {
        lastMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
}, { passive: true });

document.addEventListener('touchmove', (e) => {
    if (e.touches.length) {
        lastMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        
        // check if touching near no button - flee!
        if (noDodgeCount < noTexts.length) {
            const rect = noBtn.getBoundingClientRect();
            const btnCenter = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
            const d = dist(btnCenter, lastMousePos);
            if (d < FLEE_RADIUS + 30) { // extra buffer for touch
                e.preventDefault();
                moveNoButton();
            }
        }
    }
}, { passive: false });

// start the flee loop
startProximityFlee();

// also move on resize
window.addEventListener('resize', () => {
    if (noDodgeCount > 0 && noDodgeCount < noTexts.length) moveNoButton();
});

// keyboard shortcut
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement === yesBtn) yesBtn.click();
});

/* ---- FALLING HEARTS / STARS BACKGROUND ---- */
(function() {
    const container = document.getElementById('fallingStuff');
    const items = ['♡', '✿', '❀', '♥', '✧', '☆', '❤', '✦'];
    const colors = ['#ffb6c1', '#ff69b4', '#dda0dd', '#e8b0ff', '#ffc0cb', '#ff8ec4'];

    function spawnFallingItem() {
        const el = document.createElement('div');
        el.className = 'falling-item';
        el.textContent = items[Math.floor(Math.random() * items.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.color = colors[Math.floor(Math.random() * colors.length)];
        el.style.fontSize = (12 + Math.random() * 18) + 'px';
        el.style.animationDuration = (5 + Math.random() * 8) + 's';
        el.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(el);
        setTimeout(() => el.remove(), 15000);
    }

    // spawn initial batch
    for (let i = 0; i < 20; i++) {
        setTimeout(spawnFallingItem, Math.random() * 3000);
    }
    // continuous spawning
    setInterval(spawnFallingItem, 800);
})();

/* ---- SPARKLE CURSOR TRAIL ---- */
(function() {
    const cursor = document.getElementById('customCursor');
    const trailContainer = document.getElementById('cursorTrail');
    let mouseX = -999, mouseY = -999;
    let trailTick = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';

        trailTick++;
        if (trailTick % 2 === 0) {
            const dot = document.createElement('div');
            dot.className = 'trail-dot';
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
            const sparkleColors = ['#ffb6c1', '#ff69b4', '#ffc0cb', '#e8b0ff', '#fff0f5', '#ff8ec4'];
            const shade = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
            dot.style.background = `radial-gradient(circle, ${shade} 0%, transparent 70%)`;
            dot.style.boxShadow = `0 0 8px ${shade}, 0 0 14px rgba(255,255,255,0.7)`;
            trailContainer.appendChild(dot);
            setTimeout(() => dot.remove(), 700);
        }
    });
})();

