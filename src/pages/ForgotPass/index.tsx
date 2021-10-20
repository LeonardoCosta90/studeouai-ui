import { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiLogIn } from 'react-icons/fi';
import { AiOutlineMail } from 'react-icons/ai';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';


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

import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import api from '../../services/api';

interface ForgotFormData {
  email: string;
}

export function ForgotPass() {
   const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  function sendEmailSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Caso o email existir será enviado um token para reset da senha!!!',
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
          email: Yup.string().required('Email obrigatório.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('password/forgot', {
          email: data.email,
        })

        sendEmailSuccess();
        history.push('/reset-pass');
      } catch (error) {

        console.log(error);
        sendEmailError();
      }
    },
    [history],
  );

  return (
    <Container>
      <BackButton>
        <Link to="/login">
          <span>
            <FiArrowLeft
              size={40}
              color={'#3D3D4D'}
            />
          </span>
        </Link>
      </BackButton>
      <h1>Recuperação de senha.</h1>

      <h3>
        Digite o email para recuperar a senha!!!
      </h3>

      <Body>
        
        <LogoContainer>
          <img src={logo} alt="Logo" />
        </LogoContainer>

        <FormContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Text>
              <p>E-mail:</p>
            </Text>

            <Input id="email" name="email" icon={AiOutlineMail} />

            <FormButton>
              <Button type="submit">
                <span>Enviar</span>
                <FiLogIn size={20} />
              </Button>
            </FormButton>
          </Form>
        </FormContainer>
      </Body>
    </Container>
  );
}

export default ForgotPass;
