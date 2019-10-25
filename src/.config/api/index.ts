import envConfig from '../env.conf';

const API_ENV = process.env.API_ENV;
const currentEnvConfig =
  envConfig && envConfig[API_ENV] ? envConfig[API_ENV] : {};

export default currentEnvConfig;
