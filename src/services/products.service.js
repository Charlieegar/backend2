import Product from "../models/products.model.js";
import Cart from "../models/carts.model.js"; 

const productService = {
    verifyStockAndPreparePurchase: async (cart, products) => {
        let isStockAvailable = true;
        let outOfStockProducts = [];

        for (let cartProduct of cart.products) {
            const product = await Product.findById(cartProduct.productId);
            if (product.stock < cartProduct.quantity) {
                isStockAvailable = false;
                outOfStockProducts.push({ 
                    productId: cartProduct.productId, 
                    requested: cartProduct.quantity, 
                    available: product.stock 
                });
            }
        }

        return { isStockAvailable, outOfStockProducts };
    },

    updateCartAfterPurchase: async (cartId, outOfStockProducts) => {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        // Eliminar productos fuera de stock del carrito
        cart.products = cart.products.filter(cartProduct => 
            !outOfStockProducts.some(outOfStockProduct => outOfStockProduct.productId.toString() === cartProduct.productId.toString())
        );

        await cart.save();
    }
};

export default productService;
