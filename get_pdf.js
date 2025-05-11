import mysql from 'mysql2/promise'; // Using mysql2/promise for async/await
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();

// Function to fetch the PDF from the database and save it as a file
const fetchAndSavePdf = async (id) => {
  try {
    // Create the connection using the provided configuration
    const connection = await mysql.createConnection({
      host: process.env.landDB_HOST,
      user: process.env.landDB_USER,
      password: process.env.landDB_PASSWORD,
      database: process.env.landDB_NAME,
      port: 3306,
      ssl: {
        ca: fs.readFileSync('DigiCertGlobalRootCA.crt.pem', 'utf8'),
        rejectUnauthorized: true,
      },
    });

    // Query to get the PDF blob from the database by the specific ID
    const [results] = await connection.execute(
      'SELECT mgmt_plan FROM land WHERE land_id = ?',
      [id]
    );

    if (results.length === 0) {
      console.log('PDF not found');
      await connection.end();
      return;
    }

    // Get the PDF binary data from the result
    const pdfBuffer = results[0].mgmt_plan;

    if (!pdfBuffer) {
      console.log('No PDF found in the database');
      await connection.end();
      return;
    }

    // Specify the file path and name to save the PDF
    const filePath = path.join(__dirname, `management_plan_${id}.pdf`);

    // Write the buffer to a file on the disk
    await fs.promises.writeFile(filePath, pdfBuffer);

    console.log(`PDF saved successfully as ${filePath}`);

    // Close the database connection
    await connection.end();
  } catch (err) {
    console.error('Error:', err);
  }
};

// Example: Fetch and save the PDF for a specific ID (replace a with the actual ID)
fetchAndSavePdf(14);



