<?php
	$conn=mysql_connect("localhost","root","") or die("Could not connect");
	mysql_select_db("sistory",$conn) or die("could not connect database");

	date_default_timezone_set('Asia/Jakarta');

?>
