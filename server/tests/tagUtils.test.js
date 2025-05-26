// Simulate the logic of createTag function
function createTag(tag) {
  if (typeof tag !== 'string') return false;
  if (tag.length < 1 || tag.length > 15) return false;
  if (!/^[a-zA-Z0-9]+$/.test(tag)) return false;
  return true;
}

describe('Custom Tag Creation Tests', () => {
  test('Tag with 1 character is valid', () => {
    expect(createTag('a')).toBe(true);
  });

  test('Tag with 15 characters is valid', () => {
    expect(createTag('abcdefghijklmno')).toBe(true);
  });

  test('Tag with 16 characters is invalid', () => {
    expect(createTag('abcdefghijklmnop')).toBe(false);
  });

  test('Tag with 0 characters is invalid', () => {
    expect(createTag('')).toBe(false);
  });

  test('Tag with special characters is invalid', () => {
    expect(createTag('!@#$%')).toBe(false);
  });

  test('Tag that already exists is invalid (simulated)', () => {
    const existingTags = ['tag1', 'hello'];
    const newTag = 'tag1';
    const isValid = !existingTags.includes(newTag) && createTag(newTag);
    expect(isValid).toBe(false);
  });
});
