var startTime = new Date().getTime();

window.addEventListener('load', function () {
    var loadTime = new Date().getTime() - startTime;

    console.log('Page load time: ' + loadTime + ' milliseconds');

    var li = document.createElement('li');
    var p = document.createElement('p');
    var footer_menu = document.getElementById('footer-menu');

    p.textContent = 'Page load time: ' + loadTime + ' milliseconds';
    p.classList.add('footer-menu-text')

    li.classList.add('footer-menu-item');
    li.appendChild(p);

    footer_menu.appendChild(li);
});