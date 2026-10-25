/* Apply the saved locale before the first paint. English remains the default. */
(function () {
  'use strict';

  function normalize(value) {
    value = (value || '').toLowerCase();
    if (value === 'zh-cn') return 'zh-CN';
    if (value === 'en-us') return 'en-US';
    return null;
  }

  var language;
  try {
    language = normalize(new URL(window.location.href).searchParams.get('lang'));
  } catch (error) { /* A missing URL API must not prevent the page loading. */ }
  try {
    language = language || normalize(window.localStorage.getItem('site-language'));
  } catch (error) { /* Storage may be unavailable in private or restricted browsers. */ }
  document.documentElement.lang = language || 'en-US';
}());
