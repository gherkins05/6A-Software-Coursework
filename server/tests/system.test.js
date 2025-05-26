// Simulated functions to be tested

let users = [];
let bookmarks = new Set();

function createTag(tag) {
  return typeof tag === 'string' &&
         tag.length > 0 &&
         tag.length <= 15 &&
         /^[a-zA-Z0-9]+$/.test(tag);
}

function registerUser(username, password) {
  if (!username || !password) return { success: false, error: 'Missing fields' };
  if (users.find(user => user.username === username)) {
    return { success: false, error: 'Username already exists' };
  }
  users.push({ username, password });
  return { success: true };
}

function passwordsMatch(p1, p2) {
  return p1 === p2;
}

function toggleBookmark(gameId) {
  if (bookmarks.has(gameId)) {
    bookmarks.delete(gameId);
    return false;
  } else {
    bookmarks.add(gameId);
    return true;
  }
}

// Tests begin here
describe("Custom Tag Tests", () => {
  test("Write custom tag 1 character", () => {
    expect(createTag("a")).toBe(true);
  });
});

describe("Bookmark Toggle Tests", () => {
    beforeEach(() => {
      bookmarks = new Set(); // clear the state before each test
    });
  
    test("Click on the button (When unchecked)", () => {
      const result = toggleBookmark("game123");
      expect(result).toBe(true); // Bookmark added
    });
  
    test("Click on the button (When checked)", () => {
      toggleBookmark("game123"); // add bookmark first
      const result = toggleBookmark("game123"); // now remove it
      expect(result).toBe(false); // Bookmark removed
    });
  });
  

describe("User Registration Tests", () => {
  beforeEach(() => {
    users = []; // reset state
  });

  test("Users can register with a new account", () => {
    const res = registerUser("user1", "pass123");
    expect(res.success).toBe(true);
  });

  test("Users can’t register with existing username", () => {
    registerUser("user1", "pass123");
    const res = registerUser("user1", "newpass456");
    expect(res.success).toBe(false);
    expect(res.error).toBe("Username already exists");
  });
});

describe("Password Matching Test", () => {
  test("Passwords must match", () => {
    expect(passwordsMatch("pass123", "pass124")).toBe(false);
  });
});
