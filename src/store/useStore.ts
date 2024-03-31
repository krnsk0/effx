import { useContext } from 'react';

import { StoreContext } from './storeProvider';

export const useStore = () => {
  return useContext(StoreContext);
};
