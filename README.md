# ☕ Buna Café

A modern, responsive café website built with **HTML, CSS, and JavaScript**. Buna Café is designed to provide customers with a simple and engaging way to explore the café menu, save favorite items, place orders, and contact the café.

The project was created as a front-end development portfolio project, with a focus on **responsive design, interactive JavaScript functionality, accessibility, and a clean user experience**.

---

## 📌 Live Demo

https://developer121438.github.io/buna-cafe/

**Live Website:** 

---

## 📖 About the Project

Buna Café is a multi-page café website inspired by modern coffee-shop websites.

The website allows users to:

* Explore the café and its featured products
* Browse the complete menu
* Filter menu items by category
* Search for menu items
* Add products to favorites
* Save favorites using browser local storage
* Place orders through an interactive order modal
* Adjust product quantities before ordering
* View an order summary
* Remove individual items from an order
* Clear the entire order
* Receive an order confirmation
* Contact the café through a contact form

The project also includes keyboard accessibility features so that important interactive elements can be operated using **Enter, Space, and Tab**.

---

# ✨ Features

## 🏠 Home Page

The Home page introduces Buna Café and provides visitors with an overview of the café.

It includes:

* Hero section
* Café introduction
* Featured/favorite products
* Navigation to other pages
* Responsive layout
* Interactive favorite products

The **Our Favorites** cards can also be opened with mouse clicks or keyboard controls.

---

## ☕ Menu Page

The Menu page contains the café's complete selection of products.

Menu items are organized into categories such as:

* Coffee
* Tea
* Cold Drinks
* Pastries
* Desserts & Food

### Menu Filtering

Users can select a category to display the relevant products.

The selected category is moved toward the top of the menu to make browsing easier.

### Menu Search

Users can search for products by:

* Product name
* Product description

If no matching item is found, the website displays an appropriate message.

---

# ❤️ Favorites System

Users can add menu items to their favorites by clicking the heart button.

The favorites system supports:

* Add to favorites
* Remove from favorites
* Favorite state indication
* Persistent favorites
* My Favorites section
* Remove from Favorites button

Favorites are stored using:

```javascript
localStorage
```

This means favorites remain available when the user reloads the page.

---

# 🛒 Ordering System

Buna Café includes a JavaScript-powered ordering system.

When a user selects an item, an order modal opens containing:

* Product image
* Product name
* Product description
* Product price
* Quantity controls
* Add to Order button

### Quantity Control

Users can increase or decrease the quantity using:

```text
−   1   +
```

The quantity cannot be reduced below `1`.

---

## 📋 Order Summary

After adding an item to the order, the user can view an order summary containing:

* Ordered products
* Quantity of each product
* Individual prices
* Subtotals
* Total order price

If the same product is ordered multiple times, the system combines the quantities instead of creating unnecessary duplicate entries.

For example:

```text
Macchiato
3 × 100 ETB
300 ETB
```

---

## 🧹 Order Management

Users can:

* Remove individual products
* Clear the entire order
* Continue ordering
* Place the order

When the entire order is cleared, the website displays:

```text
Order Cleared!
```

---

## ✅ Order Confirmation

When the user places an order, the website displays an order confirmation containing the final total.

Example:

```text
Order Confirmed!

Thank you for your order.

Total: 500 ETB
```

---

# ⌨️ Accessibility & Keyboard Support

Accessibility was considered during the development of the project.

Interactive menu and favorite cards can be accessed using the keyboard.

Supported keyboard interactions include:

* **Tab** — move between interactive elements
* **Enter** — activate a focused card or button
* **Space** — activate a focused card or button
* **Shift + Tab** — move backward through focusable elements

The order modal also keeps keyboard focus inside the modal while it is open.

When the modal is closed, keyboard focus returns to the card that originally opened it.

---

# 📱 Responsive Design

The website is designed to work across different screen sizes, including:

* Desktop computers
* Laptops
* Tablets
* Mobile devices

The layout adapts to smaller screens to maintain usability and readability.

---

# 📬 Contact Form

The Contact page includes a form that allows users to enter:

* Name
* Email
* Subject
* Message

The form includes client-side validation for:

* Empty fields
* Email format

A success message is displayed when the form is submitted successfully.

> **Note:** The current contact form is front-end only. It does not send messages to an actual backend email service.

---

# 🛠️ Technologies Used

## HTML5

Used to create the structure and semantic content of the website.

## CSS3

Used for:

* Layout
* Responsive design
* Colors
* Typography
* Animations
* Hover effects
* Modal styling
* Navigation
* Cards

## JavaScript

Used to implement:

* Menu filtering
* Menu search
* Favorites
* Local storage
* Order modal
* Quantity controls
* Order summary
* Order calculations
* Order confirmation
* Contact form validation
* Keyboard accessibility

## Browser Local Storage

Used to persist:

* Favorite items
* Current order

---

# 📁 Project Structure

```text
Buna-Cafe/
│
├── index.html
├── menu.html
├── about.html
├── contact.html
│
├── style.css
├── script.js
│
├── Images/
│   ├── coffee images
│   ├── food images
│   ├── café images
│   └── icons
│
└── README.md
```

---

# 📄 Website Pages

| Page           | Description                          |
| -------------- | ------------------------------------ |
| `index.html`   | Home page and café introduction      |
| `menu.html`    | Complete menu and ordering system    |
| `about.html`   | Information about Buna Café          |
| `contact.html` | Contact information and contact form |

---

# 🚀 How to Run the Project

Because this project uses plain HTML, CSS, and JavaScript, no framework or package installation is required.

### 1. Clone the repository

```bash
git clone https://github.com/Developer121438/buna-cafe/blob/main
```

### 2. Open the project

Navigate into the project directory:

```bash
cd Buna-Cafe
```

### 3. Run the website

Open:

```text
index.html
```

in your browser.

Alternatively, you can use a development extension such as **Live Server** in Visual Studio Code.

---

# 🧪 Testing

The website was tested across its main functionality, including:

* Navigation
* Menu filtering
* Menu search
* Favorite system
* Favorite persistence
* Removing favorites
* Order modal
* Quantity controls
* Adding items to orders
* Repeated orders
* Order summary
* Removing order items
* Clearing orders
* Order confirmation
* Contact form validation
* Keyboard navigation
* Modal focus behavior
* Responsive layout

---

# 🔐 Data & Privacy

Buna Café currently does not use a backend database.

The following information is stored locally in the user's browser:

```text
bunaFavorites
bunaOrder
```

This information is stored using the browser's `localStorage`.

No account or server-side database is currently required.

---

# 🔮 Future Improvements

Possible future improvements include:

* Backend integration
* Real online ordering
* Database integration
* Customer accounts
* Online payment integration
* Real contact-form submission
* Café administration dashboard
* Order tracking
* Customer reviews
* Product availability status
* User authentication
* Improved accessibility
* More advanced animations
* Deployment with a custom domain

---

# 🎯 Project Goals

The main goals of this project were to practice and demonstrate:

* Semantic HTML
* Modern CSS layouts
* Responsive web design
* JavaScript DOM manipulation
* Event handling
* Local storage
* Dynamic UI generation
* Form validation
* Interactive modals
* State management
* Keyboard accessibility
* User experience design

---

# 💡 What I Learned

Through this project, I practiced building a complete multi-page website without relying on a front-end framework.

Some of the most important concepts I practiced include:

* Managing application state with JavaScript
* Working with browser `localStorage`
* Creating dynamic elements with JavaScript
* Handling user interactions
* Building reusable UI behavior
* Implementing keyboard accessibility
* Managing modal focus
* Filtering and searching dynamic content
* Calculating order totals
* Debugging JavaScript interactions
* Organizing a larger front-end project

---

# 👨‍💻 Author

**Dejen Angaw**

Front-End Developer

This project was created as part of my front-end development portfolio.

---

# 📜 License

This project was created for educational and portfolio purposes.

You are welcome to use the project as inspiration for learning and development.

---

## ⭐ Acknowledgment

Built with:

**HTML5 · CSS3 · JavaScript**

☕ **Buna Café — Good Coffee, Good Moments.**
