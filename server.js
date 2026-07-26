const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// الرد القياسي المطلوب طبقاً لما قرأناه في KFFNetwork2
const standardKFFResponse = {
  ERROR_ID: 0,
  ERROR_MSG: "SUCCESS",
  data: {}
};

// الاستجابة لجميع المسارات والطلبات
app.all('*', (req, res) => {
  console.log(`[KFF Request Received]: ${req.method} ${req.url}`);
  if (req.body) {
    console.log('[Payload]:', JSON.stringify(req.body));
  }
  
  // إرجاع JSON متوافق 100% مع Json.Deserialize في كود يونتي
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(standardKFFResponse));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Card Wars KFF Server active on port ${PORT}`);
});
