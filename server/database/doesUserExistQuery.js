function doesUserExistQuery(username) {
    const query = {
        text: `
            SELECT
                COUNT(*)
            FROM
                account
            WHERE
                username = $1
        `,
        values: [username]
    };

    return query;
}

module.exports = doesUserExistQuery;