import styled from 'styled-components';
import { shade } from 'polished';

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

export const TableContainer = styled.div`
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1.5rem;
`;

export const Thead = styled.div`
  background: #9699B0;
  border-radius: 0.25rem;
  margin-bottom: 0.7rem;

  th {
    width: 100vw;
    font-family: Ubuntu;
    font-style: normal;
    font-weight: 600;
    font-size: 1.5rem;
    text-align: center;
    padding: 0.5rem;


    color: #fff;
  }
`;

export const Tbody = styled.div`
  border-radius: 0.5rem;
  display: grid;
  gap: 0.5rem;
  width: 100%;

  tr {
    background: #e5e5e5;
    &:hover {
      background: ${shade(0.2, '#E5E5E5')};
    }

    height: 4rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
  }

  td {
    font-family: Ubuntu;
    font-style: normal;
    font-weight: 400;
    text-align: center;
    color: #05233e;
  }

  td#buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
`;


export const ButtonDelete = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0.3rem;
  border: transparent;

  background: #DC1637;
  border-radius: 0.25rem;

  color: #ffffff;
  transition: background-color 0.2s;
  
  :hover {
    background: ${shade(0.2, '#DC1637')};
  }
`;

export const ButtonEdit = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0.3rem;
  border: transparent;

  background: #784ae0;
  border-radius: 0.25rem;

  color: #ffffff;
  transition: background-color 0.2s;
  &:hover {
    background: ${shade(0.2, '#553C9A')};
  }
`;