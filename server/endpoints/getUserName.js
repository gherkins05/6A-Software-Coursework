async function getUserName(req, res) {

    const {account_id} = req.body;
    // get any info passed through
    
    if (!account_id) {
        return res.status(400).send({ message: 'Please Check Your Inputs!'});
    }
    // validate the info

    const query = {
        text: `
            SELECT 
                username
            FROM
                account
            WHERE
                account_id = $1;
        `,
        values: [account_id]
    };
    try {
        await client.query('BEGIN');

        const username = await client.query(query);

        await client.query('COMMIT');

        // Process the result



        // send a response
        return res.status(201).send({ data: username});
    } catch(err) {
        await client.query('ROLLBACK');
        console.error(err);
        return res.status(500).send({ message: 'Internal Server Error'});
    } finally {
        client.release();
    }
}

module.exports = getUserName;
