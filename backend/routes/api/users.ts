import express from "express";

const router = express.Router();
const data: any = {};
data.users = require("../../data/data.json");

router
  .route("/")
  .get((req, res) => {
    res.json(data.users);
  })
  .post((req, res) => {
    res.json(req.body);
  })
  .put((req, res) => {
    res.json(req.body);
  })
  .delete((req, res) => {
    res.json(req.body);
  });

router.route("/:id").get((req, res) => {
  res.json({ "id": req.params.id });
});

module.exports = router;
