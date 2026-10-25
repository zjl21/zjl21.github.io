---
permalink: /
title: ""
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

{% for section in site.data.sections %}
{% if section.id == 'news' %}
<div class="news-container" id="{{ section.anchor }}" markdown="1">
{% else %}
<span class="anchor" id="{{ section.anchor }}"></span>
{% endif %}

<h1 id="section-{{ section.id }}"><span data-i18n-zh="{{ section.heading.zh | escape }}">{{ section.heading.en }}</span></h1>

{% assign entries = site.data[section.data] %}
{% include {{ section.template }} entries=entries id_prefix=section.id %}

{% if section.id == 'news' %}
</div>
{% endif %}
{% endfor %}
