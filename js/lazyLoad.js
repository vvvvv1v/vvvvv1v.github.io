const screenWidth = window.innerWidth;
let imageUrlSuffix = '';

if (screenWidth < 480) {
  //设置小屏幕下的图片 url
  imageUrlSuffix = '-small.jpeg';
} else if (screenWidth < 768) {
  //设置中等屏幕下的图片 url
  imageUrlSuffix = '-medium.jpeg';
} else {
  //设置大屏幕下的图片 url
  imageUrlSuffix = '-large.jpeg';
}

let imgs = document.querySelectorAll('img[data-src]');
let pixel = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';
// 判断是否有图片
if (imgs.length !== 0) {
// 防止图片同时加载
    imgs[0].setAttribute('src', pixel);
    imgs[0].setAttribute('transition', 'opacity 2s ease');
    imgs[0].setAttribute('width', '100px')
    imgs[0].setAttribute('height', '100px')
}
// 一上来立即执行一次
let io = new IntersectionObserver(function (entires) {
    //图片进入视口时就执行回调
    entires.forEach(item => {
        // 获取目标元素
        let oImg = item.target
        if (!oImg.hasAttribute('src')) {
            oImg.setAttribute('src', pixel);
            oImg.setAttribute('transition', 'opacity 2s ease');
            oImg.setAttribute('width', '100px')
            oImg.setAttribute('height', '100px')
        }
        // 当图片进入视口的时候，就赋值图片的真实地址
        if (item.intersectionRatio > 0 && item.intersectionRatio <= 1) {
            oImg.setAttribute('src', oImg.getAttribute('data-src').replace('.jpeg', imageUrlSuffix));
            io.unobserve(oImg);
        }
    })
})

Array.from(imgs).forEach(element => {
    io.observe(element)  //给每一个图片设置监听
});
