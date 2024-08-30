import Api from './Api';
import { Product } from './types';

export const fetchProducts = async () => {
  try {
    const response = await Api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};

export const fetchProductByCodigo = async (codigo: string): Promise<Product | null> => {
  try {
    const response = await Api.get<Product>(`/products/codigo/${codigo}`);
    
  
      return response.data;
   
  } catch (error) {
    console.error(`Erro ao buscar produto com código ${codigo}:`, error);
    return null;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    await Api.delete(`/products/${id}`); 
  } catch (error) {
    console.error(`Erro ao deletar produto com ID ${id}:`, error);
    throw error;
  }
};

export const updateProduct = async (id: number, updatedProduct: Partial<Product>) => {


  try {
    const response = await Api.put(`/products/${id}`, updatedProduct); 
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar produto com ID ${id}:`, error);
    throw error;
  }
};
