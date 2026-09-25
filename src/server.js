require('dotenv').config();
const app = require('./app');
const port = parseInt(process.env.PORT || '8080', 10);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});