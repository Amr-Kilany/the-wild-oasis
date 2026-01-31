import styled from "styled-components";
import { HiBars3 } from "react-icons/hi2";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 768px) {
    padding: 1.2rem 2rem;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  margin-right: auto;
  display: none;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-600);
  }

  &:focus {
    outline: none;
    background-color: var(--color-grey-100);
  }

  @media (max-width: 1200px) {
    display: block;
  }
`;

function Header({ showSidebar, setShowSidebar }) {
  return (
    <StyledHeader>
      <MenuButton
        onClick={(e) => {
          e.stopPropagation();
          setShowSidebar(!showSidebar);
        }}
      >
        <HiBars3 />
      </MenuButton>

      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
