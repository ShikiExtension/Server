const db = require('../../src/services/database/database');
const HttpException = require('../exceptions/HttpException');
const HandleResponse = require('../../src/services/HandleResponse/HandleResponse');

class TitlesController {
    static videos (req, res) {
        const titleId = + req.params['id'];
        const episode = + req.params['episode'];

        const query = `
            select v.*, a.title as author 
            from titles_videos as v 
            left join titles_videos_authors as a on a.id = v.author_id
            where v.title_id = ? and v.episode = ?`;

        db.query(query, [titleId, episode]).then(rows => {
            HandleResponse.getInstance(res).sendResponse(rows);
        }).catch(() => {
            throw new HttpException();
        });
    }

    static episodes (req, res) {
        const titleId = + req.params['id'];

        const query = 'select distinct episode from titles_videos where title_id = ?';

        db.query(query, [titleId]).then(rows => {
            HandleResponse.getInstance(res).sendResponse({
                episodes: rows.map(r => r['episode'])
            });
        }).catch(() => {
            throw new HttpException();
        });
    }
}

module.exports = TitlesController;