/* The English source stays in the HTML; Chinese translations live in _data/translations.json. */
(function () {
  'use strict';

  var root = document.documentElement;
  var dictionary = JSON.parse(document.getElementById('site-translations').textContent);
  var english = new WeakMap();
  var englishAttributes = new WeakMap();
  var englishTitle = document.title;
  var toggle = document.querySelector('.language-toggle');

  function translated(key, fallback) {
    return root.lang === 'zh-CN' && Object.prototype.hasOwnProperty.call(dictionary, key)
      ? dictionary[key] : fallback;
  }

  function translateElement(element) {
    if (!english.has(element)) english.set(element, element.innerHTML);
    element.innerHTML = translated(element.dataset.i18n, english.get(element));
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
    var chinese = root.lang === 'zh-CN';
    $('.page__content a[href$=".jpg"], .page__content a[href$=".jpeg"], .page__content a[href$=".JPG"], .page__content a[href$=".png"], .page__content a[href$=".gif"]')
      .addClass('image-popup').magnificPopup({
        type: 'image',
        tClose: chinese ? '关闭（Esc）' : 'Close (Esc)',
        tLoading: chinese ? '正在加载图片…' : 'Loading image #%curr%...',
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1],
          tPrev: chinese ? '上一张（左方向键）' : 'Previous (Left arrow key)',
          tNext: chinese ? '下一张（右方向键）' : 'Next (Right arrow key)',
          tCounter: '%curr% / %total%'
        },
        image: {
          tError: chinese ? '<a href="%url%">图片</a>加载失败。' : '<a href="%url%">Image #%curr%</a> could not be loaded.'
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
    document.querySelectorAll('[data-i18n]').forEach(translateElement);
    ['alt', 'aria-label'].forEach(function (attribute) {
      document.querySelectorAll('[data-i18n-' + attribute + ']').forEach(function (element) {
        var saved = englishAttributes.get(element) || {};
        if (!(attribute in saved)) saved[attribute] = element.getAttribute(attribute);
        englishAttributes.set(element, saved);
        element.setAttribute(attribute, translated(element.getAttribute('data-i18n-' + attribute), saved[attribute]));
      });
    });
    document.querySelectorAll('[data-i18n-citations]').forEach(function (badge) {
      var source = new URL(badge.src, window.location.href);
      source.searchParams.set('label', language === 'zh-CN' ? '引用次数' : 'citations');
      badge.src = source.href;
      badge.alt = language === 'zh-CN' ? '谷歌学术引用次数' : 'Google Scholar citations';
    });
    document.title = language === 'zh-CN' ? '郑佳兰 - 个人主页' : englishTitle;
    toggle.setAttribute('aria-pressed', String(language === 'zh-CN'));
    toggle.setAttribute('aria-label', language === 'zh-CN' ? 'Switch to English' : '切换到简体中文');
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
        english.set(showMore, showingAll ? 'Show less' : 'Show more');
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
