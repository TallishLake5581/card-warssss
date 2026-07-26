// 1. طباعة كل الطلبات القادمة من اللعبة لمعرفتها
app.use((req, res, next) => {
    console.log("طلب قادم من اللعبة:", req.method, req.url);
    next();
});

// 2. مسار خاص لملف manifest.json لحل طلبات الـ ETag والتحديثات
app.get('/manifest.json', (req, res) => {
    res.status(200).json({});
});

// 3. مسار شامل لكل طلبات البطولات والـ CDN والخدمات الأخرى
app.all('*', (req, res) => {
    res.status(200).send({
        status: "ok",
        message: "Deck Wars Server Connected"
    });
