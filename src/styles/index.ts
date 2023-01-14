import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: overlay;
    scroll-behavior: smooth;

  }

  #root {
    height: inherit;
    height: 100vh;
    width: 100vw;
  }

  *, *:before, *:after {
  box-sizing: inherit;
  }
  
  body {
    margin: 0;
    background-color: #282c34;
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    transition: all 0.2s;
    &:hover {
      opacity: 0.6
    }
    &:visited {
      color: inherit;
    }
  }

  ul {
    list-style: none;
  }

  li {
    padding: 0;
    margin: 0;
  }
`;

export default GlobalStyle;
