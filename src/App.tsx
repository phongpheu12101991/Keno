import './App.css';
import React, { useState } from 'react';
import NavBar from 'components/commons/NavBar';
import Body from 'components/commons/Body';
import { withRouter } from 'react-router-dom';
import { UserProvider } from 'contexts/UserContext';



const App = () => {
  const [balance, setBalance] = useState<number>(900)

  return <UserProvider value={{ balance: balance, changeBalance: setBalance }}>
    <div className="App">
      <NavBar />
      <Body />
    </div>
  </UserProvider>
};

export default withRouter(App);