let imgs = document.querySelectorAll('img[data-src]');
console.log(imgs);
// 判断是否有图片
if (imgs.length !== 0) {
// 防止图片同时加载
    // imgs[0].setAttribute('src', 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==');
    if (imgs[0].getAttribute('data-src').endsWith('-small.jpeg')) {
        imgs[0].setAttribute('src', imgs[0].getAttribute('data-src').replace('-small.jpeg', '-empty.png'));
    } else {
        imgs[0].setAttribute('src', imgs[0].getAttribute('data-src').replace('.jpeg', '-empty.png'));
    }
    imgs[0].setAttribute('opacity', '0');
    imgs[0].setAttribute('transition', 'opacity 1s ease');
    imgs[0].setAttribute('width', '100px')
    imgs[0].setAttribute('height', '100px')
}
// 一上来立即执行一次
let io = new IntersectionObserver(function (entires) {
    //图片进入视口时就执行回调
    entires.forEach(item => {
        // 获取目标元素
        let oImg = item.target
        console.log(oImg);  
        // if (oImg.classList.contains('lazy-loaded')) {
        //     return;
        // }
        if (!oImg.hasAttribute('src')) {
            // oImg.setAttribute('src', 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==');
            if (oImg.getAttribute('data-src').endsWith('-small.jpeg')) {
                oImg.setAttribute('src', oImg.getAttribute('data-src').replace('-small.jpeg', '-empty.png'));
            } else {
                oImg.setAttribute('src', oImg.getAttribute('data-src').replace('.jpeg', '-empty.png'));
            }
            oImg.setAttribute('opacity', '0');
            oImg.setAttribute('transition', 'opacity 1s ease');
            oImg.setAttribute('width', '100px')
            oImg.setAttribute('height', '100px')
        }
        // 当图片进入视口的时候，就赋值图片的真实地址
        if (item.intersectionRatio > 0 && item.intersectionRatio <= 1) {
            oImg.setAttribute('src', oImg.getAttribute('data-src'))
            // oImg.classList.add('lazy-loaded');
            // oImg.classList.remove('lazy');
            io.unobserve(oImg);
        }
    })
})
Array.from(imgs).forEach(element => {
    io.observe(element)  //给每一个图片设置监听
});


// // let imgs = document.querySelectorAll('.lazy');
// // 1. 一上来立即执行一次
// fn()
// // 2. 监听滚动事件
// window.onscroll = lazyload(fn, true)
// function fn() {
//     let imgs = document.querySelectorAll('.lazy');
//     // 获取视口高度和内容的偏移量
//     let clietH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
//     var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
//     console.log(clietH, scrollTop);
//     for (let i = 0; i < 1; i++) {
//         let x = scrollTop + clietH - imgs[i].offsetTop //当内容的偏移量+视口高度>图片距离内容顶部的偏移量时，说明图片在视口内
//         if (x > 0) {
//             imgs[i].src = imgs[i].getAttribute('data-src'); //从dataurl中取出真实的图片地址赋值给url
//             imgs[i].classList.add('lazy-loaded');
//             imgs[i].classList.remove('lazy');
//         }
//     }
// }
//   // 函数节流
// function lazyload(fn, immediate) {
//     let timer = null
//     return function () {
//         let context = this;
//         if (!timer) {
//             timer = setTimeout(() => {
//                 fn.apply(this)
//                 timer = null
//             }, 200)
//         }
//     }
// }
