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
                result,
                owner
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8
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
            params.owner,
        ],
    };

    return query;
}

module.exports = addGameQuery;