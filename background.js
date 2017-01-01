// On chrome.tabs.onUpdated, get urls of current tab.
// If current urls === any of blacklisted urlss in chrome.storage,
//   if current time matches blackout times, redirect elsewhere
// chrome.tabs.onUpdated.addListener(function() {
//   chrome.tabs.query(
//     {
//       'active': true,
//       'lastFocusedWindow': true
//     },
//     function(tabs) {
//       let activeTab = tabs[0];
//       let activeTabUrl = activeTab.url;
//
//       // Get blacklisted site urls
//       chrome.storage.local.get("urls", data => {
//         let blacklistedUrls = data.urls;
//
//         // You have the blacklistedUrls. Now you need to check if activeTabUrl
//         // is a blacklistedUrl. If it is, then redirect to some random site.
//         // webRequest API looks promising
//         // if (blacklistedUrls[activeTabUrl]) {
//           // alert(`blacklistedUrls[activeTabUrl]: ${blacklistedUrls[activeTabUrl]}`);
//           // chrome.tabs.update({ url: "https://www.google.com" });
//           chrome.webRequest.onBeforeRequest.addListener(
//             function(details) {
//               return { cancel: true };
//             },
//             { urls: ["*://www.netflix.com/*"] },
//             ["blocking"]
//           );
//         // }
//
//       });
//     }
//   );
// });


chrome.storage.local.get("urls", data => {
  let blacklistedUrls = [];
  let dataUrls = data.urls;

  Object.keys(dataUrls).forEach(k => {
    let parsed = `*://www.${k}/*`;
    let parsed2 = `*://${k}/*`;

    blacklistedUrls.push(parsed);
    blacklistedUrls.push(parsed2);
  });

  // You have the blacklistedUrls. Now you need to check if activeTabUrl
  // is a blacklistedUrl. If it is, then redirect to some random site.
  // webRequest API looks promising
  // if (blacklistedUrls[activeTabUrl]) {
    // alert(`blacklistedUrls[activeTabUrl]: ${blacklistedUrls[activeTabUrl]}`);
    // chrome.tabs.update({ url: "https://www.google.com" });

    chrome.webRequest.onBeforeRequest.addListener(
      function(details) {
        return { cancel: true };
      },
      { urls: blacklistedUrls },
      ["blocking"]
    );
  // }

});
//
// chrome.webRequest.onBeforeRequest.addListener(
//   function(details) {
//     return {cancel: true};
//   },
//   {urls: []},
//   ["blocking"]
// );
