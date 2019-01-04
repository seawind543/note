import jsCookie from 'js-cookie';

const testData = {
  string: {
    key: 'str',
    value: 'the value',
  },
  number: {
    key: 'num',
    value: 1,
  },
  boolean: {
    key: 'bool',
    value: false,
  },
  object: {
    key: 'object',
    value: {
      number: 123,
      string: 'qwert',
      boolean: false,
    },
  },
};

const sleep = delay => {
  return new Promise(function(resolve) {
    setTimeout(resolve, delay);
  });
};

const setTestCookies = options => {
  Object.keys(testData).forEach(dataKey => {
    const data = testData[dataKey];
    jsCookie.set(data.key, data.value, options);
  });

  // console.log('document.cookie', document.cookie); // For debug
};

describe('cookie', () => {
  // Reset all cookies (which set with default options) in each test case
  beforeEach(() => {
    Object.keys(jsCookie.get()).forEach(function(cookieName) {
      jsCookie.remove(cookieName);
    });
  });

  it('should set cookie with option correctly', async () => {
    const maxage = 1 * 1000;
    const expires = new Date(new Date().getTime() + maxage);

    // Set cookies
    setTestCookies({ expires });

    // Get value of cookies
    Object.keys(testData).forEach(dataKey => {
      const data = testData[dataKey];

      // It do set correctly
      expect(jsCookie.getJSON(data.key)).toEqual(data.value);
    });

    await sleep(maxage);

    // Cookie should be removed after maxage
    Object.keys(testData).forEach(dataKey => {
      const data = testData[dataKey];
      expect(jsCookie.get(data.key)).toBeUndefined();
      expect(jsCookie.getJSON(data.key)).toBeUndefined();
    });
  });
});
