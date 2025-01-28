import { Router } from "express";
import { LeadsController } from "./controllers/LeadsControllers";

const router = Router();

const leadsController = new LeadsController();

router.get("/leads", leadsController.index);

router.get("/status", (req, res) => {
  res.json({ message: "OK" });
});

export { router };
