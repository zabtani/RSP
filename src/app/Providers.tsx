import { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import StylesProvider from 'styles/Provider';

const Providers = ({ children }: PropsWithChildren) => (
  <BrowserRouter>
    <StylesProvider>{children}</StylesProvider>
  </BrowserRouter>
);

export default Providers;
