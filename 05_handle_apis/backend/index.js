import express from "express";

const app = express();

const port = 8080;

app.listen(port, () => {
  console.log(`App is listening at port: ${port}`);
});

app.get("/api/products", (req, res) => {
  const products = [
    { name: "Wireless Mouse", price: 29.99, color: "Black" },
    { name: "Bluetooth Speaker", price: 45.0, color: "Red" },
    { name: "Laptop Stand", price: 39.5, color: "Silver" },
    { name: "Gaming Keyboard", price: 89.99, color: "RGB" },
    { name: "Noise Cancelling Headphones", price: 120.0, color: "Blue" },
    { name: "Smart Watch", price: 199.99, color: "Black" },
    { name: "4K Monitor", price: 349.99, color: "White" },
    { name: "External Hard Drive", price: 75.0, color: "Black" },
    { name: "Fitness Tracker", price: 49.99, color: "Green" },
    { name: "Portable Charger", price: 25.0, color: "White" },
    { name: "Electric Toothbrush", price: 59.99, color: "Pink" },
    { name: "Digital Camera", price: 299.99, color: "Black" },
    { name: "Coffee Maker", price: 89.0, color: "Red" },
    { name: "Air Fryer", price: 99.99, color: "Silver" },
    { name: "Smartphone", price: 799.0, color: "Black" },
    { name: "Tablet", price: 499.0, color: "Gold" },
    { name: "E-Reader", price: 129.99, color: "Gray" },
    { name: "Bluetooth Earbuds", price: 79.99, color: "White" },
    { name: "Wireless Charger", price: 29.99, color: "Black" },
    { name: "Desk Lamp", price: 35.0, color: "Blue" },
  ];

  if (req.query.search) {
    const pro = products.filter((product) =>
      product.name.toLowerCase().includes(req.query.search)
    );
    
    console.log(pro);
    res.send(pro);
    return;
  }
  setTimeout(() => {
    res.send(products);
  }, 1000);
});
