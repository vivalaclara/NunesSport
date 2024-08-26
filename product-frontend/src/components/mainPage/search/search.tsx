import React, { useState, useEffect } from 'react';
import { fetchProductById } from '../../API/APIService';
import { Product } from '../../API/types';
import './search.css'

interface SearchByIdProps {
  onProductFound: (product: Product) => void;
  onProductNotFound: () => void;
  onError: (message: string) => void;
}

const SearchById: React.FC<SearchByIdProps> = ({ onProductFound, onProductNotFound, onError }) => {
  const [searchId, setSearchId] = useState<number | ''>('');

  useEffect(() => {
    const searchProduct = async () => {
      if (searchId !== '') {
        try {
          const data = await fetchProductById(searchId);
          if (data) {
            onProductFound(data);
          } else {
            onProductNotFound();
          }
        } catch (error) {
          console.error(`Erro ao buscar produto com ID ${searchId}:`, error);
          onError('Erro ao buscar produto. Por favor, tente novamente.');
        }
      }
    };

    searchProduct();
  }, [searchId, onProductFound, onProductNotFound, onError]);

  return (
    <div className="mb-3">
      <div className="form-search">
        <input
          type="number"
          className="form-control"
          placeholder= "Buscar produto por ID"
          value={searchId || ''}
          onChange={(e) => setSearchId(parseInt(e.target.value) || '')}
        />
      </div>
    </div>
  );
};

export default SearchById;
