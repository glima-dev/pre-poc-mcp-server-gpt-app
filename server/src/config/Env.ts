import type { AppConfig, AppEnv, TargetEnvConfig } from '../types/Config.js';

const rawEnv = process.env.APP_ENV ?? 'development';
const env = rawEnv as AppEnv;

const port = Number(process.env.PORT ?? 2091);
const gtiv2TimeoutMs = Number(process.env.GTIV2_TIMEOUT_MS ?? 10000);

const config: Record<AppEnv, TargetEnvConfig> = {
  development: {
    endpoint_gtiv2: 'https://vwfs.threadwork.in/gti/api/v2',
    gtiv2: {
      volkswagen: {
        clientKey: 'gMeOoKBZX640kW7w5DzMlLd12Pvnr3AVy8E9JpmY',
        clientToken: '60265481212cb3e4b6e9e5910b2114a1dbd0fb98fc39653c803589fd0d07cb48',
      },
    },
  },
  sandbox: {
    endpoint_gtiv2: 'https://vwfs.threadwork.in/gti/api/v2',
    gtiv2: {
      volkswagen: {
        clientKey: 'gMeOoKBZX640kW7w5DzMlLd12Pvnr3AVy8E9JpmY',
        clientToken: '60265481212cb3e4b6e9e5910b2114a1dbd0fb98fc39653c803589fd0d07cb48',
      },
    },
  },
  uat: {
    endpoint_gtiv2: 'https://uat.vwfsbrasil.com.br/gti/api/v2',
    gtiv2: {
      volkswagen: {
        clientKey: 'gMeOoKBZX640kW7w5DzMlLd12Pvnr3AVy8E9JpmY',
        clientToken: '60265481212cb3e4b6e9e5910b2114a1dbd0fb98fc39653c803589fd0d07cb48',
      },
    },
  },
  production: {
    endpoint_gtiv2: 'https://gti.vwfsbrasil.com.br/v2',
    gtiv2: {
      volkswagen: {
        clientKey: '5pQBLmkwzrbVjXN3Z6eZL9DOG7An2xaKWldvJY14',
        clientToken: 'b3bc871fd8aef57bb9ab9dd5c1d08fe8b1dd04e03a7bcea68997db9d498f6490',
      },
    },
  },
};

const selectedConfig = config[env] ?? config.development;

export default {
  ...selectedConfig,
  env: config[env] ? env : 'development',
  port,
  gtiv2TimeoutMs,

  endpoint_gtiv2: process.env.GTIV2_BASE_URL ?? selectedConfig.endpoint_gtiv2,
  gtiv2: {
    volkswagen: {
      clientKey: process.env.GTIV2_CLIENT_KEY ?? selectedConfig.gtiv2.volkswagen.clientKey,
      clientToken: process.env.GTIV2_CLIENT_TOKEN ?? selectedConfig.gtiv2.volkswagen.clientToken,
    },
  },
} as AppConfig;
