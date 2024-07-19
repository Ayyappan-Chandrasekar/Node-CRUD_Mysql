const con = require('../route/mysql_con');


const reg = (req,res)=>{
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
        console.error('Error:', error);
      res.status(500).json({ Result: "Failure", message: ex.message });
    }
}

const regList = (req, res) => {
    const query = 'SELECT * FROM reg'; 
    con.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving students:', err);
            return res.status(500).json({ Result: 'Failure', message: 'Error retrieving students' });
        }
        res.status(200).json({ Result: 'Success', data: results });
    });
}

const login = (req, res) => {
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
}

// const loginDelect =  (req, res) => {
//     try {
//         const { id } = req.params;
//         const { username, password } = req.body;
//         const query = 'DELETE FROM users WHERE id =?';
//         console.log(`Deleting user with ID: ${id}`);
//         con.query(query, [username, password , id], (err, result) => {
//             if (err) {
//                 console.log("Error updating the ID", err);
//                 return res.status(500).send('Error updating ID');
//             } else if (result.affectedRows === 0) {
//                 console.log(`No user found with ID: ${id}`);
//                 return res.status(404).send('User not found');
//             } else {
//                 console.log(`Password updated for user with ID: ${id}`);
//                 res.status(200).send('Password updated successfully');
//             }
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ Result: "Failure", message: error.message });
//     }
// }



const loginDelete = (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM users WHERE id = ?';
        console.log(`Deleting user with ID: ${id}`);
        con.query(query, [id], (err, result) => {
            if (err) {
                console.log("Error deleting the user", err);
                return res.status(500).send('Error deleting user');
            } else if (result.affectedRows === 0) {
                console.log(`No user found with ID: ${id}`);
                return res.status(404).send('User not found');
            } else {
                console.log(`User deleted with ID: ${id}`);
                res.status(200).send('User deleted successfully');
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ Result: "Failure", message: error.message });
    }
}

const loginList = (req, res) => {
    const query = 'SELECT * FROM users';

    con.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving students:', err);
            return res.status(500).json({ Result: 'Failure', message: 'Error retrieving students' });
        }
        res.status(200).send({ Result: 'Success', data: results });
    });
}

const forgot =  (req, res) => {
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
}

module.exports ={
    reg,
    regList,
    login,
    loginList,
    loginDelete,
    forgot,
}