function addGameTagsQuery(params) {
    const query = {
        text: `
            INSERT INTO tag (
                tag
            )
            VALUES 
            ${
                params.tags.map((_, i) => `($${i + 1})`).join(', ')
            }
            RETURNING id;
        `,
        values: [params.tags],
    }

    return query;
}

module.exports = addGameTagsQuery;