const express = require('express');
const app = express();

// إخبار السيرفر بالثقة بالوسيط (Render) لتجنب مشاكل التوجيه والـ HTTPS
app.set('trust proxy', true);

const PORT = process.env.PORT || 3000;

// قراءة البيانات المرسلة بصيغة JSON
app.use(express.json());

// 1. مسار فحص الاتصال الأساسي (للرد بالنص القديم الذي تتوقعه اللعبة)
app.get('/', (req, res) => {
    res.status(200).send("App server running");
});

// 2. أو أي إعدادات Manifest الرد على ملف الـ 2. أولية
app.get('/persist/static/manifest.json', (req, res) => {
    res.json({ status: "success", message: "Manifest loaded successfully" });
});

// 3. الرد العام على أي مسار فرعي يخص الإعدادات أو persist أو البيانات داخل
app.all('/persist/*', (req, res) => {
    res.json({ status: "success", data: {} });
});

// Game Data استقبـال طلبات اللعبة للـ
app.get('/persist/ua/game', (req, res) => {
    res.status(200).json({ status: "ok", data: {} });
});

// PreAuth استقبـال طلبات الـ
app.get('/account/preAuth/', (req, res) => {
    res.status(200).json({ status: "success", auth: true });
});

// 4. مسار عام شامل (Catch-all) لأي طلب ترسله اللعبة لضمان عدم توقفها نهائياً
// (دائماً في آخر السطر تماماً قبل الـ listen)
app.all('*', (req, res) => {
    res.status(200).send("OK");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
