const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());          // <-- allow any origin
app.use(express.json());
const port = 3001;

app.get('/echo', (req, res) => {
    const response = {
        timestamp: new Date().toISOString(),
        payload: req.query.message || 'hello'
    };
    res.json(response);
});

app.get('/compute', (req, res) => {
  const work = parseInt(req.query.work) || 1e6;
  // busy-loop
  let x = 0;
  for (let i = 0; i < work; i++) x += Math.sqrt(i);
  res.json({ result: x });
});

app.listen(port, () => {
    console.log(`Node.js backend listening at http://localhost:${port}`);
});
