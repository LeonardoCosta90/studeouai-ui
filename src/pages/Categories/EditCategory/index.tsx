
import React, { useRef, useCallback } from 'react';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { FiArrowLeft, FiDisc, FiFileText } from "react-icons/fi";
import * as Yup from 'yup';

import api from '../../../services/api'

import Header from '../../../components/Header';
import { Body } from '../../../components/Styles/Body';
import { Title } from '../../../components/Styles/Title';
import Button from '../../../components/Button/index'
import InputForm from '../../../components/InputForm';

import {
  Container,
  BackButtonTitleContainer,
  BackButton,
  ContainerHeader,
  FormContainer,
  Text,
  FormButton,
} from './styles';
import Input from '../../../components/Input';

interface CategoryFormData {
  name: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
  description: string
}

const EditCategory: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const location = useLocation();
  const category = location.state as Category;

  function editSuccess() {
    Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Categoria editada com sucesso!',
    showConfirmButton: false,
    timer: 1500
})
  }

  function editError() {
    Swal.fire(
      'Erro!',
      'Ocorreu um erro ao editar a categoria, insera os dados corretamente!.',
      'error',
    );
  }

  const handleSubmit = useCallback(
    async (data: CategoryFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          description: Yup.string().required('Categoria obrigatória.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`categories/${category.id}`, {
          name: data.name,
          description: data.description,
        })

        editSuccess();
        history.push('/categories');
      } catch (error) {
        editError();
      }
    },
    [history, category],
  );

  return (
    <Container>
      <Header />
      <Body>
        <Toaster position="top-right" reverseOrder={false} />
        <BackButtonTitleContainer>
          <BackButton>
              <Link to="/categories">
                <span>
                  <FiArrowLeft
                    size={25}
                    color={'#3D3D4D'}
                  />
                </span>
              </Link>

          </BackButton>
           <Title>Categoria</Title>    
        </BackButtonTitleContainer>

        <FormContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Text>
              <p>Nome:</p>
            </Text>

            <Input 
              id="name"
              name="name"
              type="text"
            />

            <Text>
              <p>Descrição:</p>
            </Text>
            <Input
              id="description"
              name="description"
              type="text"
            />

            <FormButton>
              <Button type="submit" >Salvar</Button>
            </FormButton>
          </Form>
        </FormContainer>
     
      </Body>
    </Container>
  );
}

export default EditCategory