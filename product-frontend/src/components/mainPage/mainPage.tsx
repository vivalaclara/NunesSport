import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../API/APIService';
import { Product } from '../API/types';
import AddButton from './add/addbutton';
import SearchById from './search/search'
import EditProduct from './edit/edit';
import DeleteButton from './delete/delete';
import './mainPage.css'

const MainPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    loadProducts();
  }, []);

  const handleProductFound = (product: Product) => {
    setProducts([product]);
  };

  const handleProductNotFound = () => {
    alert('Produto não encontrado.');
  };

  const handleError = (message: string) => {
    alert(message);
  };

  const handleProductAdded = (product: Product) => {
    setProducts([...products, product]);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleProductUpdated = (updatedProduct: Product) => {
    setProducts(products.map(product => product.codigo === updatedProduct.codigo ? updatedProduct : product));
    setEditingProduct(null);
  };

  const handleEditClose = () => {
    setEditingProduct(null);
  };

  const handleDeleteSuccess = (id: number) => {
    setProducts(products.filter(product => product.codigo !== id));
  };

  
  const sortedProducts = products.slice().sort((a, b) => a.codigo - b.codigo);

  return (
    <div className="container">
      <h1>Lista de Produtos</h1>
      
      <AddButton onProductAdded={handleProductAdded} />
      
      <SearchById
        onProductFound={handleProductFound}
        onProductNotFound={handleProductNotFound}
        onError={handleError}
      />

      {editingProduct ? (
        <EditProduct 
          product={editingProduct}
          onProductUpdated={handleProductUpdated}
          onClose={handleEditClose}
        />
      ) : (
        <div className="product-list">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <div key={product.codigo} className="product-card">
                <p>id #{product.codigo}</p>
                <p>{product.nome}</p>
                <p>{product.descricao}</p>
                <p>Preço: R$ {product.preco.toFixed(2)}</p>
                <button 
                  className="edithandler-btn"
                  onClick={() => handleEditProduct(product)}
                >
                  Editar
                </button>
                <DeleteButton
                  id={product.codigo}
                  onDeleteSuccess={() => handleDeleteSuccess(product.codigo)}
                  onError={handleError}
                />
              </div>
            ))
          ) : (
            <div className="not-found">
              Nenhum produto encontrado.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainPage;
