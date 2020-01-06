const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware'); // Sends user 403 status if they are not logged in

router.get('/:id', (req, res) => {
    const queryText = `SELECT * FROM "financials"
    WHERE "event_id" = $1`;
    console.log('get in eventsFinancials.router was hit, req.params.id:', req.params.id);
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(result.rows)
        })
        .catch(() => {
            res.sendStatus(500);
        })
}) // end fetch financials query

router.put('/edit', rejectUnauthenticated, (req, res) => {
    const queryText = `UPDATE "financials"
    SET $1 = $2
    WHERE "event_id" = $3`
    const queryValues = [
        req.body[0],
        req.body[1],
        req.body[2]
    ]
    pool.query(queryText, queryValues)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error in PUT route in eventsFinancials.router:', error);
            res.sendStatus(500);
        })

})



module.exports = router;