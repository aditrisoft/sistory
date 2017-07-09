<?php
include "db.php";

header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Origin, Content-Type'); 
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');

$tglawal=$_GET['tglawal'];
$tglakhir=$_GET['tglakhir'];

#isikan dengan string tglawal dan tglakhir
$tglx=" and (date(tbjurnal.tgljurnal) BETWEEN '$tglawal' AND '$tglakhir')";

if($_GET['cud']=='lap'){
	mysql_query("SET @no=0");
	$AdiSql = mysql_query("select @no:=@no+1 AS nomor, date(tgljurnal) as tgl, nokwit, keterangan, sum(debit) as nominal from tbjurnal where statustr='0'".$tglx." group by nokwit order by tgljurnal");
}else{
	#$AdiSql=mysql_query("select sum(if(pasien.jk='L',1,0)) as totalL, sum(if(pasien.jk='P',1,0)) as totalP, sum(kunjungan.baruDW +  kunjungan.lamaDW) as totalDW, sum(kunjungan.lamaLW + kunjungan.baruLW) as totalLW, sum(kunjungan.baruDW + kunjungan.baruLW) as totalBaru, sum(kunjungan.lamaDW + kunjungan.lamaLW) as totalLama from kunjungan  join pasien on kunjungan.no_reg=pasien.no_reg join kelurahan on pasien.kd_kelurahan=kelurahan.Kode join poli on kunjungan.poli=poli.Kode where kunjungan.status='1'".$tglx);
}



$rows = array();
while($r = mysql_fetch_array($AdiSql)) {
    $rows[] = $r;
}
print json_encode($rows);

?>