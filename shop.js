
const chocolates = [
  { name: "Chocolat Noir 70%", price: "€4.99", description: "Intense et corsé.", img: "images/noir.jpg" },
  { name: "Chocolat au Lait", price: "€3.99", description: "Doux et crémeux.", img: "images/lait.jpg" },
  { name: "Chocolat Blanc", price: "€4.49", description: "Sucré et onctueux.", img: "images/blanc.jpg" },
  { name: "Praliné Noisette", price: "€5.49", description: "Fondant et croquant.", img: "images/praline.jpg" },
  { name: "Ganache Framboise", price: "€5.99", description: "Mélange fruité et chocolaté.", img: "images/framboise.jpg" },
  { name: "Caramel Beurre Salé", price: "€5.79", description: "Délicieuse touche bretonne.", img: "images/caramel.jpg" },
  { name: "Chocolat Éclats de Café", price: "€4.99", description: "Énergie et douceur.", img: "images/cafe.jpg" },
  { name: "Chocolat Menthe", price: "€4.69", description: "Fraîcheur et intensité.", img: "images/menthe.jpg" },
  { name: "Chocolat Pistache", price: "€5.29", description: "Goût délicat et raffiné.", img: "images/pistache.jpg" },
  { name: "Chocolat Amande", price: "€5.19", description: "Un classique revisité.", img: "images/amande.jpg" },
  { name: "Chocolat Orange Confite", price: "€4.89", description: "Zeste d'agrume sucré.", img: "images/orange.jpg" },
  { name: "Chocolat Fleur de Sel", price: "€5.39", description: "Équilibre subtil entre sucré et salé.", img: "images/sel.jpg" },
];

const categories = ["Tous", "Noir", "Lait", "Blanc"];
let selectedCategory = "Tous";
let selectedProduct = null;
let cart = [];

function renderCategories() {
  const nav = document.getElementById("categories");
  nav.innerHTML = "";
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "border rounded px-4 py-2 hover:bg-gray-100";
    btn.textContent = cat;
    btn.onclick = () => {
      selectedCategory = cat;
      renderProducts();
    };
    nav.appendChild(btn);
  });

  const cartBtn = document.createElement("button");
  cartBtn.className = "border rounded px-4 py-2 hover:bg-gray-100";
  cartBtn.textContent = `🛒 Voir le panier (${cart.length})`;
  cartBtn.onclick = () => document.getElementById("cart-modal").classList.remove("hidden");
  nav.appendChild(cartBtn);
}

function renderProducts() {
  const grid = document.getElementById("products");
  grid.innerHTML = "";
  const filtered = selectedCategory === "Tous" ? chocolates : chocolates.filter(c => c.name.includes(selectedCategory));
  filtered.forEach(choco => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all";
    card.innerHTML = \`
      <img src="\${choco.img}" class="h-48 w-full object-cover" />
      <div class="p-4">
        <h2 class="text-xl font-semibold mb-1">\${choco.name}</h2>
        <p class="text-sm text-gray-600 mb-2">\${choco.description}</p>
        <p class="text-lg font-bold">\${choco.price}</p>
        <button onclick='openModal(\${JSON.stringify(choco)})' class="mt-2 w-full bg-black text-white py-2 rounded">Commander</button>
      </div>\`;
    grid.appendChild(card);
  });
}

function openModal(product) {
  selectedProduct = product;
  document.getElementById("modal-title").textContent = "Commander : " + product.name;
  document.getElementById("modal-quantity").value = 1;
  document.getElementById("modal").classList.remove("hidden");
}

function addToCart() {
  const qty = parseInt(document.getElementById("modal-quantity").value);
  cart.push({ ...selectedProduct, quantity: qty });
  document.getElementById("modal").classList.add("hidden");
  renderCategories();
}

function proceedToPayment() {
  document.getElementById("cart-modal").classList.add("hidden");
  document.getElementById("payment-modal").classList.remove("hidden");
}

window.onload = () => {
  renderCategories();
  renderProducts();
};
