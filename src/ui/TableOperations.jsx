import styled from "styled-components";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  flex-wrap: wrap; /* Key fix: Allow items to wrap */

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
    width: 100%; /* Ensure it takes full width */

    /* Ensure child elements (filters/sorts) don't overflow */
    & > * {
      width: 100%;
      max-width: 100%; /* Prevent overflow */
    }
  }
`;

export default TableOperations;
