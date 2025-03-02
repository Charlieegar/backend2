import CartDAO from "../models/cart.dao.js";
import CartDTO from "../dtos/Cart.dto.js";

export default class CartRepository {
    constructor() {
        this.cartDAO = new CartDAO();
    }

    async getCartById(id) {
        const cart = await this.cartDAO.getById(id);
        return cart ? new CartDTO(cart) : null;
    }

    async createCart(cartData) {
        const newCart = await this.cartDAO.create(cartData);
        return new CartDTO(newCart);
    }

    async addProductToCart(cartId, productId) {
        const updatedCart = await this.cartDAO.addProductToCart(cartId, productId);
        return updatedCart ? new CartDTO(updatedCart) : null;
    }

    async removeProductFromCart(cartId, productId) {
        const updatedCart = await this.cartDAO.removeProductFromCart(cartId, productId);
        return updatedCart ? new CartDTO(updatedCart) : null;
    }
}
