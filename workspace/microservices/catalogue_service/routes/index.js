const express = require("express");

const CatalogueService = require("../lib/CatalogService");

const router = express.Router();

// Route to get all items
router.get("/items", async (req, res) => {
  try {
    const items = await CatalogueService.getAll();
    return res.json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get one item
router.get("/items/:id", async (req, res) => {
  try {
    const item = await CatalogueService.getOne(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    return res.json(item);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Route to create new item
router.post("/items", async (req, res) => {
  try {
    const newItem = await CatalogueService.create(req.body);
    return res.json(newItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Route to create new item
router.put("/items/:id", async (req, res) => {
  try {
    const updatedItem = await CatalogueService.update(req.params.id, req.body);
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    return res.json(updatedItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Route to delete one item
router.delete("/items/:id", async (req, res) => {
  try {
    const deletionResult = await CatalogueService.remove(req.params.id);
    if (deletionResult.deletedCount === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Define your RESTful routes here
// router.get("/", (req, res) => {
// // Return a JSON response with a 'hello world' message
// res.json({ msg: "hello world" });
// });

module.exports = router;
