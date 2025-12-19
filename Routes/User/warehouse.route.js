import express from "express";

import {
  createWareHouseProduct,
  getAllWarehouseProducts,
  deleteWarehouseProduct,
  getWarehouseProductById,
  updateById,

} from "../../Controller/warehouse.controller.js";
const warehouseRouter = express.Router();

//@ Create warehouseProduct
//@ POST /api/warehouse/create
//@Private
warehouseRouter.post("/create", createWareHouseProduct);

//@ Create warehouseProduct
//@ POST /api/warehoset/create
//@Private
warehouseRouter.get("/get", getAllWarehouseProducts);

//@ Delete warehouseProduct
//@ DELETE /api/warehouse/delete
//@Private
warehouseRouter.delete("/delete/:id", deleteWarehouseProduct);

//@ Delete warehouseProduct
//@ DELETE /api/warehouse/delete
//@Private
warehouseRouter.get("/get/:id", getWarehouseProductById);

//@ Update warehouseProduct
//@ UPDATE /api/warehouse/update
// //@Private
warehouseRouter.put("/update/:id", updateById);

// //@ Update warehouseProduct 
// //@ UPDATE /api/warehouse/update
// //@Private
// warehouseRouter.put("/warehouse/:id", updatewById);

export default warehouseRouter;
