
const chocolates = [
  { name: "Chocolat Noir 70%", price: "€4.99", description: "Intense et corsé.", img: "images/noir.jpg" },
  { name: "Chocolat au Lait", price: "€3.99", description: "Doux et crémeux.", img: "images/lait.jpg" },
  { name: "Chocolat Blanc", price: "€4.49", description: "Sucré et onctueux.", img: "images/blanc.jpg" },
];

const categories = ["Tous", "Noir", "Lait", "Blanc"];
let selectedCategory = "Tous";
let cart = [];
let selectedProduct = null;

function renderCategories() {
  const container = document.getElementById("category-buttons");
  container.innerHTML = "";
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "px-4 py-2 border rounded hover:bg-gray-100";
    btn.textContent = cat;
    btn.onclick = () => {
      selectedCategory = cat;
      renderProducts();
    };
    container.appendChild(btn);
  });
}

function renderProducts() {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";
  const filtered = selectedCategory === "Tous" ? chocolates : chocolates.filter(c => c.name.includes(selectedCategory));
  filtered.forEach(choco => {
    const card = document.createElement("div");
    card.className = "rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all bg-white";
    card.innerHTML = \`
      <img src="\${choco.img}" alt="\${choco.name}" class="h-48 w-full object-cover" />
      <div class="p-4">
        <h2 class="text-xl font-semibold mb-1">\${choco.name}</h2>
        <p class="text-gray-600 text-sm mb-2">\${choco.description}</p>
        <p class="text-lg font-bold">\${choco.price}</p>
        <button onclick='openModal(\${JSON.stringify(choco)})' class="mt-2 w-full bg-black text-white py-2 rounded">Commander</button>
      </div>
    \`;
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
  alert(qty + " x " + selectedProduct.name + " ajouté(s) au panier");
}

window.onload = () => {
  renderCategories();
  renderProducts();
};
