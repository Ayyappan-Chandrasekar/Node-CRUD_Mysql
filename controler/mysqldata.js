const con = require('../route/mysql_con');

const reg = (req, res) => {
    const query = 'SELECT * FROM reg'; 
    con.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving students:', err);
            return res.status(500).json({ Result: 'Failure', message: 'Error retrieving students' });
        }
        res.status(200).json({ Result: 'Success', data: results });
    });
}

module.exports ={
    reg
}