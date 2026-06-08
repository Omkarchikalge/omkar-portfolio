# Omkar Chikalge — Portfolio

Dark terminal-aesthetic portfolio built with **React + Vite**. No frameworks, no component libraries — pure React + CSS variables.

## Tech Stack
- React 18 + Vite 5
- JetBrains Mono + Syne (Google Fonts)
- CSS Custom Properties (design tokens)
- IntersectionObserver for scroll animations
- Zero external dependencies

## Local Dev
```bash
npm install
npm run dev
```

## Deploy

### Vercel (recommended — one click)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag & drop the `dist/` folder to app.netlify.com/drop
```

### GitHub Pages
1. Set `base: '/omkar-portfolio/'` in `vite.config.js`
2. `npm run build`
3. Push `dist/` to the `gh-pages` branch

## Customise
- **Content** → Edit data directly in each component (`Hero.jsx`, `Projects.jsx`, `Skills.jsx`)
- **Colors** → Change `--accent` in `src/index.css` `:root`
- **Photo** → Replace the avatar block in `Hero.jsx` with `<img src="your-photo.jpg" .../>`
- **Email** → Search for `omkar.chikalge@gmail.com` and replace

## Structure
```
src/
  components/
    Cursor.jsx        — custom cursor
    ScrollProgress.jsx — top progress bar
    Navbar.jsx        — sticky nav
    Hero.jsx          — landing + terminal + boot animation
    About.jsx         — bio + learning path
    Skills.jsx        — skill grid + roadmap
    Projects.jsx      — project cards
    Contact.jsx       — social links + contact form
    Footer.jsx
    useInView.js      — scroll animation hook
  index.css           — global tokens + resets
  App.jsx
  main.jsx
```
