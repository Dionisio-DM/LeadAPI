import { Campaign } from "@prisma/client";
import {
  CampaignsRepository,
  CampaignWhereParams,
  CreateCampaignAttibutes,
  FindCampaignParams,
} from "../CampaignsRepository";
import { prisma } from "../../database";

export class PrismaCampignsRepository implements CampaignsRepository {
  find(params: FindCampaignParams): Promise<Campaign[]> {
    return prisma.campaign.findMany({
      where: {
        name: {
          contains: params.where?.name?.like,
          equals: params.where?.name?.equal,
          mode: params.where?.name?.mode,
        },
        description: {
          contains: params.where?.description?.like,
          equals: params.where?.description?.equal,
          mode: params.where?.description?.mode,
        },
      },
      skip: params.offset,
      take: params.limit,
      orderBy: { [params.sortBy ?? "startDate"]: params.order },
    });
  }

  findById(id: number): Promise<Campaign | null> {
    return prisma.campaign.findUnique({
      where: { id },
    });
  }

  count(where: CampaignWhereParams): Promise<number> {
    return prisma.campaign.count({
      where: {
        name: {
          contains: where.name?.like,
          equals: where.name?.equal,
          mode: where.name?.mode,
        },
        description: {
          contains: where.description?.like,
          equals: where.description?.equal,
          mode: where.description?.mode,
        },
      },
    });
  }

  create(attributes: CreateCampaignAttibutes): Promise<Campaign | null> {
    return prisma.campaign.create({
      data: attributes,
    });
  }

  update(
    id: number,
    attributes: Partial<CreateCampaignAttibutes>
  ): Promise<Campaign | null> {
    return prisma.campaign.update({
      data: attributes,
      where: { id },
    });
  }

  delete(id: number): Promise<Campaign | null> {
    return prisma.campaign.delete({
      where: { id },
    });
  }
}
