import express from "express"
import PizzaService from "../services/pizzas-services.js"
const router = express.Router();
const srv = new PizzaService()

router.get("/", srv.getAll)
router.get("/:id", srv.getById)
router.post("/", srv.insert)
router.put("/:id", srv.update)
router.delete("/:id", srv.deleteById)


export default router;