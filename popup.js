document.addEventListener('DOMContentLoaded', () => {
  const form           = document.getElementById("block-url-form");
  const urlToBlock     = document.getElementById("block-url");
  const resetBlacklist = document.getElementById("reset-blacklist");
  const listBlacklist  = document.getElementById('list-blacklist');

  const DAYS = [
    document.getElementById('monday'),
    document.getElementById('tuesday'),
    document.getElementById('wednesday'),
    document.getElementById('thursday'),
    document.getElementById('friday'),
    document.getElementById('saturday'),
    document.getElementById('sunday')
  ];

  const parseTime = (hour, minute, period) => {
    hour   = parseInt(hour);
    minute = parseInt(minute);
    if (period === 'am' && hour === 12) { hour -= 12; }
    if (period === 'pm' && hour < 12  ) { hour += 12; }
    return [hour, minute];
  };

  const getHostname = url => {
    let parser = document.createElement('a');
    parser.href = url;
    return parser.hostname;
  };

  const getBlackoutDays = () => {
    let blackoutDays = [];
    DAYS.forEach(day => {
      if (day.checked) { blackoutDays.push(parseInt(day.value)); }
    });
    return blackoutDays;
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (urlToBlock.value) {
      // raise error unless url is in format: https://www.example.com/

      const START_TIME = parseTime(
        document.getElementById('start-hour').value,
        document.getElementById('start-minute').value,
        document.getElementById('start-period').value
      );

      const END_TIME = parseTime(
        document.getElementById('end-hour').value,
        document.getElementById('end-minute').value,
        document.getElementById('end-period').value
      );

      chrome.storage.sync.get({ blacklistedUrls: {} }, data => {
        let hostname = getHostname(urlToBlock.value);
        let blackoutDays = getBlackoutDays();

        let blacklistedUrls = data.blacklistedUrls;
        blacklistedUrls[hostname] = {
          hostname: hostname,
          blackoutDays: blackoutDays,
          blackoutTimeStart: START_TIME,
          blackoutTimeEnd: END_TIME
        };

        chrome.storage.sync.set({ blacklistedUrls: blacklistedUrls }, () => {
          window.close();
        });

      });
    }
  });

  resetBlacklist.addEventListener('click', () => {
    let newBlacklistedUrls = {};
    chrome.storage.sync.set({ blacklistedUrls: newBlacklistedUrls }, () => {
      chrome.storage.sync.get('blacklistedUrls', data => {
        let blacklistedUrls = data.blacklistedUrls;
        debugger;
      });
      // window.close();
    });
  });

  listBlacklist.addEventListener('click', () => {
    chrome.storage.sync.get('blacklistedUrls', data => {
      let blacklistedUrls = data.blacklistedUrls;
      debugger;
    });
  });

});
