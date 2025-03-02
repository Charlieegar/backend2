import productsModel from "../models/products.model.js";

export const createProduct = async (req, res) => {
    const { name, price, description, stock } = req.body;
    try {
        const newProduct = {
            name,
            price,
            description,
            stock,
        };

        const createdProduct = await productsModel.create(newProduct);
        res.status(201).json({ status: "Ok", payload: createdProduct });
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, stock } = req.body;
    try {
        const updatedProduct = await productsModel.findByIdAndUpdate(
            id,
            { name, price, description, stock },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ status: "Error", message: "Producto no encontrado" });
        }

        res.status(200).json({ status: "Ok", payload: updatedProduct });
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await productsModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ status: "Error", message: "Producto no encontrado" });
        }

        res.status(200).json({ status: "Ok", message: "Producto eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
};
