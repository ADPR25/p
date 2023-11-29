import React from 'react';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));
const Sancionar = Loadable(lazy(() => import('app/views/sancion/sancion')));
const Informes = Loadable(lazy(() => import('app/views/informes/informe')));
const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));
const Prestamos = Loadable(lazy(() => import('app/views/prestamo/prestamo')));
const IMPLEMENTO = Loadable(lazy(() => import('app/views/implementos/implementos')));
const Lista = Loadable(lazy(() => import('app/views/prestamo/listar')));
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

const ProtectedRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? (
    <MatxLayout>{element}</MatxLayout>
  ) : (
    <Navigate to="/session/signin" />
  );
};

const routes = [
  {
    element: <ProtectedRoute />,
    children: [
      ...materialRoutes,
      {
        path: '/dashboard/default',
        element: <Analytics />,
      },
      // e-chart route
      {
        path: '/charts/echarts',
        element: <AppEchart />,
      },
      {
        path: '/implementos',
        element: <IMPLEMENTO />,
      },
      {
        path: '/Informes',
        element: <Informes />,
      },
      {
        path: '/prestar',
        element: <Prestamos />,
      },
      {
        path: '/listar',
        element: <Lista />,
      },
      {
        path: '/sancionar',
        element: <Sancionar />,
      }
    ]
  },
  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },
  { path: '/', element: <Navigate to="/session/signin" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
