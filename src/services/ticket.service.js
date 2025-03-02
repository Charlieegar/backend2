
const createTicket = async (cartData, ticketRepository) => {
    const ticketCode = `TICKET-${Date.now()}`;
    const amount = cartData.products.reduce((total, product) => total + (product.price * product.quantity), 0);
    const purchaser = "userEmail@example.com"; 

    const ticketData = {
        code: ticketCode,
        amount: amount,
        purchaser: purchaser,
    };

    const newTicket = await ticketRepository.createTicket(ticketData);
    return newTicket;
};


export default { createTicket };

