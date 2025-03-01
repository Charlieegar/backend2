import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    products: [
        {
            productId: { type: Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, required: true }
        }
    ]
});

const Cart = model("Cart", cartSchema);
export default Cart;

