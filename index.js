const Request = require("request");

API_URL =
  "https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences";

Request.get(API_URL, (error, response, body) => {
  if (error) {
    return console.dir(error);
  }
  //all data
  console.dir(JSON.parse(body));

  // exact duplicates and semantic duplicates
  const conf = JSON.parse(body);
  var confData = conf.paid.concat(conf.free);
  let count = 0;

  confData.forEach((element, index) => {
    confData.forEach((e, i) => {
      if (index === i) {
      } else {
        var str1 = element.confName.toLowerCase().split(" ");
        var str2 = e.confName.toLowerCase().split(" ");
        str1.forEach(function (str11) {
          str2.forEach(function (str22) {
            if (str11 === str22) {
              count++;
            }
          });
        });
        if (count === 3) {
          if (element.state === e.state && element.city === e.city) {
            console.log("Duplicate Entry: " + element.confName);
            console.log("conference_id: " + element.conference_id);
            console.log(" ");
          }
        }
        count = 0;
      }
    });
  });
});
