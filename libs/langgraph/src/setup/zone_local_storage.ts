import { AsyncLocalStorageProviderSingleton } from "@langchain/core/singletons";
import "zone.js";

// Browser-compatible AsyncLocalStorage implementation using Zone.js
class ZoneLocalStorage {
  getStore(): any {
    return Zone.current.get("store");
  }

  run<T>(store: any, callback: () => T): T {
    return Zone.current
      .fork({
        name: "AsyncLocalStorageZone",
        properties: { store },
      })
      .run(callback);
  }

  enterWith(store: any): void {
    this.run(store, () => {
      /* noop */
    });
  }
}

export function initializeZoneLocalStorageSingleton() {
  AsyncLocalStorageProviderSingleton.initializeGlobalInstance(
    new ZoneLocalStorage()
  );
}
