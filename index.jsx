import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import "@fontsource/raleway";

const chocolates = [
  { name: "Chocolat Noir 70%", price: "€4.99", description: "Intense et corsé.", img: "/images/noir.jpg" },
  { name: "Chocolat au Lait", price: "€3.99", description: "Doux et crémeux.", img: "/images/lait.jpg" },
  { name: "Chocolat Blanc", price: "€4.49", description: "Sucré et onctueux.", img: "/images/blanc.jpg" },
  { name: "Praliné Noisette", price: "€5.49", description: "Fondant et croquant.", img: "/images/praline.jpg" },
  { name: "Ganache Framboise", price: "€5.99", description: "Mélange fruité et chocolaté.", img: "/images/framboise.jpg" },
  { name: "Caramel Beurre Salé", price: "€5.79", description: "Délicieuse touche bretonne.", img: "/images/caramel.jpg" },
  { name: "Chocolat Éclats de Café", price: "€4.99", description: "Énergie et douceur.", img: "/images/cafe.jpg" },
  { name: "Chocolat Menthe", price: "€4.69", description: "Fraîcheur et intensité.", img: "/images/menthe.jpg" },
  { name: "Chocolat Pistache", price: "€5.29", description: "Goût délicat et raffiné.", img: "/images/pistache.jpg" },
  { name: "Chocolat Amande", price: "€5.19", description: "Un classique revisité.", img: "/images/amande.jpg" },
  { name: "Chocolat Orange Confite", price: "€4.89", description: "Zeste d'agrume sucré.", img: "/images/orange.jpg" },
  { name: "Chocolat Fleur de Sel", price: "€5.39", description: "Équilibre subtil entre sucré et salé.", img: "/images/sel.jpg" },
];

const categories = ["Tous", "Noir", "Lait", "Blanc"];

export default function ChocolateShop() {
  const [selectedCategory, setSelectedCategory] = React.useState("Tous");
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);
  const [cart, setCart] = React.useState([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = React.useState(false);
  const [isWarningOpen, setIsWarningOpen] = React.useState(false);

  const filtered = selectedCategory === "Tous"
    ? chocolates
    : chocolates.filter(c => c.name.includes(selectedCategory));

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    setCart([...cart, { ...selectedProduct, quantity: parseInt(quantity) }]);
    setSelectedProduct(null);
  };

  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace("€", ""));
    return total + price * item.quantity;
  }, 0).toFixed(2);

  return (
    <main className="min-h-screen p-4 bg-[#fefbf6] font-[Raleway]">
      <section className="text-center mb-8">
        <h1 className="text-6xl font-extrabold mb-2">La Maison du Chocolat</h1>
        <p className="text-lg text-gray-700">Découvrez nos délicieuses créations artisanales</p>
      </section>

      <section className="w-full h-64 md:h-96 mb-8">
        <img src="/images/hero.jpg" alt="Chocolaterie artisanale" className="w-full h-full object-cover rounded-2xl shadow-md" />
      </section>

      <nav className="flex justify-center gap-2 mb-6">
        {categories.map((cat) => (
          <Button key={cat} variant={selectedCategory === cat ? "default" : "outline"} onClick={() => setSelectedCategory(cat)}>
            {cat}
          </Button>
        ))}
        <Button variant="outline" onClick={() => setIsCartOpen(true)}>🛒 Voir le panier ({cart.length})</Button>
      </nav>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {filtered.map((choco, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="hover:shadow-xl transition-all"
          >
            <Card className="rounded-2xl overflow-hidden">
              <img src={choco.img} alt={choco.name} className="h-48 w-full object-cover" />
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-1">{choco.name}</h2>
                <p className="text-gray-600 text-sm mb-2">{choco.description}</p>
                <p className="text-lg font-bold">{choco.price}</p>
                <Button className="mt-2 w-full" onClick={() => handleOrderClick(choco)}>Commander</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Les dialogues et le reste restent inchangés */}

    </main>
  );
}

