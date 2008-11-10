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

	// Database class
	
	class d5db{
	
		var $sqlinfo;			//SQL语言信息
		var $num;   			//记录数
		var $result;				//操作结果
		var $row; 				//数据查询结果
		var $db_ver;			//取得MYSQL版本号
	
		//构造函数
		function d5db()
		{		
			$db_ver=mysql_fetch_array(mysql_query("select version()"));
			$db_ver=floatval(substr($db_ver['version()'],0,3));											//取得MYSQL版本号
			
			//高于指定版本，指定编码
			if($db_ver>=4.1) mysql_query("SET NAMES '".str_replace("-","",$GLOBALS['config']['db']['encode'])."'");
		}
	
		// 连接数据库
		function connect()
		{
			global $config['db'];
			if(empty($config['db'])) die('Please setup database first.');
			
			$connect = @mysql_connect($config['db']['hostname'],$config['db']['username'],$config['db']['password']) or die("Can not connect to host:{$config['db']['hostname']}");
			mysql_select_db($config['db']['dbname'],$connect) or die("Can not connect to database:{$config['db']['dbname']}");
		}
		
		//插入新数据或更新原来的数据
		function query($sqlinfo){
			if(DEBUG)
			{
				$this->result = mysql_query($sqlinfo) or die($sqlinfo);
			}else{
				$this->result = mysql_query($sqlinfo);
			}
			return $this->result;
		}
	
		//数据查询
		function db_select($sqlinfo){
			$this->result=@mysql_query($sqlinfo);
			$this->num=@mysql_num_rows($this->result);
			$this->row=@mysql_fetch_array($this->result,MYSQL_ASSOC);
			
			if($this->result){
				return $this->row;
			}else{
				return false;
			}
		
		}
	 
		//数据指针移动
		function db_seek($i){
			if($this->result){
				@mysql_data_seek($this->result,$i);
				$this->row=mysql_fetch_array($this->result,MYSQL_ASSOC);
			}else{			
				return false;
			}
		}
		//获取结果数组
		function fetch_array(){
			
			$this->row=mysql_fetch_array($this->result,MYSQL_ASSOC);
			return $this->row;
		}
	
		//获得数据库版本号
		function get_db_ver()
		{
			return $db_ver;
		}
	
		//获得num
		function getnum(){
			return $this->num;
		}
	
		function insert_id()
		{
			return mysql_insert_id();
		}
	
		//关闭数据库连接
		function db_close()
		{
			mysql_close();
		}
	}
?>