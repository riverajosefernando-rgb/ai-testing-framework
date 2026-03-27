const ENV = (process.env.ENV || 'mock').toLowerCase();

export const IS_MOCK = ENV === 'mock';

export const CONFIG = {
  mock: 'http://localhost:3000',
  dev: 'https://dev.api.bank.com',
  qa: 'https://qa.api.bank.com',
  prod: 'https://api.bank.com'
};

export const BASE_URL = CONFIG[ENV];