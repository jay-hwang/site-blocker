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
      alert(`activeTab's url: ${activeTab.url}`);
    }
    // (tabs) => {
    //   let urls = tabs[0].urls;
    //   debugger;
    //   // Get blacklisted urlss
    //   chrome.storage.sync.get("urls", data => {
    //     debugger;
    //   });
    // }
  );
});
