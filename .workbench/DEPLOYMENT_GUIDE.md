# GitHub Pages Deployment Guide

## Step-by-Step Deployment

### 1. Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Valentine proposal website for Nazia Tabassum"
```

### 2. Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `vxlentine`
3. Description: "A romantic Valentine's Day proposal website"
4. Set to **Public** (required for GitHub Pages free tier)
5. **Do NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### 3. Connect Local Repository to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/vxlentine.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 4. Enable GitHub Pages

1. Go to your repository: `https://github.com/YOUR_USERNAME/vxlentine`
2. Click **Settings** (top right)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**:
   - Branch: Select `main`
   - Folder: Select `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes for deployment

### 5. Access Your Live Site

Your website will be available at:
```
https://YOUR_USERNAME.github.io/vxlentine/
```

## Post-Deployment Checklist

- [ ] Verify all GIFs are loading correctly
- [ ] Test Yes button functionality
- [ ] Test No button dodge behavior on desktop
- [ ] Test buttons on mobile device
- [ ] Check confetti animation triggers properly
- [ ] Test music toggle (if music file added)
- [ ] Verify responsive design on different screen sizes
- [ ] Share link with Nazia Tabassum! 💕

## Updating the Website

After making changes:

```bash
git add .
git commit -m "Description of your changes"
git push
```

GitHub Pages will automatically redeploy within 1-2 minutes.

## Mobile Testing

Test on actual devices:
1. Open the GitHub Pages URL on your phone
2. Test in both portrait and landscape orientations
3. Try clicking the No button (should move away)
4. Click Yes button (should trigger confetti)
5. Test music toggle

## Common Issues & Solutions

### Issue: Music not playing
**Solution**: 
- Ensure `background.mp3` exists in `assets/music/`
- Some browsers block autoplay - users need to click music toggle
- Test in different browsers (Chrome, Safari, Firefox)

### Issue: Buttons not working on mobile
**Solution**:
- Clear browser cache
- Try different mobile browsers
- Check browser console for errors (on desktop)

### Issue: GIFs not loading
**Solution**:
- Giphy GIFs require internet connection
- Check if URLs are accessible
- Consider downloading and hosting GIFs locally

### Issue: Confetti not appearing
**Solution**:
- Check browser console for errors
- Ensure canvas-confetti CDN is loading
- Try a hard refresh (Ctrl+F5 or Cmd+Shift+R)

### Issue: Site not updating after push
**Solution**:
- Wait 2-3 minutes for GitHub Pages to rebuild
- Clear browser cache (hard refresh)
- Check Actions tab in GitHub for build status

## Custom Domain Setup (Optional)

### Using a Custom Domain

1. Purchase domain from provider (Namecheap, GoDaddy, etc.)
2. Create `CNAME` file in repository root:
   ```
   yourdomain.com
   ```
3. Add to git and push:
   ```bash
   echo "yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```
4. Configure DNS with your domain provider:
   - Add A records pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Or add CNAME record: `YOUR_USERNAME.github.io`
5. Update GitHub Pages settings with custom domain
6. Enable "Enforce HTTPS" (wait for SSL certificate)

## Performance Optimization

### Before Deployment:

1. **Optimize GIFs**:
   - Use https://ezgif.com/optimize
   - Target: < 1MB per GIF

2. **Compress Music**:
   - Target: 2-3MB for background music
   - Use MP3 format at 128kbps

3. **Test Load Time**:
   - Use Chrome DevTools Network tab
   - Target: < 5 seconds on 3G

### After Deployment:

1. Test with Google PageSpeed Insights
2. Test on real mobile devices
3. Check different browsers

## Security & Privacy

- No sensitive data is collected
- No cookies or tracking
- All code is client-side (no server)
- Safe to share publicly

## Sharing the Link

Once deployed, you can share via:
- Direct link: Send the GitHub Pages URL
- QR Code: Generate at https://www.qr-code-generator.com/
- Short URL: Use bit.ly or tinyurl.com
- Social media: Works with link previews (og:tags included)

---

**Good luck with your proposal! 💕**
