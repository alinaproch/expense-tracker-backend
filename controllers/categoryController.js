import Category from "../models/Category.js";
import { validationResult } from "express-validator";

export const createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  try {
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: "Error creating category" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" });
  }
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Error fetching category" });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    category.name = name;
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Error updating category" });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    await category.destroy();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting category" });
  }
};
