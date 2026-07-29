const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// منع إعادة التوجيه وإلغاء أي فرض للـ HTTPS داخل الاستجابة
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

// الرد المباشر على ملف الإصدار
app.get('/persist/version.txt', (req, res) => {
    res.status(200).type('text/plain').send('1.0.0');
});

app.get('/', (req, res) => {
    res.status(200).send('Server is online');
});

// التعامل مع أي مسار آخر تطلبه اللعبة
app.all('*', (req, res) => {
    res.status(200).send('OK');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
