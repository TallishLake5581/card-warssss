const express = require('express');
const app = express();

// معالجة بيانات JSON و Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// إعداد الترويسات (Headers) للسماح بجميع اتصالات HTTPS المباشرة ومنع مشاكل CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
    
    // الرد الفوري على طلبات التثبت والتحقق
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// المسار الخاص بفحص إصدار اللعبة
app.get('/persist/version.txt', (req, res) => {
    console.log('[CardWars] Version check requested!');
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send("1.0.0");
});

// الاستجابة بـ 200 OK لجميع مسارات وطلبات اللعبة الأخرى (GET / POST)
app.all('*', (req, res) => {
    console.log(`[CardWars Request] Method: ${req.method} | Path: ${req.url}`);
    res.status(200).send("OK");
});

// تشغيل السيرفر على المنفذ المحدد من Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Card Wars Server running on port ${PORT}`);
});
