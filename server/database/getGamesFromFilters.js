function getGamesFromFilters(params) {
    // Can always build the query using js
    const query = {
        text: `
            SELECT
                owner.id AS owner_id,
                owner.username AS owner_username,
                white.id AS white_id,
                white.username AS white_username,
                black.id AS black_id,
                black.username AS black_username, 
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
                        JSON_BUILD_OBJECT('id', m.id, 'player', m.player, 'move_notation', m.move_notation, 'move_number', m.move_number)
                    ) FILTER (WHERE m.id IS NOT NULL),
                    '[]'
                ) AS moves
            FROM
                game g
            LEFT JOIN
                account owner ON owner.id = g.owner
            LEFT JOIN
                account white ON white.id = g.white
            LEFT JOIN
                account black ON black.id = g.black
            LEFT JOIN
                game_tag gt ON gt.game_id = g.id
            LEFT JOIN
                tag t ON t.id = gt.tag_id
            LEFT JOIN
                move m ON g.id = m.game_id
            WHERE
                owner.id = $1 AND
                (
                    ((white.id = $1) AND $2) OR
                    ((black.id = $1) AND $3)
                ) AND
                (
                    (
                        (white.id = $1) AND (g.result = '1-0') AND $4
                    ) OR
                    (
                        (black.id = $1) AND (g.result = '0-1') AND $5
                    ) OR
                    (
                        (g.result = '1/2-1/2') AND $6
                    ) OR
                    (
                        (g.result IS NULL) AND $7
                    )
                ) AND
                (
                    ${params.tags != null ? '' : 'TRUE OR'} array_length($8, 1) = 0 OR array_length($8, 1) = (
                        SELECT COUNT(DISTINCT gt_sub.tag_id)
                        FROM game_tag gt_sub
                        WHERE gt_sub.game_id = g.id
                        AND gt_sub.tag_id = ANY($8)
                    )
                ) AND
                (
                    ${params.opponent != null ? '' : 'TRUE OR'} black.username = $11 OR white.username = $11
                )
            GROUP BY
                owner.id, owner.username,
                white.id, white.username,
                black.id, black.username,
                g.id, g.event, g.site, g.date, g.round, g.result
            ORDER BY
                g.date DESC, g.round DESC
            ${params.page != null && params.offset != null ? 'LIMIT $9 OFFSET $10' : ''};
        `,
        values: [
            params.userId,
            params.whitePlayer,
            params.blackPlayer,
            params.whiteWins,
            params.blackWins,
            params.draws,
            params.ongoing,
            params.tags,
            params.page,
            params.offset,
            params.opponent,
        ],
    };

    return query;
}

module.exports = getGamesFromFilters;