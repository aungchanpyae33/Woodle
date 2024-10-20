export const fetchWord = async () => {
  const url = "https://words.dev-apis.com/word-of-the-day";
  const fetchUrl = await fetch(url);
  const JsonData = await fetchUrl.json();
  const array = JsonData.word.toUpperCase().split("");
  return array;
};
