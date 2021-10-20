
import React, { useRef, useCallback, useState } from 'react';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { FiArrowLeft, FiUser, FiMail, FiLock } from "react-icons/fi";
import * as Yup from 'yup';

import api from '../../../services/api'

import Header from '../../../components/Header';
import { Body } from '../../../components/Styles/Body';
import { Title } from '../../../components/Styles/Title';
import Button from '../../../components/Button/index'

import {
  Container,
  BackButtonTitleContainer,
  BackButton,
  TitleContainer,
  FormContainer,
  Text,
  FormButton,
  Avatar,
} from './styles';
import { useAuth } from '../../../hooks/auth';
import Input from '../../../components/Input';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai';

interface UserFormData {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  driver_license: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  driver_license: string;
}

const EditUser: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { user } = useAuth()

  const [admin, setAdmin] = useState()

  const location = useLocation();
  const userLocation = location.state as User;

  console.log(userLocation)

  function editUserSuccess() {
    toast.success('Usuário editado com sucesso!');
  }

  function editUserError() {
    Swal.fire(
      'Erro!',
      'Ocorreu um erro ao editar o usuário, verifique os dados e tente novamente.',
      'error',
    );
  }

  function handleChangeAdmin(event: any): void {
    const isAdmin = event.target.checked;
    setAdmin(isAdmin);
  }

  const handleSubmit = useCallback(
    async (data: UserFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          email: Yup.string().required('Email obrigatório.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        console.log(userLocation)

        await api.put(`users/${userLocation.id}`, {
          name: data.name,
          email: data.email,
          password: data.password,
          isAdmin: admin,
        })

        editUserSuccess();
        history.push('/users');
      } catch (error) {
        editUserError();
      }
    },
    [history, userLocation, admin],
  );

  return (
     <Container>
      <Header />
      <Body>
        <Toaster position="top-right" reverseOrder={false} />
         <BackButtonTitleContainer>
          <BackButton>
              <Link to="/class">
                <span>
                  <FiArrowLeft
                    size={25}
                    color={'#3D3D4D'}
                  />
                </span>
              </Link>

          </BackButton>
           <Title>Usuário</Title>    
        </BackButtonTitleContainer>
         {user.avatar ? (
            <Avatar>
              <img src={user.avatar} alt="Avatar user" />
            </Avatar>):('')}
        <FormContainer>
         
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Text>
              <p>Nome:</p>
            </Text>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder={user.name}
            />

            <Text>
              <p>E-mail:</p>
            </Text>

            <Input id="email" name="email" placeholder={user.email}/>            

            {/* <FormButton>
              <Button type="submit">
                <span>Salvar</span>
              </Button>
            </FormButton> */}
          </Form>
        </FormContainer>

       
      </Body>
    </Container>
  );
}

export default EditUser