/* ============================================================================
   Black Dome — content renderer

   TECHNICAL FILE. Do not edit this to change the address or hours;
   edit site-content.js in the main folder instead.

   This reads the values from site-content.js and writes them into any element
   on the page marked with a data-bd="..." attribute. It runs after the page
   loads and fails silently, so if anything goes wrong the plain HTML that is
   already in the page is left untouched and still readable.
   ============================================================================ */
(function () {
  "use strict";

  if (typeof BLACK_DOME === "undefined" || !BLACK_DOME) { return; }
  var C = BLACK_DOME;

  function each(selector, fn) {
    var nodes = document.querySelectorAll(selector);
    for (var i = 0; i < nodes.length; i++) { fn(nodes[i]); }
  }

  function setText(key, value) {
    if (value === undefined || value === null) { return; }
    each('[data-bd="' + key + '"]', function (el) { el.textContent = value; });
  }

  /* --- plain text fields ------------------------------------------------- */

  setText("addressLine1", C.addressLine1);
  setText("addressLine2", C.addressLine2);
  setText("phone", C.phone);
  setText("email", C.email);

  /* Full address on one line, for compact places like the footer. */
  setText("addressFull", [C.addressLine1, C.addressLine2].filter(Boolean).join(", "));

  /* Optional note under the address — hide its container when empty. */
  each('[data-bd="addressNote"]', function (el) {
    if (C.addressNote) { el.textContent = C.addressNote; }
    else { el.style.display = "none"; }
  });

  /* Years in business, counted from foundedYear so it never goes stale. */
  if (C.foundedYear) {
    setText("yearsInBusiness", new Date().getFullYear() - C.foundedYear);
  }

  /* --- clickable phone and email ------------------------------------------ */

  each('[data-bd-link="phone"]', function (el) {
    if (!C.phone) { return; }
    el.textContent = C.phone;
    el.setAttribute("href", "tel:" + C.phone.replace(/[^0-9+]/g, ""));
  });

  each('[data-bd-link="email"]', function (el) {
    if (!C.email) { return; }
    el.textContent = C.email;
    el.setAttribute("href", "mailto:" + C.email);
  });

  /* --- opening hours ------------------------------------------------------
     Hidden entirely unless showHours is true, so half-finished hours can
     never reach a customer. */

  each('[data-bd="hours"]', function (el) {
    var container = el.closest("[data-bd-hours-block]") || el;

    if (!C.showHours || !C.hours || !C.hours.length) {
      container.style.display = "none";
      return;
    }

    container.style.display = "";
    el.innerHTML = "";

    for (var i = 0; i < C.hours.length; i++) {
      var row = C.hours[i];
      if (!row || !row.day) { continue; }

      var li = document.createElement("li");
      li.className = "bd-hours-row";

      var day = document.createElement("span");
      day.className = "bd-hours-day";
      day.textContent = row.day;

      var time = document.createElement("span");
      time.className = "bd-hours-time";
      time.textContent = row.time || "";

      li.appendChild(day);
      li.appendChild(time);
      el.appendChild(li);
    }
  });

  /* --- map ----------------------------------------------------------------
     Uses the exact embed link in mapEmbedSrc when set, since that pin-drops
     the verified Google Maps listing. Falls back to a plain address search
     so the map still points somewhere reasonable if that field is blank. */

  each('[data-bd="map"]', function (el) {
    if (C.mapEmbedSrc) {
      el.setAttribute("src", C.mapEmbedSrc);
      return;
    }
    var query = [C.addressLine1, C.addressLine2].filter(Boolean).join(", ");
    if (!query) { return; }
    el.setAttribute(
      "src",
      "https://maps.google.com/maps?q=" + encodeURIComponent(query) + "&output=embed"
    );
  });

  each('[data-bd-link="directions"]', function (el) {
    var query = [C.addressLine1, C.addressLine2].filter(Boolean).join(", ");
    if (!query) { return; }
    el.setAttribute(
      "href",
      "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(query)
    );
  });

  /* --- announcement banner ------------------------------------------------
     Colors the "We have moved" phrase without ever using innerHTML, so a
     typo in bannerText can never inject markup. If the phrase isn't found
     (banner text was rewritten), it just prints plainly. */

  function setBannerText(el, text) {
    var phrase = "We have moved";
    var idx = text.indexOf(phrase);
    el.textContent = "";
    if (idx === -1) {
      el.textContent = text;
      return;
    }
    var end = idx + phrase.length;
    if (text.charAt(end) === "!") { end += 1; }
    el.appendChild(document.createTextNode(text.slice(0, idx)));
    var span = document.createElement("span");
    span.className = "bd-banner-accent";
    span.textContent = text.slice(idx, end);
    el.appendChild(span);
    el.appendChild(document.createTextNode(text.slice(end)));
  }

  each("[data-bd-banner]", function (el) {
    if (C.showBanner && C.bannerText) {
      setBannerText(el, C.bannerText);
      el.style.display = "";
    } else {
      el.style.display = "none";
    }
  });

  /* --- structured data for Google ----------------------------------------
     Helps Google Search and Maps pick up the correct address and hours. */

  try {
    var DAY_URI = {
      Monday: "Monday", Tuesday: "Tuesday", Wednesday: "Wednesday",
      Thursday: "Thursday", Friday: "Friday", Saturday: "Saturday", Sunday: "Sunday"
    };

    var data = {
      "@context": "https://schema.org",
      "@type": "SportingGoodsStore",
      "name": "Black Dome Mountain Sports",
      "url": "https://www.blackdome.com/",
      "telephone": C.phone || undefined,
      "email": C.email || undefined,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": C.addressLine1 || undefined,
        "addressLocality": "Asheville",
        "addressRegion": "NC",
        "postalCode": "28803",
        "addressCountry": "US"
      }
    };

    if (C.showHours && C.hours && C.hours.length) {
      var spec = [];
      for (var j = 0; j < C.hours.length; j++) {
        var h = C.hours[j];
        if (!h || !h.day || !h.time) { continue; }
        if (/closed/i.test(h.time)) { continue; }
        var parts = h.time.split(/\s*[-–]\s*/);
        if (parts.length !== 2 || !DAY_URI[h.day]) { continue; }
        spec.push({
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "https://schema.org/" + DAY_URI[h.day],
          "opens": parts[0].trim(),
          "closes": parts[1].trim()
        });
      }
      if (spec.length) { data.openingHoursSpecification = spec; }
    }

    var tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.textContent = JSON.stringify(data);
    document.head.appendChild(tag);
  } catch (e) {
    /* structured data is a bonus; never let it break the page */
  }
})();
