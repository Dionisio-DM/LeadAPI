import { LeadsController } from "./controllers/LeadsControllers";
import { GroupsController } from "./controllers/GroupsController";
import { CampaignsController } from "./controllers/CampaignController";
import { CampaignLeadsController } from "./controllers/CampaignLeadsController";
import { GroupLeadsController } from "./controllers/GroupLeadsController";
import { PrismaLeadsRepository } from "./repositories/prisma/PrismaLeadsRepository";

const leadsRepository = new PrismaLeadsRepository();
const leadsController = new LeadsController(leadsRepository);
const groupsController = new GroupsController();
const campaignsController = new CampaignsController();
const campaignLeadsController = new CampaignLeadsController();
const groupLeadsController = new GroupLeadsController();

export {
  leadsRepository,
  leadsController,
  campaignLeadsController,
  groupLeadsController,
  groupsController,
  campaignsController,
};
