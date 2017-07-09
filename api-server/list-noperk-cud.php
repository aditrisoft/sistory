<?php
include "db.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE');


$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
		$cud=$data->cud;
		$kode=$data->noperk;
}

if($cud=='input'){
	$noperk = $data->noperk;
	$namaperk = $data->namaperk;		

	#jika noperk bank maka ditolak (1010-1050)
	if($noperk>=1010 && $noperk<=1050){
		echo "No Akun 1010 sampai dengan 1050 hanya boleh untuk data bank!";
	}else{
		mysql_query("insert into tbnoperk(noperk, namaperk) values ('$noperk', '$namaperk')");
	}

}elseif($cud=='edit'){
	$noperk = $data->noperk;
	$namaperk = $data->namaperk;		

	mysql_query("update tbnoperk set namaperk='$namaperk', noperk='$noperk' where noperk='$noperk'");
	
}elseif($cud=='hapus'){

	mysql_query("delete from tbnoperk where noperk='$kode' and penting=0");

}else{

	$Adisql=mysql_query("select * from tbnoperk where noperk='$kode'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);
}
?>