document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("block-url-form");
  const blockurl = document.getElementById("block-url");

  // Get site and date/time specified by user and store it in chrome.storage.sync

  form.addEventListener('submit', e => {
    e.preventDefault();

    if (blockurl.value) {
      // make sure url is in format: https://www.facebook.com/
      chrome.storage.local.get({ urls: {} }, data => {
        let parser = document.createElement('a');
        parser.href = blockurl.value;

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
