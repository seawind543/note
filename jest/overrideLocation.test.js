import qs from 'query-string';

const testData = [
  {
    url: 'https://www.google.com/?id=85aefa36f3f97d8233be',
    name: 'id',
    value: '85aefa36f3f97d8233be',
  },
  {
    url: 'https://www.google.com?id=85aefa36f3f97d8233be',
    name: 'id',
    value: '85aefa36f3f97d8233be',
  },
  {
    url: 'https://www.google.com?abc=123&id=85aefa36f3f97d8233be',
    name: 'id',
    value: '85aefa36f3f97d8233be',
  },
  {
    url: 'https://www.google.com?abc=123&id=85aefa36f3f97d8233be&xyz=543',
    name: 'id',
    value: '85aefa36f3f97d8233be',
  },
  {
    url: 'https://www.google.com?abc=123&id=85aefa36f3f97d8233be#dummy',
    name: 'id',
    value: '85aefa36f3f97d8233be',
  },
];

describe('Get Parameter', () => {
  it('should get value from window.location.href by default', () => {
    // Override original location
    // https://github.com/facebook/jest/issues/5124#issuecomment-446659510
    const originalWindowLocation = window.location;
    delete window.location;
    window.location = { ...originalWindowLocation };

    testData.forEach(data => {
      // override current url
      window.location.href = data.url;

      const { [data.name]: value } = qs.parse(window.location.search);
      expect(value).toBe(data.value);
    });

    // Reset original location back
    window.location = originalWindowLocation;
  });
});
