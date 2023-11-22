import app from "./app.js";
import { startMetricsServer } from "./utils/metrics.js";

const serverPort = process.env.PORT || 8080;
app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`);
    startMetricsServer();
});