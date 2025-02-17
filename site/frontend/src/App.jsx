import { Routes, Route, Navigate, useLocation, BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RouteName from "@/love/gRoute/RouteName";
import React, { useEffect, useMemo, useState, Suspense } from 'react';
import { Action } from "@/love/eLayout/aGlobalLayout/extra/State";
import { Helmet } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster"
import Loader from '@/love/cComponent/aGlobalComponent/component/cLoader';

// Layout
import GlobalLayout from "@/love/eLayout/aGlobalLayout";
import UnprotectedLayout from "@/love/eLayout/bUnprotectedLayout";
import ProtectedLayout from "@/love/eLayout/cProtectedLayout";
import AuthenticatedLayout from "@/love/eLayout/dAuthenticatedLayout";
import AuthorisedLayout from "@/love/eLayout/eAuthorisedLayout";
import TopbarLayout from "@/love/eLayout/fTopbarLayout";
import SidebarLayout from "@/love/eLayout/gSidebarLayout";

// // Unprotected Page
const HomePage = React.lazy(() => import('@/love/fPage/bUnprotectedPage/aHomePage'));
const ProgramPage = React.lazy(() => import('@/love/fPage/bUnprotectedPage/bProgramPage'));
const AboutPage = React.lazy(() => import('@/love/fPage/bUnprotectedPage/bAboutPage'));
const ContactPage = React.lazy(() => import('@/love/fPage/bUnprotectedPage/cContactpage'));

// Protected Page
// Authenticated Page
const LoginPage = React.lazy(() => import('@/love/fPage/dAuthenticatedPage/aLoginPage'));
const RegisterPage = React.lazy(() => import('@/love/fPage/dAuthenticatedPage/bRegisterPage'));
const ForgotPasswordPage = React.lazy(() => import('@/love/fPage/dAuthenticatedPage/cForgotPasswordPage'));
const ResetPasswordPage = React.lazy(() => import('@/love/fPage/dAuthenticatedPage/dResetPasswordPage'));

// Authorised Page
// Topbar Page
const ProfileRetrievePage = React.lazy(() => import('@/love/fPage/fTopbarPage/aProfileReteivePage'));
const ProfileUpdatePage = React.lazy(() => import('@/love/fPage/fTopbarPage/bProfileUpdatePage'));
const ProfilePasswordUpdatePage = React.lazy(() => import('@/love/fPage/fTopbarPage/cProfilePasswordUpdatePage'));
const ProfileDeletePage = React.lazy(() => import('@/love/fPage/fTopbarPage/dProfileDeletePage'));

// Sidebar Page
const ChatPage = React.lazy(() => import('@/love/fPage/gSidebarPage/aChatPage'));


function App() {
  // Redux
	const Redux = {
		state: useSelector((fullState) => fullState.GlobalLayoutState),
		dispatch: useDispatch(),
		action: Action,
	};

  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // JSX
  return (
    <React.Fragment>
      <Toaster />

      <Suspense fallback={<Loader text="Suspense Loading..." />}>
        <Routes>
          {/* {getRoutes(routes)} */}

          <Route element={<GlobalLayout ReduxUltimate={Redux} />} >
            <Route element={<UnprotectedLayout ReduxUltimate={Redux} />} >
              <Route path={RouteName.GlobalRoute.HomeRoute} element={<HomePage ReduxUltimate={Redux} />} />
              <Route path={`${RouteName.GlobalRoute.ProgramRoute}/:id`} element={<ProgramPage ReduxUltimate={Redux} />} />
              <Route path={RouteName.GlobalRoute.AboutRoute} element={<AboutPage ReduxUltimate={Redux} />} />
              <Route path={RouteName.GlobalRoute.ContactRoute} element={<ContactPage ReduxUltimate={Redux} />} />
            </Route>

            <Route element={<ProtectedLayout ReduxUltimate={Redux} />} >
              <Route element={<AuthenticatedLayout ReduxUltimate={Redux} />} >
              <Route path={RouteName.AuthRoute.LoginRoute} element={<LoginPage ReduxUltimate={Redux} />} />
                <Route path={RouteName.AuthRoute.RegisterRoute} element={<RegisterPage ReduxUltimate={Redux} />} />
                <Route path={RouteName.AuthRoute.ForgotPasswordRoute} element={<ForgotPasswordPage ReduxUltimate={Redux} />} />
                <Route path={`${RouteName.AuthRoute.ResetPasswordRoute}/:token`} element={<ResetPasswordPage ReduxUltimate={Redux} />} />
              </Route>

              <Route element={<AuthorisedLayout ReduxUltimate={Redux} />} >
                <Route element={<TopbarLayout ReduxUltimate={Redux} />} >
                  <Route path={RouteName.ContentRoute.TopbarRoute.ProfileRetrieveRoute} element={<ProfileRetrievePage ReduxUltimate={Redux} />} />
                  <Route path={RouteName.ContentRoute.TopbarRoute.ProfileUpdateRoute} element={<ProfileUpdatePage ReduxUltimate={Redux} />} />
                  <Route path={RouteName.ContentRoute.TopbarRoute.ProfilePasswordUpdateRoute} element={<ProfilePasswordUpdatePage ReduxUltimate={Redux} />} />
                  <Route path={RouteName.ContentRoute.TopbarRoute.ProfileDeleteRoute} element={<ProfileDeletePage ReduxUltimate={Redux} />} />
                </Route>

                <Route element={<SidebarLayout ReduxUltimate={Redux} />} >
                  <Route path='chat' element={<ChatPage ReduxUltimate={Redux} />} />
                </Route>
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </React.Fragment>
  )
}

export default App
