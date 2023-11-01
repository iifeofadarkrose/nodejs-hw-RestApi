import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import Contact from "../models/Contact.js";

const getAll = async (req, res) => {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    res.json(result);
}

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
        throw HttpError(404, `Contact with ${id} not found`);
    }
    res.json(result);
}

const add = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
}

const updateById = async (req, res) => {
    const { id } = req.params;

    const result = await Contact.findByIdAndUpdate(id, req.body);
    if (!result) {
        throw HttpError(404, `Contact with ${id} not found`);
    }

    res.json(result);
}

const updateFavorite = async (req, res) => {
    const { id } = req.params;

    const result = await Contact.findByIdAndUpdate(id, req.body);
    if (!result) {
        throw HttpError(404, `Contact with ${id} not found`);
    }

    res.json(result);
}

const deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404, `Contact with ${id} not found`);
    }

    res.json({
        message: "Delete success"
    })
}

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    deleteById: ctrlWrapper(deleteById),
    updateById: ctrlWrapper(updateById),
    updateFavorite: ctrlWrapper(updateFavorite),
}