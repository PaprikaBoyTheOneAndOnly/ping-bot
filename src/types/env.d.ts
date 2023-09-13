declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      CONFIG_PATH: string;
      SUBSCRIPTION_CONFIG_FILE: string;
      LOG_FILE: string;
    }
  }
}

export {};
