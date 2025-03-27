import express from "express";
import cors from "cors";
import path from "path";

import { getStoredRequests, storeRequests } from "./data/requests.js";

const app = express();

const __dirname = path.resolve();

app.use(cors());

app.use(express.json());

app.get("/requests", async (req, res) => {
  const storedRequests = await getStoredRequests();
  res.json(storedRequests);
});

app.get("/requests/:id", async (req, res) => {
  const storedRequests = await getStoredRequests();
  const request = storedRequests.find((request) => request.id === req.params.id);
  res.json(request ? request : { message: "Request not found" });
});

app.post("/requests", async (req, res) => {
  const existingRequests = await getStoredRequests();
  const requestData = req.body;
  const newRequest = {
    ...requestData,
    id: Math.random().toString(),
  };
  const updatedRequests = [newRequest, ...existingRequests];
  await storeRequests(updatedRequests);
  res.status(201).json({ message: "Stored new request.", request: newRequest });
});

app.patch("/requests/:id", async (req, res) => {
  const storedRequests = await getStoredRequests();
  const index = storedRequests.findIndex((request) => request.id === req.params.id);
  
  if (index !== -1) {
    const updatedRequest = { ...storedRequests[index], ...req.body };
    storedRequests[index] = updatedRequest;
    await storeRequests(storedRequests);
    res.json({ message: "Request updated.", request: updatedRequest });
  } else {
    res.status(404).json({ message: "Request not found" });
  }
});

app.delete("/requests/:id", async (req, res) => {
  let storedRequests = await getStoredRequests();
  const index = storedRequests.findIndex((request) => request.id === req.params.id);
  
  if (index !== -1) {
    storedRequests = storedRequests.filter((request) => request.id !== req.params.id);
    await storeRequests(storedRequests);
    res.json({ message: "Request deleted." });
  } else {
    res.status(404).json({ message: "Request not found" });
  }
});

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

