const REQUEST_TIMEOUT = 500;

const encrypt = (data) => {
  return "Encrypted Data";
};

const send = (url, data) => {
  const encryptedData = encrypt(data);
  console.log(`Sending ${encryptedData} from ${url}`);
};

module.exports = {
  REQUEST_TIMEOUT,
  send,
};
