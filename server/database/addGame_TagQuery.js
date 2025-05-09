function addGame_TagQuery(params) {
    const query = {
        text: `
            INSERT INTO game_tag (
                tag_id,
                game_id
            )
            VALUES 
            ${
                params.tagIds.map((_, i) => `($1 $${i + 2})`).join(', ')
            };
        `,
        values: [params.gameId, ...params.tagIds],
    }

    return query;
}

module.exports = addGame_TagQuery;