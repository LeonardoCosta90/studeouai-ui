
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import React, {useRef, useCallback} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft, FiDisc, FiFileText, FiLogIn } from "react-icons/fi";

import api from '../../../services/api'

import Header from '../../../components/Header';
import { Body } from '../../../components/Styles/Body';
import { Title } from '../../../components/Styles/Title';
import Button from '../../../components/Button/index'
import InputForm from '../../../components/InputForm';

import {
  BackButton,
  BackButtonTitleContainer,
  Container, FormButton, FormContainer, Text,

} from './styles';
import Input from '../../../components/Input';
import validationErrors from '../../../utils/validateErrors';

interface UserFormData {
  name: string;
  description: string;
}

const CreateCategory: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  function createError() {
    Swal.fire(
      'Erro!',
      'Ocorreu um erro ao criar a categoria, categoria existente.',
      'error',
    );
  }

  const handleSubmit = useCallback(
    async (data: UserFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          description: Yup.string().required('Descrição obrigatória.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('categories', {
          name: data.name,
          description: data.description,
        })

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Categoria criada com sucesso!',
          showConfirmButton: false,
          timer: 1500
        })
        history.push('/categories');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = validationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }
        createError();
      }
    },
    [history],
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

            <Input id="name" name="name" type="text"/>

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

export default CreateCategory