import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Main from '@modules/main/Main';
import Login from '@modules/login/Login';
import Register from '@modules/register/Register';
import ForgetPassword from '@modules/forgot-password/ForgotPassword';
import RecoverPassword from '@modules/recover-password/RecoverPassword';
import { useWindowSize } from '@app/hooks/useWindowSize';
import { calculateWindowSize } from '@app/utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { setWindowSize } from '@app/store/reducers/ui';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';

import Dashboard from '@pages/Dashboard';
import Blank from '@pages/Blank';
import SubMenu from '@pages/SubMenu';
import Profile from '@pages/profile/Profile';
import RegistrarEntrada from '@pages/RegistrarEntrada';
import RegistrarSalida from '@pages/RegistrarSalida';
import Preescripciones from '@pages/Preescripciones';
import Reserva from '@pages/Reserva';
import VerStockFunc from '@pages/VerStockFunc';
import VerStockMed from '@pages/VerStockMed';
import EmitirRecetas from '@pages/EmitirRecetas';
import IngresarPreescripciones from '@pages/IngresarPreescripciones';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import { setAuthentication } from './store/reducers/auth';
import {
  GoogleProvider,
  getAuthStatus,
  getFacebookLoginStatus,
} from './utils/oidc-providers';

declare const FB: any;

const App = () => {
  const windowSize = useWindowSize();
  const screenSize = useSelector((state: any) => state.ui.screenSize);
  const dispatch = useDispatch();
  const [isAppLoading, setIsAppLoading] = useState(true);

  const checkSession = async () => {
    try {
      let responses: any = await Promise.all([
        getFacebookLoginStatus(),
        GoogleProvider.getUser(),
        getAuthStatus(),
      ]);

      responses = responses.filter((r: any) => Boolean(r));

      if (responses && responses.length > 0) {
        dispatch(setAuthentication(responses[0]));
      }
    } catch (error: any) {
      console.log('error', error);
    }
    setIsAppLoading(false);
  };

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    const size = calculateWindowSize(windowSize.width);
    if (screenSize !== size) {
      dispatch(setWindowSize(size));
    }
  }, [windowSize]);

  if (isAppLoading) {
    return <p>Loading</p>;
  }

  return (
    // <ApolloProvider client={client}>
      <BrowserRouter>
        
        <Routes>
          <Route path="/login" element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/register" element={<PublicRoute />}>
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/forgot-password" element={<PublicRoute />}>
            <Route path="/forgot-password" element={<ForgetPassword />} />
          </Route>
          <Route path="/recover-password" element={<PublicRoute />}>
            <Route path="/recover-password" element={<RecoverPassword />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Main />}>
              <Route path='/hola' element={<Blank />}/>
              <Route path="/sub-menu-2" element={<Blank />} />
              <Route path="/sub-menu-1" element={<SubMenu />} />
              <Route path="/blank" element={<Blank />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/RegistrarEntrada" element={<RegistrarEntrada />} />
              <Route path="/RegistrarSalida" element={<RegistrarSalida />} />
              <Route path="/Preescripciones" element={<Preescripciones />} />
              <Route path="/VerStockMed" element={<VerStockFunc />} />
              <Route path="/VerStockFunc" element={<VerStockMed />} />
              <Route path="/Reserva" element={<Reserva />} />
              <Route path="/EmitirRecetas" element={<EmitirRecetas />} />
              <Route path="/IngresarPreescripciones" element={<IngresarPreescripciones />} />
              <Route path="/" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
        <ToastContainer
          autoClose={3000}
          draggable={false}
          position="top-right"
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnHover
        />
      </BrowserRouter>
    // </ApolloProvider>
  );
};

export default App;
