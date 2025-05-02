app.METHOD('endpoint', async (req, res) => {
    const client = await pool.connect();


    const {game_id} = req.body;
    // get any info passed through


    if (!game_id) {
        return res.status(400).send({ message: 'Please Check Your Inputs!'});
    }
    // validate the info

    const query = {
        text: `
            SELECT 
                white, black, date, result, time_control
            FROM
                game
            WHERE
                game_id = $1;
        `,
        values: [game_id]
    };
    try {
        await client.query('BEGIN');

        const game = await client.query(query);

        await client.query('COMMIT');

        // Process the result



        // send a response
        return res.status(201).send({ data: game});
    } catch(err) {
        await client.query('ROLLBACK');
        console.error(err);
        return res.status(500).send({ message: 'Internal Server Error'});
    } finally {
        client.release();
    }
})


module.exports = getGame;