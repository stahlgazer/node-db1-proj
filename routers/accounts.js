const express = require("express");
const db = require("../data/dbConfig");
const router = express.Router();

router.get("/", (req, res) => {
  db("accounts")
    .then(accounts => {
      res.status(200).json({ data: accounts });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .first()
    .then(account => {
      if (account) {
        res.status(200).json({ data: account });
      } else {
        res.status(404).json({ message: "Account doesn't exist" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/", (req, res) => {
  db("accounts")
    .insert(req.body, "id")
    .then(newAccount => {
        newAccount = req.body
      res.status(201).json({ created: newAccount });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.put("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "Account updated successfully" });
      } else {
        res.status(404).json({ message: "Account doesn't exist or incorrect formatting of data" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.delete("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "Account successfully deleted" });
      } else {
        res.status(404).json({ message: "Account doesn't exist" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
