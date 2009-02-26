	
	
	/**
	 *	D5Framework
	 *	Powered by D5Power Stuido
	 *	Author:Howard.Ren
	 *	
	 *	Javascript for drag dom object
	 *	ver 1.0
	 *	
	 *	example: onMouseDown="setDragTarget(target_id);allow();" onMouseUp="unallow('undo');"
	 */
	
	
	var w3c=(document.getElementById)? true: false;
	var agt=navigator.userAgent.toLowerCase();
	var allowDrag=false;
	var chax;
	var chay;
	var curX;
	var curY;
	var ie = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1) && (agt.indexOf("omniweb") == -1));
	var drag_target="";
	var startx;		// 记录初始为止，当位移变化不大时，不进行位置更新
	var starty;		// 记录初始为止，当位移变化不大时，不进行位置更新
	var min_move=5; // 移动精度
	
	/* ------ 拖动 ------ */
	
	function setDragTarget(src)
	{
		startx=parseInt(getid(src).style.left);
		starty=parseInt(getid(src).style.top);
		drag_target=src;
	}
	
	function IeTrueBody()
	{
		return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
	}
	
	function allow()
	{
		try{
			if(drag_target=="") return false;
		
			chax=parseInt(curX)-parseInt(getid(drag_target).style.left);
			chay=parseInt(curY)-parseInt(getid(drag_target).style.top);
			makeSelectStyle(getid(drag_target),true);
			allowDrag=true;
		}catch(e){}
		
	
	}
	function unallow(noAction)
	{
		try{
			// 更新图标位置
			var unallow_top=parseInt(getid(drag_target).style.top);
			var unallow_left=parseInt(getid(drag_target).style.left);
			var unallow_id=getid(drag_target).id
			allowDrag=false;
			makeSelectStyle(getid(drag_target),false);
			drag_target="";
		}catch(e){}
	}
	
	function unallow_ol(reg)
	{
		//alert(reg.responseText);
	}
	
	function makeSelectStyle(tar,mode)
	{
		return;
		if(mode)
		{
			tar.style.filter="alpha(opacity=60)";
			tar.style.opacity=0.6;		
		}else{
			tar.style.filter="alpha(opacity=100)";
			tar.style.opacity=1;			
		}
	}
	
	function getMousePos(e)
	{
		curX=(!ie)?e.pageX : event.clientX+IeTrueBody().scrollLeft;
		curY=(!ie)?e.pageY : event.clientY+IeTrueBody().scrollTop;
		
		/*
		if(allowDrag) 
		{
			tag=getid(drag_target);
			tag.style.left=(curX-chax)+"px";
			tag.style.top=(curY-chay)+"px";
		}
		*/
	}