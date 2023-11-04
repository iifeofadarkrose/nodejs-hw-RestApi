import Conntact from "../models/Contact.js";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";
import Contact from "../models/Contact.js";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "username email");
  res.json(result);
};

const getById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Conntact.findOne({ _id: id, owner });
  // const result = await Conntact.findById(id);
  if (!result) {
    throw HttpError(404, `Conntact with ${id} not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await Conntact.findOneAndUpdate({ _id: id, owner }, req.body);
  // const result = await Conntact.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }

  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Conntact.findOneAndUpdate({ _id: id, owner }, req.body);
  // const result = await Conntact.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }

  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOneAndDelete({ _id: id });
  // const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }

  res.json({
    message: "Delete success",
  });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
