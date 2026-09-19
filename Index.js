/* ==========================================================
   ALL BY JIDDAMARH
   Front-end interactions
   ========================================================== */

const products = [
  {
    id: 1,
    name: "Satin Ease Set",
    category: "apparel",
    price: 42000,
    tag: "New",
    description: "An effortless two-piece silhouette for polished everyday dressing.",
    image: "assets/images/product-satin-set.jpg"
  },

  {
    id: 2,
    name: "Soft Form Dress",
    category: "apparel",
    price: 48500,
    tag: "Edit",
    description: "A clean, fluid dress made for easy styling from day to night.",
    image: "assets/images/product-soft-dress.jpg"
  },

  {
    id: 3,
    name: "Glow Makeup Kit",
    category: "beauty",
    price: 28500,
    tag: "New",
    description: "A curated kit of everyday beauty essentials for a refined finish.",
    image: "assets/images/product-makeup-kit.jpg"
  },

  {
    id: 4,
    name: "Velvet Body Mist",
    category: "beauty",
    price: 16500,
    tag: "Bestseller",
    description: "A soft, expressive scent designed to layer beautifully.",
    image: "assets/images/product-body-mist.jpg"
  },

  {
    id: 5,
    name: "Everyday Kitchen Set",
    category: "kitchen",
    price: 32000,
    tag: "New",
    description: "A practical collection for prep, serving and everyday cooking.",
    image: "assets/images/product-kitchen-set.jpg"
  },

  {
    id: 6,
    name: "Minimal Utensil Pair",
    category: "kitchen",
    price: 14500,
    tag: "Edit",
    description: "Useful, clean-lined utensils designed to sit beautifully on display.",
    image: "assets/images/product-utensil-pair.jpg"
  },

  {
    id: 7,
    name: "Daily Care Duo",
    category: "toiletries",
    price: 19800,
    tag: "New",
    description: "Simple daily essentials for a fresh, well-kept routine.",
    image: "assets/images/product-care-duo.jpg"
  },

  {
    id: 8,
    name: "Travel Toiletry Set",
    category: "toiletries",
    price: 17500,
    tag: "Edit",
    description: "A compact, considered kit made for weekends and getaways.",
    image: "assets/images/product-toiletry-set.jpg"
  }
];


/* ==========================================================
   CATEGORY NAMES
   ========================================================== */

const categoryLabels = {
  apparel: "Apparel",
  beauty: "Beauty",
  kitchen: "Kitchen",
  toiletries: "Toiletries"
};


/* ==========================================================
   GLOBAL VARIABLES
   ========================================================== */

let activeFilter = "all";
let cart = [];


/* ==========================================================
   SHORT SELECTORS
   ========================================================== */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);


/* ==========================================================
   MAIN ELEMENTS
   ========================================================== */

const featuredProducts = $("#featuredProducts");

const allProducts = $("#allProducts");

const bagCount = $("#bagCount");

const cartDrawer = $("#cartDrawer");

const cartOverlay = $("#cartOverlay");

const cartItems = $("#cartItems");

const cartSubtotal = $("#cartSubtotal");

const toast = $("#toast");

const searchPanel = $("#searchPanel");

const searchInput = $("#searchInput");


/* ==========================================================
   FORMAT NIGERIAN NAIRA
   ========================================================== */

function formatNaira(value) {
  return `₦${value.toLocaleString("en-NG")}`;
}


/* ==========================================================
   CREATE PRODUCT CARD
   ========================================================== */

function createProductCard(product, dark = false) {

  const article = document.createElement("article");

  article.className = "product-card";

  article.dataset.category = product.category;

  article.dataset.name = product.name.toLowerCase();


  article.innerHTML = `

    <div
      class="product-media image-slot"
      style="--slot-image: url('${product.image}');"
    >

      <span class="product-tag">
        ${product.tag}
      </span>


      <button
        class="product-heart"
        type="button"
        aria-label="Save ${product.name}"
      >
        ♡
      </button>


      <span class="image-slot-label">
        PRODUCT IMAGE
      </span>

    </div>


    <div class="product-info">

      <div class="product-meta">

        <span>
          ${categoryLabels[product.category]}
        </span>

        <span>
          JIDDAMARH EDIT
        </span>

      </div>


      <h3 class="product-name">
        ${product.name}
      </h3>


      <p class="product-desc">
        ${product.description}
      </p>


      <div class="product-bottom">

        <span class="product-price">
          ${formatNaira(product.price)}
        </span>


        <button
          class="add-to-bag"
          type="button"
          data-add-id="${product.id}"
        >
          Add to bag
        </button>

      </div>

    </div>

  `;


  if (dark) {
    article.classList.add("dark-product");
  }


  return article;
}


/* ==========================================================
   RENDER FEATURED PRODUCTS
   ========================================================== */

function renderFeatured() {

  featuredProducts.innerHTML = "";


  products
    .slice(0, 4)
    .forEach((product) => {

      featuredProducts.appendChild(
        createProductCard(product, true)
      );

    });

}


/* ==========================================================
   RENDER ALL PRODUCTS
   ========================================================== */

function renderProducts(
  filter = activeFilter,
  query = ""
) {

  activeFilter = filter;


  const normalizedQuery =
    query.trim().toLowerCase();


  const visible = products.filter((product) => {

    const matchesFilter =
      filter === "all" ||
      product.category === filter;


    const matchesQuery =
      !normalizedQuery ||
      product.name
        .toLowerCase()
        .includes(normalizedQuery) ||

      product.description
        .toLowerCase()
        .includes(normalizedQuery) ||

      product.category
        .toLowerCase()
        .includes(normalizedQuery);


    return matchesFilter && matchesQuery;

  });


  allProducts.innerHTML = "";


  if (!visible.length) {

    allProducts.innerHTML = `

      <div class="empty-state">

        <h3>
          No pieces found.
        </h3>

        <p>
          Try another search or switch categories.
        </p>

      </div>

    `;

    return;
  }


  visible.forEach((product) => {

    allProducts.appendChild(
      createProductCard(product)
    );

  });

}


/* ==========================================================
   UPDATE FILTER BUTTONS
   ========================================================== */

function syncFilterUI() {

  $$(".filter-button").forEach((button) => {

    button.classList.toggle(
      "active",
      button.dataset.filter === activeFilter
    );

  });

}


/* ==========================================================
   CHANGE CATEGORY
   ========================================================== */

function setFilter(
  filter,
  scroll = false
) {

  renderProducts(filter, "");

  syncFilterUI();


  if (scroll) {

    const collection =
      $("#productCollection");

    if (collection) {

      collection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  }

}


/* ==========================================================
   ADD PRODUCT TO CART
   ========================================================== */

function addToCart(productId) {

  const product =
    products.find(
      (item) => item.id === productId
    );


  if (!product) return;


  const existing =
    cart.find(
      (item) => item.id === productId
    );


  if (existing) {

    existing.qty += 1;

  } else {

    cart.push({
      ...product,
      qty: 1
    });

  }


  updateCartUI();


  showToast(
    `${product.name} added to your bag.`
  );

}


/* ==========================================================
   REMOVE PRODUCT FROM CART
   ========================================================== */

function removeFromCart(productId) {

  cart =
    cart.filter(
      (item) => item.id !== productId
    );


  updateCartUI();

}


/* ==========================================================
   UPDATE CART
   ========================================================== */

function updateCartUI() {

  const count =
    cart.reduce(
      (total, item) =>
        total + item.qty,
      0
    );


  const subtotal =
    cart.reduce(
      (total, item) =>
        total +
        item.price *
        item.qty,
      0
    );


  bagCount.textContent = count;

  cartSubtotal.textContent =
    formatNaira(subtotal);


  if (!cart.length) {

    cartItems.innerHTML = `

      <div class="cart-empty">

        Your bag is currently empty.

        <br><br>

        Explore the collection
        and add something you love.

      </div>

    `;

    return;
  }


  cartItems.innerHTML =
    cart.map((item) => `

      <div class="cart-item">

        <div
          class="cart-item-thumb"
          style="
            background-image:
            url('${item.image}')
          "
        ></div>


        <div>

          <h4>
            ${item.name}
          </h4>

          <p>
            ${categoryLabels[item.category]}
            · Qty ${item.qty}
          </p>

        </div>


        <div>

          <div class="cart-item-price">

            ${formatNaira(
              item.price * item.qty
            )}

          </div>


          <button
            class="add-to-bag"
            type="button"
            data-remove-id="${item.id}"
            style="margin-top:7px;"
          >

            Remove

          </button>

        </div>

      </div>

    `).join("");

}


/* ==========================================================
   OPEN CART
   ========================================================== */

function openCart() {

  cartDrawer.classList.add("open");

  cartOverlay.classList.add("open");

  document.body.classList.add(
    "no-scroll"
  );

}


/* ==========================================================
   CLOSE CART
   ========================================================== */

function closeCart() {

  cartDrawer.classList.remove("open");

  cartOverlay.classList.remove("open");

  document.body.classList.remove(
    "no-scroll"
  );

}


/* ==========================================================
   TOAST MESSAGE
   ========================================================== */

let toastTimer;


function showToast(message) {

  clearTimeout(toastTimer);


  toast.textContent = message;


  toast.classList.add("show");


  toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 2400);

}


/* ==========================================================
   ADD / REMOVE CART BUTTONS
   ========================================================== */

document.addEventListener(
  "click",
  (event) => {

    const addButton =
      event.target.closest(
        "[data-add-id]"
      );


    if (addButton) {

      addToCart(
        Number(
          addButton.dataset.addId
        )
      );

      return;
    }


    const removeButton =
      event.target.closest(
        "[data-remove-id]"
      );


    if (removeButton) {

      removeFromCart(
        Number(
          removeButton.dataset.removeId
        )
      );

      return;
    }

  }
);


/* ==========================================================
   FAVORITE BUTTONS
   ========================================================== */

document.addEventListener(
  "click",
  (event) => {

    const favorite =
      event.target.closest(
        ".product-heart"
      );


    if (!favorite) return;


    const active =
      favorite.classList.toggle(
        "saved"
      );


    favorite.textContent =
      active
        ? "♥"
        : "♡";


    showToast(
      active
        ? "Saved to your favourites."
        : "Removed from your favourites."
    );

  }
);


/* ==========================================================
   CATEGORY CARD LINKS
   ========================================================== */

document.addEventListener(
  "click",
  (event) => {

    const categoryLink =
      event.target.closest(
        "[data-category-link]"
      );


    if (!categoryLink) return;


    const filter =
      categoryLink.dataset.categoryLink;


    setFilter(filter, true);

  }
);


/* ==========================================================
   FOOTER CATEGORY LINKS
   ========================================================== */

document.addEventListener(
  "click",
  (event) => {

    const footerFilter =
      event.target.closest(
        "[data-footer-filter]"
      );


    if (!footerFilter) return;


    const filter =
      footerFilter.dataset.footerFilter;


    setFilter(filter, true);

  }
);


/* ==========================================================
   EDITORIAL CATEGORY BUTTONS
   ========================================================== */

document.addEventListener(
  "click",
  (event) => {

    const jumpButton =
      event.target.closest(
        "[data-jump-filter]"
      );


    if (!jumpButton) return;


    const filter =
      jumpButton.dataset.jumpFilter;


    setFilter(filter, true);

  }
);


/* ==========================================================
   PRODUCT FILTER BUTTONS
   ========================================================== */

const filters =
  $("#filters");


if (filters) {

  filters.addEventListener(
    "click",
    (event) => {

      const button =
        event.target.closest(
          ".filter-button"
        );


      if (!button) return;


      setFilter(
        button.dataset.filter
      );

    }
  );

}


/* ==========================================================
   SEARCH OPEN
   ========================================================== */

$("#searchToggle").addEventListener(
  "click",
  () => {

    searchPanel.classList.toggle(
      "open"
    );


    if (
      searchPanel.classList.contains(
        "open"
      )
    ) {

      searchInput.focus();

    }

  }
);


/* ==========================================================
   SEARCH CLOSE
   ========================================================== */

$("#searchClose").addEventListener(
  "click",
  () => {

    searchPanel.classList.remove(
      "open"
    );


    searchInput.value = "";


    renderProducts(
      activeFilter,
      ""
    );

  }
);


/* ==========================================================
   SEARCH INPUT
   ========================================================== */

searchInput.addEventListener(
  "input",
  () => {

    renderProducts(
      activeFilter,
      searchInput.value
    );


    const hint =
      $("#searchHint");


    if (searchInput.value) {

      hint.textContent =
        `Showing results for “${searchInput.value}”.`;

    } else {

      hint.textContent =
        "Start typing to filter products.";

    }

  }
);


/* ==========================================================
   MOBILE MENU
   ========================================================== */

$("#menuToggle").addEventListener(
  "click",
  () => {

    const mobileNav =
      $("#mobileNav");


    const open =
      mobileNav.classList.toggle(
        "open"
      );


    $("#menuToggle").setAttribute(
      "aria-expanded",
      String(open)
    );

  }
);


/* ==========================================================
   CLOSE MOBILE MENU WHEN LINK CLICKED
   ========================================================== */

$("#mobileNav").addEventListener(
  "click",
  (event) => {

    if (
      event.target.matches("a")
    ) {

      $("#mobileNav").classList.remove(
        "open"
      );


      $("#menuToggle").setAttribute(
        "aria-expanded",
        "false"
      );

    }

  }
);


/* ==========================================================
   CART BUTTON
   ========================================================== */

$("#bagToggle").addEventListener(
  "click",
  openCart
);


/* ==========================================================
   CART CLOSE
   ========================================================== */

$("#cartClose").addEventListener(
  "click",
  closeCart
);


/* ==========================================================
   CLICK CART OVERLAY TO CLOSE
   ========================================================== */

cartOverlay.addEventListener(
  "click",
  closeCart
);


/* ==========================================================
   ESCAPE KEY
   ========================================================== */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      closeCart();

      searchPanel.classList.remove(
        "open"
      );

    }

  }
);


/* ==========================================================
   NEWSLETTER
   ========================================================== */

$("#newsletterForm").addEventListener(
  "submit",
  (event) => {

    event.preventDefault();


    const email =
      $("#emailInput")
        .value
        .trim();


    if (!email) return;


    $("#newsletterMessage").textContent =
      `You're on the list — we'll send updates to ${email}.`;


    event.currentTarget.classList.add(
      "success"
    );


    event.currentTarget.reset();

  }
);


/* ==========================================================
   CHECKOUT BUTTON
   ========================================================== */

$("#checkoutButton").addEventListener(
  "click",
  () => {

    if (!cart.length) {

      showToast(
        "Your bag is empty."
      );

      return;
    }


    showToast(
      "Checkout is ready to connect to your payment system."
    );

  }
);


/* ==========================================================
   CURRENT YEAR
   ========================================================== */

$("#year").textContent =
  new Date().getFullYear();


/* ==========================================================
   INITIAL WEBSITE LOAD
   ========================================================== */

renderFeatured();

renderProducts("all");

updateCartUI();