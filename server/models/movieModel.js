//SELECT one db to work with
//For SQL
const sqlDb = require('../../db/sql');
//For Mongo
//const mongoDb = require('../../db/mongodb')

module.exports = {
    movies: {
        get: (callback) => {
            sqlDb.query('SELECT * FROM movies', (err, results) => {
                if (err) {callback(err)};
                callback(null, results);
            })
        },
        save: (params, callback) => {
            console.log(params);
            sqlDb.query('INSERT INTO movies (title, release_date, poster_path, vote_average) VALUES (?, ?, ?, ?)', [params.title, params.release_date, params.poster_path,params.vote_average] , (err) => {
                callback(err);
                // console.log(results);
            })
        },
        delete: (params, callback) => {
            console.log('movieModel.delete title: ' + JSON.stringify(params));
            sqlDb.query('DELETE FROM movies WHERE title=?', [params], (err) => {
                callback(err);
            })
        }
    }
}