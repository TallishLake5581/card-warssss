const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// قراءة البيانات المرسلة بصيغة JSON
app.use(express.json());

// 1. مسار فحص الاتصال الأساسي (للرد بالنص القديم الذي تتوقعه اللعبة)
app.get('/', (req, res) => {
    res.status(200).send("App server running");
});

// 2. الرد على ملف الـ Manifest أو أي إعدادات أولية
app.get('/persist/static/manifest.json', (req, res) => {
    res.json({ status: "success", message: "Manifest loaded successfully" });
});

// 3. الرد العام على أي مسار فرعي يخص الإعدادات أو البيانات داخل persist
app.all('/persist/*', (req, res) => {
    res.json({ status: "success", data: {} });
});

// 4. مسار عام شامل (Catch-all) لأي طلب آخر ترسله اللعبة لضمان عدم توقفها نهائياً
app.all('*', (req, res) => {
    res.status(200).send("OK");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
