import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

export function CartStateProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);

  function openCart() {
    setCartOpen(true);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  return (
    <LocalStateProvider value={{ cartOpen, openCart, closeCart, toggleCart }}>
      {children}
    </LocalStateProvider>
  );
}

export function useCart() {
  return useContext(LocalStateContext);
}

CartStateProvider.propTypes = {
  children: PropTypes.any,
};
