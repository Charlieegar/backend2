import Cart from "../models/carts.model.js";
import productService from "../services/products.service.js"; 
import ticketService from "../services/ticket.service.js"; 

export const createPurchase = async (req, res) => {
    const { cid } = req.params; 
    const { products } = req.body; 
    const user = req.user; 

    try {
        if (!user) {
            return res.status(401).json({ status: "Error", message: "Usuario no autenticado" });
        }

        if (!products || products.length === 0) {
            return res.status(400).json({ status: "Error", message: "No se recibieron productos para comprar" });
        }

        // Obtener el carrito de la base de datos
        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ status: "Error", message: "Carrito no encontrado" });
        }

        // Verificar stock y procesar la compra
        const cartData = await productService.verifyStockAndPreparePurchase(cart, products); // Verifica si hay stock

        if (!cartData.isStockAvailable) {
            // Si no hay suficiente stock para algunos productos
            await productService.updateCartAfterPurchase(cid, cartData.outOfStockProducts);
            return res.status(400).json({
                status: "Error",
                message: "No hay suficiente stock para algunos productos",
                outOfStockProducts: cartData.outOfStockProducts,
            });
        }

        // Crear el ticket de compra
        const ticketData = await ticketService.createTicket(cartData); 

        // Actualizar el carrito después de la compra
        await productService.updateCartAfterPurchase(cid, cartData.outOfStockProducts);

        res.status(201).json({
            status: "Ok",
            message: "Compra realizada exitosamente",
            ticket: ticketData,
            outOfStockProducts: cartData.outOfStockProducts, // Lista de productos fuera de stock
        });
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
};


export const createCart = async (req, res) => {
    try {
        const newCart = new Cart({ products: [] }); // Crea un carrito vacío
        await newCart.save();

        res.status(201).json({
            status: "Ok",
            message: "Carrito creado exitosamente",
            cartId: newCart._id
        });
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
};



