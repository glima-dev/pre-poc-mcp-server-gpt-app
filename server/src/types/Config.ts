export type AppEnv = 'development' | 'sandbox' | 'uat' | 'production';

export type Gtiv2BrandConfig = {
  clientKey: string;
  clientToken: string;
};

export type TargetEnvConfig = {
  endpoint_gtiv2: string;
  gtiv2: {
    volkswagen: Gtiv2BrandConfig;
  };
};

export type AppConfig = TargetEnvConfig & {
  env: AppEnv;
  port: number;
  gtiv2TimeoutMs: number;
};
