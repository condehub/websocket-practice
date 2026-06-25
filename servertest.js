const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("Sucessfully connected");
})

app.listen(3000, () => console.log('Server ready'))

process.memoryUsage('SIGTERM', () => {
    app.close(() => {
        console.log('Process terminated')
    })
})