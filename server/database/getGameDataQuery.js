function getGameDataQuery(gameId) {
    const query = {
        text: `
            SELECT
                owner.id AS owner_id,
                owner.username AS owner_username,
                white AS white_username,
                black AS black_username,
                g.id AS game_id,
                g.event AS event,
                g.site AS site,
                g.date AS date,
                g.round AS round,
                g.result AS result,
                COALESCE(
                    JSON_AGG(
                        JSON_BUILD_OBJECT('id', t.id, 'tag', t.tag)
                    ) FILTER (WHERE t.id IS NOT NULL),
                    '[]'
                ) AS tags,
                COALESCE(
                    JSON_AGG(
                        JSON_BUILD_OBJECT('id', m.id, 'player', m.player, 'san', m.move_notation, 'move_number', m.move_number, 'to', m.to, 'from', m.from)
                    ) FILTER (WHERE m.id IS NOT NULL),
                    '[]'
                ) AS moves
            FROM
                game g
            LEFT JOIN
                account owner ON owner.id = g.owner
            LEFT JOIN
                game_tag gt ON gt.game_id = g.id
            LEFT JOIN
                tag t ON t.id = gt.tag_id
            LEFT JOIN
                move m ON g.id = m.game_id
            WHERE
                g.id = $1
            GROUP BY
                owner.id, 
                owner.username,
                white,
                black,
                g.id, g.event, g.site, g.date, g.round, g.result;
        `,
        values: [gameId],
    };

    return query;
}

module.exports = getGameDataQuery;