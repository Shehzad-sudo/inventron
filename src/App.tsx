// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/electron-vite.animate.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://electron-vite.github.io" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const App = () => {
  return (
    <Router>
      <MainContainer>
        <TopNavBar>
          <NavItem to="/inventory">Inventory</NavItem>
          <NavItem to="/sales">Sales</NavItem>
          <NavItem to="/settings">Settings</NavItem>
        </TopNavBar>
        <ContentArea>
          <Routes>
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </ContentArea>
      </MainContainer>
    </Router>
  );
};

const Inventory = () => <PageTitle>Inventory Management</PageTitle>;
const Sales = () => <PageTitle>Sales Dashboard</PageTitle>;
const Settings = () => <PageTitle>Application Settings</PageTitle>;

// Styled Components
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%; /* Ensures it fills the viewport */
`;

const TopNavBar = styled.div`
  display: flex;
  background-color: #2d3e50;
  color: white;
  padding: 10px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

const NavItem = styled(NavLink)`
  color: white;
  text-decoration: none;
  margin-right: 20px;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 14px;

  &:hover {
    background-color: #1b2838;
  }

  &.active {
    font-weight: bold;
    background-color: #4c637a;
  }
`;

const ContentArea = styled.div`
  flex-grow: 1;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const PageTitle = styled.h1`
  font-size: 20px;
  color: #333;
`;

// Export App
export default App;
