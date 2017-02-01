import normalisePollData from '../../src/js/lib/normalise-poll-data';

describe('`normalisePollData`', () => {
  it('removes unused object keys', () => {

    const pollData = {
      what: [0, 1],
      where: [1, 1],
      when: [1]
    };
    const expected = {
      what: [0, 1],
      where: [1, 1]
    };
    const result = normalisePollData(pollData);
    expect(result).toEqual(expected);
  });
});
