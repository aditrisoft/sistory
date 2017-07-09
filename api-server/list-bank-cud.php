<?php
include "db.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE');


$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
		$cud=$data->cud;
		$kode=$data->id;
}

if($cud=='input'){
	#cek ada no akun kosong atau tidak (maksimal 40)
	$AdiSql=mysql_query("select * from tbnoperk where (noperk between 1010 and 1050)");
	$jum=mysql_num_rows($AdiSql);
	if($jum>=40){

		echo "Maksimal 40 Data Bank yang bisa diinput!";

	}else{

		$norek = $data->norek;
		$bank = $data->bank;		
		$an = $data->an;	
		$noperk=noperkbank();	
		$namaperk=$bank." - ".$an;

		mysql_query("insert into bank(bank, norek, an, noperk) values ('$bank', '$norek', '$an','$noperk')");

		#input ke noperk (status->penting)
		mysql_query("insert into tbnoperk(noperk,namaperk,penting) values ('$noperk','$namaperk',1)");
		
	}

}elseif($cud=='edit'){
	$id = $data->id;
	$norek = $data->norek;
	$an = $data->an;
	$bank = $data->bank;		

	mysql_query("update bank set bank='$bank', norek='$norek', an='$an' where noperk='$kode'");
	
}elseif($cud=='hapus'){

	mysql_query("delete from bank where noperk='$kode'");

	#hapus di noperk
	mysql_query("delete from tbnoperk where noperk='$kode'");


}else{

	$Adisql=mysql_query("select * from bank where noperk='$kode'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);
}


function noperkbank(){
	$AdiSql=mysql_query("select * from tbnoperk where (noperk between 1010 and 1050) order by noperk desc");
	$hasil=mysql_fetch_assoc($AdiSql);
	if($hasil['noperk']==null){
		$noperkbank="1010";
	}else{
		$noperkbank=$hasil['noperk']+1;
	}
	return $noperkbank;
}

?>