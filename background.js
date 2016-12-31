// On chrome.tabs.onUpdated, get urls of current tab.
// If current urls === any of blacklisted urlss in chrome.storage,
  // if current time matches blackout times, redirect elsewhere
chrome.tabs.onUpdated.addListener(function() {


  // alert('hello addListener was triggered');
  chrome.tabs.query(
    {
      'active': true,
      'lastFocusedWindow': true
    }, function(tabs) {
      let activeTab = tabs[0];
      let activeTabUrl = activeTab.url;

      // Get blacklisted site urls
      chrome.storage.local.get("urls", data => {
        let blacklistedUrls = data.urls;

        // You have the blacklistedUrls. Now you need to check if activeTabUrl
        // is a blacklistedUrl. If it is, then redirect to some random site.
        // webRequest API looks promising
      });
    }
  );
});
