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
			
		}
		
		function connect()
		{

			if(empty($GLOBALS['config']['db'])) die('Please setup database first.');
			
			$connect = @mysql_connect($GLOBALS['config']['db']['hostname'],$GLOBALS['config']['db']['username'],$GLOBALS['config']['db']['password']) or die("Can not connect to host:{$GLOBALS['config']['db']['hostname']}");
			mysql_select_db($GLOBALS['config']['db']['dbname'],$connect) or die("Can not connect to database:{$GLOBALS['config']['db']['dbname']}");
			
			$db_ver=mysql_fetch_array(mysql_query("select version()"));
			$db_ver=floatval(substr($db_ver['version()'],0,3));											//取得MYSQL版本号
			
			//高于指定版本，指定编码
			if($db_ver>=4.1) mysql_query("SET NAMES '".str_replace("-","",$GLOBALS['config']['db']['encode'])."'");
			$this->db_ver = $db_ver;
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
		
		/**
		 *	根据某字段特定值获得另外一字段的值
		 *	@param	$value		值
		 *	@param	$field		$value所对应的字段
		 *	@param	$key		要取得的字段
		 *	@param	$table		要查询的表
		 */
		 function getValue($key,$field,$value,$table)
		 {
			 $this->query("select {$key} from {$table} where {$field}='{$value}'");
			 $this->fetch_array();
			 return $this->row[$key];
		 }
		 
		 /**
		  *	根据sql获取单行的值
		  *	@param $sql
		  */
		 public function val($sql)
		 {
			 $this->query($sql);
			 $this->fetch_array();
			 return $this->row;
		 }
		 
		 /**
		  *	根据sql获取全部返回数据
		  *	@param	$sql
		  *	@param	$start	开始位置
		  *	@param	$max	最大记录数
		  *	@param	$getAll	是否获取全部数据（不分页）
		  */
		  public function vals($sql,$getAll=false,$start=0,$max=0)
		  {
			  $max = $max==0 ? $GLOBALS['config']['page']['default'] : $max;
			  $start = $start==0 ? $GLOBALS['$nowrecord'] : $start;
			  $sql = (strstr($sql,'LIMIT') || $getAll) ? $sql : $sql." LIMIT {$start},{$max}";
			  $this->query($sql);
			  if($this->fetch_array())
			  {
				  $result = array();
				  do
				  {
					array_push($result,$this->row);
				  }while($this->fetch_array());
				  return $result;
			  }else{
			  	return NULL;
			  }
		  }
	
		 /**
		  *	获得数据库版本号
		  */
		public function get_db_ver()
		{
			return $this->db_ver;
		}
	
		 /**
		  *	获得记录数量
		  */
		public function getnum(){
			return $this->num;
		}
		
		/**
		  *	最新插入ID
		  */
		public function insert_id()
		{
			return mysql_insert_id();
		}
		
		/**
		  *	获得影响行数
		  */
		public function affrows()
		{
			return mysql_affected_rows();
		}
	
		//关闭数据库连接
		public function close()
		{
			mysql_close();
		}
	}
?>