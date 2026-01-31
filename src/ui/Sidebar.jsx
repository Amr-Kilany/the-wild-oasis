import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  z-index: 1000;
  transition: all 0.3s;
`;

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 1200px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 26rem;
    z-index: 1001;
    transition: transform 0.3s ease-in-out;
    box-shadow: var(--shadow-lg);
    transform: ${(props) =>
      props.$showSidebar ? "translateX(0)" : "translateX(-100%)"};
  }
`;

function Sidebar({ showSidebar, setShowSidebar }) {
  const close = () => setShowSidebar(false);
  const ref = useOutsideClick(close, false);

  return (
    <>
      {showSidebar && window.innerWidth <= 1200 && <Overlay />}

      <StyledSidebar ref={ref} $showSidebar={showSidebar}>
        <Logo />
        {/* Pass the close function to MainNav so links close the drawer */}
        <MainNav closeSidebar={close} />
      </StyledSidebar>
    </>
  );
}

export default Sidebar;
