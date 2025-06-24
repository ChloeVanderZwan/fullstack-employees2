import db from "#db/client";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employees = [
    { name: "John Smith", birthday: "1985-03-15", salary: 75000 },
    { name: "Sarah Johnson", birthday: "1990-07-22", salary: 82000 },
    { name: "Michael Brown", birthday: "1988-11-08", salary: 68000 },
    { name: "Emily Davis", birthday: "1992-04-12", salary: 71000 },
    { name: "David Wilson", birthday: "1983-09-30", salary: 95000 },
    { name: "Lisa Anderson", birthday: "1995-01-18", salary: 65000 },
    { name: "Robert Taylor", birthday: "1987-06-25", salary: 78000 },
    { name: "Jennifer Martinez", birthday: "1991-12-03", salary: 73000 },
    { name: "Christopher Garcia", birthday: "1986-08-14", salary: 87000 },
    { name: "Amanda Rodriguez", birthday: "1993-05-20", salary: 69000 },
    { name: "James Lee", birthday: "1989-02-28", salary: 81000 },
    { name: "Michelle White", birthday: "1994-10-11", salary: 72000 }
  ];

  console.log("Creating employees...");

  for (const employee of employees) {
    const createdEmployee = await createEmployee(employee);
    console.log(
      `Created employee: ${createdEmployee.name} (ID: ${createdEmployee.id})`
    );
  }

  console.log(`✅ Created ${employees.length} employees`);
}
