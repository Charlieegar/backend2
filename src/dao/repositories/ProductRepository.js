import ProductDAO from "../models/product.dao.js";
import ProductDTO from "../dtos/product.dto.js";

export default class ProductRepository {
    constructor() {
        this.productDAO = new ProductDAO();
    }

    async getProductById(id) {
        const product = await this.productDAO.getById(id);
        return product ? new ProductDTO(product) : null;
    }

    async getAllProducts() {
        const products = await this.productDAO.getAll();
        return products.map(product => new ProductDTO(product));
    }

    async createProduct(productData) {
        const newProduct = await this.productDAO.create(productData);
        return new ProductDTO(newProduct);
    }

    async updateProduct(id, productData) {
        const updatedProduct = await this.productDAO.update(id, productData);
        return updatedProduct ? new ProductDTO(updatedProduct) : null;
    }

    async deleteProduct(id) {
        return await this.productDAO.delete(id);
    }
}
