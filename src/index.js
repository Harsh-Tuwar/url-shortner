import * as React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
);

reportWebVitals();
