async function OTBEditor(req, res) {
    try {
        res.sendFile('../client/OTBEditor.html');
    } catch(err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = OTBEditor;