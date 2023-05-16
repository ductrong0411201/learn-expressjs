let blackList = [];

function addTokenToBlacklist(token) {
  const currentTime = Math.floor(Date.now() / 1000);
  blackList.push({
    token: token,
    timeLogout: currentTime,
  });
  console.log(blackList);
}

function isTokenBlacklisted(token, verify) {
  console.log(token, verify);
  const deathToken = blackList.filter((e) => (e.token = token));
  console.log('death',deathToken);
  // const currentTime = Math.floor(Date.now() / 1000);
  if (deathToken.length > 0) {
    console.log(1);
    if (deathToken.timeLogout <= verify.iat) {
      return false;
    } else return true;
  } else return false;
}

module.exports = { addTokenToBlacklist, isTokenBlacklisted };
