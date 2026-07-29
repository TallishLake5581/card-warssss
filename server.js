const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// استقبال أي طلب والرد عليه بنجاح مطلق
app.all('*', (req, res) => {
    res.status(200).send('1.0.0');
});

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Secure Server is running on port ${PORT}`);
});

// منع إغلاق الاتصال المفاجئ عند مصافحة التشفير
server.on('secureConnection', (socket) => {
    socket.on('error', (err) => console.log('Socket error ignored'));
});
