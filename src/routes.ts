import { Router } from "express";
import { LeadsController } from "./controllers/LeadsControllers";
import { GroupsController } from "./controllers/GroupsController";
import { CampaignsController } from "./controllers/CampaignController";

const router = Router();

const leadsController = new LeadsController();
const groupsController = new GroupsController();
const campaignsController = new CampaignsController();

router.get("/leads", leadsController.index);
router.post("/leads", leadsController.create);
router.get("/leads/:id", leadsController.show);
router.put("/leads/:id", leadsController.update);
router.delete("/leads/:id", leadsController.delete);

router.get("/groups", groupsController.index);
router.post("/groups", groupsController.create);
router.get("/groups/:id", groupsController.show);
router.put("/groups/:id", groupsController.update);
router.delete("/groups/:id", groupsController.delete);

router.get("/campaigns", campaignsController.index);
router.post("/campaigns", campaignsController.create);
router.get("/campaigns/:id", campaignsController.show);
router.put("/campaigns/:id", campaignsController.update);
router.delete("/campaigns/:id", campaignsController.delete);

router.get("/status", (req, res) => {
  res.json({ message: "OK" });
});

export { router };
