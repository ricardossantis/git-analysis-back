const { Router } = require("express");
const router = Router();
const multer = require('multer');
const { runCodeMaatSummary } = require('../handlers/codeMaatHandler')

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

router.post("/log", upload.single('logFile'), async (req, res) => {
  const file = req.file
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }
  try {
    const analysis = await runCodeMaatSummary(file.path)
    return res.status(200).send(`Análise ${analysis}`);
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error })
  }
});

module.exports = router;