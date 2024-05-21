const router = require('express').Router();
const treeCoverController = require("../controllers/treeCoverController")

router.get("/tree-cover-loss", treeCoverController.getTreeCoverLoss);
module.exports = router;