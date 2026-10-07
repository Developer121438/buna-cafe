/* =========================================================
   STAGE 1 — SHARED WEBSITE FUNCTIONALITY
========================================================= */

/* =========================================================
   1. CURRENT PAGE NAVIGATION
========================================================= */

const currentPage = window.location.pathname.split("/").pop();

const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});

/* =========================================================
   2. SMOOTH SCROLLING
========================================================= */

const pageLinks = document.querySelectorAll('a[href^="#"]');

pageLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");

    if (targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
// =====================================================
// MOBILE NAVIGATION
// =====================================================

const menuToggle = document.querySelector(".menu-toggle");

const navigationMenu = document.querySelector("nav ul");

if (menuToggle && navigationMenu) {
  menuToggle.addEventListener("click", function () {
    navigationMenu.classList.toggle("show");

    const isOpen = navigationMenu.classList.contains("show");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
  });
}
/* =========================================================
   STAGE 2 — MENU FILTERING AND CATEGORY REORDERING
========================================================= */

/* =========================================================
   1. GET MENU ELEMENTS
========================================================= */

const filterButtons = document.querySelectorAll(".menu-filter button");

let selectedCategory = "all";

const menuFilter = document.querySelector(".menu-filter");

const menuCategories = Array.from(document.querySelectorAll(".menu-category"));

/* =========================================================
   2. SAVE THE ORIGINAL CATEGORY ORDER
========================================================= */

const originalCategoryOrder = [...menuCategories];

/* =========================================================
   3. FILTER MENU CATEGORIES
========================================================= */

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    selectedCategory = this.dataset.category;

    /* -----------------------------------------------
           Remove active class from all buttons
        ------------------------------------------------ */

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    /* -----------------------------------------------
           Add active class to clicked button
        ------------------------------------------------ */

    this.classList.add("active");

    /* -----------------------------------------------
           Show / hide menu categories
        ------------------------------------------------ */

    menuCategories.forEach((category) => {
      const cards = category.querySelectorAll(".menu-card");

      const categoryMatches = Array.from(cards).some((card) => {
        return card.dataset.category === selectedCategory;
      });

      if (selectedCategory === "all" || categoryMatches) {
        category.classList.remove("hidden");
      } else {
        category.classList.add("hidden");
      }
    });

    /* =================================================
           4. MOVE SELECTED CATEGORY BELOW FILTER BUTTONS
        ================================================= */

    if (selectedCategory !== "all") {
      const selectedCategoryElement = menuCategories.find((category) => {
        const card = category.querySelector(".menu-card");

        return card && card.dataset.category === selectedCategory;
      });

      if (selectedCategoryElement) {
        menuFilter.after(selectedCategoryElement);
      }
    } else {
      /* =================================================
           5. RESTORE ORIGINAL ORDER WHEN "ALL" IS CLICKED
        ================================================= */
      originalCategoryOrder.forEach((category) => {
        menuFilter.after(category);
      });
    }
  });
}); /* =========================================================
   MENU SEARCH — SEARCH AND REORDER RESULTS
========================================================= */

const menuSearch =
    document.querySelector("#menuSearch");

const noSearchResults =
    document.querySelector("#noSearchResults");

if (menuSearch) {

    menuSearch.addEventListener("input", function() {
  const searchTerm = this.value.toLowerCase().trim();
  let totalMatches = 0;

  /* =====================================================
       SEARCH EVERY CATEGORY
    ===================================================== */

  menuCategories.forEach((category) => {
    const container = category.querySelector(".menu-container");

    const cards = Array.from(container.querySelectorAll(".menu-card"));

    const matchingCards = [];

    cards.forEach((card) => {
      const itemName = card.querySelector("h3").textContent.toLowerCase();

      const itemDescription = card.querySelector("p").textContent.toLowerCase();

      const matchesSearch =
        searchTerm === "" ||
        itemName.includes(searchTerm) ||
        itemDescription.includes(searchTerm);

      const matchesCategory =
        selectedCategory === "all" ||
        card.dataset.category === selectedCategory;

      if (matchesSearch && matchesCategory) {
        matchingCards.push(card);
        totalMatches++;
      }
    });

    /* =================================================
           SHOW / HIDE CARDS
        ================================================= */

    cards.forEach((card) => {
      if (matchingCards.includes(card)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });

    /* =================================================
           PUT MATCHING CARDS FIRST
        ================================================= */

    if (searchTerm !== "" && matchingCards.length > 0) {
      matchingCards.reverse().forEach((card) => {
        container.prepend(card);
      });
    }

    /* =================================================
           SHOW / HIDE CATEGORY
        ================================================= */

    if (matchingCards.length > 0) {
      category.classList.remove("hidden");
    } else {
      category.classList.add("hidden");
    }
  });

  /* =====================================================
       WHEN "ALL" IS SELECTED
       MOVE MATCHING CATEGORY TO THE TOP
    ===================================================== */

  if (selectedCategory === "all" && searchTerm !== "") {
    const matchingCategories = [];

    menuCategories.forEach((category) => {
      if (!category.classList.contains("hidden")) {
        matchingCategories.push(category);
      }
    });

    /* Move matching categories below filter.
           Reverse order preserves their original order. */

    matchingCategories.reverse().forEach((category) => {
      menuFilter.after(category);
    });
  }

  if (searchTerm !== "" && totalMatches === 0) {
    noSearchResults.hidden = false;
  } else {
    noSearchResults.hidden = true;
  }
});}

// =====================================================
// FAVORITE ITEMS
// =====================================================

const menuCards = document.querySelectorAll(".menu-card");

menuCards.forEach((card) => {
    card.setAttribute("tabindex", "0");
});

// Get previously saved favorites
let favorites = JSON.parse(localStorage.getItem("bunaFavorites")) || [];

menuCards.forEach((card) => {
  const favoriteButton = document.createElement("button");

  favoriteButton.type = "button";
  favoriteButton.classList.add("favorite-button");

  favoriteButton.setAttribute("aria-label", "Add to favorites");

  // Get the item's name
  const itemName = card.querySelector("h3").textContent.trim();

  // Give the button the saved state
  if (favorites.includes(itemName)) {
    favoriteButton.classList.add("active");
    favoriteButton.textContent = "♥";
    favoriteButton.setAttribute("aria-label", "Remove from favorites");
  } else {
    favoriteButton.textContent = "♡";
  }

  card.appendChild(favoriteButton);

  // Handle favorite click
  favoriteButton.addEventListener("click", function (event) {
    // Prevent the menu card from opening the order modal
    event.stopPropagation();

    if (favorites.includes(itemName)) {
      // Remove from favorites
      favorites = favorites.filter((favorite) => favorite !== itemName);

      favoriteButton.classList.remove("active");
      favoriteButton.textContent = "♡";
      favoriteButton.setAttribute("aria-label", "Add to favorites");
    } else {
      // Add to favorites
      favorites.push(itemName);

      favoriteButton.classList.add("active");
      favoriteButton.textContent = "♥";
      favoriteButton.setAttribute("aria-label", "Remove from favorites");
    }

    // Save favorites
    localStorage.setItem("bunaFavorites", JSON.stringify(favorites));
    displayFavorites();
  });
});

const favoritesContainer = document.querySelector("#favoritesContainer");

const noFavorites = document.querySelector("#noFavorites");

function displayFavorites() {

  // Stop if the favorites section does not exist on this page
  if (!favoritesContainer || !noFavorites) {
    return;
  }

  // Clear the current favorites
  favoritesContainer.innerHTML = "";

  // No favorites
  if (favorites.length === 0) {
    noFavorites.hidden = false;
    return;
  }

  noFavorites.hidden = true;

  favorites.forEach((favoriteName) => {
    // Find the original menu card
    const originalCard = Array.from(menuCards).find((card) => {
      const name = card.querySelector("h3").textContent.trim();

      return name === favoriteName;
    });

    // Skip if the original card cannot be found
    if (!originalCard) {
      return;
    }

    // Create a copy of the card
    const favoriteCard = originalCard.cloneNode(true);
      favoriteCard.classList.add("favorite-card");

    // Prevent another favorite button
    const favoriteButton = favoriteCard.querySelector(".favorite-button");

    if (favoriteButton) {
      favoriteButton.remove();
    }

    // Add a remove button
    const removeButton = document.createElement("button");

    removeButton.type = "button";
    removeButton.classList.add("remove-favorite");

    removeButton.textContent = "Remove from Favorites";

    removeButton.addEventListener("click", function (event) {
    event.stopPropagation();

    // Remove from favorites array
    favorites = favorites.filter((favorite) => favorite !== favoriteName);

    // Update the heart icon on the original menu card
    const originalFavoriteButton =
        originalCard.querySelector(".favorite-button");

    if (originalFavoriteButton) {
        originalFavoriteButton.classList.remove("active");
        originalFavoriteButton.textContent = "♡";
        originalFavoriteButton.setAttribute(
            "aria-label",
            "Add to favorites"
        );
    }

    // Save updated favorites
    localStorage.setItem(
        "bunaFavorites",
        JSON.stringify(favorites)
    );

    // Refresh favorite list
    displayFavorites();
});

favoriteCard.appendChild(removeButton);
/* Make the favorite card keyboard accessible */
favoriteCard.setAttribute("tabindex", "0");

/* Open the order modal when the favorite card is clicked */
favoriteCard.addEventListener("click", function () {

    cardThatOpenedOrder = this;

    const image = this.querySelector("img");
    const name = this.querySelector("h3");
    const description = this.querySelector("p");
    const price = this.querySelector("span");

    orderImage.src = image.src;
    orderImage.alt = image.alt;

    orderName.textContent = name.textContent;
    orderDescription.textContent = description.textContent;
    orderPrice.textContent = price.textContent;

    quantity = 1;
    quantityDisplay.textContent = quantity;

    orderModal.classList.add("show");

    setTimeout(() => {
        closeOrder.focus();
    }, 0);
});

favoriteCard.addEventListener("keydown", function (event) {

    if (event.key !== "Enter" && event.key !== " ") {
        return;
    }

    event.preventDefault();

    cardThatOpenedOrder = this;

    const image = this.querySelector("img");
    const name = this.querySelector("h3");
    const description = this.querySelector("p");
    const price = this.querySelector("span");

    orderImage.src = image.src;
    orderImage.alt = image.alt;
    orderName.textContent = name.textContent;
    orderDescription.textContent = description.textContent;
    orderPrice.textContent = price.textContent;

    quantity = 1;
    quantityDisplay.textContent = quantity;

    orderModal.classList.add("show");

    setTimeout(() => {
        closeOrder.focus();
    }, 0);
});

favoritesContainer.appendChild(favoriteCard);
  });
}

// Display saved favorites when the page loads

displayFavorites();

/* =========================================================
   STAGE 3 — MENU ORDERING SYSTEM
========================================================= */

/* =========================================================
   1. GET MENU CARDS
========================================================= */

const orderCards = document.querySelectorAll(".menu-card, .favorite-card");

console.log("Number of menu cards:", orderCards.length);

/* =========================================================
   2. CREATE EMPTY ORDER
========================================================= */

let order = JSON.parse(localStorage.getItem("bunaOrder")) || [];

function saveOrder() {
  localStorage.setItem("bunaOrder", JSON.stringify(order));
}

let quantity = 1;

let cardThatOpenedOrder = null;

/* =========================================================
   3. CREATE ORDER MODAL
========================================================= */

const orderModal = document.createElement("div");

orderModal.classList.add("order-modal");

const orderBox = orderModal.querySelector(".order-box");
orderModal.innerHTML = `

    <div class="order-box" tabindex="-1">

        <button class="close-order" type="button">
            &times;
        </button>

        <h2>
            Place Your Order
        </h2>

        <div class="order-item">

            <img class="order-image" src="" alt="">

            <div class="order-info">

                <h3 class="order-name"></h3>

                <p class="order-description"></p>

                <span class="order-price"></span>

            </div>

        </div>


        <div class="quantity-control">

            <button class="quantity-minus" type="button">
                −
            </button>

            <span class="quantity">1</span>

            <button class="quantity-plus" type="button">
                +
            </button>

        </div>


        <button class="add-to-order" type="button">
            Add to Order
        </button>

    </div>

`;

document.body.appendChild(orderModal);

/* =========================================================
   4. GET MODAL ELEMENTS
========================================================= */

const orderImage = orderModal.querySelector(".order-image");

const orderName = orderModal.querySelector(".order-name");

const orderDescription = orderModal.querySelector(".order-description");

const orderPrice = orderModal.querySelector(".order-price");

const quantityMinus = orderModal.querySelector(".quantity-minus");

const quantityPlus = orderModal.querySelector(".quantity-plus");

const quantityDisplay = orderModal.querySelector(".quantity");

const closeOrder = orderModal.querySelector(".close-order");

const addToOrder = orderModal.querySelector(".add-to-order");

/* =========================================================
   KEYBOARD FOCUSABLE MODAL ELEMENTS
========================================================= */

const modalFocusableElements = [
  closeOrder,
  quantityMinus,
  quantityPlus,
  addToOrder,
];

/* =========================================================
   KEEP KEYBOARD FOCUS INSIDE ORDER MODAL
========================================================= */

orderModal.addEventListener("keydown", function (event) {
  if (event.key !== "Tab") {
    return;
  }

  const firstElement = modalFocusableElements[0];

  const lastElement = modalFocusableElements[modalFocusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();

    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();

    firstElement.focus();
  }
});

/* =========================================================
   5. CREATE ORDER SUMMARY
========================================================= */

const orderSummary = document.createElement("div");

orderSummary.classList.add("order-summary");

orderSummary.innerHTML = `

    <div class="summary-box">

        <button class="close-summary" type="button">
            &times;
        </button>

        <h2>
           Your Order
           <span class="order-count">0</span>
       </h2>

        <div class="summary-items"></div>

<div class="summary-total">

    <span>Total:</span>

    <strong class="total-price">
        0 ETB
    </strong>

</div>

<button class="clear-order" type="button">
    Clear Order
</button>

<button class="continue-order" type="button">
    Continue Ordering
</button>

    </div>

`;

document.body.appendChild(orderSummary);

/* =========================================================
   6. GET SUMMARY ELEMENTS
========================================================= */

const summaryItems = orderSummary.querySelector(".summary-items");

const totalPrice = orderSummary.querySelector(".total-price");

const closeSummary = orderSummary.querySelector(".close-summary");

const continueOrder = orderSummary.querySelector(".continue-order");
const clearOrder = orderSummary.querySelector(".clear-order");
const orderCount = orderSummary.querySelector(".order-count");

function updateOrderCount() {
  const totalItems = order.reduce((total, item) => total + item.quantity, 0);

  orderCount.textContent = totalItems;
}

/* =========================================================
   7. DISPLAY ORDER SUMMARY
========================================================= */

function displayOrderSummary() {
  updateOrderCount();
  summaryItems.innerHTML = "";

  let total = 0;

  order.forEach((item, index) => {
    const subtotal = item.price * item.quantity;

    total += subtotal;

    const summaryItem = document.createElement("div");

    summaryItem.classList.add("summary-item");

    summaryItem.innerHTML = `

            <div class="summary-item-info">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div>

                    <h3>${item.name}</h3>

                    <p>
                        ${item.quantity} ×
                        ${item.price} ETB
                    </p>

                    <strong>
                        ${subtotal} ETB
                    </strong>

                </div>

            </div>


            <button
                class="remove-item"
                data-index="${index}"
                type="button"
            >
                Remove
            </button>

        `;

    summaryItems.appendChild(summaryItem);
  });

  totalPrice.textContent = `${total} ETB`;
}

/* =========================================================
   8. OPEN ORDER MODAL + KEYBOARD SUPPORT
========================================================= */

/*
    Open the order modal for any orderable card.
*/
function openOrderModal(card) {

    cardThatOpenedOrder = card;

    const image = card.querySelector("img");
    const name = card.querySelector("h3");
    const description = card.querySelector("p");
    const price = card.querySelector("span");

    if (!image || !name || !description || !price) {
        return;
    }

    orderImage.src = image.src;
    orderImage.alt = image.alt;

    orderName.textContent = name.textContent;
    orderDescription.textContent = description.textContent;
    orderPrice.textContent = price.textContent;

    quantity = 1;
    quantityDisplay.textContent = quantity;

    orderModal.classList.add("show");

    setTimeout(() => {
        closeOrder.focus();
    }, 0);
}


/* =========================================================
   MOUSE CLICK
========================================================= */

document.addEventListener("click", function (event) {

    /*
        1. MENU PAGE — normal menu cards
    */
    const menuCard = event.target.closest(".menu-card");

if (menuCard) {

    // Do not open the order modal when these buttons are clicked
    if (
        event.target.closest(".favorite-button") ||
        event.target.closest(".remove-favorite")
    ) {
        return;
    }

    openOrderModal(menuCard);
    return;
}
    


    /*
        2. HOME PAGE — Our Favorites cards

        This selector is intentionally specific.

        It affects only:
        .favorite-container .favorite-card

        It does NOT affect:
        #favoritesContainer .favorite-card
        on the Menu page.
    */
    const homeFavoriteCard =
    event.target.closest(".favorite-container .favorite-card");

if (homeFavoriteCard) {

    // Do not open the order modal when Remove from Favorites is clicked
    if (event.target.closest(".remove-favorite")) {
        return;
    }

    openOrderModal(homeFavoriteCard);
}

}, true);


/* =========================================================
   KEYBOARD SUPPORT — MENU CARDS + HOME FAVORITES
========================================================= */

document.addEventListener("keydown", function (event) {

    /*
        Only Enter and Space should activate a card.
    */
    if (event.key !== "Enter" && event.key !== " ") {
        return;
    }


    /*
        Find either:

        - a normal Menu card
        - a Home "Our Favorites" card
    */
    const card = event.target.closest(
        ".menu-card, .favorite-container .favorite-card"
    );

    if (!card) {
        return;
    }


    /*
        If the user is focused on the favorite heart,
        let the button handle its own action.
    */
    if (
    event.target.closest(".favorite-button") ||
    event.target.closest(".remove-favorite")
         ) {
    return;
           }


    /*
        Prevent Space from scrolling the page.
    */
    event.preventDefault();


    /*
        Open the order modal.
    */
    openOrderModal(card);

});

/* =========================================================
   10. MINUS BUTTON
========================================================= */

quantityMinus.addEventListener("click", function () {
  if (quantity > 1) {
    quantity--;

    quantityDisplay.textContent = quantity;
  }
});

/* =========================================================
   10. PLUS BUTTON
========================================================= */

quantityPlus.addEventListener("click", function () {
  quantity++;

  quantityDisplay.textContent = quantity;
});

/* =========================================================
   11. CLOSE ORDER MODAL
========================================================= */

if (closeOrder) {

    closeOrder.addEventListener("click", function () {

        orderModal.classList.remove("show");

        setTimeout(() => {

            if (cardThatOpenedOrder) {
                cardThatOpenedOrder.focus();
            }

        }, 0);

    });

}

/* =========================================================
   12. ADD ITEM TO ORDER
========================================================= */

addToOrder.addEventListener("click", function () {
  const itemName = orderName.textContent;

  const itemPrice = parseFloat(orderPrice.textContent);

  const itemImage = orderImage.src;

  const existingItem = order.find((item) => {
    return item.name === itemName;
  });

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    order.push({
      name: itemName,

      price: itemPrice,

      quantity: quantity,

      image: itemImage,
    });
  }

  console.log("Current Order:", order);

  orderModal.classList.remove("show");

  saveOrder();

  displayOrderSummary();

  orderSummary.classList.add("show");
});

/* =========================================================
   13. CLOSE ORDER SUMMARY
========================================================= */

closeSummary.addEventListener("click", function () {
  orderSummary.classList.remove("show");
});

const summaryBox = orderSummary.querySelector(".summary-box");
/* =========================================================
   14. CONTINUE ORDERING
========================================================= */

continueOrder.addEventListener("click", function () {
  orderSummary.classList.remove("show");
});

clearOrder.addEventListener("click", function() {

    order = [];

    displayOrderSummary();

    orderSummary.classList.remove("show");


    const clearedMessage =
        document.createElement("div");

    clearedMessage.classList.add(
        "order-cleared-message"
    );

    clearedMessage.textContent =
        "Order Cleared!";

    document.body.appendChild(clearedMessage);


    setTimeout(function() {

        clearedMessage.remove();

    }, 2000);

});

/* =========================================================
   15. REMOVE ITEM FROM ORDER
========================================================= */

summaryItems.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-item")) {
    const index = Number(event.target.dataset.index);

    /* -----------------------------------------------
           Remove item from order array
        ------------------------------------------------ */

    order.splice(index, 1);

    saveOrder();
    /* -----------------------------------------------
           Update the summary
        ------------------------------------------------ */

    displayOrderSummary();

    /* -----------------------------------------------
           Close summary if order is empty
        ------------------------------------------------ */

    if (order.length === 0) {
      orderSummary.classList.remove("show");
    }
  }
});
/* =========================================================
   16. PLACE ORDER
========================================================= */

const placeOrderButton = document.createElement("button");

placeOrderButton.classList.add("place-order");

placeOrderButton.textContent = "Place Order";

summaryBox.appendChild(placeOrderButton);

placeOrderButton.addEventListener("click", function () {
  /* -----------------------------------------------
       Make sure the order is not empty
    ------------------------------------------------ */

  if (order.length === 0) {
    return;
  }

  /* -----------------------------------------------
       Calculate the final total
    ------------------------------------------------ */

  let total = 0;

  order.forEach((item) => {
    total += item.price * item.quantity;
  });

  /* -----------------------------------------------
       Show confirmation
    ------------------------------------------------ */

  const confirmation = document.createElement("div");
  order = [];

  localStorage.removeItem("bunaOrder");

  confirmation.classList.add("order-confirmation");

  confirmation.innerHTML = `
    <div class="confirmation-box">

        <span class="confirmation-icon">✓</span>

        <h2>Order Confirmed!</h2>

        <p>
            Thank you for your order.
        </p>

        <strong>
            Total: ${total} ETB
        </strong>

        <button type="button" class="close-confirmation">
            Continue
        </button>

    </div>
`;

  document.body.appendChild(confirmation);
  const closeConfirmation = confirmation.querySelector(".close-confirmation");

  closeConfirmation.addEventListener("click", function () {
    confirmation.remove();

    if (cardThatOpenedOrder) {
      setTimeout(() => {
        cardThatOpenedOrder.focus();
      }, 0);
    }
  });

  /* -----------------------------------------------
       Clear the order
    ------------------------------------------------ */

  order = [];

  /* -----------------------------------------------
       Close the summary
    ------------------------------------------------ */

  orderSummary.classList.remove("show");
});

/* =========================================================
   STAGE 4 — CONTACT FORM VALIDATION
========================================================= */

/* =========================================================
   1. GET CONTACT FORM ELEMENTS
========================================================= */

const contactForm = document.querySelector("#contactForm");

const formMessage = document.querySelector("#formMessage");

const nameInput = document.querySelector("#name");

const emailInput = document.querySelector("#email");

const subjectInput = document.querySelector("#subject");

const messageInput = document.querySelector("#message");

/* =========================================================
   2. HANDLE FORM SUBMISSION
========================================================= */

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    /* Prevent the page from refreshing */
    event.preventDefault();

    /* Get input values */
    const name = nameInput.value.trim();

    const email = emailInput.value.trim();

    const subject = subjectInput.value.trim();

    const message = messageInput.value.trim();

    /* =================================================
           3. CHECK EMPTY FIELDS
        ================================================= */

    if (name === "" || email === "" || subject === "" || message === "") {
      formMessage.textContent = "Please fill in all fields.";

      formMessage.classList.remove("success");

      formMessage.classList.add("error");

      return;
    }

    /* =================================================
           4. CHECK EMAIL FORMAT
        ================================================= */

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      formMessage.textContent = "Please enter a valid email address.";

      formMessage.classList.remove("success");

      formMessage.classList.add("error");

      return;
    }

    /* =================================================
           5. SUCCESS MESSAGE
        ================================================= */

    formMessage.textContent = `Thank you, ${name}! Your message has been sent successfully.`;

    formMessage.classList.remove("error");

    formMessage.classList.add("success");

    /* =================================================
           6. CLEAR THE FORM
        ================================================= */

    contactForm.reset();
  });
}


/* =========================================================
   KEYBOARD SUPPORT — QUANTITY CONTROLS
========================================================= */

quantityMinus.addEventListener("keydown", function (event) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();

    quantityMinus.click();
  }
});

quantityPlus.addEventListener("keydown", function (event) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();

    quantityPlus.click();
  }
});
