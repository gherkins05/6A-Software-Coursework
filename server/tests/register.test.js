const register = require('../endpoints/register');

describe('User registration tests', () => {
    let req, res, pool;

    beforeEach(() => {
        req = { 
            body: {} 
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        pool = {
            query: jest.fn()
        };
    });

    test('No username or password provided', async () => {
        req.body = {};
        await register(req, res, pool);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Username and password are required.' });
    });

    test('Username too short', async () => {
        req.body = { username: 'user', password: 'password123' };
        await register(req, res, pool);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Username must be between 8 and 24 characters long.' });
    });

    test('Username too long', async () => {
        req.body = { username: 'a'.repeat(25), password: 'password123' };
        await register(req, res, pool);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Username must be between 8 and 24 characters long.' });
    });

    test('Password too short', async () => {
        req.body = { username: 'validUser', password: 'short' };
        await register(req, res, pool);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Password must be at least 8 characters long.' });
    });

    test('Username already exists', async () => {
        req.body = { username: 'existingUser', password: 'password123' };
        
        pool.query = jest.fn().mockResolvedValueOnce({ rows: [{ count: '1' }] });

        await register(req, res, pool);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Username already exists.' });
    });

    test('Successful registration', async () => {
        req.body = { username: 'newUser1', password: 'password123' };
    
        pool.query = jest.fn()
            .mockResolvedValueOnce({ rows: [{ count: '0' }] }) // Mock doesUserExistQuery result
            .mockResolvedValueOnce({ rowCount: 1 }); // Mock registerQuery result
    
        await register(req, res, pool);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Registration successful.' });
    });
});