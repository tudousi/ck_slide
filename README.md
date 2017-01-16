ck slide
========

简单的 JS+CSS JQuery幻灯片插件
Simple slide implementation for JQuery using Javascript and CSS.

使用 Instruction
--

请参照`index.html`中的示例放置DOM元素，并将`.ck-slide-wrapper li`中的内容替换为需要的内容；

Please place DOM nodes like the sample in `index.html` and replace content of `.ck-slide-wrapper li` to your own content.

启动幻灯片（渐变） Start slide (dissolve)
--

	$('.ck-slide').ckSlide({
		autoPlay:true,
		interval: 3000,
	});

启动幻灯片（左右切换） Start slide (dissolve)
--

	$('.ck-slide').ckSlide({
		autoPlay:true，
		interval: 3000,
		dir:"x",
	});

设置页面 Goto specific page
--

	$('.ck-slide').ckSlideGoto(0);