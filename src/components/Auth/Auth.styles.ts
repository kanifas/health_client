import styled from 'styled-components'
import { Form as AntForm, FormProps } from 'antd';

export const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgba(60, 100, 68, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`

interface IFormProps extends FormProps {
  formtype: string
}

export const Form = styled(AntForm)<IFormProps>`
  padding: 50px 20px 20px;
  min-width: 500px;
  background: #fff;

  .signin {
    display: ${({ formtype }) => formtype !== 'signin' ? 'none' : 'block'}
  }

  .signup {
    display: ${({ formtype }) => formtype !== 'signup' ? 'none' : 'block'}
  }
`
