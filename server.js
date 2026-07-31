const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).send('200 App server running');
});

app.get('/static/version.txt', (req, res) => {
    res.status(200).send('1.0.0');
});

app.all('/account/preAuth/', (req, res) => {
    res.status(200).json({
        "status": "OK",
        "userId": "marwan_admin",
        "sessionId": "session_123456",
        "isBanned": false
    });
});

app.all('/time/', (req, res) => {
    res.status(200).json({
        "serverTime": Math.floor(Date.now() / 1000)
    });
});

app.all('*', (req, res) => {
    res.status(200).json({ status: "success" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
