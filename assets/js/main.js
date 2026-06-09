/* Compensate for scaleY transforms not affecting document flow */
(function () {
    document.querySelectorAll('.gh-header-text-tall-upper, .gh-article-title').forEach(function (el) {
        el.style.paddingBottom = (el.offsetHeight * 0.4) + 'px';
    });
    document.querySelectorAll('.gh-header-text-recent-post-list').forEach(function (el) {
        el.style.paddingBottom = (el.offsetHeight * 0.2) + 'px';
    });
    document.querySelectorAll('.gh-header-text-serif, .gh-styled-section-header-text-serif').forEach(function (el) {
        el.style.paddingBottom = (el.offsetHeight * 0.1) + 'px';
    });
    document.querySelectorAll('.gh-navigation-logo .fallback-text').forEach(function (el) {
        el.style.paddingBottom = (el.offsetHeight * 0.6) + 'px';
    });
})();

/* Mobile menu burger toggle */
(function () {
    const navigation = document.querySelector('.gh-navigation');
    const burger = navigation.querySelector('.gh-burger');
    if (!burger) return;

    burger.addEventListener('click', function () {
        if (!navigation.classList.contains('is-open')) {
            navigation.classList.add('is-open');
            document.documentElement.style.overflowY = 'hidden';
        } else {
            navigation.classList.remove('is-open');
            document.documentElement.style.overflowY = null;
        }
    });
})();

/* Add lightbox to gallery images */
(function () {
    lightbox(
        '.kg-image-card > .kg-image[width][height], .kg-gallery-image > img'
    );
})();

/* Responsive video in post content */
(function () {
    const sources = [
        '.gh-content iframe[src*="youtube.com"]',
        '.gh-content iframe[src*="youtube-nocookie.com"]',
        '.gh-content iframe[src*="player.vimeo.com"]',
        '.gh-content iframe[src*="kickstarter.com"][src*="video.html"]',
        '.gh-content object',
        '.gh-content embed',
    ];
    reframe(document.querySelectorAll(sources.join(',')));
})();

/* Turn the main nav into dropdown menu when there are more than 5 menu items */
/* TO RE-ENABLE OVERFLOW DROPDOWN: uncomment the block below */
// (function () {
//     dropdown();
// })();

/* Infinite scroll pagination */
(function () {
    if (!document.body.classList.contains('home-template') && !document.body.classList.contains('post-template')) {
        pagination();
    }
})();

/* Responsive HTML table */
(function () {
    const tables = document.querySelectorAll('.gh-content > table:not(.gist table)');
    
    tables.forEach(function (table) {
        const wrapper = document.createElement('div');
        wrapper.className = 'gh-table';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
})();