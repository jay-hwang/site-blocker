function getHostname(url) {
  let parser = document.createElement('a');
  parser.href = url;
  return parser.hostname;
}

function checkBlackoutDay(blackoutDays) {
  const currentDate = new Date();
  let currentDay = currentDate.getDay();
  return blackoutDays.includes(currentDay) ? true : false;
}

function checkBlackoutTime(startTime, endTime) {
  const currentDate = new Date();
  let currentDay = currentDate.getDay();
  let currentHour = currentDate.getHours();
  let currentMinute = currentDate.getMinutes();

  let startHour = startTime[0], startMinute = startTime[1],
      endHour = endTime[0], endMinute = endTime[1];

  if (currentHour >= startHour && currentHour < endHour) {
    return true;
  } else if (currentHour === endHour) {
    if (currentMinute > startMinute && currentMinute < endMinute) {
      return true;
    }
  }
  return false;
}

chrome.tabs.onUpdated.addListener(function() {

  chrome.storage.sync.get('blacklistedUrls', data => {
    let blacklistedUrls = data.blacklistedUrls;

    if (Object.keys(data.blacklistedUrls))

    let blacklistedUrlsParsed = [];
    let blacklistedHostnames = [];

    Object.keys(blacklistedUrls).forEach(hostname => {
      let parsed = `*://${hostname}/*`;
      blacklistedUrlsParsed.push(parsed);
      blacklistedHostnames.push(hostname);
    });

    const BLACKLISTED_HOSTNAMES = blacklistedHostnames;
    const BLACKLISTED_URLS_PARSED = blacklistedUrlsParsed;

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, tabs => {
      const currentTabUrl = tabs[0].url;
      const currentHostname = getHostname(currentTabUrl);

      if (BLACKLISTED_HOSTNAMES.includes(currentHostname)) {
        let blacklistedUrl = blacklistedUrls[currentHostname];
        let blackoutDays = blacklistedUrl.blackoutDays;
        let startTime = blacklistedUrl.blackoutTimeStart;
        let endTime = blacklistedUrl.blackoutTimeEnd;

        alert(`
          BLACKLISTED_HOSTNAMES includes currentHostname,
          currentHostname: ${currentHostname},
          BLACKLISTED_HOSTNAMES[currentHostname] = ${blacklistedUrl}
        `);

        if (checkBlackoutDay(blackoutDays) && checkBlackoutTime(startTime, endTime)) {
          // alert('block me');
          chrome.webRequest.onBeforeRequest.addListener(function(details) {
            return { cancel: true };
          },
            { urls: BLACKLISTED_URLS_PARSED },
            ["blocking"]
          );
        }
      }
    });

  });

  // { urls: ["*://www.facebook.com/*"] },
});
