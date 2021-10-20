import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 56px;
    color: #3D3D4D;
    margin-bottom: 24px;
  }
`;

export const BackButtonTitleContainer = styled.div`
  width: 85%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const BackButton = styled.div`
  width: 100%;
`

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TitleContainer = styled.div`
  width: 85%;
`

export const FormContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-family: 'Poppins' sans-serif;
    font-weight: 500;
    font-size: 1.125rem;
    color: #1B1B1F;

    transform: color 0.2s;
  }

  .recuperation {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    margin-bottom: 0.5rem;

    span {
      font-family: 'Poppins' sans-serif;
      font-weight: 500;
      font-size: 0.75rem;
      color: #1B1B1F;

      transform: color 0.2s;
    }

    .error-password {
      margin-left: 3rem;
      color: #DC1637;
    }
  }
`;

export const FormButton = styled.div`
  width: 100%;
  height: 5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled.button`
  width: 7.875rem;
  height: 2.5rem;

  margin-top: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;

  background: #8257E5;
  border: none;
  color: white;

  transition: 0.5s;

  &:hover {
    background: ${shade(0.4, '#784ae0')};
  }

  span {
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: #fff;

    padding-right: 0.2rem;
  }
`;

export const Text = styled.p`
  font-weight: 500;
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;


export const Avatar = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 15rem;
    border-radius: 50%;
  }
`;