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
	ob_start('ob_gzip');
	require_once("include/global.php");
	
	
	/* ---------- 载入模块及相关动作设置 ------------ */
	
	$module = empty($_GET['module']) ? "default" : $_GET['module'];
	if(!is_dir($config['sys']['module_home']."/".$module)) msg("($module) ".$lang['sys']['no_module'],$lang['sys']['error']);		# 检测模块是否存在
	
	$action = empty($_GET['action']) ? "index" : $_GET['action'];
	if(!file_exists($config['sys']['module_home']."/".$module."/".$action.".php")) msg("($action) ".$lang['sys']['no_action'],$lang['sys']['error']); # 检测对应驱动是否存在

	//$lang['test']='语言数组';
	//require_once('include/template.php');
	//$temp = new d5_template();
	//$temp->setTemplateDir(TEMPLATE_PATH.'/'.$module);//设置模板目录
	//$temp->setTemplatePath($action);//设置模板文件
	//$temp->setCacheDir(CACHE_PATH.'/'.$module);//设置缓存目录
	//$temp->setCachePath($action);//设置缓存文件
	//$temp->setLanguage($lang);//语言数组
	//include_once $temp->template();//模板编译到每个action里面用
	
	
	require_once(action_is_exists());
	ob_end_flush();
?>