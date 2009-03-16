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
	require_once("include/d5db.php");
	require_once("include/function.php");
	require_once("include/D5F.php");
	require_once("include/webconfig.php");
	require_once("include/webglobal.php");
	require_once("include/webfunction.php");
	
	# 驱动文件包含 =================================================
	

	
	# 语言包包含 ================================================
	
	require_once("language/{$config['sys']['lang']}/language.php");
	
	# 时区设置 =================================================
	date_default_timezone_set($config['sys']['time_area']);
	
	# 系统相关设置 ================================================
	
	//error_reporting("E_ALL ^ E_NOTICE");                      																		# 错误报告模式
	//error_reporting("E_ALL");

	header("Content-Type: text/html; charset={$config['sys']['encode']}");
	$template = "templates/{$GLOBALS['config']['sys']['template']}";

	# SESSION设置 ================================================
	
	session_name($config['sys']['session_name']);			// 设置session名
	save_session_path();									// 设置session保存目录
	session_start();
	
	# 其他处理 ================================================ 
	
	# SUBMIT处理模式 ===========================================
	
	$mode=empty($_POST['mode']) ? $_GET['mode'] : $_POST['mode'];

	// 分页设置 ================================================
	$_GET['page'] = empty($_GET['page']) ? $_POST['page'] : $_GET['page'] ;
	$_GET['page'] = empty($_GET['page']) ? 1 : intval($_GET['page']);	
	$page = $_GET['page'];	
	$nowrecord = ($_GET['page']-1)*$config['page']['default'];
	
	// GD支持 =================================================
	$useGD=function_exists('imagecreate');
?>