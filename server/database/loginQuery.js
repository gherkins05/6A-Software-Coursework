function loginQuery(params) {
    const query = {
        text: `
            SELECT 
                account_id
            FROM
                account
            WHERE
                username = $1 
                AND password = $2;
        `,
        values: [
            params.username,
            params.password,
        ],
    };

    return query;
}

module.exports = loginQuery;