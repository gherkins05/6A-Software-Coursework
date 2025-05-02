async function analysisPage(req, res) {

    const {account_id} = req.body;
    // get any info passed through
    
    if (!account_id) {
        return res.status(400).send({ message: 'Please Check Your Inputs!'});
    }
    // validate the info

    const query = {
        text: `
            SELECT 
                username,
                COUNT(*) AS total_games, SUM(CASE 
                    WHEN (owner = account_id AND result = 'Win')  THEN 1
                    ELSE 0 
                    END) AS total_wins,
                    gamesPlayed,
            FROM account a
                LEFT JOIN game g ON g.white = a.account_id OR g.black = a.account_id
            WHERE a.account_id = :account_id
            GROUP BY a.username;
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
