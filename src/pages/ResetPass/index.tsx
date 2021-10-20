import { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiLogIn } from 'react-icons/fi';
import {  AiOutlineLock, AiOutlineSecurityScan } from 'react-icons/ai';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';


import { useAuth } from '../../hooks/auth';

import logo from '../../assets/images/logo.png'

import {
  Container,
  Body,
  FormContainer,
  LogoContainer,
  Button,
  Text,
  FormButton,
  BackButton,
} from './styles';

import Input from '../../components/Input';
import Swal from 'sweetalert2';
import api from '../../services/api';


interface ForgotFormData {
  password: string;
  token: string;
}

export function ResetPass() {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

    function sendEmailSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Senha resetada com sucesso!!!',
      showConfirmButton: false,
        timer: 3500
  })
  }

  function sendEmailError() {
    Swal.fire(
      'Erro!',
      'Ocorreu um erro ao enviar o email.',
      'error',
    );
  }

  const handleSubmit = useCallback(
    async (data: ForgotFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória.'),
          token: Yup.string().required('Token obrigatório.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

         await api.post(`password/reset?token=${data.token}`, {
          password: data.password,
        })


        sendEmailSuccess();
        history.push('/login');
      } catch (error) {
        sendEmailError();
      }
    },
    [history],
  );

  return (
    <Container>
      <BackButton>
        <Link to="/">
          <span>
            <FiArrowLeft
              size={40}
              color={'#3D3D4D'}
            />
          </span>
        </Link>
      </BackButton>
      <h1>Estamos quase lá.</h1>

      <h3>
        Insira sua nova senha e o token enviado em seu email
      </h3>

      <Body>
        
        <LogoContainer>
          <img src={logo} alt="Logo" />
        </LogoContainer>

        <FormContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>

            <Text>
              <p>Nova Senha:</p>
            </Text>
            <Input
              id="password"
              name="password"
              type="password"
              icon={AiOutlineLock}
            />

            <Text>
              <p>Token:</p>
            </Text>
            <Input
              id="token"
              name="token"
              type="text"
              icon={AiOutlineSecurityScan}
            />

            <FormButton>
              <Button type="submit">
                <span>Resetar</span>
                <FiLogIn size={20} />
              </Button>
            </FormButton>
          </Form>
        </FormContainer>
      </Body>
    </Container>
  );
}

export default ResetPass;
