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
const orderedItemRouter = require('./backend/routes/orderedItemRoute');
const deliveryTrackingRouter = require('./backend/routes/deliveryTrackingRoute');
const HTMLRouter = require('./backend/routes/HTMLRoute.js')

app.use(userRouter);
app.use(categoryRouter);
app.use(itemRouter);
app.use(shopRouter);
app.use(reviewRouter);
app.use(orderRouter);
app.use(orderedItemRouter);
app.use(deliveryTrackingRouter);
app.use(HTMLRouter);

// View engine
app.set('view engine', 'ejs')
app.set('views', './frontend/templates')
app.use(express.static('./frontend/public'))

/**
 * The server's main execution point
 */
async function startServer () {
  // Try connecting to the database
  console.log('Connecting to database...');
  if (await connectToDatabase()) {
    const PORT = 5123;
    const HOST = '0.0.0.0'
    app.listen(PORT, HOST, () => {
      console.log(`Server started successfully at http://${HOST}:${PORT}/`);
    });
    return;
  }
  console.error('Failed to start the server');
  process.exit(1);
}

startServer();
