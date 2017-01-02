document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("block-url-form");
  const blockurl = document.getElementById("block-url");
  const resetBlacklist = document.getElementById("reset-blacklist");

  // Get site and date/time specified by user and store it in chrome.storage.sync

  form.addEventListener('submit', e => {
    e.preventDefault();

    // let startHour = document.getElementById('start-hour').value;

    // const START_HOUR = document.getElementById("start-hour").value;
    // START_HOUR = parseInt(START_HOUR);
    // const START_TIMESTAMP = document.getElementById('start-timestamp').value;
    // if (START_TIMESTAMP === 'am') { START_HOUR -= 12; }
    // const START_MINUTE = document.getElementById('start-minute').value;
    //
    // const END_HOUR = document.getElementById('end-hour').value;
    // END_HOUR = parseInt(END_HOUR);
    // const END_TIMESTAMP = document.getElementById('end-timestamp').value;
    // if (END_TIMESTAMP === 'am') { END_HOUR -= 12; }
    // const END_MINUTE = document.getElementById('end-minute').value;

    let tempStartHour = document.getElementById("start-hour").value;
    tempStartHour = parseInt(tempStartHour);
    const START_TIMESTAMP = document.getElementById('start-timestamp').value;
    if (START_TIMESTAMP === 'am' && tempStartHour === 12) {
      tempStartHour -= 12;
    } else if (START_TIMESTAMP === 'pm' && tempStartHour < 12) {
      tempStartHour += 12;
    }
    const START_HOUR = tempStartHour;
    const START_MINUTE = document.getElementById('start-minute').value;

    let tempEndHour = document.getElementById('end-hour').value;
    tempEndHour = parseInt(tempEndHour);
    const END_TIMESTAMP = document.getElementById('end-timestamp').value;
    if (END_TIMESTAMP === 'am' && tempEndHour === 12) {
      tempEndHour -= 12;
    } else if (END_TIMESTAMP === 'pm' && tempEndHour < 12) {
      tempEndHour += 12;
    }
    const END_HOUR = tempEndHour;
    const END_MINUTE = document.getElementById('end-minute').value;

    const monday = document.getElementById('monday');
    const tuesday = document.getElementById('tuesday');
    const wednesday = document.getElementById('wednesday');
    const thursday = document.getElementById('thursday');
    const friday = document.getElementById('friday');
    const saturday = document.getElementById('saturday');
    const sunday = document.getElementById('sunday');

    const DAYS = [
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday
    ];

    if (blockurl.value) {
      // raise error unless url is in format: https://www.example.com/
      chrome.storage.local.get({ blacklistedUrls: {} }, data => {
        let blacklistedUrls = data.blacklistedUrls;

        let parser = document.createElement('a');
        parser.href = blockurl.value;
        let hostname = parser.hostname;

        let blackoutDays = [];

        let startHour = START_HOUR;
        let startMinute = parseInt(START_MINUTE);
        let endHour = END_HOUR;
        let endMinute = parseInt(END_MINUTE);

        DAYS.forEach(day => {
          if (day.checked) { blackoutDays.push(parseInt(day.value)); }
        });


        // blacklistedUrls[hostname] = hostname;
        blacklistedUrls[hostname] = {
          hostname: hostname,
          blackoutDays: blackoutDays,
          blackoutTimeStart: [startHour, startMinute],
          blackoutTimeEnd: [endHour, endMinute]
        };

        debugger;

        chrome.storage.local.set({ blacklistedUrls: blacklistedUrls }, () => {
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

  resetBlacklist.addEventListener('click', () => {
    chrome.storage.local.set({ blacklistedUrls: {} }, () => {
      window.close();
    });
  });

});
