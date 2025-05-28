const login = require('../endpoints/login');

describe('User login tests', () => {
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
            query: jest.fn()
        };
    });

    test('No username or password provided', async () => {
        req.body = {};
        await login(req, res, pool);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({ message: 'Username and password are required' });
    });

    test('Invalid username or password', async () => {
        req.body = { username: 'invalidUser', password: 'wrongPassword' };
        pool.query = jest.fn().mockResolvedValueOnce({ rows: [] });

        await login(req, res, pool);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({ message: 'Invalid Username or Password!' });
    });

    test('Successful login', async () => {
        req.body = { username: 'validUser', password: 'correctPassword' };
        pool.query = jest.fn().mockResolvedValueOnce({ rows: [{ id: 1 }] });

        await login(req, res, pool);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }));
    });
});