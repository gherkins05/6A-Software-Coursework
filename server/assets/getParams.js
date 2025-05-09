function getParams(req) {
    const page = req.query.page;
    const pageSize = 10;
    const offset = page ? (page - 1) * pageSize : null;

    const userId = req.user.id;

    const colour = req.query.colour;
    const colours = Array.isArray(colour) ? colour.map(c => c.toLowerCase()) : colour ? [colour.toLowerCase()] : [];
    const whitePlayer = colours.includes('white');
    const blackPlayer = colours.includes('black');

    const result = req.query.result;
    const results = Array.isArray(result) ? result.map(r => r.toLowerCase()) : result ? [result.toLowerCase()] : [];
    const whiteWins = results.includes('white');
    const blackWins = results.includes('black');
    const draws = results.includes('draw');
    const ongoing = results.includes('ongoing');

    const potentialTags = req.query.tags;
    const tags = Array.isArray(potentialTags) ? potentialTags : potentialTags ? [potentialTags] : [];

    const opponent = req.query.opponent;

    return {
        userId,
        whitePlayer,
        blackPlayer,
        whiteWins,
        blackWins,
        draws,
        ongoing,
        tags,
        page,
        offset,
        opponent,
    };
}

module.exports = getParams;