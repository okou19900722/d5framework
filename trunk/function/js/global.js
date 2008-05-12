	/***********************************************
	 *
	 *				D5Power Studio PAILA system Ver 1.0
	 *
	 *				author:Benmouse		date:2007-10-14
	 *
	 *
	 **********************************************/
	
	// JavaScript Document
	function loading(target)
	{
		
	}
	
	function nullLoading()
	{
		
	}
	
	function getid(id)
	{
		return document.getElementById(id);
	}
	
	// 复制到剪刀切版
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
