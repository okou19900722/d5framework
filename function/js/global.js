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
	
	// 消息函数
	function MSG(msg)
	{
		htmlbody=(document.documentElement.clientHeight<=document.body.clientHeight&&document.documentElement.clientHeight!=0)?document.documentElement:document.body;
		scrollTop = (!window.innerHeight)?htmlbody.scrollTop:window.pageYOffset;
		
		
		if(msg!=undefined && msg!='')
		{
			getid('msgbox_shower').innerHTML=msg;
			getid('MSGbox').style.display='';
			getid('MSGbox').style.top=scrollTop+($(window).width()/4)+"px";
			getid('MSGbox').style.left=($(window).width()-$('#MSGbox').width())/2+"px";
		}else{
			getid('msgbox_shower').innerHTML='';
			getid('MSGbox').style.display='none';
		}
	}