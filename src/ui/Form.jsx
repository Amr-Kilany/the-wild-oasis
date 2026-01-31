import styled, { css } from "styled-components";

const Form = styled.form`
  /* Base */
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  font-size: 1.4rem; /* Regular form (card / page) */
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;
      max-width: 48rem;
      margin: 0 auto;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}
  /* Modal variant */
  ${(props) =>
    props.type === "modal" &&
    css`
      width: 100%;
      padding: 1.6rem;
      background: transparent;
      border: none;
      border-radius: 0;
    `} /* Responsive adjustments */ @media (max-width: 1024px) {
    ${(props) =>
      props.type === "regular" &&
      css`
        padding: 2rem 3.2rem;
      `}
  }
  @media (max-width: 640px) {
    font-size: 1.4rem;
    ${(props) =>
      props.type === "regular" &&
      css`
        padding: 1.6rem;
        border-radius: var(--border-radius-sm);
      `}
  }
  @media (max-width: 420px) {
    ${(props) =>
      props.type === "regular" &&
      css`
        padding: 1.2rem;
      `}
  }
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
