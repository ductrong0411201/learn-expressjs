const axios = require("axios");
const data = [];
async function getGeoInfo(lat, lng) {
  const res = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat},+${lng}&key=9f62d452e38343d590bd83dbb724215d&language=vi&pretty=1`
  );
  return res.data.results[0];
}

module.exports = getGeoInfo;
