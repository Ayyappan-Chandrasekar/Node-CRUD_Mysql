const express = require('express')
const con = require('./mysql_con')

const router = express.Router()


router.get('/student/list', (req, res) => {
    const query = 'SELECT * FROM reg'; 
    con.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving students:', err);
            return res.status(500).json({ Result: 'Failure', message: 'Error retrieving students' });
        }
        res.status(200).json({ Result: 'Success', data: results });
    });
});


// const createTableRegister = `
// CREATE TABLE IF NOT EXISTS registration (
//     register_id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(100) NOT NULL,
//     dob DATE,
//     blood_group VARCHAR(50),
//     address VARCHAR(500),
//     state VARCHAR(100),
//     pincode INT,
//     mobile_no VARCHAR(50),
//     username VARCHAR(100) NOT NULL UNIQUE,
//     password VARCHAR(500) NOT NULL
// );
// `;

// con.query(createTableRegister, (err, result) => {
//   if (err) {
//     console.error("Error creating table: ", err);
//     process.exit(1);
//   }
//   console.log("Table register created successfully");
//   process.exit(0);
// });

router.post('/register',(req,res)=>{
    res.header('content-type','application/json')
    try {
        const { name, dob, blood_group, address, state, pincode, mobile_no, username, password } = req.body;
        const query = 'INSERT INTO reg (name, dob, blood_group, address, state, pincode, mobile_no, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        con.query(query, [name, dob, blood_group, address, state, pincode, mobile_no, username, password],(err,resuld)=>{
            if (err) {
                console.error('You cannot add register:', err);
                res.status(404).send('Error adding student');
            } else {
                res.status(201).send('Student added successfully');
            }
        })
    } catch (error) {
        console.error('Error:', ex);
      res.status(500).json({ Result: "Failure", message: ex.message });
    }
})

const createTableUsers = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(500) NOT NULL
);
`;

con.query(createTableUsers, (err, results) => {
    if (err) {
        console.error("Error creating users table:", err);
    } else {
        console.log("Users table created successfully");
    }
});

router.get('/login/list', (req, res) => {
    const query = 'SELECT * FROM users';

    con.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving students:', err);
            return res.status(500).json({ Result: 'Failure', message: 'Error retrieving students' });
        }
        res.status(200).send({ Result: 'Success', data: results });
    });
});

router.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;

        const checkData = 'SELECT * FROM users WHERE username = ?';
        con.query(checkData, [username], (error, result) => {
            if (error) {
                return res.status(500).send('<h1>Could not register</h1>');
            }
            if (result.length > 0) {
                return res.status(400).send('<h1>Username already exists</h1>');
            }

            const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
            con.query(query, [username, password], (err, result) => {
                if (err) {
                    console.log("Error inserting data");
                    return res.status(500).send('Error adding login');
                }
                res.status(201).send('User added successfully');
            });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ Result: "Failure", message: error.message });
    }
});

// router.post('/login/check',(req,res)=>{
//     try {
//         const {username, password} =req.body;
//         const checkUserReg = 'select * from reg username,password=?'
//         con.query(checkUserReg,[username,password],(error,result)=>{
            
//         })
//     } catch (error) {
        
//     }
// })

router.put('/forgot_password/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { new_password } = req.body;
        const query = 'UPDATE users SET password = ? WHERE id = ?';
        console.log(`Updating password for user with ID: ${id}`);
        con.query(query, [new_password, id], (err, result) => {
            if (err) {
                console.log("Error updating the password", err);
                return res.status(500).send('Error updating password');
            } else if (result.affectedRows === 0) {
                console.log(`No user found with ID: ${id}`);
                return res.status(404).send('User not found');
            } else {
                console.log(`Password updated for user with ID: ${id}`);
                res.status(200).send('Password updated successfully');
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ Result: "Failure", message: error.message });
    }
});




module.exports = router