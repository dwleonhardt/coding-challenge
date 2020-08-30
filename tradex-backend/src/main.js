"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const port = 3000;
app.get('/', (res) => {
    res.send('Test');
});
app.listen(port, () => {
    console.log(`App listening http://localhost:${port}`);
});
//# sourceMappingURL=main.js.map