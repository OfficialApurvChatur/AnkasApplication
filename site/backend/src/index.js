const dotenv = require('dotenv');
const database = require("./cConnection/aDatabase");
const fileStorage = require("./cConnection/bFileStorage");
const { createServer } = require('http');
const cluster = require('cluster');
const os = require('os');
const expressApp = require('./cConnection/cExpressApp');
const socketApp = require('./cConnection/dSocketApp');


// Uncaught Exception
process.on("uncaughtException", (error) => {
  console.log(`Error--> ${error.message}`)
  console.log(`Shutting down the server due to Uncaught Exception`)
  process.exit(1)
})

// Connect Environment Variable
dotenv.config({path: ".env"})

// Connect App
const app = expressApp()

// Connect Database
database()

// Connect File Storage
fileStorage()

// Connect Socket Server
const server = createServer(app);
socketApp(server, app)

// Cluster
// const numCPUs = os.cpus().length;

// if (cluster.isMaster) {
//   // console.log(`Master process ${process.pid} is running`);

//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`Worker process ${worker.process.pid} died. Restarting...`);
//     cluster.fork();
//   });
// } else {
  // Server Listen
  server.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT} at worker process ${process.pid}`)
  })
// }

// Unhandled Promise Rejection
process.on("unhandledRejection", error => {
  console.log(`Error--> ${error.message}`)
  console.log(`Shutting down the server due to Unhandled Promise Rejection`)

  server.close(() => {
    process.exit(1)
  })
})
