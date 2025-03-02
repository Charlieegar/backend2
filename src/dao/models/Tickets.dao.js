import TicketModel from "../../models/tickets.model.js";

export default class TicketDAO {
    async getById(id) {
        return await TicketModel.findById(id);
    }

    async create(ticketData) {
        return await TicketModel.create(ticketData);
    }
}

