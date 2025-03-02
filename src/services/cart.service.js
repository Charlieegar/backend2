export class CartService {
    constructor(cartRepository, productRepository, ticketRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.ticketRepository = ticketRepository;
    }

    async verifyStockAndPreparePurchase(cartId, products) {
        let isStockAvailable = true;
        const processedProducts = [];
        const outOfStockProducts = [];

        // Procesamos cada producto del carrito
        for (let product of products) {
            const productData = await this.productRepository.getProductById(product.productId);

            if (productData.stock < product.quantity) {
                // Si no hay suficiente stock, lo agregamos a la lista de productos fuera de stock
                outOfStockProducts.push(product.productId);
                continue; 
            }

            // Restamos el stock
            productData.stock -= product.quantity;
            await productData.save();

            processedProducts.push(productData); // Producto comprado exitosamente
        }

        // Devolver los productos fuera de stock junto con los productos procesados
        return {
            isStockAvailable: outOfStockProducts.length === 0, 
            processedProducts,
            outOfStockProducts, // Productos que no se pudieron comprar
        };
    }

    async updateCartAfterPurchase(cartId, outOfStockProducts) {
        // Actualizar el carrito para que contenga solo los productos que no fueron comprados
        const cart = await this.cartRepository.getById(cartId);
        const remainingProducts = cart.products.filter(product => !outOfStockProducts.includes(product.productId));
        
        cart.products = remainingProducts; 
        await cart.save();
    }
}
