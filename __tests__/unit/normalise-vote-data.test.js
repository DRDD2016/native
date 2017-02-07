import normaliseVoteData from '../../src/js/lib/normalise-vote-data';

describe('`normaliseVoteData`', () => {
  it('removes unused object keys', () => {

    const voteData = {
      what: [0, 1],
      where: [1, 1],
      when: [1]
    };
    const expected = {
      what: [0, 1],
      where: [1, 1]
    };
    const result = normaliseVoteData(voteData);
    expect(result).toEqual(expected);
  });
});
