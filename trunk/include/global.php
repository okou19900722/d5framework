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

	# 系统文件包含 ================================================= 
	
	require_once("include/config.php");
	require_once("include/d5_db.php");
	require_once("include/function.php");
	require_once("include/webfunction.php");
	
	# 驱动文件包含 =================================================
	

	
	# 语言包包含 ================================================
	
	require_once("language/{$config['sys']['lang']}/language.php");
	
	# 系统相关设置 ================================================
	
	//error_reporting("E_ALL ^ E_NOTICE");                      																		# 错误报告模式
	//error_reporting("E_ALL");

	header("Content-Type: text/html; charset={$config['sys']['encode']}");
	$template = "templates/{$GLOBALS['config']['sys']['template']}";
	
	// 载入模块及相关动作设置
	
	$module = empty($_GET['module']) ? "default" : $_GET['module'];
	if(!is_dir($config['sys']['module_home']."/".$module) && $module!="admin") msg("($module) ".$lang['sys']['no_module'],$lang['sys']['error']);		# 检测模块是否存在
	
	$action = empty($_GET['action']) ? "index" : $_GET['action'];
	if($module=="admin")
	{
		// 如果模块为admin，则直接加载管理目录中的文件驱动
		if(!file_exists($module."/".$action.".php")) msg("($action) ".$lang['sys']['no_action'],$lang['sys']['error']); # 检测对应驱动是否存在
	}else{
		if(!file_exists($config['sys']['module_home']."/".$module."/".$action.".php")) msg("($action) ".$lang['sys']['no_action'],$lang['sys']['error']); # 检测对应驱动是否存在
	}
	
	# SESSION设置 ================================================
	
	session_name($config['sys']['session_name']);			// 设置session名
	save_session_path();									// 设置session保存目录
	session_start();
	
	# 其他处理 ================================================ 
	
	# SUBMIT处理模式 ===========================================
	
	$mode=empty($_POST['mode']) ? $_GET['mode'] : $_POST['mode'];
	
	# 连接数据库 ================================================

	$connect = @mysql_connect($config['db']['hostname'],$config['db']['username'],$config['db']['password']) or msg($lang['sys']['db_cannot_conn'].$lang['sys']['EL'].__LINE__);
	mysql_select_db($config['db']['dbname'],$connect) or msg($lang['sys']['db_cannot_select'].$lang['sys']['EL'].__LINE__);

	// 分页设置 ================================================
	$_GET['page'] = empty($_GET['page']) ? $_POST['page'] : $_GET['page'] ;
	$_GET['page'] = empty($_GET['page']) ? 1 : intval($_GET['page']);	
	$page = $_GET['page'];	
	$nowrecord = ($_GET['page']-1)*$config['page']['default'];
	
	// GD支持 =================================================
	$useGD=function_exists('imagecreate');
?>