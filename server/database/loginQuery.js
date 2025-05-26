function loginQuery(username, password) {
    const query = {
        text: `
            SELECT 
                id
            FROM
                account
            WHERE
                username = $1 
                AND password = $2;
        `,
        values: [username, password],
    };

    return query;
}

module.exports = loginQuery;