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
	 	
	require_once("{$config['sys']['module_home']}/{$module}/_global.php");
	$d5f = new D5F('',makeTemp("{$module}/index"));
	/* 示例代码：缓存-静态页面生成
	if(!checkCache('default','index'))
	{
		buildPage('default','index');
	}else{
		$is_cache = " 现在是缓存查看.";
		loadCache();
	}
	
	
	// 示例代码：HTML循环解析
	$d5f = new D5F();
	$d5f->loop("LoopShow",makeTemp("index"));
	for($i=0;$i<5;$i++)
	{
		$d5f->p(array('loop_char'=>"HTML Loop output line {$i}",'loop_key'=>$i));
		$loopshow.=$d5f->out();
	}
	*/
	
	require_once($d5f->template());
?>