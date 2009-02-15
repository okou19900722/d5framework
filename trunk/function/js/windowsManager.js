// JavaScript Document
var wid=0;
var desktop;
var default_level=3;


var baseHTML = "<div class=\"window_left\"></div>";
baseHTML+= "<div class=\"window_top\">";
	baseHTML+= "<a class=\"Window_title\"></a>";
		baseHTML+= "<a class=\"Window_close_btn\" onClick='windowClose(this)'>×</a>";
	baseHTML+= "<a class=\"Window_max_btn\" onClick='windowMax(this)'>□</a>";
baseHTML+= "</div>";
baseHTML+= "<div class=\"window_right\"></div>";
baseHTML+= "<div class=\"window_body\">";
	baseHTML+= "<iframe class='Window_context' frameborder=\"0\" scrolling=\"auto\" width=\"100%\" height=\"100%\"></iframe>";
baseHTML+= "</div>";
baseHTML+= "<div class=\"window_bleft\"></div>";
baseHTML+= "<div class=\"window_bottom\"></div>";
baseHTML+= "<div class=\"window_bright\"></div>";
baseHTML+= "<div class=\"div_clear\"></div>";

function D5Window(title,w,h,url)
{
	if(desktop==null)
	{
		desktop=getid('windowBox');
	}
	// 默认尺寸
	w=w==undefined ? 780 : w;
	h=h==undefined ? 400 : h;
	
	var div=document.createElement("DIV");
	div.setAttribute("class","windowBox");
	div.setAttribute("id","window_box"+wid);
	div.style.left="50px";
	div.style.top="50px";
	div.style.zIndex=default_level;
	div.style.position="absolute";
	div.onmousedown=function()
	{
		// 将窗口设置为最上层
		setAllWindowsLevel(default_level);
		nl=default_level+1;
		this.style.zIndex=nl;
		
		setDragTarget(this.id);
		allow();
	}
	createBase(div);			// 将基本HTML信息插入创建好的窗口容器
	desktop.appendChild(div);	// 将创建好的容器加入主层中进行显示
	setWindowSize(div,w,h);		// 设置窗口尺寸
	
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
	
	var bar=getElementByClass(windowbox,'window_top')[0];

	
	isMax=getElementByClass(bar,'Window_max_btn')[0].getAttribute('isMax');
	if(isMax==0 || isMax==undefined || isMax==null)
	{
		// 目前为正常状态，进行最大化操作
		
		getElementByClass(bar,'Window_max_btn')[0].setAttribute("isMax",'1');
		setWindowSize(windowbox,1024,768);
		getElementByClass(bar,'Window_max_btn')[0].innerHTML='_';
		
	}else{
		// 目前为最大状态，进行还原操作
		
		getElementByClass(bar,'Window_max_btn')[0].setAttribute("isMax",'0');
		ow=getElementByClass(bar,'Window_max_btn')[0].getAttribute('old_width');	// 获取原来记录下来的默认尺寸
		oh=getElementByClass(bar,'Window_max_btn')[0].getAttribute('old_height');
		setWindowSize(windowbox,ow,oh);
		getElementByClass(bar,'Window_max_btn')[0].innerHTML='□';
	}
}

function windowClose(tar)
{
	windowbox=getid(tar.getAttribute('boxid'));
	desktop.removeChild(windowbox);
}
