import { Router } from "express";
import { LeadsController } from "./controllers/LeadsControllers";

const router = Router();

const leadsController = new LeadsController();

router.get("/leads", leadsController.index);
router.post("/leads", leadsController.create);
router.get("/leads/:id", leadsController.show);

router.get("/status", (req, res) => {
  res.json({ message: "OK" });
});

export { router };
