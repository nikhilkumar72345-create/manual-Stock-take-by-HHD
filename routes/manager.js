const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get All Employees
router.get("/employees", (req, res) => {

    db.query(
        "SELECT * FROM employees WHERE status='Active'",
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result);

        });

});

// Assign WSN To Employee
router.post("/assign", (req, res) => {

    const { employee_id, wsn } = req.body;

    db.query(

        "INSERT INTO assignments(employee_id,wsn) VALUES(?,?)",

        [employee_id, wsn],

        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({

                success: true,
                message: "WSN Assigned Successfully"

            });

        });

});
// Bulk Assign WSN
router.post("/bulkAssign", (req, res) => {

    const { employee_id, wsnList } = req.body;

    if (!employee_id || !Array.isArray(wsnList) || wsnList.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Employee aur WSN list required hai."
        });
    }

    const values = wsnList.map(wsn => [employee_id, wsn]);

    db.query(
        "INSERT INTO assignments (employee_id, wsn) VALUES ?",
        [values],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                message: `${result.affectedRows} WSN Assigned Successfully`
            });

        }
    );

});
module.exports = router;