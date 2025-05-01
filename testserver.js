import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import fs from 'fs';
import cors from 'cors';
import multer from 'multer';
// import that stuff, and axios 

dotenv.config();
const app = express();
const port = 3000;
const upload = multer(); 
app.use(cors());
// cors makes sure that communication can still happen on different ports
app.use(express.json());

// This is how connections to the Azure MySQL server is done. Change this based on where the SQL server is being hosted.
const db = mysql.createConnection({
  host: process.env.busDB_HOST,            
  user: process.env.busDB_USER,            
  password: process.env.busDB_PASSWORD,    
  database: process.env.busDB_NAME,        
  port: 3306,                           
  ssl: {
    ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem", "utf8"), 
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
     // db.end();
    });
  });
  

// should be at 3000 since that's what it is set to
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



app.post('/api/submit', (req, res) => {
  const {
    bus_name,
    website,
    zip,
    county,
    city,
    address,
    mailing_add,
    email,
    work_radius,
    phone_num,
    latitude,
    longitude,
    work_types
  } = req.body;

  const insertBusinessQuery = `
    INSERT INTO business 
    (bus_name, website, zip, county, city, address, mailing_add, email, work_radius, phone_num, latitude, longitude)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    bus_name,
    website,
    zip,
    county,
    city,
    address,
    mailing_add,
    email,
    work_radius,
    phone_num,
    latitude,
    longitude
  ];

  db.query(insertBusinessQuery, values, (err, result) => {
    if (err) {
      console.error('Business insert error:', err);
      return res.status(500).send('Failed to insert business');
    }

    const busId = result.insertId;

    if (Array.isArray(work_types) && work_types.length > 0) {
      const insertWorkQuery = `
        INSERT INTO business_work (bus_id, type_of_work) VALUES ?
      `;
      const workValues = work_types.map((type) => [busId, type]);

      db.query(insertWorkQuery, [workValues], (err2) => {
        if (err2) {
          console.error('Work type insert error:', err2);
          return res.status(500).send('Failed to insert work types');
        }

        return res.status(200).send('Business and work types added successfully');
      });
    } else {
      return res.status(200).send('Business added successfully (no work types)');
    }
  });
});

app.post('/api/submit-landowner', upload.single('mgmt_plan'), (req, res) => {
  const {
    owner_name,
    entity_name,
    phone_num,
    contact_address,
    email,
    land_address,
    land_zip,
    land_city,
    land_county,
    parcel_id,
    forest_plan,
    land_size,
    land_occupancy,
    wildfire,
    flooding
  } = req.body;

  const mgmt_plan = req.file?.buffer || null; 

  // 1. Insert into landowner table
  const ownerQuery = `
    INSERT INTO landowner (owner_name, entity_name, phone_num, contact_address, email)
    VALUES (?, ?, ?, ?, ?)
  `;
  const ownerValues = [owner_name, entity_name, phone_num, contact_address, email];

  // Open a new connection (optional, but as you mentioned, connect-on-submit style)

  const connection = mysql.createConnection({
    host: process.env.landDB_HOST,
    user: process.env.landDB_USER,
    password: process.env.landDB_PASSWORD,
    database: process.env.landDB_NAME,
    port: 3306,
    ssl: {
      ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem", "utf8"),
      rejectUnauthorized: true
    }
  });

  connection.connect((err) => {
    if (err) {
      console.error('Connection error:', err);
      return res.status(500).send('Database connection failed');
    }

    connection.query(ownerQuery, ownerValues, (ownerErr, ownerResult) => {
      if (ownerErr) {
        console.error('Insert landowner error:', ownerErr);
        connection.end();
        return res.status(500).send('Failed to insert landowner');
      }

      const owner_id = ownerResult.insertId;

      // 2. Insert land details using owner_id foreign key
      const landQuery = `
        INSERT INTO land (
          owner_id, land_address, land_zip, land_city, land_county,
          parcel_id, forest_plan, land_size, land_occupancy, wildfire, flooding, mgmt_plan
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const landValues = [
        owner_id,
        land_address,
        land_zip,
        land_city,
        land_county,
        parcel_id,
        forest_plan,
        land_size,
        land_occupancy,
        wildfire,
        flooding,
        mgmt_plan
      ];

      connection.query(landQuery, landValues, (landErr) => {
        connection.end(); // Close connection after both inserts

        if (landErr) {
          console.error('Insert land error:', landErr);
          return res.status(500).send('Failed to insert land');
        }

        return res.status(200).send('Landowner and land data inserted successfully');
      });
    });
  });
});

