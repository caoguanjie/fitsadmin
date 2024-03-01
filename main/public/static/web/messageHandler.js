"use strict";
// 监听 DOMContentLoaded 事件
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM is fully loaded and parsed.');
    // 在这里执行 DOM 加载完成后的操作
    // 回复消息
    loadPdf();

});

window.addEventListener('message', function(message) {
    const { data } = message;
    const { type, value } = data;
    switch (type) {
        // 页面切换
        case 'SET_PAGE':
            window.PDFViewerApplication.page = value;
            break;
            // 页面高度定位
        case 'SET_TOP':
            console.log(window.PDFViewerApplication)
            break;
        case 'PRINT':

            // 是否静默打印，
            if (value.silent) {
                window.PDFViewerApplication.eventBus.on('afterprint', function() {
                        console.log('打印之后', window.parent);
                        window.parent.postMessage('afterprint', '*');
                        window.PDFViewerApplication = null

                    })
                    // 清除iframe的背景色，这样能保留加载的窗口
                document.getElementById('mainContainer').classList.add('hidden');
                document.body.style.background = 'transparent'
            }

            window.print();
            break;
        default:
            break;
    }
});

function loadPdf() {
    var timer = setInterval(() => {
        if (window.PDFViewerApplication.pdfDocument != null) {
            clearInterval(timer);
            // 下周这段隐藏式的代码是用来监听pdf加载完，之后告诉父级页面pdf调用打印的代码。目前是直接在view.js加入静默打印的功能
            window.PDFViewerApplication.eventBus.on('pagerender', function() {
                console.log('pdf加载完成', window.parent);
                window.parent.postMessage('pagerender', '*');

            })
        }
    }, 100);
}