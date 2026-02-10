'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { getConfig, setConfig as persistConfig, type StoreConfig } from '@/lib/config-loja';

interface ConfigContextValue {
  config: StoreConfig;
  setConfig: (config: Partial<StoreConfig>) => void;
}

const ConfigContext = createContext<ConfigContextValue | null>(null);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfigState] = useState<StoreConfig>(() => getConfig());

  useEffect(() => {
    setConfigState(getConfig());
  }, []);

  const setConfig = useCallback((next: Partial<StoreConfig>) => {
    setConfigState((prev) => {
      const updated = { ...prev, ...next };
      persistConfig(updated);
      return updated;
    });
  }, []);

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig(): ConfigContextValue {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useConfig must be used within ConfigProvider');
  return ctx;
}
