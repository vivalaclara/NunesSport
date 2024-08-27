import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../API/APIService';
import { Product } from '../API/types';
import AddButton from './add/addbutton';
import SearchById from './search/search'
import EditProduct from './edit/edit';
import DeleteButton from './delete/delete';
import { Pencil } from '@phosphor-icons/react';
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
      <div className='container-searchadd'>
        
      <SearchById
        onProductFound={handleProductFound}
        onProductNotFound={handleProductNotFound}
        onError={handleError}
      />
      <AddButton onProductAdded={handleProductAdded} />
      
      </div>
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
                <p id="product-id">ID #{product.codigo}</p>
                <p id="product-title">{product.nome}</p>
                <p id="product-desc">{product.descricao}</p>
                <p id="product-price">R$ {product.preco.toFixed(2)}</p>
                <div className='btns-div'>
                <button 
                  className="edithandler-btn"
                  onClick={() => handleEditProduct(product)}
                  aria-label='abre formulário de edição de produto existente'
                >
                  <Pencil size={20} />
                </button>
                <DeleteButton
                  id={product.codigo}
                  onDeleteSuccess={() => handleDeleteSuccess(product.codigo)}
                  onError={handleError}
                />
                </div>
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
