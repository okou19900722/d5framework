<?php

	/***********************************************
	 *
	 *	D5Framework
	 *	D5Power Studio
	 *	author:Benmouse		date:2007-10-14
	 *	Update:2008-06-10	Ver:1.0
	 *	第五动力工作室 - D5轻型开发框架
	 *	
	 *
	 **********************************************/
	 
	// 设置SESSION路径=============================================================
	
	function save_session_path()
	{
		session_save_path($GLOBALS['config']['sys']['save_session_path']);
	}
	
	// 密码加密函数================================================================
	
	function encrypt($pass)
	{
		return md5($pass);
	}
	 
	// 字符检测函数================================================================
	
	function CharTest($tester,$mod){
	   if($mod=="" || $mod==NULL || $mod==0){
		  #检测字符内容是否为空
		  
		  if($tester=="" || $tester==NULL){
			  return false;
		  }
		  
	   }else if($mod==1){
	   
		  #检测字符是否包含特殊字符
		  $errorChar=">|<|&";  #特殊字符的正则表达式
		  if(ereg($errorChar,$tester)==1 || $tester=="" || $tester==NULL){
			 return true;
		  }
		  
	   }else if($mod==2){
	   
		  #检测字符是否只包含数字
		  $errorChar="([0-9])";  #数字的正则表达式
		  if(ereg($errorChar,$tester)==1){
			 return false;
		  }else{
			 return true;
		  }
		  
	   }else{
		  #字符合法
		  return true;
		  
	   }
	   
	}
	
	
	#截取函数定义 ========================================
	function msubstr($str, $start, $len,$code='UTF-8')
	{
		if(strtolower($code)=='utf-8')
		{
			$pa = "/[\x01-\x7f]|[\xc2-\xdf][\x80-\xbf]|\xe0[\xa0-\xbf][\x80-\xbf]|[\xe1-\xef][\x80-\xbf][\x80-\xbf]|\xf0[\x90-\xbf][\x80-\xbf][\x80-\xbf]|[\xf1-\xf7][\x80-\xbf][\x80-\xbf][\x80-\xbf]/";
			preg_match_all($pa, $str, $tmpstr);
			if(count($tmpstr[0]) - $start > $len) return join('', array_slice($tmpstr[0], $start, $len))."...";
			return join('', array_slice($tmpstr[0], $start, $len));
		}else{
			$tmpstr = "";
			$strlen = $start + $len; 
			for($i = 0; $i < $strlen; $i++)
			{ 
				if(ord(substr($str, $i, 1)) > 0xa0)
				{ 
					$tmpstr .= substr($str, $i, 2); 
					$i++; 
				}else{
					$tmpstr .= substr($str, $i, 1); 
				}
			} 
			
			if(strlen($str)>$len && $sl=="")
			{
				return $tmpstr.".."; 
			}else{
				return $tmpstr;
			}
		}
	}
	
	#信息处理函数 =========================================
	function msg($msg,$msg_type='',$back="javascript:window.history.go(-1)")
	{
		if($msg_type=='') $msg_type=$GLOBALS['lang']['sys']['msg_default_title'];
		$mainpath="../";
		$path="../{$GLOBALS['config']['sys']['temp_path']}sys/{$GLOBALS['config']['sys']['temp']}/";
		require_once(makeTemp("error"));
		die();
	}
	
	#模块检测函数 =========================================
	
	function module_is_exists()
	{
		$_path="{$GLOBALS['config']['sys']['module_home']}/{$GLOBALS['module']}";
	
		if(is_dir($_path))
		{
			return $_path;
		}else{
			msg($GLOBALS['module'].$GLOBALS['lang']['sys']['no_module'],"ERROR");
		}
	}
	
	#驱动检测函数 =========================================
	
	function action_is_exists()
	{
		module_is_exists();
		$_path = "{$GLOBALS['config']['sys']['module_home']}/{$GLOBALS['module']}/{$GLOBALS['action']}.php";
		if(file_exists($_path))
		{
			return $_path;
		}else{
			msg($GLOBALS['action'].$GLOBALS['lang']['sys']['no_action'],"ERROR");
		}	
	}
	
	#后台管理驱动检测函数 =========================================
	
	function admin_action_is_exists()
	{
		$_path = "admin/{$GLOBALS['action']}.php";
		if(file_exists($_path))
		{
			return $_path;
		}else{
			msg($GLOBALS['action'].$GLOBALS['lang']['sys']['no_action'],"ERROR");
		}	
	}
	
	#首页内容驱动检测函数 ==================================
	
	function home_driver_is_exists($driver)
	{
		$_path="{$GLOBALS['config']['sys']['module_home']}/{$driver}";
		
		if(file_exists($_path))
		{
			return $_path;
		}else{
			msg($driver.$GLOBALS['lang']['sys']['no_home_driver'],"ERROR");
		}
	}
	
	
	#主文件生成函数 =======================================
	
	function makeTemp($fname="index",$ftype=0)
	{
		switch($ftype)
		{
			case 0:
			
				// 首页
				$path="{$GLOBALS['template']}/{$fname}.html";
				break;
				
			case 1:
				
				// 后台
				$path="templates/system/admin/{$fname}.html";
				break;
			case 2:
			
				break;
				
			case 3:
				
				// 用户面版
				$path="templates/system/member_admin/{$fname}.html";
				break;
				
			default:
				
				break;
		}
		
		if(file_exists($path))
		{
			return $path;
		}else{
			msg($fname.$GLOBALS['lang']['sys']['no_template'],"ERROR");
		}
	}
	//翻页函数 ======================================
	function pageinfo($allnum,$fun="",$per=0,$var=array("page","ten"),$level=0,$everytime=10)
	{
	
		//参数说明：$allnum 总共多少条记录 $fun AJAX调用 $per 每页显示多少条记录
		//参数说明：$level 显示级别 0 显示上十页下十页 1 在0的基础上显示上一页下一页 2 在1的基础上显示跳转 3 在2的基础上显示统计信息
		//参数说明：$everytime 每次显示多少页
	
		$lang['all']="共";
		$lang['pic']="页";
		$lang['prv']="上一页";
		$lang['nex']="下一页";
		$lang['jump']="跳转";
		
		//定义标志变量
		$page_var=$var[0];
		$ten_var=$var[1];
		
		if($per==0) $per=$GLOBALS['config']['page']['default'];
		$page=empty($_GET[$page_var]) ? 1 : $_GET[$page_var];
		$_GET[$ten_var]=empty($_GET[$ten_var]) ? (ceil($page/$everytime)-1) : intval($_GET[$ten_var]);
		$ten=$_GET[$ten_var] < 0 ? 0 : $_GET[$ten_var];
		if($ten>0 && $page==1) $page=$ten*$everytime+1;
		$allpage=ceil($allnum/$per);
	
		if($allpage<=1) return;
		
		$pageinfo="<div id='pageinfo'>";
		//计算起始页
		
		if($allpage<($page+$everytime))
		{
			$startPage=$allpage-$everytime+1;
		}else{
			$startPage=$page;
		}
		
		foreach($_GET as $key=>$value)
		{
			if($key!="{$page_var}" && $key!="{$ten_var}")
			{
				if(!empty($value)) $getinfo.="{$key}={$value}&";
			}
		}
		
		//fun定义
		if($fun=="") $fun="d5_ajax_loadpage";
		
		if($level>=3) $pageinfo.="{$lang['all']}{$allpage}{$lang['pic']}";
		if($level>=1)
		{
			if($page>1)
			{
				$pageinfo.="<a href='#' onclick=\"{$fun}('{$getinfo}{$page_var}=".($page-1)."&{$ten_var}={$ten}');return false;\">{$lang['prv']}</a>";
			}else{
				$pageinfo.="<a>{$lang['prv']}</a>";
			}
		}
	
		if($level>=0)
		{
			if($ten>0)
			{
				$pageinfo.="<a href='#' onclick=\"{$fun}('{$getinfo}{$page_var}=".(($ten-1)*$everytime+1)."&{$ten_var}=".($ten-1)."');return false;\"><<</a>";
			}else if($page>1 && $ten==0 && $level==0){
				//当不超过10页的时候，上10页相当与上翻
				$pageinfo.="<a href='#' onclick=\"{$fun}('{$getinfo}{$page_var}=".($page-1)."&{$ten_var}={$ten}')\"><<</a>";
			}else{
				//$pageinfo.="<a><<</a>";
			}
		}
		for($i=0;$i<$everytime;$i++)
		{
			$thispage=$startPage+$i;
			if($thispage<=0) continue;
			if($thispage==$page)
			{
				$pageinfo.="<a class='selected'>{$thispage}</a>";
			}else{
				$pageinfo.="<a href='#' onclick=\"{$fun}('{$getinfo}{$page_var}={$thispage}&{$ten_var}={$ten}');return false;\">{$thispage}</a>";
			}
		}
	
		if($level>=0)
		{
			if(($ten+2)*$per>$allpage)
			{
				//$pageinfo.="<a>>></a>";
			}else{
				$pageinfo.="<a href='#' onclick=\"{$fun}('{$getinfo}{$page_var}=".(($ten+1)*$everytime+1)."&{$ten_var}=".($ten+1)."');return false;\">>></a>";
			}
			
		}
		
		
		if($level>=1)
		{
			if($page<$allpage)
			{
				$pageinfo.="<a href='#' onclick=\"{$fun}('{$getinfo}{$page_var}=".($page+1)."&{$ten_var}={$ten}');return false;\">{$lang['nex']}</a>";
			}else{
				$pageinfo.="<a>{$lang['nex']}</a>";
			}
		}
		
		
		if($level>=2) $pageinfo.="
			<input name=\"textfield\" type=\"text\" size=\"3\" id=\"jumpkey\" style=\"border-bottom: 1px solid #CCCCCC; border-left: 1px solid #FFFFFF; border-right: 1px solid #FFFFFF; border-top: 1px solid #FFFFFF\" />
			<span style='cursor:hand;' onclick=\"window.location='{$_SERVER['PHP_SELF']}?{$getinfo}&{$page_var}='+document.getElementById('jumpkey').value\">{$lang['jump']}</span>	
		";
		
		//最简模式
		
		if($level<0)
		{
			$pageinfo="<div id='pageinfo'>";
			if($page>1)
			{
				$pageinfo.="<a href='#' onclick=\"{$fun}('{$getinfo}{$page_var}=".($page_var-1)."')\"><<</a>";
			}else{
				$pageinfo.="<a><<</a>";
			}
			if($page<$allpage)
			{
				$pageinfo.="<a href='#' onclick=\"{$fun}('{$getinfo}{$page_var}=".($page_var+1)."')\">>></a>";
			}else{
				$pageinfo.="<a>>></a>";
			}
		}
		$pageinfo.="</div>";
		if($fun=="d5_ajax_loadpage")
		{
			$pageinfo.="
			<script language='javascript'>
			function d5_ajax_loadpage(sendvar)
			{
				window.location='{$_SERVER['PHP_SELF']}?'+sendvar;
				return false;
			}
			</script>
			";
		}
		
		return $pageinfo;
	}
	
	//是否当前页面函数 ======================================
	function isme($myhttp)
	{
		$http=explode("/",$_SERVER['PHP_SELF']);
		$count=count($http);
		$http="../".$http[($count-2)]."/".$http[($count-1)].getGet();
		if($myhttp==$http)
		{
			return true;
		}else{
			return false;
		}
	}
	
	function getGet()
	{
		if(!empty($_GET))$getinfo="?";
		foreach($_GET as $key=>$value)
		{
			$getinfo.=$key."=".$value."&";
		}
		$getinfo=substr($getinfo,0,strlen($getinfo)-1);
		return $getinfo;
	}
	
	//是否登陆判断 =========================================
	function islogin($type="member")
	{
		switch($type)
		{
			case "member":
				if(empty($_SESSION['member']))
				{
					return false;
				}else{
					return true;
				}
				break;
			case "admin":
			default: break;
		}
	}

	//删除文件夹函数=========================================
	
	function delDir($mydir,$del_dir=true)
	{
		$d = dir($mydir);
		$i = 0;
		if(is_dir($mydir))
		{
			while (false !==($obj = $d->read()))
			{
				if ($obj =='.' || $obj=='..')
				{
				  continue;
				}
		
				$tmp_dir = $mydir.'/'.$obj;
		
				if (!is_dir($tmp_dir))
				{
		
					unlink($tmp_dir);
				}
			
				$i++;
		
			}
			
			if($del_dir)
			{
				$result=rmdir($mydir);
			}else{
				$result=true;
			}			
		}else{
			$result=false;
		}
		$d->close();
		return $result;
	}
	
	//二级域名判断
	function myDomain()
	{
		$host=explode(".",$_SERVER['HTTP_HOST']);		//主机支持泛域名解析
		$host=$host[0];
			
		$url=explode(".",$_SERVER['HTTP_REFERER']);		//主机不支持泛域名解析，采用URL转发
		$url=$url[0];
		$url=str_replace("http://","",$url);
		
		$username=($host=="www") ? $url : $host;				//取得关键字
		return $username;
	}
	
	//HTML语法剔除函数===============================================================
	function HTMLcut($tester){
	   $tester=str_replace("<","",$tester);
	   $tester=str_replace(">","",$tester);
	   $tester=str_replace("&","",$tester);
	   $tester=str_replace("\"","",$tester);
	   return $tester;
	}
	
	//取得MYSQL版本号
	function get_db_ver()
	{
		$_=new db_mouse;
		$db_ver=$_->db_select("select version()");
		$db_ver=floatval(substr($db_ver['version()'],0,3));										//取得MYSQL版本号
		return $db_ver;
	}
	
	//目录读取函数
	function loadDir($mydir,$arr=array("swf","gif","jpg"))
	{
		$d = dir($mydir);
		$i = 0;
		while (false !==($obj = $d->read()))
		{
			if ($obj =='.' || $obj=='..')  continue;
			$tmp_dir = $mydir.'/'.$obj;
	
			if (!is_dir($tmp_dir))
			{
				foreach($arr as $value)
				{
					if(strtolower(substr($obj,-3))==$value)
					{
						$filelist[$i]=$obj;
						break;
					}
				}
			}
				$i++;
	
		}
	
		$d->close();
		return $filelist;
	}
	
	// 获得扩展名函数
	
	function get_extname($fname)
	{
		$temp=explode(".",$fname);
		$where=count($temp)-1;
		return $temp[$where];
	}
	
	// 获得纯粹文件名（不含扩展名）
	
	function get_truename($fname)
	{
		$temp=explode(".",$fname);
		
		for($i=0;$i<count($temp)-1;$i++)
		{	
			$where.=$temp[$i];
			if($i!=count($temp)-2) $where.=".";
		}
		return $where;
	}
	
	// 生成缩略图及图象格式转换函数
	// @source 来源文件 @target 目标文件 @width 宽度 @height 高度 @format 转换格式
	// 若按某一特定尺寸（固定高/固定宽）请将另外一个置0
	function D5imger($source,$target,$change_size=false,$width=0,$height=0,$format="jpg")
	{
		// 转换为小写
		// $source=strtolower($source);
		// 获得扩展名
		$ext_name=get_extname($source);
		switch($ext_name)
		{
			case "jpg":
			case "jpeg":
				$temp_img=imagecreatefromjpeg($source);
				break;
			case "png":
				$temp_img=imagecreatefrompng($source);
				break;
			case "gif":
				$temp_img=imagecreatefromgif($source);
				break;
			default:$ext_name_error=true;break;
		}
		
		if($ext_name_error) return false;
		
		$old_width=imagesx($temp_img);
		$old_height=imagesy($temp_img);

		// 缩略图
		if($change_size)
		{
			// 指定宽/高
			if($width==0 && $height>0)
			{
				// 指定高
				$width = $old_width/$old_height*height;
			}else if($height==0 && $width>0){
				// 指定宽
				$height = $width/($old_width/$old_height);
			}else{
				
				// 计算比例
				$source_ratio=$old_width/$old_height;
				$target_ratio=$width/$height;
				
				// 假定高度不变，计算宽度
				$temp_width=$old_height*$target_ratio;
				
				if($temp_width<=$old_width){
					// 宽度未超出范围，高度优先
					$old_width  = $old_height*$target_ratio;
					$old_height = $old_height;
				}else{
					// 宽度超出范围，以宽度优先
					$old_width  = $old_width;
					$old_height = $old_width/$target_ratio;
				}
				
			}
		}else{
			// 不生成缩略图
			$width=$old_width;
			$height=$old_height;
		}
		// die($old_width.":".$old_height."+".$width.":".$height."+".$source_ratio.":".$target_ratio);
		// 创建新的图象
		$new_img = imagecreatetruecolor($width,$height);
		imagecopyresampled($new_img,$temp_img,0,0,0,0,$width,$height,$old_width,$old_height);
		
		$target_ext_name=get_extname(strtolower($target));
		
		switch($ext_name)
		{
			case "jpg":
			case "jpeg":
				imagejpeg($new_img,$target);
				break;
			case "png":
				imagepng($new_img,$target);
				break;
			case "gif":
				imagegif($new_img,$target);
				break;
			default:$ext_name_error=true;break;
		}
		
	}
	
	// 根据给定图片和一个固定尺寸，按照比例进行缩放，获得新的图片尺寸
	function getCubeImg($img,$default_size)
	{
		if(!file_exists($img))
		{
			$result = array(
				"w"		=>	0,
				"h"		=>	0,
			);
		}else{
			$img_size=@getimagesize($img);
			if($img_size[0]>$img_size[1])
			{
				$img_width=$default_size;
				$img_height = ceil($img_width/($img_size[0]/$img_size[1]));
			}else if($img_size[0]<$img_size[1]){
				$img_height=$default_size;
				$img_width=ceil($img_height*($img_size[0]/$img_size[1]));
			}else{
				$img_width=$default_size;
				$img_height=$default_size;
			}
			
			$result = array(
				"w"		=>	$img_width,
				"h"		=>	$img_height,
			);
		}
		return $result;
	}
	
	// 检查文件夹是否存在，如果不存在，则创建
	function is_mkdir($path)
	{
		if(!is_dir($path))
		{
			return mkdir($path);
		}else{
			return true;
		}
	}
	
	// 静态页面生成函数
	function buildPage($module,$action,$var='',$save_name='',$save_path='')
	{
		global $config;
		global $lang;
		
		// 若save_name为空，则以action为缓存文件名
		$save_name = $save_name=="" ? "{$action}.html" : $save_name;
		// 判断保存路径
		if($save_path=="")
		{
			if(!is_mkdir("{$config['cache']['box']}/{$module}/")) msg("{$lang['sys']['can_not_create_folder']}{$config['cache']['box']}/{$module}/");
			$save_path = "{$config['cache']['box']}/{$module}/";
		}else{
			if(!is_dir($save_path)) msg("{$lang['sys']['no_folder']}{$save_path}");
		}
		
		$save_path = substr($save_path,-1,1)!="/" ? $save_path."/" : $save_path;
		$target_name= $save_path.$save_name;

		if(file_exists($target_name)) unlink($target_name) or msg("{$lang['sys']['can_not_overwrite']}{$target_name}");
		
		$f=file_get_contents("{$config['sys']['myhome']}index.php?module={$module}&action={$action}&buildPage=1&{$var}") or msg("{$lang['sys']['can_not_load_cache_source']}({$config['sys']['module_home']}/{$module}/{$action}.php");
		fwrite(fopen($target_name,"w"),$f) or msg("{$lang['sys']['can_not_overwrite']}{$target_name}");
		
		// 载入缓存
		require_once($target_name);
		die();
	}
	
	// 检查缓存是否存在
	function checkCache($module='',$action='',$target='')
	{
		global $config;
		if($module=='' && $action=='' && $target=='') return false;
		
		$target = $target=='' ? "{$config['cache']['box']}/{$module}/{$action}.html" : $target;
		
		// 当文件存在，或buildPage标记为1时，返回真（不需要刷新换存）
		$result = file_exists($target) || intval($_GET['buildPage'])==1;
		return $result;
	}
	
	// 两者取一(You or Me)
	function yom($y,$m)
	{
		$y = empty($y) ? $m : $y;
		return $y;
	}
?>