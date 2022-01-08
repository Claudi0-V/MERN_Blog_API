const router = require("express").Router();


router.get("/login", (req, res) => {
  console.log("request recieved");
  res.status(200).json({it: "works"})
});



module.exports = router
