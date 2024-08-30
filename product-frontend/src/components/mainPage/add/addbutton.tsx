import React, { useState } from 'react';
import Api from '../../API/Api';
import { Product } from '../../API/types';
import { PlusCircle } from '@phosphor-icons/react';
import './addbutton.css';

interface AddButtonProps {
  onProductAdded: (product: Product) => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onProductAdded }) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    codigo: '',
    nome: '',
    descricao: '',
    preco: 0
  });

  const handleAddProduct = async () => {
    const preco = newProduct.preco ?? 0; 
    if (!newProduct.codigo) {
      alert('O código do produto não pode ser vazio.');
      return;
    }
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
        codigo: '',
        nome: '',
        descricao: '',
        preco: 0
      });
      setShowForm(false); 
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === 'preco' ? parseFloat(value) : name === 'codigo' ? value.toUpperCase() : value,
    });
  };

  return (
    <>
      {showForm && (
        <>
          <div className="add-form-overlay" onClick={() => setShowForm(false)}></div>
          <div className="add-form">
            <button className="btn-close" onClick={() => setShowForm(false)} aria-label='fecha modal que adiciona novo produto'>✖</button>
            <div className="addform-container">
              <p className='form-title'>Adicionar Produto</p>
              <div className="form-group">
                <label>Código</label>
                <input
                  type="text"
                  className="form-control"
                  name="codigo"
                  value={newProduct.codigo || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  className="form-control"
                  name="nome"
                  value={newProduct.nome || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group" id="desc">
                <label>Descrição</label>
                <input
                  type="text"
                  className="form-control"
                  name="descricao"
                  value={newProduct.descricao || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Preço</label>
                <input
                  type="number"
                  className="form-control"
                  name="preco"
                  value={newProduct.preco ?? 0} 
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                className="add-btn"
                onClick={handleAddProduct}
                aria-label='adiciona novo produto'
              >
                Adicionar
              </button>
            </div>
          </div>
        </>
      )}
      {!showForm && (
        <button
          className="btn-showform"
          onClick={() => setShowForm(true)}
          aria-label='abre modal que adiciona novo produto'
        >
          <PlusCircle size={24} />
        </button>
      )}
    </>
  );
};

export default AddButton;
