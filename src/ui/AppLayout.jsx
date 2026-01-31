import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const DemoBanner = styled.div`
  background-color: var(--color-yellow-100);
  color: var(--color-yellow-700);
  padding: 1.2rem;
  text-align: center;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  font-size: 1.6rem;
  letter-spacing: 0.5px;
  z-index: 10;
`;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  flex: 1;
  overflow: hidden;

  /* On smaller screens, remove the sidebar column. Layout becomes 1 column. */
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;

  @media (max-width: 768px) {
    padding: 2.4rem 2rem;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  const { user } = useUser();
  const isDemo = user?.email === "user@demo.com";

  // State to toggle sidebar on mobile
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <LayoutWrapper>
      {isDemo && (
        <DemoBanner>
          <span>👋</span> Data mutations (create, update, delete) are
          deactivated in this demo app.
        </DemoBanner>
      )}

      <StyledAppLayout>
        {/* Pass props to control sidebar visibility */}
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledAppLayout>
    </LayoutWrapper>
  );
}

export default AppLayout;
