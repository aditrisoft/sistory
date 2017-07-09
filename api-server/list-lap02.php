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
	$AdiSql = mysql_query("select @no:=@no+1 AS nomor, date(tgljurnal) as tgl, nokwit, keterangan, noperk, (select namaperk from tbnoperk where noperk=tbjurnal.noperk) as namaperk, debit, kredit from tbjurnal where statustr='0'".$tglx." order by noperk");
}else{
	$AdiSql=mysql_query("select sum(debit) as totdebit, sum(kredit) as totkredit from tbjurnal where statustr='0'".$tglx);
}



$rows = array();
while($r = mysql_fetch_array($AdiSql)) {
    $rows[] = $r;
}
print json_encode($rows);

?>