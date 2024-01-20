const { Product } = require('../dao/models/products.model.js');

class ProductManager {
  constructor() {
    
  }
  async addProduct(title, description, price, thumbnail, code, stock, status, category) {
    try {
      const existingProduct = await Product.findOne({ code });
      if (existingProduct) {
        return { success: false, message: `El código del producto ya existe, Code=${code}` };
      }

      const product = new Product({
        title,
        description,
        code,
        price,
        thumbnail,
        stock,
        status,
        category,
      });

      await product.save();
      return { success: true, message: 'Producto agregado con éxito.' };
    } catch (error) {
      console.error('Error al agregar producto:', error);
      return { success: false, message: 'Error al agregar el producto.' };
    }
  }

  async deleteProduct(id) {
    try {
      const result = await Product.deleteOne({ _id: id });
      if (result.deletedCount > 0) {
        return { success: true, message: `Producto con ID ${id} eliminado con éxito.` };
      } else {
        return { success: false, message: `No se encontró un producto con ID ${id}.` };
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      return { success: false, message: 'Error al eliminar el producto.' };
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const result = await Product.updateOne({ _id: id }, { $set: updatedProduct });
      if (result.modifiedCount > 0) {
        return { success: true, message: `Producto con ID ${id} actualizado con éxito.` };
      } else {
        return { success: false, message: `No se encontró un producto con ID ${id}.` };
      }
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      return { success: false, message: 'Error al actualizar el producto.' };
    }
  }

  async getProducts({ limit = null, page = 1, pageSize = 10, sort = null, category = null, availability = null }) {
    try {
        console.log('METODO getProducts');
        console.log('limit=' + limit);
        console.log('Page=' + page);
        console.log('pageSize=' + pageSize);
        console.log('sort=' + sort);
        console.log('category=' + category);
        console.log('availability=' + availability);

        let query = Product.find();

        // Apply category filter if provided
        if (category) {
            query = query.where('category').equals(category);
        }

        // Apply availability filter if provided
        if (availability !== null) {
            query = query.where('availability').equals(availability);
        }

        // Apply the limit if provided
        if (limit !== null) {
            query = query.limit(limit);
        }

        // Apply sorting if provided
        if (sort === 'asc' || sort === 'desc') {
            const sortDirection = sort === 'asc' ? 1 : -1;
            query = query.sort({ price: sortDirection });
        }

        // Calculate the start index for pagination
        const startIndex = Math.max((page - 1) * pageSize, 0);

        // Apply pagination using Mongoose
        console.log('pagesize=' + pageSize);
        query = query.skip(startIndex).limit(pageSize);

        // Execute the query and get total count for pagination
        const [products, totalItems] = await Promise.all([
            query,
            Product.countDocuments(),
        ]);

        // Return an object with products and totalItems
        return Promise.resolve({ products, totalItems });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return Promise.resolve({ products: [], totalItems: 0 });
    }
}

  


  async getProductByCode(code) {
    try {
      const product = await Product.findOne({ code });
      return product !== null;
    } catch (error) {
      console.error('Error al verificar producto por código:', error);
      return false;
    }
  }
}

module.exports = ProductManager;
