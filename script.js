// State
let noDodgeCount = 0;
let musicPlaying = false;

const noTexts = [
    "no... (´-ω-`)",
    "u sure? (´• ω •`)",
    "but why tho (´･ᴗ･ ` )",
    "pls reconsider (｡•́︿•̀｡)",
    "think about it!! (◕‿◕)",
    "pretty pls? (´｡• ᵕ •｡`)",
    "i'll be sad (╥﹏╥)",
    "last chance!!! ( ˘⌣˘)♡",
    "okay fine... YES! ヽ(♡‿♡)ノ"
];

// Elements
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

// LRC embedded - parse into { time (seconds), text } for Spotify-style sync
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
            const min = parseInt(m[1], 10);
            const sec = parseInt(m[2], 10);
            const cent = parseInt(m[3], 10);
            const time = min * 60 + sec + cent / 100;
            const text = m[4].trim();
            if (text) result.push({ time, text });
        }
    }
    return result;
}

const lrcLines = parseLrc(lrcRaw);

function updateSyncedLyrics(currentTime) {
    let activeIndex = -1;
    for (let i = lrcLines.length - 1; i >= 0; i--) {
        if (currentTime >= lrcLines[i].time) {
            activeIndex = i;
            break;
        }
    }
    if (activeIndex >= 0) {
        nowPlayingLyric.textContent = lrcLines[activeIndex].text;
        nowPlayingLyric.classList.add('has-lyric');
    } else {
        nowPlayingLyric.textContent = '♪';
        nowPlayingLyric.classList.remove('has-lyric');
    }
}

// Music controls
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

bgMusic.addEventListener('timeupdate', () => {
    updateSyncedLyrics(bgMusic.currentTime);
});

bgMusic.addEventListener('play', () => {
    vinyl.classList.add('spinning');
    tonearm.classList.add('playing');
    setTimeout(() => tonearm.classList.remove('playing'), 500);
});

bgMusic.addEventListener('pause', () => {
    vinyl.classList.remove('spinning');
});


// Auto play on first interaction
let firstClick = true;
document.addEventListener('click', () => {
    if (firstClick) {
        firstClick = false;
        bgMusic.play().catch(() => {});
        playPauseBtn.textContent = '❚❚';
        vinyl.classList.add('spinning');
        musicPlaying = true;
    }
}, { once: true });

// Yes button - trigger celebration
yesBtn.addEventListener('click', () => {
    // Create confetti
    createConfetti();
    
    // Show success page
    setTimeout(() => {
        successPage.classList.add('show');
        
        // More confetti bursts
        setTimeout(() => createConfetti(), 500);
        setTimeout(() => createConfetti(), 1000);
        setTimeout(() => createConfetti(), 1500);
    }, 300);
});

// No button - dodge behavior
noBtn.addEventListener('mouseenter', dodgeButton);
noBtn.addEventListener('click', dodgeButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    dodgeButton();
});

function dodgeButton() {
    noDodgeCount++;
    
    // Change text
    if (noDodgeCount < noTexts.length) {
        noBtn.textContent = noTexts[noDodgeCount];
        
        // Make yes button bigger
        const yesScale = 1 + (noDodgeCount * 0.08);
        yesBtn.style.transform = `scale(${yesScale})`;
        
        // Make no button smaller
        const noScale = 1 - (noDodgeCount * 0.08);
        if (noScale > 0.3) {
            noBtn.style.transform = `scale(${noScale})`;
        }
        
        // Move to random position
        moveButton();
        
        // Update hint
        updateHint();
    } else {
        // Convert to yes button
        noBtn.textContent = "YES!!";
        noBtn.style.background = '#ff69b4';
        noBtn.style.color = '#fff';
        noBtn.style.borderColor = '#ff69b4';
        noBtn.removeEventListener('mouseenter', dodgeButton);
        noBtn.onclick = () => yesBtn.click();
    }
}

function moveButton() {
    // Get viewport dimensions
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    // Get button dimensions
    const btnRect = noBtn.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;
    
    // Calculate safe area (with padding)
    const padding = 20;
    const maxX = vw - btnWidth - padding;
    const maxY = vh - btnHeight - padding;
    
    // Generate random position
    let randomX = Math.random() * maxX;
    let randomY = Math.random() * maxY;
    
    // Make sure it's not too close to yes button
    const yesRect = yesBtn.getBoundingClientRect();
    const minDistance = 150;
    
    let attempts = 0;
    while (attempts < 10) {
        const distance = Math.sqrt(
            Math.pow(randomX - yesRect.left, 2) + 
            Math.pow(randomY - yesRect.top, 2)
        );
        
        if (distance > minDistance) break;
        
        randomX = Math.random() * maxX;
        randomY = Math.random() * maxY;
        attempts++;
    }
    
    // Apply position
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
}

function updateHint() {
    const hints = [
        "*psst... the no button is kinda shy* (￢‿￢ )",
        "*oops it moved hehe* (´｡• ᵕ •｡`)",
        "*it's getting smaller too...* (¬‿¬ )",
        "*why won't u just say yes?* (◕‿◕)",
        "*the yes button is looking pretty good rn* (⌒▽⌒)☆",
        "*just click yes already!!* ♡( ◡‿◡ )",
        "*ur making this harder than it needs to be* (￣ω￣)",
        "*okay u got this, one more try* (´ ω `*)"
    ];
    
    if (noDodgeCount < hints.length) {
        hintText.textContent = hints[noDodgeCount];
        hintText.style.animation = 'none';
        setTimeout(() => {
            hintText.style.animation = 'wiggle 1s ease-in-out';
        }, 10);
    }
}

// Confetti function
function createConfetti() {
    const colors = ['#FF69B4', '#FFB6C1', '#FFE4E1', '#DDA0DD', '#E6E6FA', '#FFC0CB'];
    const container = document.getElementById('confettiCanvas');
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        // Random shapes
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }
        
        container.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 3500);
    }
}

// Window resize handler
window.addEventListener('resize', () => {
    if (noDodgeCount > 0 && noBtn.style.position === 'fixed') {
        moveButton();
    }
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement === yesBtn) {
        yesBtn.click();
    }
});

console.log('💕 cottagecore valentine website loaded! 🌸');
