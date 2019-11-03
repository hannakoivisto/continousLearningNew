const Pool = require('pg').Pool;
const config = require('./config');

const allas = new Pool(config.connectionOptions);

function getAll(callback) {
    allas.connect((err, client) => {
        if (err) throw err;
        client.query("select * from Topic", (err, data) => {
            if (err) throw err;
            client.release();
            callback(data.rows);
        });
    });
}

function getSingleTopic(req, callback) {
    allas.connect((err, client) => {
        if (err) throw err;
        client.query('SELECT * FROM Topic where id = $1', [req.params.id], (err, data) => {
            if (err) throw err;
            client.release();
            callback(data.rows);
        });
    });
}

function createTopic(req, callback) {
    allas.connect((err, client) => {
        if (err) throw err;
        client.query('INSERT INTO Topic(title, description, timetomaster, timespent, source, startlearningdate, inprogress) VALUES($1, $2, $3, $4, $5, $6, $7)',
            [req.body.title, req.body.description, req.body.timetomaster, req.body.timespent, req.body.source, req.body.startlearningdate, req.body.inprogress], (err, data) => {
                if (err) throw err;
                client.release();
                callback();
            });
    });
}

function updateUser(req, callback) {
    allas.connect((err, client) => {
        if (err) throw err;
        client.query('UPDATE Topic SET title = $1, description = $2, timetomaster = $3, timespent = $4, source = $5, startlearningdate = $6, inprogress = $7 WHERE id = $8',
            [req.body.title, req.body.description, req.body.timetomaster, req.body.timespent, req.body.source, req.body.startlearningdate, req.body.inprogress, parseInt(req.params.id)], (err, data) => {
                if (err) throw err;
                client.release();
                callback();
            });
    });
}

function removeUser(req, res, callback) {
    allas.connect((err, client) => {
        if (err) throw err;
        client.query('DELETE FROM Topic WHERE id = $1',
            [parseInt(req.params.id)], (err, data) => {
                if (err) throw err;
                client.release();
                res.status(200)
                    .json({
                        status: 'OK',
                        message: 'Topic removed.'
                    });
                callback();
            });
    });
}


module.exports = { getAll, getSingleTopic, createTopic, updateUser, removeUser }