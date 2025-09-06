# Developer Portfolio

A modern, responsive portfolio website showcasing two unique design variations built with React, Tailwind CSS, and Lucide React icons.

## 🚀 Features

- **Two Unique Designs**: Switch between two completely different portfolio layouts
- **Fully Responsive**: Optimized for all device sizes
- **Modern UI/UX**: Glass morphism effects, smooth animations, and interactive elements
- **Performance Optimized**: Fast loading times and smooth transitions
- **Accessible**: Semantic HTML and proper ARIA attributes
- **SEO Ready**: Meta tags and structured data

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Routing**: React Router DOM v6
- **Build Tool**: Vite
- **Package Manager**: npm/yarn

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/developer-portfolio.git
cd developer-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Build for production:
```bash
npm run build
# or
yarn build
```

## 🎨 Design Features

### Design 1 (Home1)
- Particle background effects
- Floating animation elements
- Gradient text animations
- Interactive skill cards with progress bars
- Project showcase with hover effects
- Smooth scroll animations

### Design 2 (Home2)
- Canvas particle network animation
- Minimalist hero section
- Bento grid service layout
- Timeline experience section
- Dynamic text rotation
- Glass morphism effects

## 📁 Project Structure

```
├── public/
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   └── Button.jsx
│   ├── pages/
│   │   ├── Home1.jsx
│   │   └── Home2.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── input.css
│   └── output.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎯 Customization

### Colors
Edit the CSS variables in `src/input.css`:
```css
:root {
  --primary: 99 102 241;
  --secondary: 236 72 153;
  --accent: 34 211 238;
  /* ... other colors */
}
```

### Content
Update the content in `Home1.jsx` and `Home2.jsx`:
- Personal information
- Skills and experience
- Projects
- Contact details

### Components
The reusable Button component supports multiple variants:
- `primary`, `secondary`, `accent`
- `outline`, `ghost`, `gradient`

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

Build the project and deploy the `dist` folder to any static hosting service:

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop the dist folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Push to gh-pages branch
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

**John Developer**
- GitHub: [@johndeveloper](https://github.com)
- LinkedIn: [John Developer](https://linkedin.com)
- Email: john@example.com

---

Made with ❤️ using React and Tailwind CSS