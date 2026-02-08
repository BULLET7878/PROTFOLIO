# Tunis-Style React Portfolio

A modern, elegant portfolio website built with React.js featuring a Tunis-inspired design with glassmorphism effects, neon highlights, and smooth animations.

## 🎨 Tunis Theme Features

- **Glassmorphism Design**: Modern frosted glass effects with backdrop blur
- **Neon Highlights**: Beautiful neon yellow, blue, and pink accents
- **Left Sidebar Navigation**: Fixed sidebar menu with smooth animations
- **Dark & Light Mode**: Seamless theme switching with localStorage persistence
- **Framer Motion Animations**: Smooth page transitions and component animations
- **Floating Social Icons**: Animated social media links on the right side
- **Responsive Design**: Fully responsive for all devices

## 🚀 Key Features

- **6 Pages**: Home, About, Skills, Portfolio, Services, Contact
- **Portfolio Filters**: Filter projects by category (All, Web, App, Design)
- **Contact Form**: Integrated with EmailJS for form submissions
- **Smooth Scroll**: Elegant scrolling experience
- **Page Transitions**: Animated transitions between pages
- **Theme Toggle**: Switch between dark and light modes

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite)
- **Styling**: Tailwind CSS with custom Tunis theme
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: React Icons (Feather Icons)
- **Email Service**: EmailJS

## 📋 Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx          # Left sidebar navigation
│   ├── Header.jsx            # Top header with menu toggle
│   ├── Footer.jsx            # Footer component
│   ├── FloatingSocial.jsx    # Floating social icons
│   ├── SectionTitle.jsx      # Reusable section title
│   ├── SkillBar.jsx          # Skill progress bar
│   ├── ProjectCard.jsx       # Portfolio project card
│   └── ContactForm.jsx       # Contact form with EmailJS
├── pages/
│   ├── Home.jsx              # Home page
│   ├── About.jsx             # About page
│   ├── Skills.jsx            # Skills page
│   ├── Portfolio.jsx         # Portfolio with filters
│   ├── Services.jsx          # Services page
│   └── Contact.jsx            # Contact page
├── context/
│   └── ThemeContext.jsx       # Theme context provider
├── data/
│   └── portfolioData.js      # Portfolio projects data
├── App.jsx                    # Main app component
└── main.jsx                   # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rahul-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Configure EmailJS (optional):
   - Open `src/components/ContactForm.jsx`
   - Replace `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, and `YOUR_PUBLIC_KEY` with your EmailJS credentials

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎨 Tunis Theme Customization

### Color Palette
- **Tunis Yellow**: #ffd700 (Primary accent)
- **Tunis Yellow Light**: #ffed4e
- **Neon Blue**: #00f0ff
- **Neon Pink**: #ff00ff
- **Neon Green**: #00ff88
- **Dark Background**: #0a0a0a
- **Gray Background**: #1a1a1a

### Typography
- **Primary Font**: Inter (clean, modern)
- **Secondary Font**: Poppins (for headings)

### Glassmorphism
- Uses `backdrop-filter: blur(10px)` for frosted glass effect
- Semi-transparent backgrounds with borders
- Custom shadow effects

## 📧 EmailJS Setup

To enable the contact form functionality:

1. Sign up for EmailJS at [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create a service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Public Key from the Integration page
5. Update `src/components/ContactForm.jsx`:
   ```javascript
   await emailjs.send(
     'YOUR_SERVICE_ID',      // Replace with your service ID
     'YOUR_TEMPLATE_ID',    // Replace with your template ID
     {
       from_name: formData.name,
       from_email: formData.email,
       subject: formData.subject,
       message: formData.message,
     },
     'YOUR_PUBLIC_KEY'       // Replace with your public key
   );
   ```

## 📱 Responsive Design

The portfolio is fully responsive:
- **Mobile**: Sidebar hidden, accessible via menu button
- **Tablet**: Optimized layout for medium screens
- **Desktop**: Full sidebar visible, floating social icons

## 🎯 Features Breakdown

### Navigation
- Fixed left sidebar (desktop)
- Mobile hamburger menu
- Active page highlighting
- Smooth page transitions

### Portfolio
- Filter by category (All, Web, App, Design)
- Animated project cards
- Hover effects
- GitHub and live demo links

### Skills
- Animated progress bars
- Categorized skills (Frontend, Backend, Tools)
- Icon support

### Contact
- EmailJS integration
- Form validation
- Success/error states
- Contact information display

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using React, Vite, and Tailwind CSS
