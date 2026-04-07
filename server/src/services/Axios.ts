import axios from 'axios';
import { randomUUID } from 'node:crypto';

import appConfig from '../config/Env.js';

export const gtiv2 = axios.create({
  baseURL: appConfig.endpoint_gtiv2,
  timeout: appConfig.gtiv2TimeoutMs,
});

gtiv2.interceptors.request.use((config) => {
  const gtiV2Config = appConfig.gtiv2?.volkswagen;

  if (!gtiV2Config) {
    return config;
  }

  config.headers['client-key'] = gtiV2Config.clientKey;
  config.headers['client-token'] = gtiV2Config.clientToken;
  config.headers['client-session-id'] = randomUUID();

  return config;
});
