import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  /* Responsive: Stack vertically on small screens */
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.8rem;
    padding: 1.6rem 0;

    /* Ensure buttons are still right-aligned or full width */
    &:has(button) {
      flex-direction: row;
    }
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children }) {
  const inputId = !Array.isArray(children) ? children?.props?.id : undefined;
  return (
    <StyledFormRow>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
