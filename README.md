# SafeCity AI

**Stay safe with real-time community alerts.**  
SafeCity AI is an AI-powered web application that predicts safety risks in your city and sends actionable alerts to help users avoid high-risk areas. The platform combines AI predictions, interactive maps, and trend dashboards, with a visually engaging interface featuring animations and light/dark modes.

---

## Table of Contents
- [Inspiration](#inspiration)
- [What it Does](#what-it-does)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [UI/UX & Animations](#uiux--animations)
- [How I Built It](#how-i-built-it)
- [Challenges](#challenges)
- [Accomplishments](#accomplishments)
- [Future Plans](#future-plans)
- [Deployment & Running](#deployment--running)

---

## Inspiration
Community safety is a growing concern in urban areas. Many residents are unaware of real-time risks like crime spikes, accidents, or severe weather. I was inspired to create **SafeCity AI** to help users proactively **avoid danger**, reduce stress, and stay informed using real-time data and AI predictions.

---

## What it Does
SafeCity AI aggregates local data and uses AI to:
- Predict high-risk areas 24–48 hours in advance
- Highlight risk zones on an interactive map
- Provide trend insights and summaries in a dashboard
- Deliver notifications/alerts about nearby hazards

---

## Features
- **Interactive Risk Map:** Color-coded zones (green/yellow/red) with glowing markers in dark mode
- **AI-Powered Predictions:** Rule-based scoring or OpenAI API for predictive insights
- **Notifications & Alerts:** Fade-in/out alerts based on risk levels
- **Dashboard:** Animated cards and charts showing top-risk zones and trends
- **Login/Register Pages:** Smooth fade-in/fade-out animations with hover effects
- **Light/Dark Mode Toggle:**
  - Light mode: Classy home-themed colors (soft blues, warm neutrals)
  - Dark mode: Neon night sky theme with meteor shower effect
- **Responsive Design:** Works on mobile, tablet, and desktop

---

## Tech Stack
**Languages:** HTML5, CSS3, JavaScript (ES6)  
**Frameworks / Libraries:** React (optional), Leaflet.js (map), Chart.js (trends), Tailwind CSS (optional), Google Fonts  
**Animations / Effects:** CSS keyframe animations, hover effects, slide/fade-in transitions, particle.js (for meteor effect)  
**AI / Logic:** Rule-based risk scoring or OpenAI API for insights  
**Data Handling:** Browser LocalStorage for MVP; optional external APIs for weather and local incidents  
**Deployment:** Vercel / Netlify  

---

## UI/UX & Animations
- Smooth transitions for forms, map markers, and dashboard cards
- Hover animations for interactive elements
- Color-coded light/dark themes with toggle switch
- Particle meteor shower in dark mode
- Classy, modern fonts and rounded cards for readability
- Mobile-first design with responsive layouts

---

## How I Built It
1. Set up project folder with `index.html`, `style.css`, `main.js` (or React components)
2. Implemented interactive map using Leaflet.js
3. Added AI/rule-based risk calculation for each zone
4. Created dashboard with animated cards and trend charts (Chart.js)
5. Built login/register pages with fade-in/fade-out transitions
6. Implemented light/dark mode toggle with CSS variables and theme-specific styles
7. Added notification system linked to risk scores
8. Tested on multiple devices for responsiveness
9. Deployed to Vercel for live demo

**Risk Score Formula:**
\[
\text{Risk Score} = w_1(\text{Reported Incidents}) + w_2(\text{Time of Day}) + w_3(\text{Weather}) - w_4(\text{Police Presence})
\]

---

## Challenges
- Balancing **real-time interactivity** with performance
- Designing a **visually appealing dark mode** with neon effects
- Creating animations that are smooth but not distracting
- Managing AI predictions in a **solo MVP project** within limited time

---

## Accomplishments
- Built a **fully functional, visually engaging MVP** as a solo participant
- Integrated AI risk predictions with interactive map and dashboard
- Implemented **light/dark modes with animations**
- Created a hackathon-ready demo that’s easy to present

---

## Future Plans
- Integrate **real-time data APIs** for crime, traffic, and weather
- Add **user accounts and personalized alerts**
- Enhance AI predictions with machine learning models
- Expand notification system to mobile push notifications
- Gamify safety alerts for user engagement

---
