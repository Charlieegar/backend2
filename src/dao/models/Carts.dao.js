import CartModel from "../../models/carts.model.js";

export default class CartDAO {
    async getById(id) {
        return await CartModel.findById(id).populate("products.product");
    }

    async create(cartData) {
        return await CartModel.create(cartData);
    }

    async update(id, cartData) {
        return await CartModel.findByIdAndUpdate(id, cartData, { new: true });
    }

    async addProductToCart(cartId, productId) {
        return await CartModel.findByIdAndUpdate(
            cartId,
            { $push: { products: { product: productId } } },
            { new: true }
        );
    }

    async removeProductFromCart(cartId, productId) {
        return await CartModel.findByIdAndUpdate(
            cartId,
            { $pull: { products: { product: productId } } },
            { new: true }
        );
    }
}
