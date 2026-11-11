# UnityCampus — Smart Campus & Student Life Hub (web app)

**UnityCampus** is an all-in-one web application built to streamline and enhance the academic, wellness, and daily student experience. It provides students with a unified platform offering study tools, personal finance tracking, wellness monitors, collaborative community features, and academic planning utilities wrapped in a modern, developer-inspired dark/light theme interface.

##  Features

###  Study Tools:

- **Grade & GPA Calculator:** Add subjects, marks, and credits dynamically to calculate your projected GPA instantly.

- **Quick Notes (Vue.js Powered):** Real-time subject tagging, note creation, and local persistence for quick reference.

- **Budget Tracker:** Monitor personal finances by logging incomes and expenses with real-time balance calculations in LKR.

###  Mind & Body Care — Wellness

- **Daily Mood Tracker:** Interactive mood log to capture daily emotional well-being along with a 7-day visual history.

- **Sleep Tracker:** Bedtime and wake-up duration calculator with historical records.

- **Pomodoro Focus Timer:** Customizable study break timer featuring 25-minute focus intervals, short/long breaks, and daily completed session counters.

- **Curated Wellness Tips:** Quick recommendations for maintaining physical and mental balance.

###  Planner, Community & Resources

- **Planner:** Keep track of assignments, deadlines, exams, and daily academic tasks.

- **Community:** Connect and collaborate with fellow students across courses and interest groups.

- **Resources:** Central hub for shared notes, past papers, reference guides, and study materials.

- **About Us:** Information on the developer team and mission behind UnityCampus.

##  UI & UX Highlights

- **Theme Switcher:** Seamless Dark and Light theme switching powered by CSS custom variables and localized browser state.

- **Responsive Navigation:** Mobile-friendly hamburger navigation and sleek footer links across all pages.

- **Modern Aesthetic:** Typography powered by *Space Grotesk*, *JetBrains Mono*, and *Inter*, featuring subtle grid lines and dot-matrix background patterns.


## Tech stack
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
  - **HTML5** — semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
  - **CSS3** — custom properties for theming, Grid and Flexbox, no framework ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
  - **JavaScript (ES6+)** — vanilla JS for the home page behaviour ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
- **Frameworks & Libraries:**
  - **Vue.js** (loaded from a CDN) — reactive features on the interactive pages ![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?logo=vuedotjs&logoColor=white)
- **Web Storage API** (`localStorage`) — persistence, no backend required
- **Iconography:** Google Material / Custom SVG Vectors


##Project Structure

```
├── index.html
├──pages         
  ├── planner.html       
  ├── community.html     
  ├── resources.html     
  ├── study tools.html   
  ├── wellness.html      
  ├── about us.html      
└── README.md          

```

##Quick Start / Local Setup

1. **Clone the repository:**

   ```
   git clone https://github.com/kaushalyaherathcs/smart_campus_student_lifehub_webapp.git
   
   ```

2. **Navigate into the project directory:**

   ```
   cd smart_campus_student_lifehub_webapp
   
   ```

3. **Launch the application:**
   Simply open `index.html` (or any `.html` file) in your preferred browser, or use a local development server like VS Code Live Server:

   ```
   # If using Live Server or npx serve:
   npx serve .
   
   ```

## 👤 Developer

Developed by ([@kaushalyaherathcs](https://github.com/kaushalyaherathcs)).<br>
all right received

## 📄 License

This project is licensed under the [MIT License](LICENSE).
