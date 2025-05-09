function getAllTagsQuery(params) {
    const query = {
        text: `
            SELECT
                t.id AS id,
                t.tag AS tag
            FROM
                tag t
            LEFT JOIN
                game_tag gt ON gt.tag_id = t.id
            LEFT JOIN
                game g ON g.id = gt.game_id
            WHERE
                g.owner = $1
        `,
        values: [
            params.userId
        ],
    }

    return query;
}

module.exports = getAllTagsQuery;