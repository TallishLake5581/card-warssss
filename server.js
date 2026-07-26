// السماح بجميع الطلبات وتجنب خطأ 400
app.use((req, res, next) => {
    console.log("طلب قادم من اللعبة:", req.method, req.url);
    next();
});

// مسار شامل للبطولات (Deck Wars) لتأكيد الاتصال
app.all('*', (req, res) => {
    res.status(200).send({
        status: "ok",
        message: "Deck Wars Server Connected"
    });
    
