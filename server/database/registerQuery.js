function registerQuery(username, password) {
    const query = {
        text: `
            INSERT INTO account (
                username, 
                password
            ) VALUES (
                $1, 
                $2
            )
        `,
        values: [username, password],
    };

    return query;
}

module.exports = registerQuery;