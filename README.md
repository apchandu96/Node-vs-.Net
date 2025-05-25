# Node.js vs .NET Performance Dashboard

A sample project comparing backend performance of **Node.js (Express)** and **.NET (ASP.NET Core)** with both I/O-bound and CPU-bound workloads. Includes:

* **node-backend**: Express server exposing `/echo` and `/compute` endpoints
* **dotnet-backend**: ASP.NET Core minimal API exposing `/echo` and `/compute` endpoints
* **comparison-client**: .NET console app benchmarking response times
* **react-dashboard**: React + Recharts app visualizing Min/Avg/Max response times

This hands-on comparison helps developers and tech leads choose the right backend stack based on workload characteristics.

---

## Repository Structure

```text
/ (repo root)
├── node-backend/          # Express server
├── dotnet-backend/        # ASP.NET Core server
├── comparison-client/     # .NET console benchmark
├── react-dashboard/       # React dashboard UI
├── .gitignore
└── README.md
```

---

## Prerequisites

* **Node.js** v16+ & **npm**
* **.NET SDK** 6.0+ (or 7.0/8.0)
* **Git** (optional)
* Modern browser (for React UI)

---

## 1. Node.js Backend

1. Navigate to `node-backend`

   ```bash
   cd node-backend
   npm install
   ```
2. Start the server

   ```bash
   npm start
   ```
3. The server listens on `http://localhost:3001`:

   * `GET /echo?message=hello` → returns JSON `{ timestamp, payload }`
   * `GET /compute?work=<n>` → runs a busy-loop of `<n>` iterations and returns `{ result }`

---

## 2. .NET Backend

1. Navigate to `dotnet-backend`

   ```bash
   cd dotnet-backend
   dotnet restore
   ```
2. Update the target framework in the `.csproj` if needed (e.g. `net6.0`, `net7.0`, `net8.0`).
3. Start the server

   ```bash
   dotnet run
   ```
4. The server listens on `http://localhost:3002`:

   * `GET /echo?message=hello` → returns JSON `{ Timestamp, Payload }`
   * `GET /compute?work=<n>` → runs a busy-loop and returns `{ Result }`

---

## 3. .NET Console Benchmark Client

1. Navigate to `comparison-client`

   ```bash
   cd comparison-client
   dotnet restore
   ```
2. Run the client

   ```bash
   dotnet run
   ```
3. The client makes 10 requests to both backends and prints Min/Max/Avg response times.

---

## 4. React Dashboard

1. Navigate to `react-dashboard`

   ```bash
   cd react-dashboard
   npm install
   ```
2. Start the dashboard

   ```bash
   npm start
   ```
3. Open `http://localhost:3000` in your browser.
4. Click **Run All Tests** to benchmark both `/echo` and `/compute` endpoints and visualize results in side-by-side bar charts.

---

## Extending the Tests

* Modify `work` parameter in `/compute` to change CPU load.
* Increase the number of iterations in `runTests()` in `react-dashboard/src/App.js`.
* Add new endpoints or workloads (e.g. database calls) to compare I/O vs CPU performance.

---

## GitHub

Push to your GitHub repository and enable GitHub Pages or Actions for CI benchmarks. Example repo:

```text
https://github.com/your-username/node-dotnet-dashboard
```

---

## License

MIT © Your Name
