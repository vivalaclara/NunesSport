import React from 'react';
import { deleteProduct } from '../../API/APIService';
interface DeleteButtonProps {
  id: number;
  onDeleteSuccess: () => void;
  onError: (message: string) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id, onDeleteSuccess, onError }) => {
  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      onDeleteSuccess();
    } catch (error) {
      console.error(`Erro ao deletar produto com ID ${id}:`, error);
      onError('Erro ao deletar produto. Por favor, tente novamente.');
    }
  };

  return (
    <button className="delete-btn" onClick={handleDelete}>
      Deletar
    </button>
  );
};

export default DeleteButton;
