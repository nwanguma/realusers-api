import config from "./env.js";

const env = process.env.NODE_ENV || "development";

if (env === "test" || env === "development") {
  const envConfig = config[env];
  const envConfigKeys = Object.keys(envConfig);

  envConfigKeys.forEach((key) => {
    process.env[key] = envConfig[key];
  });
}
