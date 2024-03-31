import {
  applySnapshot,
  getSnapshot,
  ModelAutoTypeCheckingMode,
  registerRootStore,
  setGlobalConfig,
  SnapshotInOf,
} from 'mobx-keystone';

import { Root } from './root';

/**
 * Create new mobx keystone store, expose it to the window for development
 *
 * Allows injecting a snapshot for testing
 */
export function createRootStore(snapshot?: SnapshotInOf<Root>): Root {
  setGlobalConfig({
    modelAutoTypeChecking: ModelAutoTypeCheckingMode.AlwaysOn,
    showDuplicateModelNameWarnings: true,
  });
  const store = new Root({});
  if (snapshot) {
    applySnapshot(store, snapshot);
  }
  registerRootStore(store);

  if (import.meta.env.DEV) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)._keystone_store = store;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).getSnapshot = () => getSnapshot(store);
  }

  return store;
}
