const { insert, execute, updateOne, ForDelexecute, ForUpdateexecute } = require("../db");
const { categModel, servModel } = require("../models/category");
const tb = require("../constant");

exports.createCategory = async (req, res) => {
  const { categName } = req.body;

  if (!req.body.categName) {
    return res.status(400).json({ error: "Category name is required." });
  }

  try {
    const model = categModel(req.body);
    console.log("model is : ", model);
    const result = await insert(tb.constant.category, model);
    console.log("res : ", res);
    if (result) {
      return res
        .status(201)
        .json({ message: "Category added successfully.", result: result });
    }
    return res.status(500).json({ error: "Failed to add category." });
  } catch (error) {
    console.log("eror : ", error);
    return res.status(500).json({ error: "Failed to add category." });
  }
};

exports.categoryList = async (req, res) => {
  try {
    const qr = "SELECT * FROM category";
    const result = await execute(qr);
    if (result) {
      return res.send(result);
    }

    return res.status(500).json({ error: "Failed to fetch category." });
  } catch (error) {
    console.log("error",  error);
    
    return res.status(500).json({ error: "Failed to fetch category." });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const qr = `UPDATE category SET name = '${req.body.catName}' WHERE id = ${categoryId}`
    console.log("qr : ", qr)
    const result = await ForUpdateexecute(qr)
    console.log("result is : ",result)
     if(result){
        return res
        .status(201)
        .json({ message: "Category updated successfully.", result: result });
     }
     return res.status(500).json({ error: "Failed to update category." });
  } catch (error) {
    console.log("error : ", error)
    return res.status(500).json({ error: "Failed to update category." });
  }
};

exports.deletCategory = async (req, res) => {
  try {
    const {categoryId} = req.params
    const qr = `DELETE FROM category WHERE id = ${categoryId}`
    const result = await ForDelexecute(qr)
    console.log("result delete" , result)
    if(result){
        return res
        .status(201)
        .json({ message: "Category deleted successfully.", result: result });
     }
     return res.status(500).json({ error: "Failed to delete category." });
  } catch (error) {
    console.log("error : ", error)
    return res.status(500).json({ error: "Failed to delete category." });
  }
};

//------------------------------------------

exports.createService = async (req, res) => {
  try {
    
    const model = servModel(req.body)
    const result = await insert(tb.constant.category, model)
    if (result) {
        return res
          .status(201)
          .json({ message: "service added successfully.", result: result });
      }
      return res.status(500).json({ error: "Failed to add service." });
    } catch (error) {
      console.log("eror : ", error);
      return res.status(500).json({ error: "Failed to add service." });
    }
};

exports.serviceListByCateg = async (req, res) => {
    const {categoryId} = req.params
  try {
   const qr = `SELECT * FROM Service WHERE CategoryId = ${categoryId}`
   const result = await execute(qr)
   if (result) {
    return res
      .status(201)
      .json({ message: "service fetched successfully.", result: result });
  }
  return res.status(500).json({ error: "Failed to fetch services." });
} catch (error) {
  console.log("eror : ", error);
  return res.status(500).json({ error: "Failed to fetch services." });
}
};

exports.updateServById = async (req, res) => {
  try {

    const {serviceId , categoryId} = req.params
    const qr = `UPDATE service SET ServiceName=${req.body.servName} , Type = ${req.body.type} , Price = ${req.body.price} WHERE id = ${serviceId} and CategoryId = ${categoryId} `
    const result = await execute(qr)
    if(result){
        return res
        .status(201)
        .json({ message: "Service updated successfully.", result: result });
     }
     return res.status(500).json({ error: "Failed to update Service." });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update Service." });
  }
};

exports.delService = async (req, res) => {
  try {
    const {serviceId , categoryId} = req.params
    
    const qr = `DELETE FROM servie WHERE id = ${serviceId} and CategoryId = ${categoryId}`
    const result = await execute(qr)
    if(result){
        return res
        .status(201)
        .json({ message: "Category deleted successfully.", result: result });
     }
     return res.status(500).json({ error: "Failed to delete category." });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete category." });
  }
};
