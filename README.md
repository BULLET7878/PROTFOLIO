# Rahul Dhakad - Full Stack Portfolio

A premium, elegant portfolio website built with React.js using a modern, semantic CSS architecture. Features a dark/light theme, custom animations, and a seamless contact experience.

## 🚀 Key Features

- **Semantic Architecture**: No more utility-class mess. Every component uses human-readable, semantic CSS classes for maximum maintainability.
- **Dark & Light Mode**: A sophisticated theme engine that persists your preference via `localStorage`.
- **Formspree Integration**: A fully functional, password-less contact form that delivers messages directly to your inbox.
- **Framer Motion**: Smooth page transitions and interactive micro-animations throughout the UI.
- **Clean Codebase**: Removed all legacy build artifacts and unused dependencies for a lightning-fast experience.

## 🎨 Design System

The portfolio uses a robust CSS variable system for themes:
- **Primary Color**: `#00a2ff` (Vibrant Blue)
- **Backgrounds**: Dynamic HSL colors that adjust for glassmorphism and depth.
- **Typography**: Modern, clean sans-serif stack.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite)
- **Styling**: Vanilla CSS (Semantic naming)
- **Animations**: Framer Motion
- **Icons**: React Icons (Feather & FontAwesome)
- **Contact Service**: Formspree (Direct to Email)

## 📋 Project Structure

```
src/
├── components/          # React components (.jsx)
├── styles/              # Dedicated component styles (.css)
├── context/             # Global State (Theme management)
├── data/                # Project and skill data
├── App.jsx              # Main routing and theme setup
└── main.jsx             # Entry point
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 📧 Contact Setup

The contact form uses Formspree. 
- All messages are currently configured to go to `rahuldhakarmm@gmail.com`.
- **First-time setup**: Send a test message from your live site/dev and click "Verify" in the email you receive from Formspree.

---
Built with ❤️ by Rahul Dhakad
