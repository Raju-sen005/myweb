const connectToMongo = require("./db");
const express = require("express");
const http = require("http");
var cors = require("cors");


connectToMongo();

const app = express();
const server = http.createServer(app); // 🔴 important: http server 

const router = express.Router();

const port = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Static Food Items
const item = [
  {
    "name": "Margherita Pizza",
    "description": "Classic cheese pizza with tomato sauce and basil.",
    "price": 299,
    "image": "https://img.freepik.com/free-photo/slice-crispy-pizza-with-meat-cheese_140725-6974.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Veg Biryani",
    "description": "Aromatic rice dish with mixed vegetables and spices.",
    "price": 199,
    "image": "https://img.freepik.com/free-photo/side-view-pilaf-with-stewed-beef-meat-plate_141793-5057.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Paneer Butter Masala",
    "description": "Paneer cubes in a rich and creamy tomato gravy.",
    "price": 249,
    "image": "https://media.istockphoto.com/id/1085159910/photo/malai-or-achari-paneer-in-a-gravy-made-using-red-gravy-and-green-capsicum-served-in-a-bowl.jpg?b=1&s=612x612&w=0&k=20&c=Ax4bKzkonvXGFX4cPsZgj0fRA9MoZDaaoomqBJGQQ_g="
  },
  {
    "name": "Masala Dosa",
    "description": "Crispy dosa filled with spicy mashed potatoes.",
    "price": 120,
    "image": "https://img.freepik.com/free-photo/delicious-indian-dosa-composition_23-2149086051.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Gulab Jamun",
    "description": "Soft deep-fried dough balls soaked in sugar syrup.",
    "price": 80,
    "image": "https://img.freepik.com/premium-photo/indian-sweet-food-gulab-jamun-served-round-ceramic-bowl_466689-68969.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Veg Burger",
    "description": "Crispy patty with fresh lettuce and mayo in a soft bun.",
    "price": 99,
    "image": "https://img.freepik.com/free-photo/front-view-tasty-meat-burger-with-cheese-salad-dark-background_140725-89597.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Cheese Pizza",
    "description": "Classic Margherita with extra mozzarella cheese.",
    "price": 199,
    "image": "https://img.freepik.com/free-photo/imeretian-khachapuri-cheese-lemon-side-view_140725-11276.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Paneer Tikka",
    "description": "Spicy grilled paneer cubes served with mint chutney.",
    "price": 150,
    "image": "https://img.freepik.com/free-photo/chicken-skewers-with-slices-sweet-peppers-dill_2829-18813.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Chicken Biryani",
    "description": "Aromatic rice cooked with marinated chicken and spices.",
    "price": 220,
    "image": "https://img.freepik.com/premium-photo/dum-handi-chicken-biryani-is-prepared-earthen-clay-pot-called-haandi-popular-indian-non-vegetarian-food_466689-52406.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Veg Momos",
    "description": "Steamed dumplings filled with spiced veggies.",
    "price": 80,
    "image": "https://img.freepik.com/free-photo/khinkali-served-with-greens-sauce_141793-773.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Cold Coffee",
    "description": "Chilled coffee blended with milk and sugar.",
    "price": 70,
    "image": "https://img.freepik.com/free-photo/khinkali-served-with-greens-sauce_141793-773.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "French Fries",
    "description": "Crispy golden fries served with ketchup.",
    "price": 60,
    "image": "https://img.freepik.com/free-photo/crispy-french-fries-with-ketchup-mayonnaise_1150-26588.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Masala Dosa",
    "description": "Crispy dosa stuffed with spiced potato filling.",
    "price": 110,
    "image": "https://img.freepik.com/free-photo/delicious-indian-dosa-arrangement_23-2149086027.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Ice Cream Sundae",
    "description": "Vanilla ice cream topped with chocolate syrup and nuts.",
    "price": 90,
    "image": "https://img.freepik.com/free-photo/delicious-ice-cream-flavours-arrangement_23-2150735422.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Grilled Sandwich",
    "description": "Toasted sandwich with veggies, cheese, and sauces.",
    "price": 85,
    "image": "https://img.freepik.com/free-photo/front-view-tasty-ham-sandwiches-with-french-fries-dark-surface_179666-34644.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  }
]


const FoodItem = [
  {
    "name": "Margherita Pizza",
    "description": "Classic cheese pizza with tomato sauce and basil.",
    "price": 299,
    "image": "https://img.freepik.com/free-photo/slice-crispy-pizza-with-meat-cheese_140725-6974.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Veg Biryani",
    "description": "Aromatic rice dish with mixed vegetables and spices.",
    "price": 199,
    "image": "https://img.freepik.com/free-photo/side-view-pilaf-with-stewed-beef-meat-plate_141793-5057.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Paneer Butter Masala",
    "description": "Paneer cubes in a rich and creamy tomato gravy.",
    "price": 249,
    "image": "https://media.istockphoto.com/id/1085159910/photo/malai-or-achari-paneer-in-a-gravy-made-using-red-gravy-and-green-capsicum-served-in-a-bowl.jpg?b=1&s=612x612&w=0&k=20&c=Ax4bKzkonvXGFX4cPsZgj0fRA9MoZDaaoomqBJGQQ_g="
  },
  {
    "name": "Masala Dosa",
    "description": "Crispy dosa filled with spicy mashed potatoes.",
    "price": 120,
    "image": "https://img.freepik.com/free-photo/delicious-indian-dosa-composition_23-2149086051.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Gulab Jamun",
    "description": "Soft deep-fried dough balls soaked in sugar syrup.",
    "price": 80,
    "image": "https://img.freepik.com/premium-photo/indian-sweet-food-gulab-jamun-served-round-ceramic-bowl_466689-68969.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Veg Burger",
    "description": "Crispy patty with fresh lettuce and mayo in a soft bun.",
    "price": 99,
    "image": "https://img.freepik.com/free-photo/front-view-tasty-meat-burger-with-cheese-salad-dark-background_140725-89597.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Cheese Pizza",
    "description": "Classic Margherita with extra mozzarella cheese.",
    "price": 199,
    "image": "https://img.freepik.com/free-photo/imeretian-khachapuri-cheese-lemon-side-view_140725-11276.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Paneer Tikka",
    "description": "Spicy grilled paneer cubes served with mint chutney.",
    "price": 150,
    "image": "https://img.freepik.com/free-photo/chicken-skewers-with-slices-sweet-peppers-dill_2829-18813.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Chicken Biryani",
    "description": "Aromatic rice cooked with marinated chicken and spices.",
    "price": 220,
    "image": "https://img.freepik.com/premium-photo/dum-handi-chicken-biryani-is-prepared-earthen-clay-pot-called-haandi-popular-indian-non-vegetarian-food_466689-52406.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Veg Momos",
    "description": "Steamed dumplings filled with spiced veggies.",
    "price": 80,
    "image": "https://img.freepik.com/free-photo/khinkali-served-with-greens-sauce_141793-773.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Cold Coffee",
    "description": "Chilled coffee blended with milk and sugar.",
    "price": 70,
    "image": "https://img.freepik.com/free-photo/khinkali-served-with-greens-sauce_141793-773.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "French Fries",
    "description": "Crispy golden fries served with ketchup.",
    "price": 60,
    "image": "https://img.freepik.com/free-photo/crispy-french-fries-with-ketchup-mayonnaise_1150-26588.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Masala Dosa",
    "description": "Crispy dosa stuffed with spiced potato filling.",
    "price": 110,
    "image": "https://img.freepik.com/free-photo/delicious-indian-dosa-arrangement_23-2149086027.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Ice Cream Sundae",
    "description": "Vanilla ice cream topped with chocolate syrup and nuts.",
    "price": 90,
    "image": "https://img.freepik.com/free-photo/delicious-ice-cream-flavours-arrangement_23-2150735422.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  },
  {
    "name": "Grilled Sandwich",
    "description": "Toasted sandwich with veggies, cheese, and sauces.",
    "price": 85,
    "image": "https://img.freepik.com/free-photo/front-view-tasty-ham-sandwiches-with-french-fries-dark-surface_179666-34644.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740"
  }
];

// Routes
app.get("/F-item", (req, res) => {
  res.json(item);
});

app.get("/Food-item", (req, res) => {
  res.json(FoodItem);
});




// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/order", require("./routes/order"));
app.use("/api/contact", require("./routes/contact"));

// Server Start
server.listen(port, () => {
  console.log(`d-food Backend with WebSocket running on http://localhost:${port}`);
});
