"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const authController_1 = require("../controllers/authController");
const categoryController_1 = require("../controllers/categoryController");
const languageController_1 = require("../controllers/languageController");
const sociallinksController_1 = require("../controllers/sociallinksController");
const router = (0, express_1.Router)();
router.post("/login", authController_1.login);
router.post("/register", authController_1.register);
/*add Category*/
router.post("/addcategory", authMiddleware_1.verifyToken, categoryController_1.createCategory);
router.put("/updatecat/:id", categoryController_1.updateCategory);
router.delete("/deletecategory/:id", categoryController_1.deleteCategory);
router.get('/listcategory', authMiddleware_1.verifyToken, categoryController_1.listcategory);
router.get('/fetchcategory/:id', categoryController_1.fetchcategory);
/*add Language*/
router.get('/listlang', languageController_1.getalllang);
router.post('/createlanguage', languageController_1.createLanguage);
router.put('/updatelanguage/:id', languageController_1.updateLanguage);
router.delete('/deletelanguage/:id', languageController_1.deletelang);
router.get('/fetchlanguage/:id', languageController_1.fetchlanguage);
/*add Social*/
router.post("/addsociallink", sociallinksController_1.addsociallink);
router.get("/listsocial", sociallinksController_1.listsocialdata);
router.delete("/deletesocial/:id", sociallinksController_1.deletesocalilLink);
router.put("/updatesociallink/:id", sociallinksController_1.updatesociallink);
router.get("/fetchsocial/:id", sociallinksController_1.fetchsocialData);
exports.default = router;
