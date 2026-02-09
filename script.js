// State management
let noDodgeCount = 0;
let musicPlaying = false;

// No button text progression
const noButtonTexts = [
    "No",
    "Are you sure?",
    "Really?",
    "Think again...",
    "Pretty please?",
    "Give it a chance?",
    "You might regret this...",
    "Last chance!",
    "Okay fine... Yes?"
];

// DOM Elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const mainContent = document.getElementById('mainContent');
const successMessage = document.getElementById('successMessage');
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const encourageText = document.getElementById('encourageText');
const buttonsContainer = document.getElementById('buttonsContainer');

// Confetti configuration
const confettiConfig = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#FFB6C1', '#E6E6FA', '#FF9999', '#FFE4E1', '#DDA0DD']
};

// Music Toggle Functionality
musicToggle.addEventListener('click', () => {
    if (musicPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicPlaying = false;
        musicToggle.innerHTML = `
            <svg class="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
            </svg>
        `;
    } else {
        bgMusic.play().catch(e => console.log('Audio play failed:', e));
        musicToggle.classList.add('playing');
        musicPlaying = true;
        musicToggle.innerHTML = `
            <svg class="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd"/>
            </svg>
        `;
    }
});

// Yes Button Click - Trigger Celebration
yesBtn.addEventListener('click', () => {
    // Stop music if playing
    if (musicPlaying) {
        bgMusic.pause();
        musicPlaying = false;
    }
    
    // Hide main content
    mainContent.classList.add('animate__fadeOut');
    
    // Multiple confetti bursts
    setTimeout(() => {
        confetti({
            ...confettiConfig,
            origin: { x: 0.3, y: 0.5 }
        });
    }, 0);
    
    setTimeout(() => {
        confetti({
            ...confettiConfig,
            origin: { x: 0.7, y: 0.5 }
        });
    }, 200);
    
    setTimeout(() => {
        confetti({
            ...confettiConfig,
            particleCount: 150,
            spread: 100,
            origin: { x: 0.5, y: 0.4 }
        });
    }, 400);
    
    // Show success message
    setTimeout(() => {
        mainContent.classList.add('hidden');
        successMessage.classList.remove('hidden');
        
        // Continue confetti celebration
        const duration = 3000;
        const end = Date.now() + duration;
        
        const interval = setInterval(() => {
            if (Date.now() > end) {
                clearInterval(interval);
                return;
            }
            
            confetti({
                ...confettiConfig,
                particleCount: 50,
                origin: {
                    x: Math.random(),
                    y: Math.random() * 0.5
                }
            });
        }, 250);
    }, 800);
});

// No Button Hover - Move Away
noBtn.addEventListener('mouseenter', handleNoDodge);

// No Button Click - Also dodge
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    handleNoDodge();
});

// No Button Touch (for mobile)
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleNoDodge();
});

// Handle No Button Dodge Logic
function handleNoDodge() {
    // Increment dodge count
    noDodgeCount++;
    
    // Change button text
    if (noDodgeCount < noButtonTexts.length) {
        noBtn.textContent = noButtonTexts[noDodgeCount];
    } else {
        // After all dodges, convert to Yes
        noBtn.textContent = "Okay, Yes! 💕";
        noBtn.classList.remove('no-button');
        noBtn.classList.add('yes-button');
        noBtn.removeEventListener('mouseenter', handleNoDodge);
        noBtn.addEventListener('click', () => {
            yesBtn.click();
        });
        return;
    }
    
    // Shrink the button
    const currentScale = 1 - (noDodgeCount * 0.08);
    if (currentScale > 0.3) {
        noBtn.style.transform = `scale(${currentScale})`;
    }
    
    // Move to random position
    moveNoButton();
    
    // Update encourage text
    updateEncourageText();
    
    // Make Yes button bigger
    const yesScale = 1 + (noDodgeCount * 0.05);
    yesBtn.style.transform = `scale(${yesScale})`;
}

// Move No Button to Random Position
function moveNoButton() {
    const container = buttonsContainer.getBoundingClientRect();
    const button = noBtn.getBoundingClientRect();
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate safe boundaries (keep button within viewport with padding)
    const padding = 20;
    const maxX = viewportWidth - button.width - padding;
    const maxY = viewportHeight - button.height - padding;
    
    // Generate random position
    let randomX = Math.random() * (maxX - padding) + padding;
    let randomY = Math.random() * (maxY - padding) + padding;
    
    // Ensure button doesn't overlap with Yes button (in mobile view)
    const yesRect = yesBtn.getBoundingClientRect();
    const minDistance = 150; // Minimum distance from Yes button
    
    let attempts = 0;
    while (attempts < 10) {
        const distance = Math.sqrt(
            Math.pow(randomX - yesRect.left, 2) + 
            Math.pow(randomY - yesRect.top, 2)
        );
        
        if (distance > minDistance) {
            break;
        }
        
        randomX = Math.random() * (maxX - padding) + padding;
        randomY = Math.random() * (maxY - padding) + padding;
        attempts++;
    }
    
    // Apply position with smooth transition
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
}

// Update Encourage Text Based on Dodges
function updateEncourageText() {
    const messages = [
        "(Choose wisely... the \"No\" button might have a mind of its own 😊)",
        "(Oops! The button moved... Try again? 😏)",
        "(It's getting smaller... and harder to click 😅)",
        "(The universe is trying to tell you something... 💫)",
        "(Why resist? Just say yes! 💕)",
        "(The \"No\" button is tired of running away... 🥺)",
        "(You know you want to say yes... 💖)",
        "(Almost there! One more try... 😊)"
    ];
    
    if (noDodgeCount < messages.length) {
        encourageText.textContent = messages[noDodgeCount];
        encourageText.classList.remove('animate__fadeIn');
        void encourageText.offsetWidth; // Trigger reflow
        encourageText.classList.add('animate__fadeIn');
    }
}

// Create Sparkle Effect on Mouse Move
let sparkleTimeout;
document.addEventListener('mousemove', (e) => {
    clearTimeout(sparkleTimeout);
    sparkleTimeout = setTimeout(() => {
        createSparkle(e.clientX, e.clientY);
    }, 100);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '10px';
    sparkle.style.height = '10px';
    sparkle.style.borderRadius = '50%';
    sparkle.style.background = 'radial-gradient(circle, #FFB6C1, transparent)';
    sparkle.style.animation = 'sparkle 1s ease-out';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Auto-play music on first interaction
let firstInteraction = true;
document.addEventListener('click', () => {
    if (firstInteraction) {
        firstInteraction = false;
        bgMusic.play().catch(e => console.log('Audio autoplay failed:', e));
        musicToggle.classList.add('playing');
        musicPlaying = true;
    }
}, { once: true });

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement === yesBtn) {
        yesBtn.click();
    }
});

// Responsive handling
window.addEventListener('resize', () => {
    if (noDodgeCount > 0 && noBtn.style.position === 'fixed') {
        // Reposition button on resize to keep it in viewport
        moveNoButton();
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
});

console.log('💕 Valentine Proposal Website loaded successfully! 💕');
