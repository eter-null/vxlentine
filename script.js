let noDodgeCount = 0;
let musicPlaying = false;
let proximityCheck = null;

const noTexts = [
    "no",
    "nope",
    "u sure?",
    "really?",
    "pls no",
    "think again",
    "pretty pls?",
    "ill be sad",
    "maybe later?",
    "last chance",
    "ok fine... yes!!"
];

const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const hintText = document.getElementById('hintText');
const buttonsArea = document.getElementById('buttonsArea');
const successPage = document.getElementById('successPage');
const bgMusic = document.getElementById('bgMusic');
const playPauseBtn = document.getElementById('playPause');
const vinyl = document.getElementById('vinyl');
const tonearm = document.getElementById('tonearm');
const nowPlayingLyric = document.getElementById('nowPlayingLyric');

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

playPauseBtn.addEventListener('click', () => {
    if (musicPlaying) {
        bgMusic.pause();
        playPauseBtn.textContent = '▶';
        vinyl.classList.remove('spinning');
        musicPlaying = false;
    } else {
        bgMusic.play();
        playPauseBtn.textContent = '❚❚';
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
            playPauseBtn.textContent = '❚❚';
            vinyl.classList.add('spinning');
        }).catch(() => {});
    }
}
tryAutoplay();
document.addEventListener('DOMContentLoaded', tryAutoplay);
window.addEventListener('load', tryAutoplay);
document.addEventListener('click', () => { if (!musicPlaying) tryAutoplay(); }, { once: true });
document.addEventListener('touchstart', () => { if (!musicPlaying) tryAutoplay(); }, { once: true });

yesBtn.addEventListener('click', () => {
    const container = document.getElementById('confettiCanvas');
    const colors = ['#ff69b4', '#ffb6c1', '#ffc0cb', '#dda0dd'];
    for (let i = 0; i < 60; i++) {
        const d = document.createElement('div');
        d.className = 'confetti-piece';
        d.style.left = Math.random() * 100 + '%';
        d.style.background = colors[Math.floor(Math.random() * colors.length)];
        d.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
        d.style.animationDelay = Math.random() * 0.3 + 's';
        if (Math.random() > 0.5) d.style.borderRadius = '50%';
        container.appendChild(d);
        setTimeout(() => d.remove(), 3000);
    }
    setTimeout(() => {
        successPage.classList.add('show');
        setTimeout(() => {
            for (let i = 0; i < 40; i++) {
                const d = document.createElement('div');
                d.className = 'confetti-piece';
                d.style.left = Math.random() * 100 + '%';
                d.style.background = colors[Math.floor(Math.random() * colors.length)];
                d.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
                container.appendChild(d);
                setTimeout(() => d.remove(), 3000);
            }
        }, 300);
    }, 400);
});

const PROXIMITY = 65;
const MOVE_INTERVAL = 120;

function getPointerPos(e) {
    if (e.touches && e.touches.length) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
}

function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

function moveNoButton() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rect = noBtn.getBoundingClientRect();
    const pad = 16;
    const maxX = vw - rect.width - pad;
    const maxY = vh - rect.height - pad;
    let x = Math.random() * maxX;
    let y = Math.random() * maxY;
    const yesRect = yesBtn.getBoundingClientRect();
    const yesC = { x: yesRect.left + yesRect.width / 2, y: yesRect.top + yesRect.height / 2 };
    for (let k = 0; k < 15; k++) {
        const noC = { x: x + rect.width / 2, y: y + rect.height / 2 };
        if (distance(noC, yesC) > 140) break;
        x = Math.random() * maxX;
        y = Math.random() * maxY;
    }
    noBtn.style.position = 'fixed';
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
}

function checkProximity(e) {
    const pos = getPointerPos(e);
    const rect = noBtn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    if (distance(pos, { x: cx, y: cy }) < PROXIMITY) {
        dodgeButton();
        moveNoButton();
    }
}

function dodgeButton() {
    noDodgeCount++;
    if (noDodgeCount < noTexts.length) {
        noBtn.textContent = noTexts[noDodgeCount];
        const scale = Math.max(0.25, 1 - noDodgeCount * 0.12);
        noBtn.style.transform = 'scale(' + scale + ')';
        moveNoButton();
        const hints = [
            '(the no button is shy...)',
            '(it moved!!)',
            '(getting smaller...)',
            '(just say yes!!)',
            '(yes is right there)',
            '(please??)',
            '(one more try)'
        ];
        hintText.textContent = hints[Math.min(noDodgeCount, hints.length - 1)];
    } else {
        noBtn.textContent = 'yes!!';
        noBtn.style.background = 'linear-gradient(180deg, #ff85b0, #ff69b4)';
        noBtn.style.color = '#fff';
        noBtn.style.borderColor = '#d44d7a';
        noBtn.style.transform = 'scale(1)';
        noBtn.removeEventListener('mouseenter', dodgeButton);
        noBtn.onclick = () => yesBtn.click();
        if (proximityCheck) {
            document.removeEventListener('mousemove', checkProximity);
            document.removeEventListener('touchmove', checkProximity, { passive: false });
        }
    }
}

noBtn.addEventListener('mouseenter', dodgeButton);
noBtn.addEventListener('click', (e) => { e.preventDefault(); dodgeButton(); });
noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); dodgeButton(); });

document.addEventListener('mousemove', (e) => {
    if (noDodgeCount >= noTexts.length) return;
    const pos = getPointerPos(e);
    const rect = noBtn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    if (distance(pos, { x: cx, y: cy }) < PROXIMITY) {
        if (!proximityCheck) {
            proximityCheck = setInterval(() => {
                moveNoButton();
            }, MOVE_INTERVAL);
        }
    } else if (proximityCheck) {
        clearInterval(proximityCheck);
        proximityCheck = null;
    }
});

document.addEventListener('touchmove', (e) => {
    if (noDodgeCount >= noTexts.length) return;
    const pos = getPointerPos(e);
    const rect = noBtn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    if (distance(pos, { x: cx, y: cy }) < PROXIMITY) {
        e.preventDefault();
        moveNoButton();
    }
}, { passive: false });

window.addEventListener('resize', () => {
    if (noDodgeCount > 0 && noBtn.style.position === 'fixed') moveNoButton();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement === yesBtn) yesBtn.click();
});
