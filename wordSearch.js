const axios = require("axios");
const [, , ...input] = process.argv;

const API_ENDPOINT = "https://api-portal.dictionary.com/dcom/list/";

const findWords = async numer => {
  if (!/\w\d+\w/i.test(numer)) {
    console.error(
      "That ain't right. Your numeronym has to be in the form of {letter} {number} {letter}"
    );
    return null;
  }
  const offset = 0;
  const limit = 16000;
  const letter = numer[0];
  const lastLetter = numer.slice(-1);
  const length = numer.slice(1, -1);
  const re = new RegExp(`^${letter}\\w{${length}}${lastLetter}$`, "i");

  try {
    const {
      data: { data }
    } = await axios.get(
      `${API_ENDPOINT}${letter}?offset=${offset}&limit=${limit}`
    );
    const res = data
      .filter(({ displayForm }) => re.test(displayForm))
      .map(({ displayForm }) => displayForm);
    console.log(res);
  } catch (err) {
    throw err;
  }
};

input.forEach(d => findWords(d));
