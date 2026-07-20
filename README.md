# VirtualCV

## Project Overview

VirtualCV is a professional developer portfolio website built with standards-based HTML5, CSS3, and modern JavaScript. This repository currently provides the project foundation only; portfolio content and interactive features will be added in later iterations.

## Features (Planned)

- Responsive, mobile-first portfolio layout
- Accessible semantic navigation
- Professional experience, education, skills, and certificate sections
- Data-driven project showcase using `data/projects.json`
- GitHub profile or repository integration
- Contact section and downloadable CV
- Respectful, reduced-motion-aware interface animations

## Folder Structure

```text
VirtualCV/
├── index.html
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── navigation.js
│   ├── animations.js
│   └── typing.js
├── assets/
│   ├── images/
│   ├── icons/
│   ├── certificates/
│   └── pdf/
├── data/
│   └── projects.json
├── README.md
└── favicon.ico
```

## Technologies

- HTML5
- CSS3
- Modern JavaScript (ES6)
- GitHub Pages

## How to Run

No build step or dependencies are required.

1. Clone or download this repository.
2. Open `index.html` in a modern browser, or serve the folder with any static file server.

## GitHub Pages Deployment

1. Push the repository to GitHub.
2. In the repository, open **Settings** → **Pages**.
3. Choose **Deploy from a branch**.
4. Select the branch containing this project and the `/ (root)` folder.
5. Save. GitHub Pages will publish the site and display its URL.

## Future Improvements

- Establish the design system and responsive layouts
- Add accessible portfolio content to the placeholder sections
- Implement navigation, animation, and typing modules
- Add project data and rendering logic
- Add performance, metadata, and accessibility audits
- Include a custom favicon and social sharing metadata
