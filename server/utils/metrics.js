import express from "express";
import client from "prom-client";

const app = express();

export const restResponseTimeHistogram = new client.Histogram({
    name: 'rest_response_time_duration_seconds',
    help: 'rest api response time in seconds',
    labelNames: ['method', 'route', 'status']
});

export const databaseResponseTimeHistogram = new client.Histogram({
    name: 'db_response_time_duration_seconds',
    help: 'database response time in seconds',
    labelNames: ['operaion', 'success']
});


export function startMetricsServer() {
    
    const collectDefaultMetrics = client.collectDefaultMetrics;
    collectDefaultMetrics();

    app.get('/metrics', async (req, res) => {
        res.set('Content-Type', client.register.contentType);
        return res.send(await client.register.metrics());
    });

    app.listen(9100, () => {
        console.log("Metrics server started at port 9100");
    });
};