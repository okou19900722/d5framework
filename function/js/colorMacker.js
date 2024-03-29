/************************************************/
/*												*/
/*		D5Power Studio Color Macker				*/
/*		Powered by:D5power Studio				*/
/*		Programe:D5.Benmouse					*/
/*		Version:1.0								*/
/*												*/
/*												*/
/************************************************/

/**
 *	主函数colorMacker
 *	参数：	target	-	用来生成颜色选取器的容器
 *			fun		-	当点选颜色时出发的函数
 *			param	-	触发函数所需要的其他参数
 *	说明：
 *			触发函数至少要有一个参数（必须是第一个参数），此参数用来传递颜色的数值
 */
 
var step=33;
var colorMackerBox;

function colorMacker(target,fun,param)
{
	/* ---- Base information config ----*/
	var result="";
	var target_name = target.id;
	fun = fun==undefined ? "alert" : fun;			// If 'fun' was not be set,give function alert to it
	
	/* ---- Style config ---- */
	var perRow=6;									// How many color point will show in one line
	var line=36;									// How many line will show in box
	var block_size=8;								// Color point size
	var box_size=block_size*perRow+perRow+3;		// Color Box (The container for color point) size
	var margin_box=2;								// Margin between every tow color box
	var margin_block=1;								// Margin between every tow color point
	
	var showRow=3;									// How many color box will show in one line
	var clickOk = param==undefined ? "callBack('"+fun+"')" : "callBack('"+fun+"','"+param+"')" ;
	if(getid('colorBox_bar') !=null){
		var colorBox_bar =getid('colorBox_bar');
		colorBox_bar.parentNode.style.display = 'none';
		colorBox_bar.parentNode.innerHTML = '';
	}
	// 生成选项框
	var result = "<div id='colorBox_bar' style='cursor:default;height:20px;line-height:20px;background:#999;overflow:hidden'>";
	result+= "<div id='colorBox_color' style='float:left;font-size:0px;margin-left:2px;width:18px;height:18px;line-height:18px;border:solid 1px;margin-top:2px;'></div>";
	result+= "<input type='text' id='colorBox_shower' onkeyup='showInputColor()' style='width:60px;margin-top:1px;border:solid 1px #333;margin-left:2px;float:left'/>";
	result+= "<input type='button' style='width:30px;margin-top:1px;height:18px;border:solid 1px #333;margin-left:2px;background:#fff;font-size:10px;float:left' value='OK' onclick=\""+clickOk+"\" />";
	result+= "<div style='float:right;border:solid 1px;border-left:#FFF;border-top:#FFF;background:#ddd;margin-top:2px;width:15px;height:15px'><img style='margin:2px;cursor:pointer' onclick=\"hiddenCorlorBox('"+target_name+"');\" src='function/js/colorMacker_none.gif'></div>";
	result+= "</div>";
	
	for(i=0;i<line;i++)
	{
		if(i%perRow==0) result+= "<div style='float:left;width:"+box_size+"px;font-size:0px;margin-top:"+margin_box+"px'>";
		for(m=0;m<perRow;m++)
		{
			now_color=getColor(((i*perRow)+m)*step);
			if(fun=="alert")
			{
				runner="alert('"+now_color+"')";
			}else{
				if(param==undefined)
					runner=fun+"('#"+now_color+"')";
				else
					runner=fun+"('#"+now_color+"','"+param+"')";
			}
			result+= "<div onMouseover=\"showBorder(this)\" style=\'width:"+block_size+"px;height:"+block_size+"px;overflow:hidden;margin-left:"+margin_block+"px;margin-top:"+margin_block+"px;float:left;background:#"+now_color+"' onMouseout=\"hiddenBorder(this)\" value=\""+now_color+"\" onclick=\""+runner+"\"></div>";
		}
		if((i+1)%6==0) result+= "</div>";
	}
	
	target.innerHTML=result;
	
	/* ---- Auto set target container's style ----- */
	target.style.width=((block_size+margin_block)*perRow+margin_box+1)*showRow+"px";
	target.style.height=((block_size+margin_block)*perRow+margin_box+1)*line/perRow/showRow+parseInt(getid('colorBox_bar').style.height)+"px";
	target.style.background='#000';
	target.style.border='solid 2px #000';
	target.style.position="absolute";
	target.style.cursor='crosshair';
	target.style.display='';
	
	getid('colorBox_bar').style.width = (parseInt(target.style.width)-margin_block*2)+"px";
	
	colorMackerBox = target;
}

// 颜色值输入框的回叫函数
function callBack(fun,param)
{
	if(getid('colorBox_shower').value=='')
	{
		colorMackerBox.style.display='none';
		return;
	}
	
	var value = getid('colorBox_shower').value;
	if(value.substr(0,1)=='#')
	{
		alert('不需要输入#');
		return;
	}
	runner= param==undefined ? fun+"('#"+value+"')" : fun+"('#"+value+"','"+param+"')";
	eval(runner);
}

// 显示输入的颜色
function showInputColor()
{
	try
	{
		getid('colorBox_color').style.background = '#'+getid('colorBox_shower').value;
	}catch(e){}
}
/**
 *	根据数值获取颜色
 *	参数：	_33	-	例：33，66，99，....
 */
function getColor(_33)
{
	// 先计算是第几行
	row=_33/step;
	
	
	one=row%6;
	ten=parseInt(row/6);
	han=parseInt(ten/6);

	result =get16x(han);
	
	ten=ten>=6 ? ten%6 : ten;
	result+=get16x(ten);
	
	result+=get16x(one);

	return result;
}

/**
 *	计算步频内的16位颜色
 *	参数：	_33	-	例：33，66，99，....
 */
function get16x(value)
{
	switch(value)
	{
		case 0:
			result="00";
			break;
		case 1:
			result="33";
			break;
		case 2:
			result="66";
			break;
		case 3:
			result="99";
			break;
		case 4:
			result="CC";
			break;
		case 5:
			result="FF";
			break;
		default:break;	
	}
	
	return result;
}

	/* ------ 子函数 设置目前鼠标经过的color point边框 ------ */
	
	function showBorder(tar)
	{
		w=parseInt(tar.style.width);
		nw=w-2;
		tar.style.width=nw+"px";
		tar.style.height=nw+"px";
		tar.style.border="solid 1px #FFF";
		
		getid('colorBox_shower').value = tar.getAttribute('value');
		getid('colorBox_color').style.background = '#'+tar.getAttribute('value');
	}
	
	/* ------ 子函数 取消目前鼠标经过的color point边框 ------ */
	function hiddenBorder(tar)
	{
		w=parseInt(tar.style.width);
		nw=w+2;
		
		tar.style.width=nw+"px";
		tar.style.height=nw+"px";
		tar.style.border='none';
	}
	
	function hiddenCorlorBox(obj){
		obj = getid(obj);
		obj.style.display ='none';
	}