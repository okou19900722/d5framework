// JavaScript Document
// D5Power Stuido Ajax class By D5.Benmouse
// www.d5power.com www.pai.la
function getRequest()
{
	try
	{
		if(window.XMLHttpRequest)
		{
			return new XMLHttpRequest;
		}else if(window.ActiveXObject)
		{
			try
			{
				return new window.ActiveXObject("Microsoft.XMLHTTP");
			}catch(e){
				try
				{
					return new window.ActiveXobject("Msxml2.XMLHTTP");
				}catch(e){
					return false
				}
			}
		}
	}catch(e){
		return false;
	}

}


function Ajax(fu,loading)
{
	var reg=getRequest();
	
	if(loading==undefined) loading="";
	
	reg.onreadystatechange=function()
	{
		switch(reg.readyState)
		{
			case 0:
				loading;
				break;
				
			case 1:
				
				break;
				
			case 2:

				break;
				
			case 3:
				
				break;
				
			case 4:
				
				if(reg.status==200)
				{
					fu(reg);
				}else{
					alert("AJAX连接失败！");
				}
				break;
				
			default:break;
		}
	}
	
	Ajax.prototype.sendVar=function(url,sends,method)
	{
		switch(method)
		{
			case "GET":
				reg.open("GET",url+"?"+sends,true); 
				reg.send(null);
				break;
			case "POST":
			
				reg.open("POST",url,true);
				reg.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				reg.setRequestHeader("Content-Length",sends.length);
				reg.setRequestHeader("connection","close");
				reg.send(sends);
				break;
			default: break;
		}
	}
	
	Ajax.prototype.getVar=function()
	{
		return reg.responseText;
	}
}