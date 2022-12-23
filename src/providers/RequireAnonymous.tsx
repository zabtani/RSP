import { IsLoggedInContext } from 'contexts/AuthContext';
import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Path, { AppPath } from 'routes/paths';
import { absolutePath, join } from 'utils/path.utils';

const RequireAnonymousProvider = ({ children }: React.PropsWithChildren) => {
  const isLoggedIn = React.useContext(IsLoggedInContext);
  const location = useLocation();

  return !isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate
      replace
      to={absolutePath(join(Path.App, AppPath.Home))}
      state={{ from: location }}
    />
  );
};

export default RequireAnonymousProvider;
