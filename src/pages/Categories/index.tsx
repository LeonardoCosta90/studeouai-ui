import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import React, {
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';

import api from '../../services/api';

import { RiCloseCircleFill } from 'react-icons/ri';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiArrowLeft, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Button from '../../components/Button'
import Header from '../../components/Header';
import { Body } from '../../components/Styles/Body';
import { Title } from '../../components/Styles/Title';
import {
  Container,
  ContainerHeader,
  TableContainer,
  Thead,
  Tbody,
  ButtonDelete,
  ButtonEdit,
  BackButtonTitleContainer,
  BackButton,
} from './styles';
import { useAuth } from '../../hooks/auth';

interface Category {
  id: string;
  name: string;
  description: string;
}

const Categories: React.FC = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.get('/categories').then(response => {
      setCategories(response.data);
    });
  }, []);

  const getCategories = useCallback(() => {
    api.get('/categories').then(response => {
      setCategories(response.data);
    });
  }, []);

  function deleteError() {
    Swal.fire('Erro!', 'Ocorreu um erro ao deletar a categoria.', 'error');
  }

  async function deleteCategory(id: string) {
    try {
      Swal.fire({
        title: 'Você deseja excluir essa categoria?',
        text: "Essa ação não pode ser revertida!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#8257E5',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Excluir'
      }).then(async(result) => {
        if (result.isConfirmed) {          
          Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Categoria excluída com sucesso!',
          showConfirmButton: false,
          timer: 1500
        })
          
          await api.delete(`/categories/${id}`);
          const updateCategories = categories.filter(category => category.id !== id);

          setCategories(updateCategories);          
        }
      })  
      
    } catch (err) {
      deleteError();
      console.log(err);
    }
  }

  return (
    <Container>
      <Header />
      <Body>
        <Toaster position="top-right" reverseOrder={false} />
         <BackButtonTitleContainer>
          <BackButton>
              <Link to="/">
                <span>
                  <FiArrowLeft
                    size={25}
                    color={'#3D3D4D'}
                  />
                </span>
              </Link>

          </BackButton>
           <Title>Categorias</Title>    
        </BackButtonTitleContainer>
           
        
        {user.isAdmin ? (
          <ContainerHeader>
            <Link to="categories/create-category">
              <Button type="submit">Nova categoria</Button>
            </Link>
          </ContainerHeader>              
        ): ('')}
        {user.isAdmin ? (  
        <TableContainer>
          <Thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </Thead>
          <Tbody>
            {categories.length > 0 &&
              categories.map(category => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td id="buttons">
                    <ButtonDelete
                      type="button"
                      id="delete"
                      onClick={() => deleteCategory(category.id)}
                    >
                      <RiCloseCircleFill />
                    </ButtonDelete>
                    <Link
                      to={{
                        pathname: 'categories/edit-category',
                        state: {
                          id: category.id,
                          name: category.name,
                          description: category.description,
                        },
                      }}
                    >
                      <ButtonEdit type="button">
                        <FiEdit2 />
                      </ButtonEdit>
                    </Link>
                  </td>
                </tr>
              ))}
          </Tbody>
        </TableContainer>
        ): (
           <Title>Sem permissão</Title> 
        )}
      </Body>
    </Container>
  );
};

export default Categories;
