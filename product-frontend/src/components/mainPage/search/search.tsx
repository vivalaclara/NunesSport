import React, { useState, useEffect } from 'react';
import { fetchProductByCodigo } from '../../API/APIService';
import { Product } from '../../API/types';
import './search.css';

interface SearchByCodigoProps {
  onProductFound: (product: Product) => void;
  onProductNotFound: () => void;
  onError: (message: string) => void;
}

const SearchByCodigo: React.FC<SearchByCodigoProps> = ({ onProductFound, onProductNotFound, onError }) => {
  const [searchCodigo, setSearchCodigo] = useState<string>('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (searchCodigo === '') return;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(async () => {
      try {
        const data = await fetchProductByCodigo(searchCodigo.toUpperCase());
        if (data) {
          onProductFound(data);
        } else {
          onProductNotFound();
        }
      } catch (error) {
        console.error(`Erro ao buscar produto com código ${searchCodigo}:`, error);
        onError('Erro ao buscar produto. Por favor, tente novamente.');
      }
    }, 1000); //timer de pesquisa, 1 segundo após o usuário terminar de escrever

    setTypingTimeout(timeout);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [searchCodigo, onProductFound, onProductNotFound, onError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCodigo(e.target.value.toUpperCase());
  };

  return (
    <div className="mb-3">
      <div className="form-search">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar produto por código"
          value={searchCodigo}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default SearchByCodigo;
