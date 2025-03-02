// server.ts
import express from 'express';
import { spawn } from '@/views/MainMapSearch.vue';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/run-python', (req, res) => {
    const { arg1, arg2 } = req.body;
    const pythonProcess = spawn('python', ['@/pythonAPI/userInputGeocoder.py', arg1]);
    let result = '';

    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
             res.status(500).send(`Python script failed with code ${code}`);
        } else {
            res.send({ result: parseInt(result.trim()) });
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});