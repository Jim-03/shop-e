/**
 * The main starting point of the service
 */

const express = require('express');
const app = express();
const { connectToDatabase } = require('./backend/database/database.js');

// Routing
app.use(express.json());
const userRouter = require('./backend/routes/userRoute');
const categoryRouter = require('./backend/routes/categoryRoute');
const itemRouter = require('./backend/routes/itemRoute');
const shopRouter = require('./backend/routes/shopRoute');
const reviewRouter = require('./backend/routes/reviewRoute');
const orderRouter = require('./backend/routes/orderRoute');

app.use(userRouter);
app.use(categoryRouter);
app.use(itemRouter);
app.use(shopRouter);
app.use(reviewRouter);
app.use(orderRouter);

/**
 * The server's main execution point
 */
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
