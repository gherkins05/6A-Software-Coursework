const createNewGame = require('../endpoints/createNewGame');
const loadGame = require('../endpoints/loadGame');
const saveGame = require('../endpoints/saveGame');

describe('OTBEditor tests', () => {
    let req, res, pool;

    beforeEach(() => {
        req = { 
            body: {} 
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };

        pool = {
            query: jest.fn(),
            connect: jest.fn().mockResolvedValue({
                query: jest.fn(),
                release: jest.fn()
            })
        };
    });

    // Creating
    test('Creating game without gameData', async () => {
        req.body = {};
        await createNewGame(req, res, pool);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Game data is required' });
    });

    test('Creating game with invalid gameData', async () => {
        req.body = {
            gameData: {
                name: 'Test Game',
                moves: [],
            }
        };
        req.user = { id: 1 };

        const mockClient = await pool.connect(); 
        mockClient.query.mockResolvedValueOnce({ rows: [] });

        await createNewGame(req, res, pool);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create new game' });
    });

    test('Creating game with valid gameData', async () => {
        req.body = {
            gameData: {
                name: 'Test Game',
                moves: [],
            }
        };

        req.user = { id: 1 };

        const mockClient = await pool.connect(); 
        mockClient.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

        await createNewGame(req, res, pool);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'New game created successfully' });
    });

    // Load
    test('Load game without gameId', async () => {
        req.params = {};
        await loadGame(req, res, pool);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Game ID is required' });
    });

    test('Load game with non-existent gameId', async () => {
        req.params = { gameId: 'nonExistentGameId' };
        pool.query.mockResolvedValueOnce({ rows: [] });

        await loadGame(req, res, pool);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Game not found' });
    });

    test('Load game with valid gameId', async () => {
        req.params = { gameId: 'validGameId' };
        const mockGameData = { id: 1, name: 'Test Game', moves: [] };
        pool.query.mockResolvedValueOnce({ rows: [mockGameData] });

        await loadGame(req, res, pool);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockGameData);
    });

    // Saving
    test('Save game without gameId', async () => {
        req.params = {};
        req.body = { gameData: {} };
        await saveGame(req, res, pool);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Game ID is required' });
    });

    test('Save game without gameData', async () => {
        req.params = { gameId: 'gameId' };
        req.body = {};
        await saveGame(req, res, pool);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Game data is required' });
    });

    test('Save game with valid data', async () => {
        req.params = { gameId: 'validGameId' };
        req.body = { gameData: { moves: [] } };

        const mockClient = await pool.connect();
        mockClient.query.mockResolvedValueOnce({ rows: [] });

        await saveGame(req, res, pool);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Game saved successfully' });
    });
});