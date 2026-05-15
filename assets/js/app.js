/* ============================================================
   CBAiQ Libraries — Application JavaScript
   Sidebar tree nav, accordions, copy-to-clipboard, filter pills.
   All DOM manipulation uses textContent/createElement to prevent XSS.
   ============================================================ */

(function () {
  'use strict';

  /* ---- Sidebar expand/collapse ---- */
  function initSidebar() {
    document.querySelectorAll('.cb-side-row[data-toggle]').forEach(function (btn) {
      var targetId = btn.getAttribute('data-toggle');
      var children = document.getElementById(targetId);
      if (!children) return;

      btn.addEventListener('click', function () {
        var isOpen = children.classList.contains('is-open');
        children.classList.toggle('is-open', !isOpen);
        btn.setAttribute('aria-expanded', String(!isOpen));
      });
    });
  }

  /* ---- Version history accordions ---- */
  function initAccordions() {
    document.querySelectorAll('.cb-acc-head').forEach(function (head) {
      head.addEventListener('click', function () {
        var acc = head.closest('.cb-acc');
        if (!acc) return;
        acc.classList.toggle('is-open');
      });
    });
  }

  /* ---- Filter pills ---- */
  function initPills() {
    document.querySelectorAll('.cb-pill-filter').forEach(function (group) {
      group.querySelectorAll('.cb-pill').forEach(function (pill) {
        pill.addEventListener('click', function () {
          group.querySelectorAll('.cb-pill').forEach(function (p) { p.classList.remove('is-active'); });
          pill.classList.add('is-active');
        });
      });
    });
  }

  /* ---- Copy to clipboard ---- */
  function initCopy() {
    document.querySelectorAll('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-copy');
        var el = target ? document.getElementById(target) : null;
        var text = el ? (el.value || el.textContent) : btn.getAttribute('data-copy-text') || '';

        /* Use Clipboard API with feature detection */
        if (!text) return;

        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(function () {
            showCopyFeedback(btn);
          }).catch(function () {
            fallbackCopy(text, btn);
          });
        } else {
          fallbackCopy(text, btn);
        }
      });
    });
  }

  function fallbackCopy(text, btn) {
    /* Fallback: create a temporary textarea off-screen */
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
      showCopyFeedback(btn);
    } catch (e) {
      /* Copy not supported; silently fail */
    } finally {
      document.body.removeChild(ta);
    }
  }

  function showCopyFeedback(btn) {
    var original = btn.textContent;
    /* Only update text content — no innerHTML to prevent XSS */
    btn.textContent = 'Copied!';
    btn.disabled = true;
    setTimeout(function () {
      btn.textContent = original;
      btn.disabled = false;
    }, 1800);
  }

  /* ---- Sidebar search filter ---- */
  function initSidebarSearch() {
    document.querySelectorAll('.cb-side-search input').forEach(function (input) {
      input.addEventListener('input', function () {
        /* Sanitise by reading value (never HTML) */
        var query = input.value.toLowerCase().trim();
        var sidebar = input.closest('.cb-shell-side');
        if (!sidebar) return;

        sidebar.querySelectorAll('.cb-side-child').forEach(function (child) {
          var lbl = child.querySelector('.child-lbl');
          if (!lbl) return;
          var name = lbl.textContent.toLowerCase();
          var match = !query || name.includes(query);
          child.style.display = match ? '' : 'none';

          /* Auto-open parent group when a child matches */
          if (match && query) {
            var childrenEl = child.closest('.cb-side-children');
            if (childrenEl) {
              childrenEl.classList.add('is-open');
              var parentBtn = childrenEl.previousElementSibling;
              if (parentBtn) parentBtn.setAttribute('aria-expanded', 'true');
            }
          }
        });
      });
    });
  }

  /* ---- Initialise on DOM ready ---- */
  document.addEventListener('DOMContentLoaded', function () {
    initSidebar();
    initAccordions();
    initPills();
    initCopy();
    initSidebarSearch();
  });
})();
