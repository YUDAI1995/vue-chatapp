/**
 * ランダム値
 * @param {number?} myStrong
 * @return {string}
 */
export const getRandomID = (myStrong) => {
  let strong;
  myStrong ? (strong = myStrong) : (strong = 1000);
  return (
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  );
};

/**
 * 現在時刻
 * @return {string}
 */
export const getCurrentTime = () => {
  return (
    new Date(Date.now()).getHours() +
    ':' +
    ('00' + new Date(Date.now()).getMinutes()).slice(-2) //分は一桁の場合0パディング
  );
};
