document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("block-urls-form");
  const blockurls = document.getElementById("block-urls");

  // Get site and date/time specified by user and store it in chrome.storage.sync

  form.addEventListener('submit', e => {
    e.preventDefault();

    debugger;
    if (blockurls.value) {
      // make sure url is in format: https://www.facebook.com/
      chrome.storage.local.get({ urls: {} }, data => {
        let newUrl = blockurls.value;
        let urls = data.urls;
        debugger;

        urls[newUrl] = newUrl;
        chrome.storage.local.set({ urls: urls }, () => {

        });
      });
    }
  });
});
