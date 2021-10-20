import styled, { css } from 'styled-components';
import Tooltip from '../Tootlip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: transparent;

  border-radius: 0.25rem;

  border-bottom: 0.15rem solid transparent;
  padding: 0.75rem 1rem;
  width: 26rem;
  height: 3rem;

  color: #292929;
  background-color: #c5c0c0;

  display: flex;
  align-items: center;

   h1 {
    font-size: 56px;
    color: #3D3D4D;
    margin-bottom: 24px;
  }

  h3 {
    font-size: 24px;
    color: #7A7A80;
    text-align: center;
    line-height: 32px;
    margin-bottom: 48px
  }


  & + div {
    margin-top: 1.125rem;
  }

  ${props =>
    props.isErrored &&
    css`
      border-bottom: #8257E5;
      svg {
        color: #8257E5;
      }
    `}

  ${props =>
    props.isFocused &&
    css`
      border-bottom: 0.15rem solid #784ae0;
      color: #784ae0;

      svg {
        color: #784ae0;
      }
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #784ae0;
    `}

    input {
      color: #292929;
      background: transparent;
      border: 0;
      width: 100%;
      height: 1.5rem;
    &::placeholder {
      color: #292929;
    }
  }
  svg {
    margin-left: 0rem;
    margin-right: 0.88rem;
  }
`;

export const Error = styled(Tooltip)`
  height: 1.25rem;
  margin-left: 1.25rem;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;
    border-color: #c53030 transparent;
  }
`;
