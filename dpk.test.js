const crypto = require('crypto');

const { deterministicPartitionKey, stringifyData, encryptData, getCandidateEventHash } = require('./dpk');

describe('stringifyData', () => {
  it('should return stringified data', () => {
    const data = { partitionKey: 12 };
    const stringifiedData = stringifyData(data);
    expect(typeof stringifiedData).toBe('string')
  })
  it('should stringify null', () => {
    const data = null;
    const stringifiedData = stringifyData(data);
    expect(typeof stringifiedData).toBe('string')
  });
  it('should stringify string', () => {
    const data = 'test';
    const stringifiedData = stringifyData(data);
    expect(typeof stringifiedData).toBe('string')
  })
});


describe('getCandidateEventHash', () => {
  it('should return null', () => {
    const eventHash = getCandidateEventHash();
    expect(eventHash).toBe(null)
  });
  it('should return partition key', () => {
    const event = {
      partitionKey: 123
    }
    const eventHash = getCandidateEventHash(event);
    expect(eventHash).toBe(event.partitionKey)
  });
  it('should return event hash', () => {
    const event = {
      securityKey: 123
    }
    const eventHash = getCandidateEventHash(event);
    expect(eventHash).toBe('0ee6fac25e0d1b37ad9c5862d2e49b3de40237ff66c10ecc3e0c4eb7b8f23cddc5fcd2dfda1d1ee66d412a3e0bc999208769cd7c28af57afce9e044db9a4a0b7')
  });
});


describe('createHash', () => {
  it('should correctly encrypt data', () => {
    const hashMock = {
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnValueOnce('encrypt 123'),
    };
    const createHashMock = jest.spyOn(crypto, 'createHash').mockImplementationOnce(() => hashMock);
    encryptData('123')
    expect(createHashMock).toBeCalledWith('sha3-512');
    expect(hashMock.update).toBeCalledWith('123');
    expect(hashMock.digest).toBeCalledWith('hex');
  });
});

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns event partition key", () => {
    const event = {
      partitionKey: 123
    }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(`${event.partitionKey}`);
  });
  it("Returns event hash", () => {
    const event = {
      securityKey: 123,
      person: {
        name: 'shekhar',
        email: 'raval@example.com',
      },
      posts: [
        {
          name: "s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
        },
        {
          name: "s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
        }
      ]
    }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe('75c190fc468647297bfc03f4807d37e293983988a47e5ef7adf6ff4913d0df9e62f76284cc258ca700e55ea3623694971d4a466823312d048e5fdb440799a45a');
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
