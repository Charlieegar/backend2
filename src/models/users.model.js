import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    first_name:
        { type: String, required: true },
    last_name: 
        { type: String, required: true },
    email: 
        { type: String, unique: true, required: true },
    age: 
        { type: Number, required: true },
    password: 
        { type: String, required: true },
    role: 
        { type: String, default: "user" },
    cart: 
        { type: Schema.Types.ObjectId, ref: "Carts" },
});

export default model("User", UserSchema);
