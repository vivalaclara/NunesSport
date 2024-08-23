import React, { useState } from 'react';
import Api from '../../API/Api';
import { Product } from '../../API/types';

interface AddButtonProps {
  onProductAdded: (product: Product) => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onProductAdded }) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    nome: '',
    descricao: '',
    preco: 0
  });

  const handleAddProduct = async () => {
    const preco = newProduct.preco ?? 0; 
    if (!newProduct.nome || newProduct.nome.length > 255) {
      alert('O nome do produto deve ser preenchido e ter no máximo 255 caracteres.');
      return;
    }
    if (preco <= 0) {
      alert('O preço do produto deve ser maior que zero.');
      return;
    }

    try {
      const response = await Api.post('/products', newProduct);
      onProductAdded(response.data);
      setNewProduct({
        nome: '',
        descricao: '',
        preco: 0
      });
      setShowForm(false); 
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  return (
    <div>
      <button
        className="btn-showform"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Fechar' : 'Adicionar Produto'}
      </button>

      {showForm && (
        <div className="mb-3">
          <h2>Adicionar Produto</h2>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              className="form-control"
              value={newProduct.nome || ''}
              onChange={(e) => setNewProduct({ ...newProduct, nome: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Descrição</label>
            <input
              type="text"
              className="form-control"
              value={newProduct.descricao || ''}
              onChange={(e) => setNewProduct({ ...newProduct, descricao: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Preço</label>
            <input
              type="number"
              className="form-control"
              value={newProduct.preco ?? 0} 
              onChange={(e) => setNewProduct({ ...newProduct, preco: parseFloat(e.target.value) })}
            />
          </div>
          <button
            className="add-btn"
            onClick={handleAddProduct}
          >
            Adicionar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddButton;
