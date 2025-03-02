import TicketDAO from "../models/Tickets.dao.js";
import TicketDTO from "../dtos/Ticket.dto.js";

export default class TicketRepository {
    constructor() {
        this.ticketDAO = new TicketDAO();
    }

    async getTicketById(id) {
        const ticket = await this.ticketDAO.getById(id);
        return ticket ? new TicketDTO(ticket) : null;
    }

    async createTicket(ticketData) {
        const newTicket = await this.ticketDAO.create(ticketData);
        return new TicketDTO(newTicket);
    }
}

