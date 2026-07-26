const express = require('express');
const app = express();

// للسماح بقراءة البيانات المعتادة (JSON و Forms)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// الرد على أي طلب (GET أو POST أو غيره) وفي أي مسار
app.all('*', (req, res) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    
    // إرجاع استجابة ناجحة 200 OK
    res.status(200).json({
        status: "success",
        message: "Server is online and responding correctly"
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
