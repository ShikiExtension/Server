const config = require('../../config/app');
const db = require('../../src/services/database/database');

class TitlesController {
    static titleVideos(req, res) {
        const entriesPerPage = config.titles.videos.entriesPerPage;
        let paginationData = {};

        const titleId = +req.params['id'];
        const page = +(req.params['page'] || 1);

        const baseQuery = `
            from titles_videos as v 
            left join titles_videos_authors as a on a.id = v.author_id
            where v.title_id = ?`;

        const queryCount = `select COUNT(v.id) as total ${baseQuery}`;
        const query = `select v.*, a.title as author ${baseQuery} LIMIT ?, ?`;

        db.query(queryCount, [titleId]).then(res => {
            return res[0].total;
        }).then(total => {
            const lastPage = Math.max(1, Math.ceil(total / entriesPerPage));
            const currentPage = Math.min(lastPage, Math.max(1, page));

            paginationData = {
                currentPage,
                lastPage,
                nextPageUrl: `/title/${titleId}/videos/${currentPage + 1}`
            };

            return db.query(query, [
                titleId,
                (currentPage - 1) * entriesPerPage,
                entriesPerPage
            ]);
        }).then(rows => {
            res.json({
                success: true,
                pagination: paginationData,
                items: rows
            });
        }, error => {
            console.error('MYSQL: ', error.message);

            return Promise.reject();
        }).catch(() => {
            res.status(500).json({success: false});
        });
    }
}

module.exports = TitlesController;