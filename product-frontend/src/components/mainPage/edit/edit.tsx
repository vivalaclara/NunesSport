import React, { useState, useEffect } from 'react';
import { updateProduct } from '../../API/APIService';
import { Product } from '../../API/types';
import './edit.css'


interface EditProductProps {
  product: Product;
  onProductUpdated: (updatedProduct: Product) => void;
  onClose: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({ product, onProductUpdated, onClose }) => {
  const [formData, setFormData] = useState<Product>(product);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setFormData(product);
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'preco' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Validação
    if (!formData.nome || formData.nome.length > 255) {
      alert('O nome do produto deve ser preenchido e ter no máximo 255 caracteres.');
      return;
    }
    if (formData.preco <= 0) {
      alert('O preço do produto deve ser maior que zero.');
      return;
    }
    
    try {
      const updatedProduct = await updateProduct(formData.codigo, formData);
      onProductUpdated(updatedProduct);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      setErrorMessage('Erro ao atualizar produto. Por favor, tente novamente.');
    }
  };

  return (
    <div className="edit-form">
      <h2>Editar Produto</h2>
      {errorMessage && <div className="alert-error">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            className="form-control"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group" id="desc">
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            className="form-control"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="preco">Preço</label>
          <input
            type="number"
            id="preco"
            name="preco"
            className="form-control"
            step="0.01"
            value={formData.preco}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-save" aria-label='salvar edição'>SALVAR</button>
        <button type="button" className="btn-cancel" onClick={onClose}
           aria-label='cancelar edição, fecha o formulário de edição sem salvar'>CANCELAR</button>
      </form>
    </div>
  );
};

export default EditProduct;
