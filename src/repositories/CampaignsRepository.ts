import { Campaign } from "@prisma/client";

export interface CampaignWhereParams {
  name?: {
    like?: string;
    equal?: string;
    mode?: "default" | "insensitive";
  };
  description?: {
    like?: string;
    equal?: string;
    mode?: "default" | "insensitive";
  };
}

export interface FindCampaignParams {
  where?: CampaignWhereParams;
  sortBy?: "name" | "startDate" | "endDate";
  order?: "asc" | "desc";
  limit?: number;
  offset?: number;
}

export interface CreateCampaignAttibutes {
  name: string;
  description: string;
  startDate: Date;
  endDate?: Date;
}

export interface CampaignsRepository {
  find: (params: FindCampaignParams) => Promise<Campaign[]>;
  findById: (id: number) => Promise<Campaign | null>;
  count: (where: CampaignWhereParams) => Promise<number>;
  create: (attributes: CreateCampaignAttibutes) => Promise<Campaign | null>;
  update: (
    id: number,
    attributes: Partial<CreateCampaignAttibutes>
  ) => Promise<Campaign | null>;
  delete: (id: number) => Promise<Campaign | null>;
}
