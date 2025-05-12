async function OTBEditor(req, res) {
    // URL: OTBEditor/loadGame/:id
    try {
        const gameId = req.params.gameId;

        if (!gameId) {

        }
    } catch(err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = OTBEditor;