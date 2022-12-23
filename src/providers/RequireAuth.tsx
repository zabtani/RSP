import { setHeaderToken } from 'api/clients/auth/client';
import { AuthAPI } from 'api/clients/auth/methods';
import {
  AuthTokenContext,
  IsLoggedInContext,
  SetAuthTokenContext,
} from 'contexts/AuthContext';
import hoursToMilliseconds from 'date-fns/hoursToMilliseconds';
import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Path, { AuthPath } from 'routes/paths';
import { absolutePath, join } from 'utils/path.utils';

const RequireAuthProvider = () => {
  const isLoggedIn = React.useContext(IsLoggedInContext);
  const authToken = React.useContext(AuthTokenContext);
  const setAuthToken = React.useContext(SetAuthTokenContext);
  const location = useLocation();

  useQuery(
    ['verifyToken'],
    () => AuthAPI.verifyToken({ token: authToken ?? '' }),
    {
      refetchOnWindowFocus: false,
      refetchInterval: hoursToMilliseconds(24),
      retry: false,
      onSuccess: () => setHeaderToken(authToken ?? undefined),
      onError: () => setAuthToken(null),
    },
  );

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      replace
      to={absolutePath(join(Path.Auth, AuthPath.Logout))}
      state={{ from: location }}
    />
  );
};

export default RequireAuthProvider;
