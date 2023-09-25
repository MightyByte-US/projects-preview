const envs = {
    SERVER_URL: __DEV__ ? 'https://localhost:5000' : 'url for the production server',
    WEBSITE_BASE_URL: __DEV__ ? 'http://localhost:8080' : 'url for production website',
};

export { envs };
