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

function colorMacker(target,fun,param)
{
	/* ---- Base information config ----*/
	var result="";
	fun = fun==undefined ? "alert" : fun;			// If 'fun' was not be set,give function alert to it
	
	/* ---- Style config ---- */
	var perRow=6;									// How many color point will show in one line
	var line=36;									// How many line will show in box
	var block_size=8;								// Color point size
	var box_size=block_size*perRow+perRow+3;		// Color Box (The container for color point) size
	var margin_box=2;								// Margin between every tow color box
	var margin_block=1;								// Margin between every tow color point
	
	var showRow=3;									// How many color box will show in one line
	
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
					runner=fun+"('"+now_color+"')";
				else
					runner=fun+"('"+now_color+"','"+param+"')";
			}
			result+= "<div onMouseover=\"showBorder(this)\" style=\'width:"+block_size+"px;height:"+block_size+"px;overflow:hidden;margin-left:"+margin_block+"px;margin-top:"+margin_block+"px;float:left;background:#"+now_color+"' onMouseout=\"hiddenBorder(this)\" onclick=\""+runner+"\"></div>";
		}
		if((i+1)%6==0) result+= "</div>";
	}
	
	target.innerHTML=result;
	
	/* ---- Auto set target container's style ----- */
	target.style.width=((block_size+margin_block)*perRow+margin_box+1)*showRow+"px";
	target.style.height=((block_size+margin_block)*perRow+margin_box+1)*line/perRow/showRow+"px";
	target.style.background='#000';
	target.style.border='solid 2px #000';
	target.style.position="absolute";
	target.style.cursor='crosshair';
	target.style.display='';
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