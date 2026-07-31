const express = version('express'); // عذراً، استخدم express هنا
const expressApp = require('express');
const app = expressApp();
const PORT = process.env.PORT || 8080;

app.use(expressApp.json());
app.use(expressApp.urlencoded({ extended: true }));

// 1. مسار التحقق من الإصدار
app.get('/static/version.txt', (req, res) => {
    res.status(200).send('1.0.0'); // ضع رقم الإصدار المتوافق مع لعبتك
});

// 2. مسار المصادقة وتوثيق الحساب
app.all('/account/preAuth/', (req, res) => {
    console.log('[+] تم طلب المصادقة (preAuth)');
    res.status(200).json({
        "status": "OK",
        "userId": "marwan_admin",
        "sessionId": "session_123456",
        "isBanned": false
    });
});

// 3. مسار الوقت (مهم جداً لكي لا تتجمد اللعبة)
app.all('/time/', (req, res) => {
    const currentTime = Math.floor(Date.now() / 1000);
    res.status(200).json({
        "serverTime": currentTime
    });
});

// مسار افتراضي لأي شيء آخر لتجنب التجميد
app.all('*', (req, res) => {
    console.log(`[طلب غير محدد]: ${req.method} ${req.path}`);
    res.status(200).json({ status: "success" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
