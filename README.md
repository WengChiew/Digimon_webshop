# Responsive Webshop — Webtechnologie Projectopdracht

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Mobile First](https://img.shields.io/badge/Design-Mobile--First-brightgreen?style=flat-square)](#mobile-first-approach)

Een volledige, interactieve en volledig responsieve webshop gebouwd voor een fictief bedrijf als projectopdracht voor het vak **Webtechnologie** aan AP Hogeschool. Het project is stapsgewijs opgebouwd via een mobile-first benadering en combineert semantische HTML5, moderne CSS3 lay-outs en dynamische JavaScript-functionaliteiten.

## 🚀 Concept & Webshop Details
* **Bedrijfsnaam:** [Vul hier de naam van je fictieve webshop in, bijv. EcoSeeds / CardHub]
* **Niche / Producten:** [Korte beschrijving van wat je winkel verkoopt, bijv. Duurzame plantenwenskaarten of TCG accessoires]
* **Doelgroep:** [Bijv. Natuurliefhebbers / TCG-verzamelaars]
* **Design Basis:** Gebaseerd op het officiële Figma Community template, gepersonaliseerd met een eigen kleurenpalet en typografie.

---

## ✨ Features per Deelopdracht

De webshop is stapsgewijs ontwikkeld aan de hand van 7 opeenvolgende deelopdrachten:

1.  **Concept & Content:** Bepalen van de branding, verzamelen van rechtenvrije afbeeldingen (met correcte `figcaption` bronvermeldingen) en schrijven van professionele Nederlandse content.
2.  **Mobile-First HTML & CSS:** Opbouw van de core structuur geoptimaliseerd voor smartphones (structuur, semantiek en formulieren).
3.  **Responsive Design:** Uitbreiding naar tablets, laptops en desktops met behulp van CSS media queries, Flexbox en CSS Grid.
4.  **Contactpagina & Validatie:** Een functioneel contactformulier voorzien van client-side HTML5/JavaScript validatie en foutboodschappen.
5.  **Winkelmandje & Wishlist:** Interactieve winkelwagen en verlanglijst functionaliteit aangedreven door JavaScript, inclusief updates in real-time.
6.  **Contactpagina Kaart:** Integratie van een interactieve kaart op de contactpagina (via Leaflet.js / OpenStreetMap / Google Maps).
7.  **Dynamische Content:** Inladen en renderen van data via een asynchrone API-koppeling of lokaal JSON-bestand met JavaScript Promises.

---

## 🛠️ Tech Stack & Richtlijnen

* **Markup:** Semantische HTML5 (valideert volgens W3C standaarden).
* **Styling:** Custom CSS3 (gebruik van CSS variabelen, Flexbox, Grid, en een clean `reset.css` bestand).
* **Scripting:** Vanilla JavaScript (ES6+) voor DOM-manipulatie, events en asynchrone logica.
* **Bibliotheken:** [Bijv. Leaflet.js voor de kaartcomponent / Typ hier eventuele andere JS libraries].
* **Methodologie:** Mobile-First design & ontwikkeling conform de opgelegde *Coding Guidelines*.

---

## 📱 Mobile-First Approach

Dit project stelt de mobiele ervaring centraal. De lay-out past zich vloeiend aan op basis van de schermgrootte:
* **Mobile (< 768px):** Enkelkoloms lay-out, compacte navigatie (hamburger menu) en geoptimaliseerde touch-targets.
* **Tablet (≥ 768px):** Uitbreiding naar multi-kolom grids voor productoverzichten.
* **Desktop (≥ 1024px):** Volledige desktopweergave met uitgebreide navigatie, grotere productafbeeldingen (aspect-ratio 1:1, 500x500px) en geavanceerde hover-effecten.

---

## 📦 Installatie & Lokaal Starten

Volg deze stappen om het project lokaal te bekijken:

1.  **Kloon de repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[JouwGebruikersnaam]/[Jouw-Repo-Naam].git
    ```
2.  **Navigeer naar de projectmap:**
    ```bash
    cd [Jouw-Repo-Naam]
    ```
3.  **Open het project:**
    * Open `index.html` rechtstreeks in je browser.
    * *Aanbevolen:* Gebruik de VS Code extensie **Live Server** om de asynchrone JavaScript features (zoals API/JSON fetches) correct te laten werken zonder CORS-beperkingen.

---

## 📂 Mappenstructuur

```text
├── assets/
│   ├── css/
│   │   ├── reset.css          # CSS Reset om browserinconsistenties weg te werken
│   │   ├── style.css          # Hoofdstijlblad (variabelen, algemene styling)
│   │   └── responsive.css     # Media queries voor tablet & desktop
│   ├── js/
│   │   ├── main.js            # Algemene scripts en navigatie
│   │   ├── shop.js            # Logica voor winkelmandje & wishlist
│   │   └── contact.js         # Validatie en kaartintegratie
│   └── img/                   # Georganiseerde, rechtenvrije product- en sfeerbeelden
├── data/
│   └── products.json          # Dynamische productdata (indien van toepassing)
├── index.html                 # Homepage
├── producten.html             # Productoverzicht & detailpagina's
├── contact.html               # Contactpagina met formulier en kaart
└── README.md                  # Projectdocumentatie
