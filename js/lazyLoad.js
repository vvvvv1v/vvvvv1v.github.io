let imgs = document.querySelectorAll('.lazy');
// 1. 一上来立即执行一次
let io = new IntersectionObserver(function (entires) {
    //图片进入视口时就执行回调
    entires.forEach(item => {
        // 获取目标元素
        let oImg = item.target
        if (oImg.classList.contains('lazy-loaded')) {
            return;
        }
        if (!oImg.hasAttribute('src')) {
            oImg.setAttribute('src', 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==');
        }
        // 当图片进入视口的时候，就赋值图片的真实地址
        if (item.intersectionRatio > 0 && item.intersectionRatio <= 1) {
            oImg.setAttribute('src', oImg.getAttribute('data-src'))
            oImg.classList.add('lazy-loaded');
            oImg.classList.remove('lazy');
        }
    })
})
Array.from(imgs).forEach(element => {
    io.observe(element)  //给每一个图片设置监听
});