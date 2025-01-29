import e, { Handler } from "express";
import {
  CreateCampaignRequestSchema,
  GetCampaignRequestSchema,
} from "./Schemas/CampaignRequestSchema";
import { Prisma } from "@prisma/client";
import { prisma } from "../database";

export class CampaignsController {
  index: Handler = async (req, res, next) => {
    try {
      const query = GetCampaignRequestSchema.parse(req.query);

      const {
        page = 1,
        pageSize = 10,
        name,
        description,
        sortBy = "startDate",
        order = "desc",
      } = query;

      const pageNumber = Number(page);
      const pageSizeNumber = Number(pageSize);

      const where: Prisma.CampaignWhereInput = {};

      if (name) where.name = { contains: name, mode: "insensitive" };
      if (description)
        where.description = { contains: description, mode: "insensitive" };

      const campaigns = await prisma.campaign.findMany({
        where,
        skip: (pageNumber - 1) * pageSizeNumber,
        take: pageSizeNumber,
        orderBy: { [sortBy]: order },
      });

      const total = await prisma.campaign.count({ where });

      res.json({
        data: campaigns,
        meta: {
          page: pageNumber,
          pageSize: pageSizeNumber,
          total,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  create: Handler = async (req, res, next) => {
    try {
      const body = CreateCampaignRequestSchema.parse(req.body);
      const newCampaign = await prisma.campaign.create({
        data: body,
      });

      res.json({
        newCampaign,
      });
    } catch (error) {
      next(error);
    }
  };

  show: Handler = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}
