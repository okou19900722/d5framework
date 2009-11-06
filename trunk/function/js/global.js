	/***********************************************
	 *
	 *	D5Framework
	 *	D5Power Studio
	 *	author:Benmouse		date:2007-10-14
	 *	第五动力工作室 - D5轻型开发框架
	 *
	 **********************************************/
	/* ------ 全局变量设置 ------ */
	
	var BLOCK = 10; // 窗体基本间距
	var changePage_memory = ""; //用于记忆跳转目标，呼叫跳转函数
	var changePage_display = '';	// 用于页面跳转函数中记录显示容器
	
	
	/* ------ 全局函数声明 ------ */
	function getid(id)
	{
		return $('#'+id).get(0);
	}
	
	// 复制到剪切版
	function D5Copy(str)
	{
		window.clipboardData.setData('text',str);
		if(window.clipboardData.getData('text')==str)
		{
			return true;
		}else{
			return false;
		}
	}
	
	// 获取IE版本
	function getIEversion()
	{
		try
		{
			return parseInt(navigator.appVersion.split("MSIE")[1]);
		}catch(e){
			return 7;
		}
	}

	/* 新窗口打开控制程序 Begin */
	
	function myopen(url,w,h,bar){
	   if(bar==2){
		  window.open(url,"_Register","toolbar=no,location=no,directories=no,menubar=no,scrollbars=no,resizable=no,width="+w+",height="+h);
	   }else{
		  window.open(url,"_Register","toolbar=no,location=no,directories=no,menubar=no,scrollbars=yes,resizable=yes,width="+w+",height="+h);
	   }
	}

	/*  取得鼠标位置  */
	var mouseXY;
	function getMouseXY(ev){
		ev=window.event || ev;
		
		//ff
		_xmouse_ff=ev.layerX;
		_ymouse_ff=ev.layerY;
		
		//IE
		try
		{
			var yScrolltop;
			var xScrollleft;
			if (self.pageYOffset || self.pageXOffset) {
				yScrolltop = self.pageYOffset;
				xScrollleft = self.pageXOffset;
			} else if (document.documentElement && document.documentElement.scrollTop || document.documentElement.scrollLeft ){     // Explorer 6 Strict
				yScrolltop = document.documentElement.scrollTop;
				xScrollleft = document.documentElement.scrollLeft;
			} else if (document.body) {// all other Explorers
				yScrolltop = document.body.scrollTop;
				xScrollleft = document.body.scrollLeft;
			}
			_xmouse_ie=xScrollleft + event.clientX; 
			_ymouse_ie=yScrolltop + event.clientY;
		}catch(e){}
		
		
		_xmouse=_xmouse_ff==undefined ? _xmouse_ie : _xmouse_ff;
		_ymouse=_ymouse_ff==undefined ? _ymouse_ie : _ymouse_ff;
		arrayPageScroll = new Array(_xmouse,_ymouse)
		mouseXY = arrayPageScroll;
		
	}
	
	/* ------ 根据样式获取DOM对象 ------ */
	function getElementByClass(target,className)
	{
		return $(target).children('.'+className);
	}
	
	/* ------ 页面安装 ------ */
	function setupPage(father)
	{
		try
		{
			var father = $('#father');	// 获取容器ID
			if(empty(father)) return false;
		}catch(e){
			return false;
		}
		var leftBox;					// 左内容容器
		var midBox;						// 中内容容器
		var rightBox;					// 右内容容器
		var temp;						// 临时变量
		
		// 获取父容器，尝试所有可能的容器
		try
		{
			leftBox = father.children('.left_box');
		}catch(e){
			leftBox = null;
		}
		
		try
		{
			midBox = father.children('.middle_box');
		}catch(e){
			midBox = null;
		}
		
		try
		{
			rightBox = father.children('.right_box');
		}catch(e){
			rightBox = null;
		}
		
		
		// 尝试获取单元容器
		midBox.each(
					function(i)
					{
						if(this.className=='middle_box')
						{
							if($(this).prev().attr('class')=='left_box')
							{
								_w = parseInt(this.style.width);
								this.style.width = (_w-BLOCK)+"px";
								this.style.marginLeft = BLOCK+"px";
							}
							setWindow(this);
						}
					}
					);
		
		// 左箱
		leftBox.each(
					 function(i)
					 {
						if(this.className=='left_box')
						{
							setWindow(this);
						}
					 }
					 );
		
		// 右箱
		rightBox.each(
					  function(i)
					  {
						if(this.className=='right_box')
						{
							var _w = parseInt(this.style.width);
							this.style.width = (_w-BLOCK)+"px";
							this.style.marginLeft = BLOCK+"px";
							setWindow(this);
						} 
					  }
					  );
		
		father.css('display','');
		
		// 为窗体增加鼠标移动响应（for drag）
		if(document.addEventListener)
		{
			// FF
			document.addEventListener('mousemove',getMousePos,true);
		}else{
			//IE
			document.attachEvent('onmousemove',getMousePos);
		}
	}
	
	// 安装窗口
	function setWindow(target)
	{
		// 函数，循环容器中所有指定样式的对象，并将其按照父容器的尺寸进行适应操作
		var w = parseInt(target.style.width);
		temp = getElementByClass(target,'window_top');
		for(i=0;i<temp.length;i++)
		{
			temp[i].style.width=(w-BLOCK*2-2)+"px";
		}
		
		temp = getElementByClass(target,'window_bottom');
		for(i=0;i<temp.length;i++)
		{
			temp[i].style.width=(w-BLOCK*2-2)+"px";
		}
		
		temp = getElementByClass(target,'window_body');
		for(i=0;i<temp.length;i++)
		{
			temp[i].style.width=(w-2)+"px";
		}
	}
	
	// 获取时间戳
	function time()
	{
		var date = new Date();
		var stemp = parseInt(date.getTime()/1000);
		return stemp;
	}
	
	// 非空判断
	function empty(str)
	{
		if(str!=undefined && str!='' && str!=null)
		{
			return false;
		}else{
			return true;
		}
	}
	
	/**
	 *	消息函数
	 *	@param msg 提示内容
	 *	@param hold 消息停留时间，0为永久，如不设置本参数，则3秒自动消失
	 *	@param url 跳转地址，当消息框消失后，自动引导用户到改页面
	 */
	
	function MSG(msg,hold,url)
	{
		htmlbody=(document.documentElement.clientHeight<=document.body.clientHeight&&document.documentElement.clientHeight!=0)?document.documentElement:document.body;
		scrollTop = (!window.innerHeight)?htmlbody.scrollTop:window.pageYOffset;
		
		
		if(msg!=undefined && msg!='')
		{
			getid('msgbox_shower').innerHTML=msg;
			getid('MSGbox').style.display='';
			getid('MSGbox').style.top=scrollTop+($(window).width()/4)+"px";
			getid('MSGbox').style.left=($(window).width()-$('#MSGbox').width())/2+"px";
			
			if(url!=undefined)
			{
				var goto = url.substr(0,7)=='http://' ? url : '';
				goto = goto=='' ? '' : ";window.location='"+goto+"';";
			}else{
				var goto = '';
			}
			if(hold==undefined || hold<=0)
			{
				setTimeout('MSG()'+goto,3000);
			}else if(parseInt(hold)>0){
				setTimeout('MSG()'+goto,hold);
			}
			
		}else{
			getid('msgbox_shower').innerHTML='';
			getid('MSGbox').style.display='none';
		}
	}
	
	/* ------ 页面跳转驱动开始 ------ */
	
	// 本函数用于页面的跳转，可以通过display_tar设置一个AJAX显示目标
	// sender为附加发送的变量，将以POST方式进行方式。
	// 同时callback将记录为页面读取完成后自动运行的回调函数。
	// 如果AJAX显示目标display_tar未设置，则做当前页面的跳转
	// 如果AJAX显示目标为parent,则在父级窗口中做页面跳转
	function changePage(tar,display_tar,sender,callback)
	{
		if(empty(display_tar))
		{
			// 普通跳转
			window.location = tar;
			return;
		}
		
		if(display_tar=='parent')
		{
			window.parent.localtion=tar;
			return;
		}
		
		changePage_memory = callback;
		changePage_display = display_tar;
		
		var myajax = new Ajax(changePage_ol,null);
		var sendvar = sender == undefined ? '' : sender;
		myajax.sendVar(tar,sendvar,"POST");
		MSG('页面加载中...');
	}
	
	
	
	function changePage_ol(reg)
	{
		if(reg.responseText=='') return;
		
		getid(changePage_display).innerHTML = reg.responseText;
		
		if(changePage_memory!="")
		{
			try
			{
				eval(changePage_memory+"()");
				changePage_memory = '';
			}catch(e){}
		}
		MSG();
	}
	
	/* ------ 页面跳转驱动结束 ------ */
	
	/**
	 *	Json数据格式化（转为Object）
	 *	@param str 服务器返回的字符数据
	 *	返回 Object，其中Object.isObject表示是否标准JSON格式，Object.data为格式化后的数据
	 */
	function json_decode(str)
	{
		try
		{
			var data = eval("(" + str + ")");
			var isarray = true;
		}catch(e){
			var data = str;
			var isarray = false;
		}
		
		return {isObject:isarray,data:data};
	}
	
	/**
	 *	获取字符串的字节长度
	 *	@ param value 想获得长度的字符串
	 *	@ param isutf8	是否采用UTF8编码模式（1个汉字=3个字节）
	 *	@ return 字节长度
	 **/
	function strlen(value,isutf8)
	{
		var perChinese = isutf8==undefined ? 2 : 3;
		var matcher = value.match(/[^\u4e00-\u9fa5]/g);
		var numofEnglish = matcher==null ? 0 : matcher.length;
		var numofChinese = value.length-numofEnglish;
		return (numofEnglish+numofChinese*perChinese);
	}