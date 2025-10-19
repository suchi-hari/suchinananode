import { Router } from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { login, register } from '../controllers/authController';
import { createCategory, updateCategory, deleteCategory, listcategory, fetchcategory } from '../controllers/categoryController';
import { createLanguage, updateLanguage, getalllang, deletelang, fetchlanguage } from "../controllers/languageController";
import { addsociallink, listsocialdata, deletesocalilLink, updatesociallink, fetchsocialData } from "../controllers/sociallinksController";

const router = Router();

router.post("/login", login);
router.post("/register", register);

/*add Category*/
router.post("/addcategory", verifyToken, createCategory);
router.put("/updatecat/:id", updateCategory);
router.delete("/deletecategory/:id", deleteCategory);
router.get('/listcategory', verifyToken, listcategory);
router.get('/fetchcategory/:id', fetchcategory);

/*add Language*/
router.get('/listlang', getalllang);
router.post('/createlanguage', createLanguage);
router.put('/updatelanguage/:id', updateLanguage);
router.delete('/deletelanguage/:id', deletelang);
router.get('/fetchlanguage/:id', fetchlanguage);

/*add Social*/
router.post("/addsociallink", addsociallink);
router.get("/listsocial", listsocialdata);
router.delete("/deletesocial/:id", deletesocalilLink);
router.put("/updatesociallink/:id", updatesociallink);
router.get("/fetchsocial/:id", fetchsocialData);


export default router;
