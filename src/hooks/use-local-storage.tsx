import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A function that converts a typed value to a string for storage.
 */
export type Serializer<T> = (value: T) => string;

/**
 * A function that converts a stored string back into a typed value.
 */
export type Deserializer<T> = (value: string) => T;

/**
 * Configuration options for `useLocalStorage`.
 */
export type UseLocalStorageOptions<T> = {
  /** Custom serializer (defaults to `JSON.stringify`). */
  serializer?: Serializer<T>;
  /** Custom deserializer (defaults to `JSON.parse`). */
  deserializer?: Deserializer<T>;
  /**
   * When `true` (default) the hook keeps multiple tabs/windows and the same
   * tab in sync using the `storage` event and a custom `local-storage` event.
   */
  syncAcrossTabs?: boolean;
};

/**
 * The tuple returned by `useLocalStorage`.
 * - index 0: current value
 * - index 1: setter (accepts value or updater function)
 * - index 2: helpers object with `remove()` and `isAvailable` flag
 */
export type UseLocalStorageReturn<T> = readonly [
  T,
  (value: T | ((prev: T) => T)) => void,
  { remove: () => void; isAvailable: boolean },
];

/**
 * useLocalStorage
 *
 * A React hook that persists state to localStorage with safe SSR behavior.
 *
 * Features:
 * - Fully generic and strictly typed (no `any`).
 * - Safe for server-side rendering: checks for `window` and `localStorage`.
 * - Accepts a lazy initializer function or a direct initial value.
 * - Optional custom serializer / deserializer.
 * - Optional cross-tab and same-tab syncing.
 * - `remove()` helper to clear the key and reset to the initial value.
 *
 * @template T The type of the stored value.
 * @param key The `localStorage` key to read/write.
 * @param initialValue Initial value or lazy initializer function.
 * @param options Optional configuration (serializer, deserializer, syncAcrossTabs).
 * @returns A readonly tuple: `[value, setValue, { remove, isAvailable }]`.
 *
 * @example
 * ```ts
 * const [theme, setTheme, { remove }] = useLocalStorage<'light'|'dark'>('site:theme', 'light');
 * setTheme('dark');
 * remove(); // clears key and resets to 'light'
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T),
  options?: UseLocalStorageOptions<T>
): UseLocalStorageReturn<T> {
  const isBrowser =
    typeof window !== "undefined" && typeof window.localStorage !== "undefined";

  const {
    serializer = JSON.stringify as Serializer<T>,
    deserializer = JSON.parse as unknown as Deserializer<T>,
    syncAcrossTabs = true,
  } = options || {};

  /** Evaluate the initial value. Supports lazy initializer functions. */
  const getInitial = useCallback(
    (): T =>
      typeof initialValue === "function"
        ? (initialValue as () => T)()
        : initialValue,
    [initialValue]
  );

  /** Read the raw string for `key` from localStorage, or `null` on failure/SSR. */
  const readRaw = useCallback((): string | null => {
    if (!isBrowser) {
      return null;
    }
    try {
      return window.localStorage.getItem(key);
    } catch {
      // swallow and return null on access errors (e.g. security settings)
      return null;
    }
  }, [isBrowser, key]);

  /** Parse the stored value using the provided deserializer, or fall back to the initial value. */
  const readValue = useCallback((): T => {
    const raw = readRaw();
    if (raw === null) {
      return getInitial();
    }

    try {
      return deserializer(raw);
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn(
          `useLocalStorage: deserializing key "${key}" failed:`,
          error
        );
      }
      return getInitial();
    }
  }, [readRaw, deserializer, getInitial, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);
  const prevKeyRef = useRef<string>(key);

  // When the key changes, load the new key's value into state.
  useEffect(() => {
    if (prevKeyRef.current === key) {
      return;
    }
    prevKeyRef.current = key;
    setStoredValue(readValue());
    // readValue is stable because its deps are stable.
  }, [key, readValue]);

  /**
   * setValue
   * - Accepts either a value or an updater function like `setState`.
   * - Persists to localStorage when available and optionally notifies other listeners.
   */
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      const valueToStore =
        value instanceof Function
          ? (value as (prev: T) => T)(storedValue)
          : value;

      try {
        if (isBrowser) {
          window.localStorage.setItem(key, serializer(valueToStore));
          if (syncAcrossTabs) {
            window.dispatchEvent(new Event("local-storage"));
          }
        }
        setStoredValue(valueToStore);
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.warn(`useLocalStorage: setting key "${key}" failed:`, error);
        }
      }
    },
    [isBrowser, key, serializer, storedValue, syncAcrossTabs]
  );

  /** remove
   * - Removes the entry from localStorage (if available) and resets to the initial value.
   */
  const remove = useCallback(() => {
    try {
      if (isBrowser) {
        window.localStorage.removeItem(key);
        if (syncAcrossTabs) {
          window.dispatchEvent(new Event("local-storage"));
        }
      }
      setStoredValue(getInitial());
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn(`useLocalStorage: removing key "${key}" failed:`, error);
      }
    }
  }, [isBrowser, key, syncAcrossTabs, getInitial]);

  // Keep state in sync across tabs and within the same tab.
  useEffect(() => {
    if (!(isBrowser && syncAcrossTabs)) {
      return;
    }

    const updateFromStorage = () => setStoredValue(readValue());

    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key && e.key !== key) {
        return; // ignore unrelated keys
      }

      try {
        if (e.newValue !== null) {
          setStoredValue(deserializer(e.newValue));
        } else {
          setStoredValue(getInitial());
        }
      } catch {
        // Fallback: read current value using safe reader
        updateFromStorage();
      }
    };

    window.addEventListener("storage", handleStorageEvent);
    window.addEventListener("local-storage", updateFromStorage);

    return () => {
      window.removeEventListener("storage", handleStorageEvent);
      window.removeEventListener("local-storage", updateFromStorage);
    };
  }, [isBrowser, syncAcrossTabs, key, deserializer, readValue, getInitial]);

  return [storedValue, setValue, { remove, isAvailable: isBrowser }] as const;
}

/*
  Example usage (copy into a React component):

  import { useLocalStorage } from './useLocalStorage';

  function ThemeToggle() {
    const [theme, setTheme, { remove }] = useLocalStorage<'light'|'dark'>('site:theme', 'light');

    return (
      <div>
        <button onClick={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}>
          Toggle theme (current: {theme})
        </button>
        <button onClick={remove}>Reset</button>
      </div>
    );
  }
*/
