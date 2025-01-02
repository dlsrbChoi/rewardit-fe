const comma = x => {
  if (x != null) {
    return x
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};

const dateFormat = x => {
  if (x) {
    let js_date = new Date(x);

    let year = js_date.getFullYear();
    let month = (js_date.getMonth() + 1)
      .toString()
      .padStart(2, '0');
    let day = js_date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  } else {
    return '';
  }
};

const openUrl = url => {
  if (!url) return;

  if (!url.includes('://')) url = 'https://' + url;

  const agent = navigator.userAgent.toUpperCase();

  const safari =
    agent.indexOf('SAFARI') >= 0 &&
    agent.indexOf('CHROME') < 0
      ? true
      : false;

  const mobile = navigator.userAgent.includes('Mobile')
    ? true
    : false;

  if (
    /Mobi/i.test(window.navigator.userAgent) ||
    safari ||
    mobile
  ) {
    location.href = url;
  } else {
    window.open(url, '_blank');
  }
};

export default {
  comma,
  dateFormat,
  openUrl,
};
