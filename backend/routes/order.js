const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Order = require("../models/Order");
const fetchuser = require("../middleware/fetchuser");

// ✅Create New Order
router.post("/create", fetchuser, async (req, res) => {
  try {
    const { items, totalAmount, customer } = req.body;

    if (!customer || !customer.address) {
      return res.status(400).json({ message: "Address is required." });
    }

    const order = new Order({
      user: req.user.id,          // from token via fetchUser middleware
      items: items,
      totalAmount: totalAmount,
      address: customer.address,  // 👈 save only address string here
    });

    const savedOrder = await order.save();
    res.json({ success: true, order: savedOrder });

  } catch (error) {
    console.error("Order create error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// 📄 Fetch allOrder
router.get("/allOrder", fetchuser, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("user")
      .populate("items.product");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Internal error" });
  }
});

// 🔐 Admin Only: Get All Orders
// router.get('/AllOrder', verifyToken, async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// });



// 🔍 एकल ऑर्डर विवरण प्राप्त करें
router.get("/:id", fetchuser, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user")
      .populate("items.product");
    if (!order) return res.status(404).json({ error: "order not found" });

    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "not permission" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Internal error" });
  }
});

// ✏️ Update order
router.put("/updateOrder:id", fetchuser, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "order not found" });

    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "not permission" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: "Internal error" });
  }
});

// ❌ Delete order
router.delete("/:id", fetchuser, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "order not found" });

    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "not permission" });
    }

    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "order delete successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal error" });
  }
});

module.exports = router;
