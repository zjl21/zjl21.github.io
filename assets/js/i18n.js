/* Content is paired in _data; ui.yml supplies interface labels. English renders without JS. */
(function () {
  'use strict';

  var root = document.documentElement;
  var dictionary = JSON.parse(document.getElementById('site-translations').textContent);
  var english = new WeakMap();
  var englishAttributes = new WeakMap();
  var toggle = document.querySelector('.language-toggle');

  function translated(key, fallback) {
    var entry = dictionary[key];
    var language = root.lang === 'zh-CN' ? 'zh' : 'en';
    return entry && Object.prototype.hasOwnProperty.call(entry, language)
      ? entry[language] : fallback;
  }

  function uiText(key) {
    return translated(key, '');
  }

  function translateElement(element) {
    if (!english.has(element)) english.set(element, element.innerHTML);
    var chinese = element.getAttribute('data-i18n-zh');
    element.innerHTML = root.lang === 'zh-CN' && chinese !== null
      ? chinese : translated(element.dataset.i18n, english.get(element));
  }

  function refreshNavigation() {
    // Greedy Navigation records widths; discard them after changing label lengths.
    if (typeof window.updateNav !== 'function') return;
    var visible = document.querySelector('#site-nav .visible-links');
    var hidden = document.querySelector('#site-nav .hidden-links');
    while (hidden.firstElementChild) visible.appendChild(hidden.firstElementChild);
    if (window.breaks) window.breaks.length = 0;
    hidden.classList.add('hidden');
    document.querySelector('#site-nav button').classList.remove('close');
    window.updateNav();
  }

  function refreshImageLinks() {
    // Translated prose contains new link nodes; bind the existing image viewer again.
    var $ = window.jQuery;
    if (!$ || !$.fn.magnificPopup) return;
    $('.page__content a[href$=".jpg"], .page__content a[href$=".jpeg"], .page__content a[href$=".JPG"], .page__content a[href$=".png"], .page__content a[href$=".gif"]')
      .addClass('image-popup').magnificPopup({
        type: 'image',
        tClose: uiText('image.close'),
        tLoading: uiText('image.loading'),
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1],
          tPrev: uiText('image.previous'),
          tNext: uiText('image.next'),
          tCounter: uiText('image.counter')
        },
        image: {
          tError: uiText('image.error')
        },
        removalDelay: 500,
        mainClass: 'mfp-zoom-in',
        callbacks: {
          beforeOpen: function () {
            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
          }
        },
        closeOnContentClick: true,
        midClick: true
      });
  }

  function setLanguage(language, updateUrl) {
    root.lang = language;
    document.querySelectorAll('[data-i18n], [data-i18n-zh]').forEach(translateElement);
    ['alt', 'aria-label'].forEach(function (attribute) {
      document.querySelectorAll('[data-i18n-' + attribute + '], [data-i18n-' + attribute + '-zh]').forEach(function (element) {
        var saved = englishAttributes.get(element) || {};
        if (!(attribute in saved)) saved[attribute] = element.getAttribute(attribute);
        englishAttributes.set(element, saved);
        var chinese = element.getAttribute('data-i18n-' + attribute + '-zh');
        element.setAttribute(attribute, root.lang === 'zh-CN' && chinese !== null
          ? chinese : translated(element.getAttribute('data-i18n-' + attribute), saved[attribute]));
      });
    });
    document.querySelectorAll('[data-i18n-citations]').forEach(function (badge) {
      var source = new URL(badge.src, window.location.href);
      source.searchParams.set('label', uiText('badge.label'));
      badge.src = source.href;
      badge.alt = uiText('badge.alt');
    });
    toggle.setAttribute('aria-pressed', String(language === 'zh-CN'));
    toggle.setAttribute('aria-label', uiText('language.switch'));
    toggle.title = toggle.getAttribute('aria-label');
    try { window.localStorage.setItem('site-language', language); } catch (error) { /* Optional persistence. */ }
    if (updateUrl) {
      try {
        var url = new URL(window.location.href);
        url.searchParams.set('lang', language.toLowerCase());
        window.history.replaceState(null, '', url.href);
      } catch (error) { /* Switching still works if URL updates are unavailable. */ }
    }
    refreshNavigation();
    refreshImageLinks();
  }

  var news = document.querySelector('.news-container');
  if (news) {
    var items = Array.from(news.querySelectorAll('p'));
    if (items.length > 5) {
      var showMore = document.createElement('button');
      showMore.type = 'button';
      showMore.className = 'show-more-button';
      var showingAll = false;
      function updateNews() {
        items.slice(5).forEach(function (item) { item.hidden = !showingAll; });
        showMore.dataset.i18n = showingAll ? 'news.less' : 'news.more';
        english.set(showMore, dictionary[showMore.dataset.i18n].en);
        showMore.setAttribute('aria-expanded', String(showingAll));
        translateElement(showMore);
      }
      news.appendChild(showMore);
      showMore.addEventListener('click', function () {
        showingAll = !showingAll;
        updateNews();
      });
      updateNews();
    }
  }

  document.querySelectorAll('.collapsible-trigger').forEach(function (trigger, index) {
    var target = trigger.nextElementSibling;
    if (!target || !target.classList.contains('collapsible-target')) return;
    target.id = target.id || 'collapsible-content-' + index;
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('tabindex', '0');
    trigger.setAttribute('aria-controls', target.id);
    function setExpanded(expanded) {
      target.hidden = !expanded;
      target.style.display = expanded ? '' : 'none';
      trigger.setAttribute('aria-expanded', String(expanded));
      var symbol = trigger.querySelector('.toggle-symbol');
      if (symbol) symbol.textContent = expanded ? '[-]' : '[+]';
    }
    setExpanded(window.getComputedStyle(target).display !== 'none');
    function toggleSection() { setExpanded(trigger.getAttribute('aria-expanded') !== 'true'); }
    trigger.addEventListener('click', toggleSection);
    trigger.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleSection();
      }
    });
  });

  setLanguage(root.lang === 'zh-CN' ? 'zh-CN' : 'en-US', false);
  if (window.jQuery) window.jQuery(refreshImageLinks);
  toggle.hidden = false;
  toggle.addEventListener('click', function () {
    setLanguage(root.lang === 'zh-CN' ? 'en-US' : 'zh-CN', true);
  });
}());
