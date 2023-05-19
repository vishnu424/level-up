// export const URL = process.env.REACT_APP_BASE_URL;

const env = process.env.ENV; //what is exported from next.config.js should be the key

const configs = {
  development: {
    api: "https://dev-v2.basidialearning.com",
  },
  production: {
    api: "https://api-v2.basidialearning.com",
  },
}[env];

export const URL = configs.api;
