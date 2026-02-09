// Neocities-style Valentine Website Script
// made with love (and some chaos) 💕

let noDodgeCount = 0;
let musicPlaying = false;

// More casual/funny no button texts
const noButtonTexts = [
    "no",
    "u sure??",
    "really??",
    "think again!",
    "but why tho",
    "pls reconsider",
    "ur breaking my heart 💔",
    "last chance fr",
    "ok fine YES",
];

// Get elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const mainContent = document.getElementById('mainContent');
const successMessage = document.getElementById('successMessage');
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const encourageText = document.getElementById('encourageText');
const buttonsContainer = document.getElementById('buttonsContainer');

// Confetti colors - bright and fun!
const confettiColors = ['#ff0080', '#ff69b4', '#ff1493', '#ffc0cb', '#ff00ff', '#ffd700', '#00ff00', '#00ffff'];

// Music toggle
musicToggle.addEventListener('click', () => {
    if (musicPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.textContent = '🎵';
        musicPlaying = false;
    } else {
        bgMusic.play().catch(e => console.log('audio blocked:', e));
        musicToggle.classList.add('playing');
        musicToggle.textContent = '🎶';
        musicPlaying = true;
    }
});

// Try to auto-play music on first interaction
let firstClick = true;
document.addEventListener('click', () => {
    if (firstClick) {
        bgMusic.play().catch(e => {});
        musicToggle.classList.add('playing');
        musicToggle.textContent = '🎶';
        musicPlaying = true;
        firstClick = false;
    }
}, { once: true });

// YES button - party time!
yesBtn.addEventListener('click', () => {
    // Stop music
    if (musicPlaying) {
        bgMusic.pause();
        musicPlaying = false;
    }
    
    // CONFETTI EXPLOSION!!!
    throwConfetti();
    
    setTimeout(() => {
        throwConfetti();
    }, 200);
    
    setTimeout(() => {
        throwConfetti();
    }, 400);
    
    // Keep throwing confetti for celebration
    let confettiInterval = setInterval(throwConfetti, 300);
    
    setTimeout(() => {
        clearInterval(confettiInterval);
    }, 3000);
    
    // Show success page after a moment
    setTimeout(() => {
        mainContent.classList.add('hidden');
        successMessage.classList.remove('hidden');
        
        // More confetti on success page!
        setTimeout(() => {
            for (let i = 0; i < 5; i++) {
                setTimeout(throwConfetti, i * 200);
            }
        }, 500);
    }, 1000);
});

// Confetti function
function throwConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: confettiColors,
        startVelocity: 45,
        gravity: 1.2,
        scalar: 1.2,
    });
}

// NO button shenanigans
noBtn.addEventListener('mouseenter', dodgeButton);
noBtn.addEventListener('click', dodgeButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    dodgeButton();
});

function dodgeButton() {
    noDodgeCount++;
    
    // Change text
    if (noDodgeCount < noButtonTexts.length) {
        noBtn.textContent = noButtonTexts[noDodgeCount];
    } else {
        // Convert to yes button
        noBtn.textContent = "fine... YES 💕";
        noBtn.style.background = 'linear-gradient(135deg, #ff6b9d 0%, #ff1493 100%)';
        noBtn.style.color = '#fff';
        noBtn.style.border = '4px solid #fff';
        noBtn.removeEventListener('mouseenter', dodgeButton);
        noBtn.removeEventListener('click', dodgeButton);
        noBtn.addEventListener('click', () => {
            yesBtn.click();
        });
        return;
    }
    
    // Shrink the no button
    const scale = Math.max(0.4, 1 - (noDodgeCount * 0.1));
    noBtn.style.transform = `translateX(-50%) scale(${scale})`;
    
    // Make yes button bigger
    const yesScale = 1 + (noDodgeCount * 0.08);
    yesBtn.style.transform = `scale(${yesScale})`;
    
    // Move no button randomly
    moveButton();
    
    // Update encourage text
    updateEncourageText();
}

function moveButton() {
    const container = document.body;
    const containerRect = container.getBoundingClientRect();
    const buttonRect = noBtn.getBoundingClientRect();
    
    // Calculate safe zone
    const padding = 30;
    const maxX = window.innerWidth - buttonRect.width - padding;
    const maxY = window.innerHeight - buttonRect.height - padding;
    
    // Random position
    let newX = Math.random() * (maxX - padding) + padding;
    let newY = Math.random() * (maxY - padding) + padding;
    
    // Make sure it's not too close to yes button
    const yesRect = yesBtn.getBoundingClientRect();
    const minDistance = 120;
    
    let attempts = 0;
    while (attempts < 10) {
        const distance = Math.sqrt(
            Math.pow(newX - (yesRect.left + yesRect.width/2), 2) + 
            Math.pow(newY - (yesRect.top + yesRect.height/2), 2)
        );
        
        if (distance > minDistance) {
            break;
        }
        
        newX = Math.random() * (maxX - padding) + padding;
        newY = Math.random() * (maxY - padding) + padding;
        attempts++;
    }
    
    // Apply position
    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.transform = `scale(${Math.max(0.4, 1 - (noDodgeCount * 0.1))})`;
}

function updateEncourageText() {
    const messages = [
        "👀 psst... the no button is kinda sus",
        "lol it ran away",
        "its getting smaller 👀",
        "why u doing this to yourself",
        "just click yes already!!",
        "the no button is tired of running",
        "cmon u know u want to say yes",
        "ok this is just sad now 😭",
        "FINE click the yes button then!"
    ];
    
    if (noDodgeCount < messages.length) {
        encourageText.textContent = messages[noDodgeCount];
    }
}

// Add some random sparkles when moving mouse
let sparkleTimer;
document.addEventListener('mousemove', (e) => {
    clearTimeout(sparkleTimer);
    sparkleTimer = setTimeout(() => {
        if (Math.random() > 0.7) {
            createSparkle(e.clientX, e.clientY);
        }
    }, 100);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.textContent = ['✨', '💖', '⭐', '💕', '🌟'][Math.floor(Math.random() * 5)];
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.fontSize = '20px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'sparkle-fade 1s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

// Add sparkle fade animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle-fade {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0.5);
        }
    }
`;
document.head.appendChild(style);

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement === yesBtn) {
        yesBtn.click();
    }
});

// Window resize handler
window.addEventListener('resize', () => {
    if (noDodgeCount > 0 && noBtn.style.position === 'fixed') {
        moveButton();
    }
});

// Easter egg - rapid clicking
let clickCount = 0;
let clickTimer;
document.body.addEventListener('click', () => {
    clickCount++;
    clearTimeout(clickTimer);
    
    if (clickCount > 10) {
        const messages = [
            "ok someone's excited lol",
            "calm down there buddy",
            "ur clicking a lot ngl",
            "having fun?? 😂"
        ];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        
        const toast = document.createElement('div');
        toast.textContent = randomMsg;
        toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ff69b4;
            color: white;
            padding: 20px 40px;
            border-radius: 15px;
            font-size: 20px;
            font-weight: bold;
            z-index: 10000;
            border: 3px solid white;
            box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.transition = 'opacity 0.5s';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, 2000);
        
        clickCount = 0;
    }
    
    clickTimer = setTimeout(() => {
        clickCount = 0;
    }, 2000);
});

console.log('💕 website loaded! hope they say yes!! 💕');
console.log('btw if ur reading this in console ur a nerd (affectionate)');
