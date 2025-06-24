import express from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "#db/queries/employees";

const app = express();
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

// Get all employees
app.get("/employees", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (err) {
    next(err);
  }
});

// Create employee
app.post("/employees", async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Request body required" });
    }
    const { name, birthday, salary } = req.body;
    if (!name || !birthday || salary === undefined) {
      return res.status(400).json({ error: "Missing required field(s)" });
    }
    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
});

// Get employee by id
app.get("/employees/:id", async (req, res, next) => {
  try {
    const idStr = req.params.id;
    const id = parseInt(idStr, 10);

    // Check if the string contains scientific notation or if parseInt didn't parse the full string
    if (
      isNaN(id) ||
      idStr.includes("e") ||
      idStr.includes("E") ||
      idStr !== id.toString()
    ) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }

    if (id < 0) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }

    const employee = await getEmployee(id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json(employee);
  } catch (err) {
    next(err);
  }
});

// Delete employee by id
app.delete("/employees/:id", async (req, res, next) => {
  try {
    const idStr = req.params.id;
    const id = parseInt(idStr, 10);

    // Check if the string contains scientific notation or if parseInt didn't parse the full string
    if (
      isNaN(id) ||
      idStr.includes("e") ||
      idStr.includes("E") ||
      idStr !== id.toString()
    ) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }

    if (id < 0) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }

    const deleted = await deleteEmployee(id);
    if (!deleted) return res.status(404).json({ error: "Employee not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// Update employee by id
app.put("/employees/:id", async (req, res, next) => {
  try {
    const idStr = req.params.id;
    const id = parseInt(idStr, 10);

    // Check if the string contains scientific notation or if parseInt didn't parse the full string
    if (
      isNaN(id) ||
      idStr.includes("e") ||
      idStr.includes("E") ||
      idStr !== id.toString()
    ) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }

    if (id < 0) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }

    if (!req.body) {
      return res.status(400).json({ error: "Request body required" });
    }
    const { name, birthday, salary } = req.body;
    if (!name || !birthday || salary === undefined) {
      return res.status(400).json({ error: "Missing required field(s)" });
    }
    const updated = await updateEmployee({ id, name, birthday, salary });
    if (!updated) return res.status(404).json({ error: "Employee not found" });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
