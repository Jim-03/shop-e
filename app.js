/**
 * The main starting point of the service
 */

const express = require('express');
const app = express();
const { connectToDatabase } = require('./backend/database/database.js');
app.use(express.json())
const userRoute = require('./backend/routes/userRoute')
app.use(userRoute)

async function startServer () {
  // Try connecting to the database
  console.log('Connecting to database...');
  if (await connectToDatabase()) {
    const port = 5123;
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server started successfully and is listening on port: ${port}`);
    });
    return;
  }
  console.error('Failed to start the server');
  process.exit(1);
}

startServer();
