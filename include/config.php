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
	
	$config['db']=array(
	
		"hostname"		=>		"localhost",									# 主机地址
		"username"		=>		"root",											# 主机用户名
		"password"		=>		"root",												# 登陆密码
		"dbname"		=>		"test",											# 数据库名
		"encode"		=>		"utf-8"											# 编码方式
		
	);
	
	$config['sys']=array(
	
		"module_home"		=>		"modules",								# 模块仓库
		"save_session_path" =>		"session",   							# session保存目录
		"session_name"		=>		"paila",								# session名
		
		"myhome"			=>		"http://127.0.0.1/d5framework/",					# 主页地址
		"small_format"		=>		".gif",									# 全站缩略图生成格式
		
		"template"			=>		"default",								# 模版名
		
		"encode"			=>		"utf-8",								# 前台编码
		"lang"				=>		"chinese",								# 前台语言
		"time_format"		=>		"Y-m-d H:i:s",							# 日期格式
		"date_format"		=>		"Y-m-d",								# 日期格式
		
		"name"				=>		"D5Framework",							# 标题
		"ver"				=>		"1.0",									# 版本
	);
		
	$config['page'] = array(
		"default"			=>		"10",									# 列表显示数量
	);
	
	$config['cache'] = array(
		"box"				=>		"cache",								# 缓村（静态页面）保存目录
	);
 
?>