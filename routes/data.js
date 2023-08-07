const controller = require("../controllers/data.js");
const catchAsync = require("../utils/catchAsync.js");
const router = require("express").Router();

// Base Route - app/data/
router.post("/", catchAsync(controller.storeData));
router.post("/:key", catchAsync(controller.retriveDataByKey));
router.put("/:key", catchAsync(controller.updateData));
router.delete("/:key", catchAsync(controller.deleteData));

module.exports = router;
