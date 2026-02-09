# Customization Ideas & Enhancements

## Quick Customizations

### 1. Change Names and Messages

**Main Proposal Text** (`index.html` line ~62):
```html
<h1>Your Partner's Name</h1>
<p>Will you be my Valentine?</p>
```

**Success Message** (`index.html` line ~120-130):
Update the personal message with your own heartfelt words.

### 2. Adjust No Button Behavior

**More Dodge Attempts** (`script.js` line ~7):
```javascript
const noButtonTexts = [
    "No",
    "Are you sure?",
    "Really?",
    "Think again...",
    "Pretty please?",
    // Add more lines here!
    "One more chance?",
    "I'll wait...",
    "Still no?",
    "Okay fine... Yes?"
];
```

**Faster/Slower Shrinking** (`script.js` line ~104):
```javascript
// Current: shrinks 8% each time
const currentScale = 1 - (noDodgeCount * 0.08);

// Slower shrinking (5% each time)
const currentScale = 1 - (noDodgeCount * 0.05);

// Faster shrinking (12% each time)
const currentScale = 1 - (noDodgeCount * 0.12);
```

### 3. Color Scheme Changes

**Preset Color Schemes**:

**Romantic Red** (`style.css` lines 7-12):
```css
:root {
    --blush-pink: #FF6B9D;
    --lavender: #FFC1E3;
    --soft-coral: #FF0000;
    --cream: #FFF0F5;
    --soft-charcoal: #4A4A4A;
}
```

**Elegant Purple** (`style.css` lines 7-12):
```css
:root {
    --blush-pink: #DDA0DD;
    --lavender: #E6E6FA;
    --soft-coral: #BA55D3;
    --cream: #F8F8FF;
    --soft-charcoal: #4A4A4A;
}
```

**Soft Blue** (`style.css` lines 7-12):
```css
:root {
    --blush-pink: #B0E0E6;
    --lavender: #E0F6FF;
    --soft-coral: #87CEEB;
    --cream: #F0F8FF;
    --soft-charcoal: #4A4A4A;
}
```

## Advanced Enhancements

### 4. Add Countdown Timer

Add before the main question (`index.html`):

```html
<div class="countdown-container">
    <p class="text-lg text-gray-600">Valentine's Day in:</p>
    <div id="countdown" class="text-4xl font-bold text-pink-500"></div>
</div>
```

Add to `script.js`:

```javascript
// Countdown to Valentine's Day
function updateCountdown() {
    const valentines = new Date('2026-02-14T00:00:00');
    const now = new Date();
    const diff = valentines - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('countdown').textContent = 
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();
```

### 5. Add Photo Gallery

Create a slideshow in the success message:

```html
<div class="photo-gallery">
    <img id="galleryImg" src="assets/photos/1.jpg" class="w-full h-64 object-cover rounded-xl">
    <div class="flex gap-2 justify-center mt-4">
        <button onclick="prevPhoto()" class="px-4 py-2 bg-pink-300 rounded">←</button>
        <button onclick="nextPhoto()" class="px-4 py-2 bg-pink-300 rounded">→</button>
    </div>
</div>
```

```javascript
const photos = ['1.jpg', '2.jpg', '3.jpg', '4.jpg'];
let currentPhoto = 0;

function nextPhoto() {
    currentPhoto = (currentPhoto + 1) % photos.length;
    document.getElementById('galleryImg').src = `assets/photos/${photos[currentPhoto]}`;
}

function prevPhoto() {
    currentPhoto = (currentPhoto - 1 + photos.length) % photos.length;
    document.getElementById('galleryImg').src = `assets/photos/${photos[currentPhoto]}`;
}
```

### 6. Custom Cursor (Heart)

Add to `style.css`:

```css
body {
    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><text y="20" font-size="20">💕</text></svg>'), auto;
}

a, button {
    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><text y="20" font-size="20">👆</text></svg>'), pointer;
}
```

### 7. Sparkle Trail Effect

Already implemented! But you can customize:

```javascript
// Change sparkle color
sparkle.style.background = 'radial-gradient(circle, #YOUR_COLOR, transparent)';

// Change sparkle size
sparkle.style.width = '15px';
sparkle.style.height = '15px';

// Add different shapes
sparkle.innerHTML = '✨'; // Use emoji instead
```

### 8. Snow/Petal Fall Effect

Add to `style.css`:

```css
.petal {
    position: fixed;
    font-size: 1.5rem;
    animation: petalFall 10s linear infinite;
    pointer-events: none;
    z-index: 1;
}

@keyframes petalFall {
    to {
        transform: translateY(100vh) rotate(360deg);
    }
}
```

Add to `script.js`:

```javascript
function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.textContent = '🌸';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDelay = Math.random() * 5 + 's';
    document.body.appendChild(petal);
    
    setTimeout(() => petal.remove(), 10000);
}

setInterval(createPetal, 500);
```

### 9. Add Secret Easter Egg

Add hidden message when clicking on name 5 times:

```javascript
let nameClicks = 0;
document.querySelector('h1').addEventListener('click', () => {
    nameClicks++;
    if (nameClicks === 5) {
        alert('You found the secret! You\'re extra special! 💕');
        nameClicks = 0;
    }
});
```

### 10. Animated Background Pattern

Replace solid background with animated pattern:

```css
body {
    background: 
        linear-gradient(135deg, rgba(255,182,193,0.1) 25%, transparent 25%),
        linear-gradient(225deg, rgba(230,230,250,0.1) 25%, transparent 25%),
        linear-gradient(45deg, rgba(255,153,153,0.1) 25%, transparent 25%),
        linear-gradient(315deg, rgba(255,228,225,0.1) 25%, transparent 25%);
    background-size: 80px 80px;
    background-position: 0 0, 0 40px, 40px -40px, -40px 0px;
    animation: backgroundMove 20s linear infinite;
}

@keyframes backgroundMove {
    to {
        background-position: 40px 40px, 40px 80px, 80px 0px, 0px 40px;
    }
}
```

## Interactive Enhancements

### 11. Shake Animation for No Button

When No button is clicked repeatedly:

```javascript
function shakeNoButton() {
    noBtn.style.animation = 'shake 0.5s';
    setTimeout(() => {
        noBtn.style.animation = '';
    }, 500);
}

// Add to CSS
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
}
```

### 12. Sound Effects

Add click sounds (requires audio files):

```javascript
const clickSound = new Audio('assets/sounds/click.mp3');
const successSound = new Audio('assets/sounds/success.mp3');

yesBtn.addEventListener('click', () => {
    successSound.play();
    // ... rest of code
});
```

### 13. Typed Text Effect

Animate the question appearing letter by letter:

```javascript
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Use it
const question = document.querySelector('.text-3xl');
typeWriter(question, 'Will you be my Valentine?');
```

## Mobile-Specific Enhancements

### 14. Vibration Feedback

Add haptic feedback on mobile:

```javascript
if ('vibrate' in navigator) {
    noBtn.addEventListener('click', () => {
        navigator.vibrate(50); // Short vibration
    });
    
    yesBtn.addEventListener('click', () => {
        navigator.vibrate([100, 50, 100, 50, 200]); // Pattern
    });
}
```

### 15. Share Button

Add a share button after acceptance:

```html
<button onclick="shareProposal()" class="share-button">
    Share the Love 💕
</button>
```

```javascript
function shareProposal() {
    if (navigator.share) {
        navigator.share({
            title: 'We\'re Official! 💕',
            text: 'I said yes to being their Valentine!',
            url: window.location.href
        });
    }
}
```

---

**Remember**: Test all customizations before deploying!
