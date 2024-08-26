import React from 'react';
import { deleteProduct } from '../../API/APIService';
import { Trash } from '@phosphor-icons/react';
import './delete.css'

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
      <Trash size={20} />
    </button>
  );
};

export default DeleteButton;
