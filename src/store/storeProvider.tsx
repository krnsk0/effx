import React from 'react';

import { createRootStore } from './createRootStore';
import { Root } from './root';

const store = createRootStore();

export const StoreContext = React.createContext<Root>(store);

const StoreProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
