import app from './app.js';

const serverPort = process.env.PORT || 8080;
app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`);
});