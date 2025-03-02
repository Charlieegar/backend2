import UserDAO from "../models/Users.dao.js";
// import UserDTO from "../dtos/User.dto.js"; // No es necesario en la consulta

export default class UserRepository {
    constructor() {
        this.userDAO = new UserDAO();
    }

    async getUserById(id) {
        const user = await this.userDAO.getById(id);
        return user;
    }

    async getUserByEmail(email) {
        const user = await this.userDAO.getByEmail(email);
        return user;
    }

    async createUser(userData) {
        const newUser = await this.userDAO.create(userData);
        return newUser;  
    }
}

