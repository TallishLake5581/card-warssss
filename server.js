const express = require('express');
const app = express();

// معالجة بيانات JSON و Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// إعداد الترويسات (Headers) للسماح بجميع الطلبات المباشرة
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// 1. مسار فحص إصدار اللعبة
app.get('/persist/version.txt', (req, res) => {
    console.log('[CardWars] Version check requested!');
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send("1.0.0");
});

// 2. مسارات تسجيل الدخول والحسابات التي تطلبها اللعبة
app.all(['/account*', '/account/*', '/login*', '/auth*'], (req, res) => {
    console.log(`[Account Request] Method: ${req.method} | Path: ${req.url}`);
    res.status(200).json({
        status: "success",
        message: "OK",
        authenticated: true
    });
});

// 3. الاستجابة بـ 200 OK لجميع المسارات والطلبات الأخرى لمنع خطأ 404
app.all('*', (req, res) => {
    console.log(`[CardWars Request] Method: ${req.method} | Path: ${req.url}`);
    res.status(200).send("OK");
});

// تشغيل السيرفر
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Card Wars Server running on port ${PORT}`);
});
