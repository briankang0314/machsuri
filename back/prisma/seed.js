const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const prisma = new PrismaClient();

async function main() {
  // SQL file paths relative to the script location
  const sqlFilePaths = [
    "../database/data/01_major_categories_data.sql",
    "../database/data/02_minor_categories_data.sql",
    "../database/data/03_region_data.sql",
    "../database/data/04_city_data.sql",
  ];

  for (const filePath of sqlFilePaths) {
    const absolutePath = path.join(__dirname, filePath);
    const sql = fs.readFileSync(absolutePath, { encoding: "utf8" });
    await prisma.$executeRawUnsafe(sql); // Use $executeRawUnsafe to run raw SQL
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
