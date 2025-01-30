import { LeadsController } from "./controllers/LeadsControllers";
import { GroupsController } from "./controllers/GroupsController";
import { CampaignsController } from "./controllers/CampaignController";
import { CampaignLeadsController } from "./controllers/CampaignLeadsController";
import { GroupLeadsController } from "./controllers/GroupLeadsController";
import { PrismaLeadsRepository } from "./repositories/prisma/PrismaLeadsRepository";
import { PrismaGroupsRepository } from "./repositories/prisma/PrismaGroupsRepository";

const leadsRepository = new PrismaLeadsRepository();
const groupsRepository = new PrismaGroupsRepository();

const leadsController = new LeadsController(leadsRepository);
const groupsController = new GroupsController(groupsRepository);
const campaignsController = new CampaignsController();
const campaignLeadsController = new CampaignLeadsController();
const groupLeadsController = new GroupLeadsController(
  groupsRepository,
  leadsRepository
);

export {
  leadsRepository,
  leadsController,
  campaignLeadsController,
  groupLeadsController,
  groupsController,
  campaignsController,
};
