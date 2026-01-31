import styled from "styled-components";
import LoginForm from "./../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background-color: var(--color-grey-50);
  padding: 4rem 2.4rem;
  & > .login-card {
    width: 100%;
    max-width: 42rem;
    background: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: 2.4rem;
    display: grid;
    gap: 2.4rem;
    align-items: start;
  }
  @media (min-width: 640px) {
    padding: 4rem 3.2rem;
    & > .login-card {
      max-width: 48rem;
      padding: 3.2rem;
    }
  }
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 48rem;
    align-content: center;
    justify-content: center;
    gap: 3.2rem;
    padding: 0;
    & > .login-card {
      width: 48rem;
      max-width: 48rem;
      padding: 3.2rem;
      box-shadow: var(--shadow-md);
      border-radius: var(--border-radius-lg);
    }
  }
`;

function Login() {
  return (
    <LoginLayout>
      <Logo className="login-card" />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
