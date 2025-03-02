import ProductModel from "../../models/products.model.js";

export default class ProductDAO {
    async getById(id) {
        return await ProductModel.findById(id);
    }

    async getAll() {
        return await ProductModel.find();
    }

    async create(productData) {
        return await ProductModel.create(productData);
    }

    async update(id, productData) {
        return await ProductModel.findByIdAndUpdate(id, productData, { new: true });
    }

    async delete(id) {
        return await ProductModel.findByIdAndDelete(id);
    }
}
