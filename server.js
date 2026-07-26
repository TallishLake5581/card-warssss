const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// رد خاص على طلب فحص الإصدار
app.get('/persist/version.txt', (req, res) => {
    console.log('[CardWars] Version check requested!');
    res.status(200).send("1.0.0");
});

// الرد بـ 200 على أي طلب آخر
app.all('*', (req, res) => {
    console.log(`[CardWars Request] Method: ${req.method} | Path: ${req.url}`);
    res.status(200).send("OK");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Card Wars Server running on port ${PORT}`);
});
