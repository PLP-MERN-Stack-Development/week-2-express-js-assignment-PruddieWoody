// Simple in-memory storage. Replace with DB in real apps.
const products = [
  {
    id: "a1b2c3d4",
    name: "Laptop",
    description: "A powerful laptop.",
    price: 1200,
    category: "Electronics",
    inStock: true
  },
  {
    id: "e5f6g7h8",
    name: "Coffee Mug",
    description: "Ceramic mug for coffee.",
    price: 10,
    category: "Home",
    inStock: true
  }
];

module.exports = { products };
