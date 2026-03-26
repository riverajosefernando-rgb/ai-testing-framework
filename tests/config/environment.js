const ENV = process.env.ENV || 'mock';

const CONFIG = {
  mock: 'http://localhost:3000',
  dev: 'https://dev.api.bank.com',
  qa: 'https://qa.api.bank.com',
  prod: 'https://api.bank.com'
};

export const BASE_URL = CONFIG[ENV];