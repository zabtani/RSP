import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import Path from 'routes/paths';

import Main from 'screens/Main';

const Routes = () => {
  const routes: RouteObject[] = [
    {
      path: Path.All,
      element: <Navigate to={Path.Main} />,
    },
    {
      path: Path.Main,
      element: <Main />,
    },
  ];

  return useRoutes(routes);
};

export default Routes;
