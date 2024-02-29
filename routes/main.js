const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);


// PAGE FOR COMMUNITY GUIDELINES
router.get("/cg", (req, res) => {
    res.render("cg");
  ;});
// PAGE WITH CONTACT INFORMATION FOR USERS TO REACH US
router.get("/contactus", (req, res) => {
    res.render("contactus");
  })
// PAGE FOR FREQUENTLY ASKED QUESTIONS
router.get("/faq", (req, res) => {
    res.render("faq");
  })
// PAGE TO LEARN MORE ABOUT COZYCIRCLES
router.get("/learnmore", (req, res) => {
    res.render("learnmore");
  });
// INTRODUCTION PAGE FOR LAURA
router.get("/meetlaura", (req, res) => {
  res.render("meetlaura");
})
// PAGE FOR PRIVACY POLICY
router.get("/privacypolicy", (req, res) => {
  res.render("privacypolicy");
})
// PAGE LISTING GENERAL RESOURCES
router.get("/resources", (req, res) => {
  res.render("resources");
})
// PAGE FOR TERMS OF SERVICE
router.get("/tos", (req, res) => {
  res.render("tos");
})
// 










module.exports = router;
