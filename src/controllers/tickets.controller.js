import TicketRepository from "../dao/repositories/TicketRepository.js"

const ticketRepository = new TicketRepository();

export const createPurchase = async (req, res) => {
    const { products } = req.body; 
    const user = req.user;

    try {
        if (!user) {
            return res.status(401).json({ status: "Error", message: "Usuario no autenticado" });
        }

        if (!products || products.length === 0) {
            return res.status(400).json({ status: "Error", message: "No se recibieron productos para comprar" });
        }

        // Calcular el total de la compra
        const amount = products.reduce((total, product) => total + product.price * product.quantity, 0);

        // Generar un código único para el ticket
        const ticketCode = `TICKET-${Date.now()}`;

        // Crear el ticket
        const ticketData = {
            code: ticketCode,
            amount,
            purchaser: user.email, 
        };

        const newTicket = await ticketRepository.createTicket(ticketData);

        res.status(201).json({
            status: "Ok",
            message: "Compra registrada exitosamente",
            ticket: newTicket,
        });
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
};
