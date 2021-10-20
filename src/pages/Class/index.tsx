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
import { FiArrowLeft, FiEdit2, FiEye } from 'react-icons/fi';
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
import { type } from 'os';
import { url } from 'inspector';

interface Classes {
  id: string;
  name: string;
  description: string;
  type: string;
  url: string;
  category_id: string;
}

const Class: React.FC = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState<Classes[]>([]);

  useEffect(() => {
    api.get('/class').then(response => {
      setClasses(response.data);
    });
  }, []);

  const getClasses = useCallback(() => {
    api.get('/class').then(response => {
      setClasses(response.data);
    });
  }, []);

  function deleteError() {
    Swal.fire('Erro!', 'Ocorreu um erro ao deletar a aula.', 'error');
  }

  async function deleteClass(id: string) {
    try {
      Swal.fire({
        title: 'Você deseja excluir essa aula?',
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
          title: 'Aula excluída com sucesso!',
          showConfirmButton: false,
          timer: 1500
        })
          
          await api.delete(`/class/${id}`);
          const updateClasses = classes.filter(classes => classes.id !== id);

          setClasses(updateClasses);          
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
           <Title>Aulas</Title>              
       {user.isAdmin ? (
        <ContainerHeader>
          <Link to="class/create-class">
            <Button type="submit">Nova aula</Button>
          </Link>
        </ContainerHeader>)
        : ('')}
        
        <TableContainer>
          <Thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </Thead>
          <Tbody>
            {classes.length > 0 &&
              classes.map(classes => (
                <tr key={classes.id}>
                  <td>{classes.name}</td>
                  <td>{classes.type}</td>
                  <td>{classes.description}</td>
                  <td id="buttons">
                    {user.isAdmin ? (
                    <ButtonDelete
                      type="button"
                      id="delete"
                      onClick={() => deleteClass(classes.id)}
                    >
                      <RiCloseCircleFill />
                    </ButtonDelete>
                    ): ('')}
                    <Link
                      to={{
                        pathname: 'class/details-class',
                        state: {
                          id: classes.id,
                          name: classes.name,
                          description: classes.description,
                          type: classes.type,
                          url: classes.url,
                        },
                      }}
                    >
                      <ButtonEdit type="button">
                        <FiEye />
                      </ButtonEdit>
                    </Link>
                  </td>
                </tr>
              ))}
          </Tbody>
        </TableContainer>
      </Body>
    </Container>
  );
};

export default Class;
