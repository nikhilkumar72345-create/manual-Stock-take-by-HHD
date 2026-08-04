const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Employee Login
router.post("/login", (req, res) => {

    const { employee_id } = req.body;

    db.query(
        "SELECT * FROM employees WHERE employee_id=? AND status='Active'",
        [employee_id],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            if (result.length == 0) {

                return res.json({
                    success: false,
                    message: "Invalid Employee ID"
                });

            }

            res.json({
                success: true,
                employee: result[0]
            });

        });

});

// Download Assigned WSN
router.get("/assigned/:employee_id", (req, res) => {

    const employee = req.params.employee_id;

    db.query(
        `SELECT
            w.wsn,
            w.model,
            w.location,
            a.scan_status
         FROM assignments a
         JOIN wsn_master w
           ON a.wsn = w.wsn
         WHERE a.employee_id = ?`,
        [employee],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result);

        });

});

module.exports = router;
