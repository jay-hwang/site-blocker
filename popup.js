document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("block-urls-form");
  const blockurls = document.getElementById("block-urls");

  // Get site and date/time specified by user and store it in chrome.storage.sync

  form.addEventListener('submit', e => {
    e.preventDefault();

    if (blockurls.value) {
      // make sure url is in format: https://www.facebook.com/
      chrome.storage.local.get({ urls: {} }, data => {
        let parser = document.createElement('a');
        parser.href = blockurls.value;

        let newUrl = parser.hostname;
        let urls = data.urls;
        debugger;

        urls[newUrl] = newUrl;
        chrome.storage.local.set({ urls: urls }, () => {
          window.close();
          // chrome.storage.local.get("urls", data2 => {
          //   let blacklistedUrls = [];
          //   let data2Urls = data2.urls;
          //
          //   debugger;
          //
          //   Object.keys(data2Urls).forEach(k => {
          //     blacklistedUrls.push(data2Urls[k]);
          //   });
          //
          //   debugger;
          // });
          //
        });
      });
    }
  });
});
