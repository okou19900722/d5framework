// JavaScript Document
var wid=0;
var desktop;
var default_level=3;
var nowActiveWid=null;

var baseHTML = "<div class=\"window_left zwindow\"></div>";
baseHTML+= "<div class=\"window_top zwindow\" style='cursor:move'>";
	baseHTML+= "<a class=\"Window_title\"></a>";
		baseHTML+= "<a class=\"Window_close_btn\" onClick='windowClose()' title='关闭窗口'>×</a>";
	baseHTML+= "<a class=\"Window_max_btn\" onClick='windowMax(this)' title='最大化窗口'>□</a>";
baseHTML+= "</div>";
baseHTML+= "<div class=\"window_right zwindow\"></div>";
baseHTML+= "<div class=\"window_body zwindow\">";
	baseHTML+= "<iframe class='Window_context' frameborder=\"0\" scrolling=\"auto\" width=\"100%\" height=\"100%\"></iframe>";
baseHTML+= "</div>";
baseHTML+= "<div class=\"window_bleft zwindow\"></div>";
baseHTML+= "<div class=\"window_bottom zwindow\"></div>";
baseHTML+= "<div class=\"window_bright zwindow\"></div>";
baseHTML+= "<div class=\"div_clear\"></div>";

function D5Window(url,title,w,h,action)
{
	if(desktop==null)
	{
		desktop=getid('windowBox');
	}
	// 默认尺寸
	w = w==undefined ? 500 : w;
	h = h==undefined ? 300 : h;
	title = title==undefined ? '新窗口' : title;
	action = action==undefined ? 0 : parseInt(action);
	
	nowActiveWid = makeWindowsId(wid);
	
	var div=document.createElement("DIV");
	div.setAttribute("class","windowBox");
	div.setAttribute("id",nowActiveWid);
	div.style.left="50px";
	div.style.top="50px";
	div.style.zIndex=default_level;
	div.style.position="absolute";
	div.style.display = "none";
	div.setAttribute("action",action);
	div.onmousedown=function()
	{
		// 将窗口设置为最上层
		setAllWindowsLevel(default_level);
		nl=default_level+1;
		this.style.zIndex=nl;
		
		setDragTarget(this.id);
		allow();
		
		nowActiveWid = this.id;
		$(this).children('.window_body').children('.Window_context').css('display','none');
	}
	
	
	div.onmousemove=function()
	{
		if(allowDrag && getid(drag_target)==this) 
		{
			this.style.left=(curX-chax)+"px";
			this.style.top=(curY-chay)+"px";
		}
	}
	
	div.onmouseup=function()
	{
		unallow();
		$(this).children('.window_body').children('.Window_context').css('display','');
	}
	
	createBase(div);			// 将基本HTML信息插入创建好的窗口容器
	desktop.appendChild(div);	// 将创建好的容器加入主层中进行显示
	setWindowSize(div,w,h);		// 设置窗口尺寸
	
	// 动画效果
	switch(parseInt(div.getAttribute('action')))
	{
		case 1:
			$(div).fadeIn('normal');
			break;
		
		case 2:
			$(div).slideDown('normal');
			break;
		
		default:
			$(div).css('display','');
			break;
	}
	
	// 获得信息拦的窗口
	var bar=getElementByClass(div,'window_top')[0];
	
	getElementByClass(bar,'Window_title')[0].innerHTML=title;							// 设置标题
	getElementByClass(bar,'Window_max_btn')[0].setAttribute("boxid","window_box"+wid);	// 将当前窗口容器的ID记入最大/关闭按钮备用
	getElementByClass(bar,'Window_close_btn')[0].setAttribute("boxid","window_box"+wid);// 将当前窗口容器的ID记入最大/关闭按钮备用
	
	// 记录当前窗口尺寸
	getElementByClass(bar,'Window_max_btn')[0].setAttribute('old_width',w);				// 将当前窗口尺寸记入最大/按钮，供还原功能使用
	getElementByClass(bar,'Window_max_btn')[0].setAttribute('old_height',h);
	
	// 打开指定URL
	bar=getElementByClass(div,'window_body')[0];
	getElementByClass(bar,'Window_context')[0].src=url;
	
	wid++;
}

function createBase(target)
{
	target.innerHTML=baseHTML;
}

function setWindowSize(target,width,height)
{
	// target:window box
	
	if(parseInt(width)==0 || parseInt(height)==0)
	{
		alert('错误的窗口尺寸');
		return false;
	}
	
	target.style.width=width+'px';
	target.style.height=height+'px';
	
	setWindow(target);
	getElementByClass(target,"window_body")[0].style.height=height+"px";
}

function setAllWindowsLevel(value)
{
	for(i=0;i<wid;i++)
	{
		try
		{
			getid('window_box'+i).style.zIndex=value;
		}catch(e){}
	}
}

function windowMax(tar)
{
	windowbox=getid(tar.getAttribute('boxid'));
	
	isMax=tar.getAttribute('isMax');
	if(isMax==0 || isMax==undefined || isMax==null)
	{
		// 目前为正常状态，进行最大化操作
		
		tar.setAttribute("isMax",'1');
		windowbox.setAttribute('old_top',windowbox.style.top);
		windowbox.setAttribute('old_left',windowbox.style.left);
		windowbox.style.top='0px';
		windowbox.style.left='0px';
		
		
		// 获取屏幕有效尺寸
		var maxWidth = $.browser.msie ? window.screen.availWidth-20 : window.screen.availWidth;
		setWindowSize(windowbox,maxWidth,700);
		tar.innerHTML='_';
		tar.title='还原窗口';
	}else{
		// 目前为最大状态，进行还原操作
		
		tar.setAttribute("isMax",'0');
		ow=tar.getAttribute('old_width');	// 获取原来记录下来的默认尺寸
		oh=tar.getAttribute('old_height');
		windowbox.style.top=windowbox.getAttribute('old_top');
		windowbox.style.left=windowbox.getAttribute('old_left');
		setWindowSize(windowbox,ow,oh);
		tar.innerHTML='□';
		tar.title='最大化窗口';
	}
}

function windowClose()
{
	if(nowActiveWid==null) return;
	$(nowActiveWid).css('display','none');
	desktop.removeChild(getid(nowActiveWid));
	nowActiveWid=null;
}

function makeWindowsId(key)
{
	win_id = "window_box"+key;
	return win_id
}

function windowCloseAll()
{
	for(var i=0;i<wid;i++)
	{
		try{
			nowActiveWid = makeWindowsId(i);
			windowClose();
		}catch(e){}
	}
}