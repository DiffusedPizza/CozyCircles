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
    res.render("cg", {
      title: "Community Guidelines"
    })
  ;});
// PAGE WITH CONTACT INFORMATION FOR USERS TO REACH US
router.get("/contactus", (req, res) => {
    res.render("contactus", {
      title: "Contact Us"
    })
  })
// PAGE FOR FREQUENTLY ASKED QUESTIONS
router.get("/faq", (req, res) => {
    res.render("faq", {
      title: "Frequently Asked Questions"
    })
  })
// PAGE TO LEARN MORE ABOUT COZYCIRCLES
router.get("/learnmore", (req, res) => {
    res.render("learnmore", {
      title: "Learn More"
    })
  });
// INTRODUCTION PAGE FOR LAURA
router.get("/meetlaura", (req, res) => {
  res.render("meetlaura", {
    title: "Meet Laura"
  })
})
// PAGE FOR PRIVACY POLICY
router.get("/privacypolicy", (req, res) => {
  res.render("privacypolicy", {
    title: "Privacy Policy"
  })
})
// PAGE LISTING GENERAL RESOURCES
router.get("/resources", (req, res) => {
  res.render("resources", {
    title: "Resources"
  })
})
// PAGE FOR TERMS OF SERVICE
router.get("/tos", (req, res) => {
  res.render("tos", {
    title: "Terms of Service"
  })
})
// FUTURE PAGES ROUTE BELOW
router.get("/Page", (req, res) => {
  res.render("Page", {
    title: "Page" // THIS IS THE TITLE THAT IS GOING TO DISPLAY IN THE TAB
  })
})









module.exports = router;
