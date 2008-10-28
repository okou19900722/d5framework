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
	 
	require_once("include/global.php");
	
	
	/* ---------- 载入模块及相关动作设置 ------------ */
	
	$module = empty($_GET['module']) ? "default" : $_GET['module'];
	if(!is_dir($config['sys']['module_home']."/".$module)) msg("($module) ".$lang['sys']['no_module'],$lang['sys']['error']);		# 检测模块是否存在
	
	$action = empty($_GET['action']) ? "index" : $_GET['action'];
	if(!file_exists($config['sys']['module_home']."/".$module."/".$action.".php")) msg("($action) ".$lang['sys']['no_action'],$lang['sys']['error']); # 检测对应驱动是否存在
	
	require_once(action_is_exists());
	
?>