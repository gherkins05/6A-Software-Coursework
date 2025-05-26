function addUserQuery(username, password) {
    const query = {
        text: `
            INPUT INTO account (
                username, 
                password
            ) VALUES (
                $1, 
                $2
            )
        `,
        values: [username]
    };

    return query;
}

module.exports = doesUserExistQuery;