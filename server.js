const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// استقبال أي نوع طلب على أي مسار وجعله يرد بنجاح تام
app.all('*', (req, res) => {
    console.log(`[طلب وارد] المسار: ${req.method} ${req.path}`);
    
    // إذا كان طلب للـ الإصدار
    if (req.path.includes('version')) {
        return res.status(200).send('1.0.0');
    }
    
    // إذا كان طلب للوقت
    if (req.path.includes('time')) {
        return res.status(200).json({ "serverTime": Math.floor(Date.now() / 1000) });
    }
    
    // الباقي يرد بصيغة JSON ناجحة
    return res.status(200).json({
        "status": "success",
        "message": "OK",
        "userId": "marwan_admin"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
