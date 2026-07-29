const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// الرد المباشر على ملف الإصدار الذي تبحث عنه اللعبة
app.get('/persist/version.txt', (req, res) => {
    res.status(200).send('1.0.0');
});

// نقطة التحقق الرئيسية
app.get('/', (req, res) => {
    res.status(200).send('Card Wars Custom Server is Online and Ready!');
});

// حل سحري لأي ملف أو مسار تطلبه اللعبة ولا نملكه: السيرفر سينشئه ويرد عليه بـ OK فوراً
app.all('*', (req, res) => {
    console.log(`[Auto-Catch] Requested URL: ${req.url}`);
    // إذا كانت اللعبة تطلب ملف نصي أو بيانات
    if (req.url.includes('.txt') || req.url.includes('.json')) {
        return res.status(200).send('OK');
    }
    // لأي طلب آخر للعبة
    res.status(200).json({
        status: "success",
        message: "Handled successfully by Marwan's server"
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
