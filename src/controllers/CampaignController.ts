import e, { Handler } from "express";
import {
  CreateCampaignRequestSchema,
  GetCampaignRequestSchema,
  UpdateCampaignRequestSchema,
} from "./Schemas/CampaignRequestSchema";
import { HttpError } from "../errors/HttpError";
import {
  CampaignsRepository,
  CampaignWhereParams,
} from "../repositories/CampaignsRepository";

export class CampaignsController {
  constructor(private readonly campaignsRepository: CampaignsRepository) {}
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

      const limit = Number(pageSize);
      const offset = (Number(page) - 1) * limit;

      const where: CampaignWhereParams = {};

      if (name) where.name = { like: name, mode: "insensitive" };
      if (description)
        where.description = { like: description, mode: "insensitive" };

      const campaigns = await this.campaignsRepository.find({
        where,
        limit,
        offset,
        order,
        sortBy,
      });

      const total = await this.campaignsRepository.count(where);

      res.json({
        data: campaigns,
        meta: {
          page: Number(page),
          pageSize: limit,
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
      const newCampaign = await this.campaignsRepository.create(body);

      res.status(201).json({
        newCampaign,
      });
    } catch (error) {
      next(error);
    }
  };

  show: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;

      const campaign = await this.campaignsRepository.findById(id);

      if (!campaign) throw new HttpError(404, "Campaign not found!");

      res.json(campaign);
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const body = UpdateCampaignRequestSchema.parse(req.body);

      const campaignExists = await this.campaignsRepository.findById(id);

      if (!campaignExists) throw new HttpError(404, "Campaign not Found!");

      const campaign = await this.campaignsRepository.update(id, body);

      res.json(campaign);
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const campaignExists = await this.campaignsRepository.findById(id);

      if (!campaignExists) throw new HttpError(404, "Campaign not Found!");

      const deletedCampaign = await this.campaignsRepository.delete(id);

      res.json(deletedCampaign);
    } catch (error) {
      next(error);
    }
  };
}
