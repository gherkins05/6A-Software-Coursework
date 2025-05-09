function addGameQuery(params) {
    const query = {
        text: `
            INSERT INTO game (
                event,
                site,
                date,
                round,
                white,
                black,
                result
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7
            )
            RETURNING id;
        `,
        values: [
            params.event,
            params.site,
            params.date,
            params.round,
            params.whiteId,
            params.blackId,
            params.result,
        ],
    };

    return query;
}

module.exports = addGameQuery;