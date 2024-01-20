const { model, Schema } = require('mongoose');
const ProductModel = require('../dao/models/products.model.js'); // Assuming products.model.js is in the same directory

const cartSchema = new Schema({
    products: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number,
        },
    ],
});

const CartModel = model('Cart', cartSchema);

class CartManager {
    async getCarts() {
        try {
            const carts = await CartModel.find().populate('products.productId');
            return carts;
        } catch (error) {
            console.error('Error reading carts from MongoDB:', error);
            return [];
        }
    }
    


    async getCartById(cid) {
        try {
            const cart = await CartModel.findOne({ _id: cid }).populate('products.productId');
            if (!cart) {
                return 'No se encuentra el carrito';
            }
            return cart;
        } catch (error) {
            console.error('Error getting cart by ID from MongoDB:', error);
            return 'Error obteniendo carrito por ID';
        }
    }

    async createCart(newCart) {
        try {
            const createdCart = await CartModel.create(newCart);
            return createdCart;
        } catch (error) {
            console.error('Error creating cart in MongoDB:', error);
            return 'Error creando carrito';
        }
    }

    async updateCart(cid, updatedProducts) {
        try {
            const cart = await CartModel.findOne({ _id: cid });
            if (!cart) {
                return 'No se encuentra el carrito';
            }

            cart.products = updatedProducts.map((updatedProduct) => ({
                productId: updatedProduct.productId,
                quantity: updatedProduct.quantity,
            }));

            const updatedCart = await cart.save();
            return updatedCart;
        } catch (error) {
            console.error('Error updating cart in MongoDB:', error);
            return 'Error actualizando carrito';
        }
    }

    async removeProductFromCart(cid, pid) {
        try {
            const cart = await CartModel.findOne({ _id: cid });
            if (!cart) {
                return 'No se encuentra el carrito';
            }

            cart.products = cart.products.filter((product) => product.productId.toString() !== pid);

            const updatedCart = await cart.save();
            return updatedCart;
        } catch (error) {
            console.error('Error removing product from cart in MongoDB:', error);
            return 'Error eliminando producto del carrito';
        }
    }

    async updateProductQuantity(cid, pid, quantity) {
        try {
            const cart = await CartModel.findOne({ _id: cid });
            if (!cart) {
                return 'No se encuentra el carrito';
            }

            const productIndex = cart.products.findIndex((product) => product.productId.toString() === pid);

            if (productIndex !== -1) {
                cart.products[productIndex].quantity = quantity;
            }

            const updatedCart = await cart.save();
            return updatedCart;
        } catch (error) {
            console.error('Error updating product quantity in cart in MongoDB:', error);
            return 'Error actualizando cantidad del producto en el carrito';
        }
    }

    async deleteCart(cid) {
        try {
            const result = await CartModel.deleteOne({ _id: cid });
            if (result.deletedCount === 0) {
                return 'No se encuentra el carrito';
            }
            return 'Carrito eliminado con éxito';
        } catch (error) {
            console.error('Error deleting cart in MongoDB:', error);
            return 'Error eliminando carrito';
        }
    }
}

module.exports = CartManager;
