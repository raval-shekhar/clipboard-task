const crypto = require("crypto");

exports.stringifyData = (data) => JSON.stringify(data);

exports.encryptData = (data) => crypto.createHash('sha3-512').update(data).digest('hex');

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate = this.getCandidateEventHash(event);
  if (candidate) {
    candidate = typeof candidate !== 'string' ? this.stringifyData(candidate) : candidate
  } else {
    candidate = TRIVIAL_PARTITION_KEY
  }
  return candidate.length > MAX_PARTITION_KEY_LENGTH ? this.encryptData(candidate) : candidate;
};

exports.getCandidateEventHash = (event) => {
  if (event) {
    const data = this.stringifyData(event);
    return event.partitionKey ? event.partitionKey : this.encryptData(data);
  } 
  return null  
}
