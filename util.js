// document.addEventListener('DOMContentLoaded', () => {
  const getCurrentTabUrl = () => {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, tabs => {
      return tabs[0].url;
    });
  };

  const getBlacklistedUrls = () => {
    chrome.storage.sync.get('blacklistedUrls', data => {
      return data.blacklistedUrls;
    });
  };

  // const getHostname = url => {
  //   let parser = document.createElement('a');
  //   parser.href = url;
  //   return parser.hostname;
  // };

  const getBlacklistedHostnames = () => {
    // alert('getBlacklistedHostnames called');

    let blacklistedUrls = getBlacklistedUrls();
    let blacklistedHostnamesRes = [];

    Object.keys(blacklistedUrls).forEach(hostname => {
      let parsedHostname = `*://${hostname}/*`;
      blacklistedHostnamesRes.push(parsedHostname);
    });

    return blacklistedHostnamesRes;
  };

  // const currentTabUrl = getCurrentTabUrl();
  // const currentHostname = Util.getHostname(currentTabUrl);
  // const currentHostname = Util.getHostname('www.facebook.com');
  // const blacklistedHostnames = getBlacklistedHostnames();

  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      // alert('onBeforeRequest');
      return { cancel: true };
      // return { redirectUrl: "https://www.jayhwang.xyz"};
    },
    // { urls: [parsedHostname] },
    // { urls: blacklistedHostnames },
    { urls: ["*://www.facebook.com/*"] },
    ["blocking"]
  );


// });



// chrome.tabs.onUpdated.addListener(function() {
  // const currentDate = new Date();
  // const currentDay = currentDate.getDay();
  // const currentHour = currentDate.getHours();
  // const currentMinute = currentDate.getMinutes();
  //
  // const currentTabUrl = getCurrentTabUrl();
  // const currentHostname = getHostname(currentTabUrl);
  // const blacklistedHostnames = getBlacklistedHostnames();
  //
  // alert(`
  //   blacklistedHostnames: ${blacklistedHostnames}
  // `);

// alert('updated');
  // chrome.webRequest.onBeforeRequest.addListener(
  //   function(details) {
  //     return { cancel: true };
  //     // return { redirectUrl: "https://www.jayhwang.xyz"};
  //   },
  //   // { urls: [parsedHostname] },
  //   { urls: blacklistedHostnames },
  //   ["blocking"]
  // );
// });

  // chrome.tabs.onUpdated.addListener(function() {
    // chrome.storage.sync.get("blacklistedUrls", data => {
    //   let blacklistedUrls = data.blacklistedUrls;


      // if (Object.keys(blacklistedUrls).length === 0) {
      //   alert(`
      //     There are no blacklisted sites. Nothing should be blocked,
      //     blacklistedUrls.count: ${Object.keys(blacklistedUrls).length},
      //     blacklistedUrls[0]: ${blacklistedUrls[Object.keys(blacklistedUrls)[0]].hostname}
      //   `);
      // } else {
      //   alert(`
      //     There blacklisted sites. These should be blocked,
      //     blacklistedUrls.count: ${Object.keys(blacklistedUrls).length},
      //     blacklistedUrls[0]: ${blacklistedUrls[Object.keys(blacklistedUrls)[0]].hostname}
      //   `);
      // }

      // alert(`
      //   blacklistedUrls.length: ${Object.keys(blacklistedUrls).length},
      //   blacklistedHostnames.length: ${blacklistedHostnames.length}
      // `);



      // chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        // var currentUrl = tabs[0].url;
        // let parser = document.createElement('a');
        // parser.href = currentUrl;
        // let currentHostname = parser.hostname;

        // Object.keys(blacklistedUrls).forEach(hostname => {
        //   let parsedHostname = `*://${hostname}/*`;
        //   let blacklistedUrl = blacklistedUrls[hostname];
        //   blacklistedHostnames.push(parsedHostname);

          if (blacklistedUrl.hostname === currentHostname) {
            if (blacklistedUrl.blackoutDays.includes(currentDay)) {
              let startHour = blacklistedUrl.blackoutTimeStart[0],
                  endHour = blacklistedUrl.blackoutTimeEnd[0],
                  startMinute = blacklistedUrl.blackoutTimeStart[1],
                  endMinute = blacklistedUrl.blackoutTimeEnd[1];

              if (currentHour >= startHour && currentHour <= endHour) {
                if (currentHour === endHour) {
                  if (currentMinute < startMinute || currentMinute >= endMinute) {
                    return;
                  }
                }

                chrome.webRequest.onBeforeRequest.addListener(
                  function(details) {
                    // return { cancel: true };
                    return { redirectUrl: "https://www.jayhwang.xyz"};
                  },
                  { urls: [parsedHostname] },
                  // { urls: blacklistedHostnames },
                  ["blocking"]
                );
              }
            }
          }

        // }); // Close Object.keys(blacklistedUrls).forEach

      // }); // Close chrome.tabs.query

    // }); // Close get blacklistedUrls from chrome.storage.sync
