const express = require("express");
const upload = require("../middlewares/upload");
const { uploadImage } = require("../controllers/upload");

const router = express.Router();

router.post("/", upload.single("image"), uploadImage);

module.exports = router;
