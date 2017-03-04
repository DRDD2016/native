jest.mock('NetInfo', () => {
  return {
    isConnected: {
      fetch: () => {
        return new Promise((accept, resolve) => { //eslint-disable-line
          accept(true);
        });
      },
      addEventListener: jest.fn()
    }
  };
});
