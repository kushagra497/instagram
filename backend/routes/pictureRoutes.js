const express = require("express");
const router = express.Router();
const {addPicture  , viewPicture , editPicture , deletePicture} = require("../controller/pictureController");

//add a picture  controller
router.post("/addPicture", addPicture);

//view a picture

router.get("/viewPicture/:id", viewPicture);

//edit a picture

router.put("/editPicture/:id", editPicture);


//delete a picture

router.delete("/deletePicture/:id", deletePicture);

module.exports = router