const express = require('express');
const app = express();

// Railway يحدد البورت تلقائياً عبر متغير البيئة، وإذا لم يوجد يستعمل 8080
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// نقطة التحقق عبر المتصفح أو الـ HTTP
app.get('/', (req, res) => {
    res.status(200).send('Card Wars Custom Server is Online and Ready!');
});

// استقبال كافة طلبات اللعبة (Endpoints) والرد عليها بنجاح
app.all('*', (req, res) => {
    console.log(`[HTTP Request] Method: ${req.method} | URL: ${req.url}`);
    res.status(200).json({
        status: "success",
        message: "Connected to Marwan's server successfully!"
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running and listening on port ${PORT}`);
});
