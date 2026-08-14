# ✦ Cosmos Atlas — Exoplanet Data Explorer

### Developed by Stephany Gonçalves da Silva

**Cosmos Atlas** is an interactive data visualization project focused on confirmed exoplanets, planetary systems and the exploration of astronomical data.

Astronomy has been one of my greatest passions since I was a child. I have always been fascinated by the Universe, distant planets and the possibility of discovering worlds beyond our Solar System.

Because of that connection, Cosmos Atlas became one of the most meaningful projects in my portfolio. It combines a subject that has always inspired me with my journey in technology, data analysis and front-end development.

🔗 **Live Project:**  
https://silva-stephany.github.io/cosmos-atlas/

---

## 🌌 About the Project

Cosmos Atlas transforms real astronomical data into an interactive web experience where users can explore confirmed exoplanets, compare distant worlds, investigate discovery patterns and analyze planetary systems.

The project combines:

- Front-end development
- Data exploration
- Data visualization
- Interactive filtering
- Astronomical datasets
- Analytical modeling
- Responsive interface design

The goal was not only to build a functional website, but also to transform a large scientific dataset into an interface that is easier and more engaging to explore.

---

## 🔭 Data Source

The project uses confirmed exoplanet data obtained from the **NASA Exoplanet Archive**.

The dataset includes planetary and stellar parameters such as:

- Planet name
- Host star
- Discovery method
- Discovery year
- Orbital period
- Planet radius
- Planet mass
- Equilibrium temperature
- Stellar insolation
- System distance
- Stellar temperature
- Stellar radius
- Stellar mass
- Number of planets in each system

The data is stored locally in CSV format and processed directly in the browser using JavaScript.

> Astronomical datasets are continuously updated. The values displayed in this project represent the version of the dataset included in this repository.

---

## ✨ Main Features

### 🪐 Overview Dashboard

The main dashboard provides a quick overview of the exoplanet dataset.

It includes indicators such as:

- Confirmed exoplanets
- Planetary systems
- Discovery methods
- Latest discovery year

The dashboard also presents visualizations showing:

- Major exoplanet discovery methods
- Confirmed discoveries through time

---

### 🔎 Exoplanet Explorer

The **Explore** page provides an interactive catalog of confirmed exoplanets.

Users can search and filter planets by:

- Planet name
- Discovery method
- Discovery year

The results table includes:

- Planet
- Host star
- Discovery method
- Discovery year
- Planet radius
- Planet mass
- Distance from Earth

This feature makes it possible to explore a large astronomical dataset without manually navigating raw CSV data.

---

### ⚖️ Planet Comparison

The **Compare** page allows two confirmed exoplanets to be selected and analyzed side by side.

The comparison includes:

- Planet radius
- Planet mass
- Orbital period
- Equilibrium temperature
- Distance
- Discovery year

This provides a simple visual way to understand how different exoplanets compare physically and dynamically.

---

### 🌱 Habitability Potential

Cosmos Atlas includes an experimental **Habitability Potential Score**.

The model considers selected planetary parameters including:

- Planet radius
- Stellar insolation
- Equilibrium temperature
- Planet mass

Each parameter contributes to an educational score designed to demonstrate how different variables can be combined into an analytical model.

> **Important:** The Habitability Potential Score is an educational analytical model created specifically for this portfolio project.

> It is not an official NASA classification and does not determine whether an exoplanet is habitable or capable of supporting life.

---

### 🕰️ Discovery History

The **Discoveries** page explores how confirmed exoplanet discoveries have evolved over time.

The visualizations include:

- Confirmed discoveries by year
- Discovery methods through time
- Peak discovery periods
- Historical changes in detection techniques

This analysis helps demonstrate how techniques such as **Transit** and **Radial Velocity** contributed to the expansion of the known exoplanet population.

---

### ⭐ Planetary Systems

The **Systems** page groups planets according to their host stars and explores the structure of planetary systems.

The analysis includes:

- Total planetary systems
- Multi-planet systems
- Largest system in the dataset
- Average system distance
- Systems with the most confirmed planets
- Distribution of planets per system
- Stellar temperature
- Stellar radius
- Stellar mass

This section moves the analysis beyond individual planets and provides a broader view of planetary architecture.

---

### 📖 About

The **About** page presents additional context about:

- The purpose of Cosmos Atlas
- The astronomical dataset
- The analytical approach
- The educational habitability model
- Technologies used
- Project authorship

---

## 📊 Data Visualization

Interactive visualizations are created using **Chart.js**.

The project contains different visualization formats, including:

- Bar charts
- Horizontal rankings
- Historical line charts
- Discovery method timelines
- Planetary system distributions

The charts are generated dynamically from the CSV dataset using JavaScript.

---

## 🛠️ Technologies

Cosmos Atlas was built with:

- HTML5
- CSS3
- JavaScript
- Chart.js
- CSV
- NASA Exoplanet Archive data
- Git
- GitHub
- GitHub Pages

The project was developed without a front-end framework.

---

## 📁 Project Structure

```text
cosmos-atlas/
│
├── index.html
│
├── galaxy-bg.png.png
│
├── README.md
│
├── css/
│   └── style.css
│
├── data/
│   └── exoplanets.csv
│
├── js/
│   ├── shared.js
│   ├── explore.js
│   ├── compare.js
│   ├── habitability.js
│   ├── discoveries.js
│   └── systems.js
│
└── pages/
    ├── explore.html
    ├── compare.html
    ├── habitability.html
    ├── discoveries.html
    ├── systems.html
    └── about.html
```

---

## 🎨 Design

Cosmos Atlas was designed with a visual identity inspired by deep space and science-fiction interfaces.

The interface combines:

- Galaxy-inspired background imagery
- Deep navy and black surfaces
- Blue and violet accents
- Futuristic typography
- Glassmorphism-inspired cards
- Subtle transparency effects
- Soft borders and glow effects
- Interactive hover states
- Data-focused layouts

The goal was to create an immersive astronomical atmosphere while keeping the data readable and the interface professional.

The galaxy remains intentionally subtle in the background so that it supports the theme without becoming the main visual focus.

---

## 📱 Responsive Design

The interface was designed to adapt to different screen sizes.

Responsive behavior includes:

- Flexible card grids
- Adaptive page spacing
- Responsive charts
- Mobile-friendly content organization
- Scrollable data tables
- Flexible analytical panels

This allows Cosmos Atlas to remain usable across desktop and smaller screen sizes.

---

## 🧠 What I Practiced

Cosmos Atlas allowed me to practice both technical and analytical skills.

Throughout the development of the project, I worked with:

- Real-world scientific datasets
- CSV parsing with JavaScript
- Data cleaning and transformation
- Data grouping and aggregation
- Unique value extraction
- Search and filtering logic
- Analytical indicators
- Ranking systems
- Interactive data visualization
- Chart.js
- DOM manipulation
- Responsive front-end development
- Multi-page website architecture
- Git and GitHub workflows
- GitHub Pages deployment
- Debugging data-processing issues
- Designing interfaces around data

One of the most valuable parts of this project was learning how raw data can be transformed into an interactive experience that communicates information visually.

---

## 💡 Why This Project Matters to Me

Astronomy has fascinated me since childhood.

Questions about planets, stars, galaxies and worlds beyond our Solar System have always captured my attention. Years later, while developing my skills in technology and data, I had the opportunity to connect that long-standing interest with something I could actually build.

Cosmos Atlas represents that connection.

It allowed me to combine curiosity about the Universe with programming, data analysis and visualization.

For that reason, this is not only a technical portfolio project, but also one of the projects that carries the most personal meaning for me.

---

## 🚀 Future Improvements

Possible future developments for Cosmos Atlas include:

- More advanced exoplanet filters
- Additional stellar analysis
- Planet radius vs. mass scatter plots
- Distance and temperature visualizations
- Improved habitability modeling
- Automated dataset updates
- More advanced CSV processing
- Improved mobile navigation
- Additional astronomical datasets
- More detailed planetary system analysis
- Interactive planet detail pages

---

## 📚 Key Takeaways

Cosmos Atlas demonstrates how front-end development and data analysis can work together to transform a scientific dataset into an interactive product.

The project includes:

**Data → Processing → Analysis → Visualization → Interaction**

Rather than displaying static information, the application processes astronomical data directly in the browser and allows users to explore the results through different perspectives.

---

## 👩‍💻 Author

### Stephany Gonçalves da Silva

Designed and developed as a portfolio project focused on:

**Front-end Development • Data Analysis • Data Visualization**

Cosmos Atlas also represents the intersection between my professional learning journey and a passion for astronomy that has been part of my life since childhood.

---

## 📌 Disclaimer

Cosmos Atlas is an independent educational portfolio project.

It is not affiliated with or endorsed by NASA.

Astronomical information used in the project comes from publicly available data from the **NASA Exoplanet Archive**.

The **Habitability Potential Score** is an experimental educational indicator created for this project and must not be interpreted as a scientific determination of planetary habitability.

---

## ✦ Cosmos Atlas

**Exploring distant worlds through data.**

Designed & developed by **Stephany Gonçalves da Silva**.
