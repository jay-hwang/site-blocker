chrome.storage.local.get("blacklistedUrls", data => {
  let blacklistedUrls = data.blacklistedUrls;

  chrome.tabs.onUpdated.addListener(function() {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      var currentUrl = tabs[0].url;
      let parser = document.createElement('a');
      parser.href = currentUrl;
      let currentHostname = parser.hostname;
      let blacklistedHostnames = [];

      Object.keys(blacklistedUrls).forEach(hostname => {
        let parsedHostname = `*://${hostname}/*`;
        let blacklistedUrl = blacklistedUrls[hostname];
        blacklistedHostnames.push(parsedHostname);

        let currentDate = new Date();
        let currentDay = currentDate.getDay();
        let currentHour = currentDate.getHours();
        let currentMinute = currentDate.getMinutes();

        if (blacklistedUrl.hostname === currentHostname) {
          // compare blacklistedUrl.blackoudDays and Time to currentDay and Time
          if (blacklistedUrl.blackoutDays.includes(currentDay)) {
            // compare currentHour and minute to blackoutTimeStart and End
            let startHour = blacklistedUrl.blackoutTimeStart[0],
                endHour = blacklistedUrl.blackoutTimeEnd[0],
                startMinute = blacklistedUrl.blackoutTimeStart[1],
                endMinute = blacklistedUrl.blackoutTimeEnd[1];

            if (currentHour >= startHour && currentHour < endHour) {
              chrome.webRequest.onBeforeRequest.addListener(
                function(details) {
                  return { cancel: true };
                },
                { urls: blacklistedHostnames },
                ["blocking"]
              );
            } else if (currentHour === endHour) {
              if (currentMinute >= startMinute && currentMinute < endMinute) {
                // alert(`blacklistedHostnames: ${blacklistedHostnames}`);
                // do something
                chrome.webRequest.onBeforeRequest.addListener(
                  function(details) {
                    return { cancel: true };
                  },
                  { urls: blacklistedHostnames },
                  ["blocking"]
                );
              }
            }
          }
        }
      });
    });
  });

});
