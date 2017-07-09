<?php
include "db.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE');


$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
		$cud=$data->cud;
		$kode=$data->usernama;
}

if($cud=='input'){
	$usernama = $data->usernama;
	$pass = $data->pass;
	$levelx = $data->levelx;
	$nama = $data->nama;
	$nik = $data->nik;		

	mysql_query("insert into user(usernama, pass, levelx, nama, nik) values ('$usernama', '$pass', '$levelx', '$nama', '$nik')");

}elseif($cud=='edit'){
	$usernama = $data->usernama;
	$pass = $data->pass;
	$levelx = $data->levelx;
	$nama = $data->nama;
	$nik = $data->nik;		

	mysql_query("update user set usernama='$usernama', pass='$pass', levelx='$levelx', nama='$nama', nik='$nik' where usernama='$kode'");
	
}elseif($cud=='hapus'){

	mysql_query("delete from user where usernama='$kode'");

}else{

	$Adisql=mysql_query("select * from user where usernama='$kode'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);
}
?>