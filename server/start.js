const { spawn } = require("child_process")
const path = require("path")

console.log("Starting BookShelf API Server...")
console.log("Environment:", process.env.NODE_ENV || "development")
console.log("Port:", process.env.PORT || 5000)
console.log("MongoDB URI:", process.env.MONGODB_URI || "mongodb+srv://hasni1731996:Hasni_786@interview-cluster.xr8gh.mongodb.net/bookshelf?retryWrites=true&w=majority")

// Start the server
const server = spawn("node", ["server.js"], {
  cwd: __dirname,
  stdio: "inherit",
})

server.on("error", (error) => {
  console.error("Failed to start server:", error)
})

server.on("close", (code) => {
  console.log(`Server process exited with code ${code}`)
})

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\nShutting down server...")
  server.kill("SIGTERM")
  process.exit(0)
})
