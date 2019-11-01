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

/*
function paivitaKayttaja(req, callback) {
    allas.connect((err, client) => {
        if (err) throw err;
        client.query('UPDATE Topic SET nimi = $1, sposti = $2, kaupunki = $3 WHERE id = $4',
            [req.body.nimi, req.body.sposti, req.body.kaupunki, parseInt(req.params.id)],
            (err, data) => {
                if (err) throw err;
                client.release();
                callback();
            })
    });
}
*/
//module.exports = { haeKaikki, paivitaKayttaja }
module.exports = { getAll, createTopic }