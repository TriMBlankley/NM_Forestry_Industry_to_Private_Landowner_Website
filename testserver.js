import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import fs from 'fs';
import cors from 'cors';
// import that stuff, and axios 

dotenv.config();
const app = express();
const port = 3000;
app.use(cors());
// cors makes sure that communication can still happen on different ports
app.use(express.json());

// azure mysql connect stuff
const db = mysql.createConnection({
  host: process.env.DB_HOST,            
  user: process.env.DB_USER,            
  password: process.env.DB_PASSWORD,    
  database: process.env.DB_NAME,        
  port: 3306,                           
  ssl: {
    ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem", "utf8"), // im unsure if this should be in the repo or the best place to store it. i think it depends on where the forestry wants to put it
    rejectUnauthorized: true 
  },
});

// connect + some error checking to ensure it is actually working
db.connect((err) => {
  if (err) {
    console.error('Did not connect:', err.stack);
    return;
  }
  console.log('Connected to Azure MySQL as ID ' + db.threadId);
});

// testing if it prints
app.get('/api/data', (req, res) => {
    //console.log('Received request at /api/data'); 
    // we can add more queries here so it includes type of work if needed
    const query = 'select business.*, group_concat(business_work.type_of_work order by business_work.type_of_work) as business_work from business left join business_work on business_work.bus_id = business.bus_id group by business.bus_id order by business.bus_name asc;'; 
    db.query(query, (err, results) => {
      if (err) {
        console.error('Query error:', err);
        return res.status(500).send('Query failed');
      }
      //console.log('Query results:', results); 
      res.json(results); // sends data to http://localhost:3000/api/data
    });
  });
  

// should be at 3000 since that's what it is set to
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});