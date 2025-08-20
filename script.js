const menuData = [
  {
    id: 1,
    name: "Veggie Pizza",
    price: 350,
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  },
  {
    id: 2,
    name: "Chicken Burger",
    price: 240,
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    id: 3,
    name: "Pasta Arrabiata",
    price: 290,
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  },
  {
    id: 4,
    name: "Chocolate Cake",
    price: 150,
    img: "https://images.unsplash.com/photo-1519864600265-abb23408f926?auto=format&fit=crop&w=800&q=80",
  },
];

const cart = [];
const menuItemsContainer = document.getElementById("menu-items");
const cartCount = document.getElementById("cart-count");
const cartSection = document.getElementById("cart-section");
const cartItemsDiv = document.getElementById("cart-items");
const checkoutBtn = document.getElementById("checkout-btn");

function renderMenu() {
  menuItemsContainer.innerHTML = "";
  menuData.forEach((item) => {
    const card = document.createElement("div");
    card.className = "menu-card";
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p class="price">₹${item.price}</p>
      <button onclick="addToCart(${item.id})">Add to Cart</button>
    `;
    menuItemsContainer.appendChild(card);
  });
}

window.addToCart = function (id) {
  const item = menuData.find((i) => i.id === id);
  const existing = cart.find((i) => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  updateCartCount();
  renderCart();
};
function updateCartCount() {
  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}
function renderCart() {
  if (cart.length === 0) {
    cartSection.style.display = "none";
    return;
  }
  cartSection.style.display = "block";
  cartItemsDiv.innerHTML = cart
    .map(
      (item) =>
        `<div>${item.name} x ${item.qty} — ₹${item.price * item.qty}</div>`
    )
    .join("");
}
checkoutBtn.onclick = () => {
  alert("Order placed! (Demo site, no real order.)");
  cart.length = 0;
  updateCartCount();
  renderCart();
};

// Responsive navbar
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.onclick = () => {
  navLinks.classList.toggle("open");
};

// Init
renderMenu();
updateCartCount();
renderCart();
