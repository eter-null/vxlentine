# 💖 valentine website for nazia tabassum 💖

a super fun and chaotic valentine proposal website with neocities vibes!! the no button literally runs away lmao

## ✨ features (aka the cool stuff)

- **dodgy no button**: literally moves away when u try to click it lol
- **neocities aesthetic**: bright colors, comic sans, marquee tags, the works!!
- **confetti explosion**: SO MUCH CONFETTI when they say yes
- **background music**: optional vibes (add ur own!)
- **personal message**: wholesome stuff after they say yes
- **floating emojis**: hearts n stars everywhere
- **mobile friendly**: works on phones too!!
- **chaotic energy**: wobbles, bounces, rainbow text, u name it

## 🎨 the vibe

- bright pinks and pastels
- comic sans (unironically)
- hand-drawn aesthetic
- early 2000s web nostalgia
- chaotic but in a cute way

## 🚀 Quick Start

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vxlentine.git
cd vxlentine
```

2. Open `index.html` in your browser:
```bash
# On Windows
start index.html

# On Mac
open index.html

# On Linux
xdg-open index.html
```

### Adding Background Music

1. Place your music file in `assets/music/` folder
2. Name it `background.mp3` (or update the path in `index.html`)
3. Recommended: Use a soft instrumental romantic song (2-3MB max)

### Adding Custom GIFs

The website uses Giphy GIFs by default. To use your own:

1. Place GIFs in `assets/gifs/` folder
2. Update the `src` attributes in `index.html`:
```html
<img src="assets/gifs/your-gif.gif" alt="Description">
```

## 🌐 GitHub Pages Deployment

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository named `vxlentine`
2. Initialize without README (we already have one)

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Initial commit: Valentine proposal website"
git branch -M main
git remote add origin https://github.com/yourusername/vxlentine.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select `main` branch
4. Click **Save**
5. Your site will be live at: `https://yourusername.github.io/vxlentine/`

### Step 4: Custom Domain (Optional)

1. Purchase a domain name
2. Add a `CNAME` file with your domain
3. Configure DNS settings with your domain provider
4. Update GitHub Pages settings with your custom domain

## 📱 Mobile Optimization

The website is fully responsive and includes:

- Touch-friendly button sizes (min 44×44px)
- Viewport-aware button positioning
- Responsive typography (text scales on smaller screens)
- Optimized GIF sizes for faster loading
- Touch event handling for mobile devices

## 🎭 Customization Guide

### Change the Proposal Text

Edit the text in `index.html`:

```html
<h1 class="...">Your Special Person's Name</h1>
<p class="...">Will you be my Valentine?</p>
```

### Customize the Personal Message

Update the success message section in `index.html`:

```html
<div class="bg-white/70 ...">
    <p class="...">
        Your heartfelt message here...
    </p>
</div>
```

### Adjust Button Behavior

Modify the `noButtonTexts` array in `script.js`:

```javascript
const noButtonTexts = [
    "No",
    "Are you sure?",
    "Your custom text...",
];
```

### Change Color Scheme

Update CSS variables in `style.css`:

```css
:root {
    --blush-pink: #YourColor;
    --lavender: #YourColor;
    /* ... */
}
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **Vanilla JavaScript**: Interactive behavior
- **Canvas Confetti**: Celebration animations
- **Animate.css**: Entrance animations
- **Google Fonts**: Playfair Display & Poppins

## 📦 Project Structure

```
vxlentine/
├── index.html          # Main HTML file
├── style.css           # Custom CSS styles
├── script.js           # JavaScript interactions
├── assets/
│   ├── gifs/          # Custom GIFs (optional)
│   └── music/         # Background music file
├── .workbench/        # Development notes
└── README.md          # This file
```

## 🐛 Troubleshooting

### Music Not Playing

- **Browser Policy**: Some browsers block autoplay. Click the music toggle button.
- **File Missing**: Ensure `background.mp3` exists in `assets/music/`
- **Format**: Use MP3 format for best compatibility

### Buttons Not Working on Mobile

- **Touch Events**: Clear browser cache and try again
- **Viewport**: Ensure the page loads with proper scaling
- **Console Errors**: Check browser console for JavaScript errors

### GIFs Not Loading

- **Internet Connection**: Giphy GIFs require internet connection
- **URL**: Verify GIF URLs are correct and accessible
- **Alternative**: Download GIFs and host locally in `assets/gifs/`

## 📝 License

This project is open source and available for personal use.

## 💌 Credits

Created with love for Nazia Tabassum 💕

---

**Note**: Remember to add your own background music file before deploying!
