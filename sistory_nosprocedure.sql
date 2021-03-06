/*
MySQL Data Transfer
Source Host: 192.168.1.98
Source Database: sistory2
Target Host: 192.168.1.98
Target Database: sistory2
Date: 09/07/2017 20:33:59
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for bank
-- ----------------------------
DROP TABLE IF EXISTS `bank`;
CREATE TABLE `bank` (
  `bank` varchar(50) DEFAULT NULL,
  `norek` varchar(75) DEFAULT NULL,
  `an` varchar(75) DEFAULT NULL,
  `noperk` varchar(4) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4256 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for do
-- ----------------------------
DROP TABLE IF EXISTS `do`;
CREATE TABLE `do` (
  `tgl` datetime NOT NULL,
  `nodo` varchar(45) NOT NULL DEFAULT '',
  `nopo` varchar(45) DEFAULT NULL,
  `idsuplier` varchar(10) DEFAULT NULL,
  `noref` varchar(75) DEFAULT NULL,
  `usernama` varchar(20) DEFAULT NULL,
  `waktu_real` datetime DEFAULT NULL,
  `statustr` int(11) DEFAULT '1',
  `cara_bayar_selisih` tinyint(4) DEFAULT '0' COMMENT '0-bank, 1-kas, 2-full hutang/piutang',
  `noperk` varchar(4) DEFAULT NULL COMMENT 'ambil dari database bank',
  `selisih` double DEFAULT '0' COMMENT 'total yang dibayarkan',
  `status_selisih` int(11) DEFAULT '0' COMMENT '0-tidak ada, 1-terima, 2-bayar',
  PRIMARY KEY (`nodo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for do_detail
-- ----------------------------
DROP TABLE IF EXISTS `do_detail`;
CREATE TABLE `do_detail` (
  `nopo` varchar(45) DEFAULT NULL,
  `nodo` varchar(45) DEFAULT NULL,
  `produk_id` varchar(30) DEFAULT NULL,
  `qty` double DEFAULT '0',
  `harga` double DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for hutang
-- ----------------------------
DROP TABLE IF EXISTS `hutang`;
CREATE TABLE `hutang` (
  `nokwit` varchar(30) DEFAULT NULL,
  `tgl` datetime DEFAULT NULL,
  `idsuplier` varchar(10) DEFAULT NULL,
  `tgljt` datetime DEFAULT NULL,
  `nominal` double DEFAULT '0',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `waktu_real` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for hutangdetail
-- ----------------------------
DROP TABLE IF EXISTS `hutangdetail`;
CREATE TABLE `hutangdetail` (
  `nokwit` varchar(30) DEFAULT NULL,
  `notrans` varchar(30) DEFAULT NULL,
  `tgl` datetime DEFAULT NULL,
  `cicilan` double DEFAULT '0',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `waktu_real` datetime DEFAULT NULL,
  `cara_bayar` tinyint(4) DEFAULT '0' COMMENT '0-bank, 1-kas, 2-full hutang',
  `noperk` varchar(4) DEFAULT NULL COMMENT 'ambil dari database bank',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for kategori
-- ----------------------------
DROP TABLE IF EXISTS `kategori`;
CREATE TABLE `kategori` (
  `idkategori` varchar(3) NOT NULL DEFAULT '',
  `kategori` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idkategori`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for nozzle
-- ----------------------------
DROP TABLE IF EXISTS `nozzle`;
CREATE TABLE `nozzle` (
  `idnozzle` int(11) NOT NULL AUTO_INCREMENT,
  `idtangki` varchar(3) DEFAULT NULL,
  `nozzle` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idnozzle`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for pb
-- ----------------------------
DROP TABLE IF EXISTS `pb`;
CREATE TABLE `pb` (
  `tgl` datetime NOT NULL,
  `nopb` varchar(45) NOT NULL DEFAULT '',
  `idsuplier` varchar(10) DEFAULT NULL,
  `noref` varchar(75) DEFAULT NULL,
  `usernama` varchar(20) DEFAULT NULL,
  `waktu_real` datetime DEFAULT NULL,
  `cara_bayar` tinyint(4) DEFAULT '0' COMMENT '0-bank, 1-kas, 2-full hutang',
  `noperk` varchar(4) DEFAULT NULL COMMENT 'ambil dari database bank',
  `jmlbayar` double DEFAULT '0' COMMENT 'total yang dibayarkan',
  `kurangbayar` double DEFAULT '0' COMMENT 'kekurangan pembayaran',
  `statustr` int(11) DEFAULT '1',
  PRIMARY KEY (`nopb`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for pb_detail
-- ----------------------------
DROP TABLE IF EXISTS `pb_detail`;
CREATE TABLE `pb_detail` (
  `nopb` varchar(45) DEFAULT NULL,
  `produk_id` varchar(30) DEFAULT NULL,
  `qty` double DEFAULT '0',
  `hpp` double DEFAULT '0',
  `harga` double DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for pelanggan
-- ----------------------------
DROP TABLE IF EXISTS `pelanggan`;
CREATE TABLE `pelanggan` (
  `idpelanggan` varchar(10) NOT NULL DEFAULT '',
  `nama` varchar(30) DEFAULT NULL,
  `alamat` varchar(75) DEFAULT NULL,
  `tgldaftar` datetime DEFAULT NULL,
  PRIMARY KEY (`idpelanggan`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for pemakaian_internal
-- ----------------------------
DROP TABLE IF EXISTS `pemakaian_internal`;
CREATE TABLE `pemakaian_internal` (
  `tgl` datetime DEFAULT NULL,
  `rincian` varchar(150) DEFAULT NULL,
  `qty` double DEFAULT '0',
  `nokwit` varchar(30) NOT NULL DEFAULT '',
  `produk_id` varchar(10) NOT NULL DEFAULT '',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usernama` varchar(20) DEFAULT NULL,
  `statustr` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for pemakaian_lain
-- ----------------------------
DROP TABLE IF EXISTS `pemakaian_lain`;
CREATE TABLE `pemakaian_lain` (
  `tgl` datetime DEFAULT NULL,
  `rincian` varchar(150) DEFAULT NULL,
  `qty` double DEFAULT '0',
  `nokwit` varchar(30) NOT NULL DEFAULT '',
  `produk_id` varchar(10) NOT NULL DEFAULT '',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usernama` varchar(20) DEFAULT NULL,
  `statustr` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for piutang
-- ----------------------------
DROP TABLE IF EXISTS `piutang`;
CREATE TABLE `piutang` (
  `nokwit` varchar(30) DEFAULT NULL,
  `tgl` datetime DEFAULT NULL,
  `idpelanggan` varchar(10) DEFAULT NULL,
  `tgljt` datetime DEFAULT NULL,
  `nominal` double DEFAULT '0',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `waktu_real` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for piutangdetail
-- ----------------------------
DROP TABLE IF EXISTS `piutangdetail`;
CREATE TABLE `piutangdetail` (
  `nokwit` varchar(30) DEFAULT NULL,
  `notrans` varchar(30) DEFAULT NULL,
  `tgl` datetime DEFAULT NULL,
  `cicilan` double DEFAULT '0',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `waktu_real` datetime DEFAULT NULL,
  `cara_bayar` tinyint(4) DEFAULT '0' COMMENT '0-bank, 1-kas, 2-full hutang',
  `noperk` varchar(4) DEFAULT NULL COMMENT 'ambil dari database bank',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for pj
-- ----------------------------
DROP TABLE IF EXISTS `pj`;
CREATE TABLE `pj` (
  `tgl` datetime NOT NULL,
  `nopj` varchar(45) NOT NULL DEFAULT '',
  `idpelanggan` varchar(10) DEFAULT NULL,
  `noref` varchar(75) DEFAULT NULL,
  `usernama` varchar(20) DEFAULT NULL,
  `waktu_real` datetime DEFAULT NULL,
  `cara_bayar` tinyint(4) DEFAULT '0' COMMENT '0-bank, 1-kas, 2-full hutang',
  `noperk` varchar(4) DEFAULT NULL COMMENT 'ambil dari database bank',
  `jmlbayar` double DEFAULT '0' COMMENT 'total yang dibayarkan',
  `kurangbayar` double DEFAULT '0' COMMENT 'kekurangan pembayaran',
  `statustr` int(11) DEFAULT '1',
  PRIMARY KEY (`nopj`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for pj_detail
-- ----------------------------
DROP TABLE IF EXISTS `pj_detail`;
CREATE TABLE `pj_detail` (
  `nopj` varchar(45) DEFAULT NULL,
  `produk_id` varchar(30) DEFAULT NULL,
  `qty` double DEFAULT '0',
  `hpp` double DEFAULT '0',
  `harga` double DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for po
-- ----------------------------
DROP TABLE IF EXISTS `po`;
CREATE TABLE `po` (
  `tgl` datetime NOT NULL,
  `nopo` varchar(45) NOT NULL DEFAULT '',
  `idsuplier` varchar(10) DEFAULT NULL,
  `noref` varchar(75) DEFAULT NULL,
  `usernama` varchar(20) DEFAULT NULL,
  `waktu_real` datetime DEFAULT NULL,
  `usernama_accounting` varchar(20) DEFAULT NULL,
  `waktu_validasi` datetime DEFAULT NULL,
  `cara_bayar` tinyint(4) DEFAULT '0' COMMENT '0-bank, 1-kas, 2-full hutang',
  `noperk` varchar(4) DEFAULT NULL COMMENT 'ambil dari database bank',
  `jmlbayar` double DEFAULT '0' COMMENT 'total yang dibayarkan',
  `kurangbayar` double DEFAULT '0' COMMENT 'kekurangan pembayaran',
  PRIMARY KEY (`nopo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for po_detail
-- ----------------------------
DROP TABLE IF EXISTS `po_detail`;
CREATE TABLE `po_detail` (
  `nopo` varchar(45) DEFAULT NULL,
  `produk_id` varchar(30) DEFAULT NULL,
  `qty` double DEFAULT '0',
  `harga` double DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for produk
-- ----------------------------
DROP TABLE IF EXISTS `produk`;
CREATE TABLE `produk` (
  `produk_id` varchar(10) NOT NULL DEFAULT '',
  `produk_nama` varchar(75) DEFAULT NULL,
  `harga_jual` double DEFAULT NULL,
  `idsatuan` int(11) DEFAULT NULL,
  `idkategori` varchar(3) DEFAULT NULL,
  `nonaktif` int(11) DEFAULT '1',
  PRIMARY KEY (`produk_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for satuan
-- ----------------------------
DROP TABLE IF EXISTS `satuan`;
CREATE TABLE `satuan` (
  `idsatuan` int(11) NOT NULL AUTO_INCREMENT,
  `satuan` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idsatuan`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for stokkeluar
-- ----------------------------
DROP TABLE IF EXISTS `stokkeluar`;
CREATE TABLE `stokkeluar` (
  `tgl` datetime DEFAULT NULL,
  `waktu_real` datetime DEFAULT NULL,
  `produk_id` varchar(10) DEFAULT NULL,
  `ref` varchar(30) DEFAULT NULL,
  `qty_keluar` double DEFAULT '0',
  `hpp` double DEFAULT '0',
  `id_masuk` int(11) DEFAULT NULL,
  `notrans` varchar(30) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for stokmasuk
-- ----------------------------
DROP TABLE IF EXISTS `stokmasuk`;
CREATE TABLE `stokmasuk` (
  `tgl` datetime DEFAULT NULL,
  `waktu_real` datetime DEFAULT NULL,
  `produk_id` varchar(10) DEFAULT NULL,
  `ref` varchar(30) DEFAULT NULL,
  `qty_masuk` double DEFAULT '0',
  `hpp` double DEFAULT '0',
  `qty_keluar` double DEFAULT '0',
  `sisa` double DEFAULT '0',
  `notrans` varchar(30) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for suplier
-- ----------------------------
DROP TABLE IF EXISTS `suplier`;
CREATE TABLE `suplier` (
  `idsuplier` varchar(10) NOT NULL DEFAULT '',
  `nama` varchar(30) DEFAULT NULL,
  `alamat` varchar(75) DEFAULT NULL,
  `tgldaftar` datetime DEFAULT NULL,
  PRIMARY KEY (`idsuplier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for tangki
-- ----------------------------
DROP TABLE IF EXISTS `tangki`;
CREATE TABLE `tangki` (
  `idtangki` varchar(3) NOT NULL DEFAULT '',
  `tangki` varchar(20) DEFAULT NULL,
  `deskripsi` text,
  `produk_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`idtangki`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for tbbank
-- ----------------------------
DROP TABLE IF EXISTS `tbbank`;
CREATE TABLE `tbbank` (
  `tgl` datetime DEFAULT NULL,
  `keterangan` varchar(150) DEFAULT NULL,
  `masuk` double DEFAULT '0',
  `keluar` double DEFAULT '0',
  `nokwitbank` varchar(30) DEFAULT NULL,
  `terbilang` varchar(255) DEFAULT NULL,
  `usernama` varchar(20) DEFAULT NULL,
  `waktu_real` datetime DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `statustr` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for tbgolnoperk
-- ----------------------------
DROP TABLE IF EXISTS `tbgolnoperk`;
CREATE TABLE `tbgolnoperk` (
  `golnoperk` varchar(3) NOT NULL DEFAULT '',
  `namagol` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`golnoperk`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for tbjurnal
-- ----------------------------
DROP TABLE IF EXISTS `tbjurnal`;
CREATE TABLE `tbjurnal` (
  `tgljurnal` datetime DEFAULT NULL,
  `nokwit` varchar(30) DEFAULT NULL,
  `noperk` varchar(4) DEFAULT NULL,
  `keterangan` varchar(150) DEFAULT NULL,
  `debit` double DEFAULT '0',
  `kredit` double DEFAULT '0',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ref` varchar(50) DEFAULT NULL,
  `statustr` int(11) DEFAULT '0' COMMENT '0-normal, 1-hapus, 2-belum validasi',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for tbkas
-- ----------------------------
DROP TABLE IF EXISTS `tbkas`;
CREATE TABLE `tbkas` (
  `tgl` datetime DEFAULT NULL,
  `keterangan` varchar(150) DEFAULT NULL,
  `masuk` double DEFAULT '0',
  `keluar` double DEFAULT '0',
  `nokwitkas` varchar(30) DEFAULT NULL,
  `terbilang` varchar(255) DEFAULT NULL,
  `usernama` varchar(20) DEFAULT NULL,
  `waktu_real` datetime DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `statustr` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for tbmemorial
-- ----------------------------
DROP TABLE IF EXISTS `tbmemorial`;
CREATE TABLE `tbmemorial` (
  `tgl` datetime DEFAULT NULL,
  `keterangan` varchar(150) DEFAULT NULL,
  `nobukti` varchar(30) DEFAULT NULL,
  `usernama` varchar(20) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `statustr` int(11) DEFAULT '0',
  `waktu_real` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for tbneracaawal
-- ----------------------------
DROP TABLE IF EXISTS `tbneracaawal`;
CREATE TABLE `tbneracaawal` (
  `noperk` varchar(4) DEFAULT NULL,
  `golnoperk` varchar(3) DEFAULT NULL,
  `debit` double DEFAULT '0',
  `kredit` double DEFAULT '0',
  `tahun` varchar(4) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usernama` varchar(20) DEFAULT NULL,
  `waktu_real` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for tbnoperk
-- ----------------------------
DROP TABLE IF EXISTS `tbnoperk`;
CREATE TABLE `tbnoperk` (
  `noperk` varchar(4) NOT NULL DEFAULT '',
  `namaperk` varchar(50) DEFAULT NULL,
  `penting` int(11) DEFAULT '0',
  `golongankas` int(11) DEFAULT NULL,
  `golnoperk` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`noperk`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for transaksi_bbm
-- ----------------------------
DROP TABLE IF EXISTS `transaksi_bbm`;
CREATE TABLE `transaksi_bbm` (
  `tgl` datetime DEFAULT NULL,
  `shift` int(11) DEFAULT NULL,
  `idnozzle` int(11) NOT NULL,
  `petugas1` varchar(20) DEFAULT NULL,
  `petugas2` varchar(20) DEFAULT NULL,
  `meter_awal` double DEFAULT '0',
  `waktu_selesai` datetime DEFAULT NULL,
  `meter_akhir` double DEFAULT '0',
  `usernama` varchar(20) DEFAULT NULL,
  `nokwit` varchar(30) NOT NULL DEFAULT '',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `usernama` varchar(20) NOT NULL DEFAULT '',
  `pass` varchar(20) DEFAULT NULL,
  `levelx` varchar(20) DEFAULT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `nik` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`usernama`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for volume_tangki
-- ----------------------------
DROP TABLE IF EXISTS `volume_tangki`;
CREATE TABLE `volume_tangki` (
  `idtangki` varchar(3) DEFAULT NULL,
  `height` double DEFAULT NULL,
  `volume` double DEFAULT NULL,
  `fraction_diff` double DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records 
-- ----------------------------
INSERT INTO `bank` VALUES ('BCA', '123456879', 'Contoh', '1010', '4255');
INSERT INTO `do` VALUES ('2017-07-09 03:35:45', 'DO000000001', 'PO000000001', '001', 'DO', 'admin', '2017-07-09 10:36:06', '0', '1', '1010', '0', '0');
INSERT INTO `do` VALUES ('2017-07-09 04:57:27', 'DO000000002', 'PO000000002', '', 'DO', 'admin', '2017-07-09 11:57:36', '0', '1', '1010', '0', '0');
INSERT INTO `do_detail` VALUES ('PO000000001', 'DO000000001', '001', '10', '8500', '1');
INSERT INTO `do_detail` VALUES ('PO000000002', 'DO000000002', '002', '100', '9500', '2');
INSERT INTO `do_detail` VALUES ('PO000000002', 'DO000000002', '001', '50', '11000', '3');
INSERT INTO `hutang` VALUES ('PB000000002', '2017-07-09 07:50:33', '000', '2017-08-09 07:50:33', '19700', '1', '2017-07-09 14:51:00');
INSERT INTO `nozzle` VALUES ('1', '02', 'A012');
INSERT INTO `nozzle` VALUES ('4', 'Seb', 'A011');
INSERT INTO `pb` VALUES ('2017-07-09 00:00:00', 'PB000000001', '000', '', 'admin', '2017-07-09 14:45:28', '1', null, '110000', '0', '0');
INSERT INTO `pb` VALUES ('2017-07-09 07:50:33', 'PB000000002', '000', '', 'admin', '2017-07-09 14:50:49', '1', null, '30000', '19700', '0');
INSERT INTO `pb_detail` VALUES ('PB000000001', '002', '10', '0', '11000', '24');
INSERT INTO `pb_detail` VALUES ('PB000000002', '001', '7', '0', '7100', '25');
INSERT INTO `pelanggan` VALUES ('000', 'UMUM', 'UMUM', '2017-05-01 11:19:10');
INSERT INTO `pelanggan` VALUES ('001', 'Contoh 1', 'Bawean', '2017-05-16 09:19:07');
INSERT INTO `piutangdetail` VALUES ('PJ000000003', 'PU000000001', '2017-05-12 13:25:15', '1250000', '1', '2017-05-12 20:26:58', '0', '1010');
INSERT INTO `piutangdetail` VALUES ('PJ000000006', 'PU000000002', '2017-05-13 02:55:41', '100000', '2', '2017-05-13 09:55:57', '0', '1013');
INSERT INTO `pj` VALUES ('2017-07-09 04:50:43', 'PJ000000006', '001', '', 'admin', '2017-07-09 11:51:28', '1', null, '37500', '0', '0');
INSERT INTO `pj_detail` VALUES ('PJ000000006', '001', '5', '0', '7500', '12');
INSERT INTO `po` VALUES ('2017-07-09 02:50:14', 'PO000000001', '001', '', 'admin', '2017-07-09 10:33:04', '1', '2017-07-09 00:00:00', '0', '1010', '85000', '0');
INSERT INTO `po` VALUES ('2017-07-09 04:55:40', 'PO000000002', '', '', 'admin', '2017-07-09 11:56:45', '1', '2017-07-09 04:57:15', '0', '1010', '1500000', '0');
INSERT INTO `po_detail` VALUES ('PO000000001', '001', '10', '8500', '1');
INSERT INTO `po_detail` VALUES ('PO000000002', '002', '100', '9500', '2');
INSERT INTO `po_detail` VALUES ('PO000000002', '001', '50', '11000', '3');
INSERT INTO `produk` VALUES ('001', 'PERTALITE', '7500', null, null, '1');
INSERT INTO `produk` VALUES ('002', 'PERTAJAM', '12000', null, null, '1');
INSERT INTO `satuan` VALUES ('999', 'Liter');
INSERT INTO `satuan` VALUES ('1000', null);
INSERT INTO `stokkeluar` VALUES ('2017-07-09 04:50:43', '2017-07-09 11:51:33', '001', 'PJ', '5', '8500', '1', 'PJ000000006', '8');
INSERT INTO `stokmasuk` VALUES ('2017-07-09 03:35:45', '2017-07-09 10:36:06', '001', 'DP', '10', '8500', '5', '5', 'DO000000001', '1');
INSERT INTO `stokmasuk` VALUES ('2017-07-09 04:57:27', '2017-07-09 11:57:36', '002', 'DP', '100', '9500', '0', '100', 'DO000000002', '2');
INSERT INTO `stokmasuk` VALUES ('2017-07-09 04:57:27', '2017-07-09 11:57:36', '001', 'DP', '50', '11000', '0', '50', 'DO000000002', '3');
INSERT INTO `stokmasuk` VALUES ('2017-07-09 00:00:00', '2017-07-09 14:48:07', '002', 'PB', '10', '11000', '0', '10', 'PB000000001', '9');
INSERT INTO `stokmasuk` VALUES ('2017-07-09 07:50:33', '2017-07-09 14:51:00', '001', 'PB', '7', '7100', '0', '7', 'PB000000002', '10');
INSERT INTO `suplier` VALUES ('000', 'TIDAK TERDAFTAR', '', '2017-05-01 13:21:16');
INSERT INTO `suplier` VALUES ('001', 'PERTAMINA SURABAYA', 'SURABAYA', '2017-05-16 09:15:54');
INSERT INTO `tangki` VALUES ('01', 'PREMIUM 1T', 'TANGKI UNTUK PREMIUM YANG 1', '0001');
INSERT INTO `tangki` VALUES ('02', 'Preimum KB', 'Gudang', '0008');
INSERT INTO `tangki` VALUES ('09e', 'gudang sebelah', 'Pinjam gudang sebelah', '0008');
INSERT INTO `tangki` VALUES ('cc', 'sz', 'ccD', '00009');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 00:00:00', 'PO000000001', '1052', 'PO ke PERTAMINA SURABAYA', '85000', '0', '1', 'PO', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 00:00:00', 'PO000000001', '1000', 'PO ke PERTAMINA SURABAYA', '0', '85000', '2', 'PO', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 03:35:45', 'DO000000001', '1051', 'DO dari PERTAMINA SURABAYA', '85000', '0', '3', 'DO', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 03:35:45', 'DO000000001', '1052', 'DO dari PERTAMINA SURABAYA', '0', '85000', '4', 'DO', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 00:00:00', 'PJ000000001', '1000', 'Penjualan ke ', '37500', '0', '5', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 00:00:00', 'PJ000000001', '4001', 'Penjualan ke ', '0', '37500', '6', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 00:00:00', 'PJ000000001', '5001', 'Penjualan ke ', '0', '0', '7', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 00:00:00', 'PJ000000001', '1054', 'Penjualan ke ', '0', '0', '8', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 03:52:15', 'PJ000000001', '1000', 'Penjualan ke ', '37500', '0', '9', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 03:52:15', 'PJ000000001', '4001', 'Penjualan ke ', '0', '37500', '10', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 03:52:15', 'PJ000000001', '5001', 'Penjualan ke ', '42500', '0', '11', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 03:52:15', 'PJ000000001', '1054', 'Penjualan ke ', '0', '42500', '12', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 03:56:51', 'PJ000000002', '1000', 'Penjualan ke ', '7500', '0', '13', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 03:56:51', 'PJ000000002', '4001', 'Penjualan ke ', '0', '7500', '14', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 03:56:51', 'PJ000000002', '5001', 'Penjualan ke ', '8500', '0', '15', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 03:56:51', 'PJ000000002', '1054', 'Penjualan ke ', '0', '8500', '16', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:17:53', 'PJ000000001', '1000', 'Penjualan ke ', '30000', '0', '17', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:17:53', 'PJ000000001', '4001', 'Penjualan ke ', '0', '30000', '18', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:17:53', 'PJ000000001', '5001', 'Penjualan ke ', '34000', '0', '19', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:17:53', 'PJ000000001', '1054', 'Penjualan ke ', '0', '34000', '20', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:24:29', 'PJ000000002', '1000', 'Penjualan ke 000', '0', '0', '21', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:24:29', 'PJ000000002', '4001', 'Penjualan ke 000', '0', '0', '22', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:24:29', 'PJ000000002', '5001', 'Penjualan ke 000', '42500', '0', '23', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:24:29', 'PJ000000002', '1054', 'Penjualan ke 000', '0', '42500', '24', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:26:24', 'PJ000000003', '1000', 'Penjualan ke 000', '7500', '0', '25', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:26:24', 'PJ000000003', '4001', 'Penjualan ke 000', '0', '7500', '26', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:26:24', 'PJ000000003', '5001', 'Penjualan ke 000', '8500', '0', '27', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:26:24', 'PJ000000003', '1054', 'Penjualan ke 000', '0', '8500', '28', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:48:50', 'PJ000000004', '1000', 'Penjualan ke 000', '15000', '0', '29', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:48:50', 'PJ000000004', '4001', 'Penjualan ke 000', '0', '15000', '30', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:48:50', 'PJ000000004', '5001', 'Penjualan ke 000', '17000', '0', '31', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:48:50', 'PJ000000004', '1054', 'Penjualan ke 000', '0', '17000', '32', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:48:50', 'PJ000000005', '1000', 'Penjualan ke ', '0', '0', '33', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:48:50', 'PJ000000005', '4001', 'Penjualan ke ', '0', '0', '34', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:48:50', 'PJ000000005', '5001', 'Penjualan ke ', '8500', '0', '35', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:48:50', 'PJ000000005', '1054', 'Penjualan ke ', '0', '8500', '36', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:50:43', 'PJ000000006', '1000', 'Penjualan ke Contoh 1', '37500', '0', '37', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:50:43', 'PJ000000006', '4001', 'Penjualan ke Contoh 1', '0', '37500', '38', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:50:43', 'PJ000000006', '5001', 'Penjualan ke Contoh 1', '42500', '0', '39', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:50:43', 'PJ000000006', '1054', 'Penjualan ke Contoh 1', '0', '42500', '40', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:57:15', 'PO000000002', '1052', 'PO ke ', '1500000', '0', '41', 'PO', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:57:15', 'PO000000002', '1010', 'PO ke ', '0', '1500000', '42', 'PO', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:57:27', 'DO000000002', '1051', 'DO dari ', '1500000', '0', '43', 'DO', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:57:27', 'DO000000002', '1052', 'DO dari ', '0', '1500000', '44', 'DO', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:57:56', 'PJ000000007', '1000', 'Penjualan ke Contoh 1', '91500', '0', '45', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:57:56', 'PJ000000007', '4001', 'Penjualan ke Contoh 1', '0', '91500', '46', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:57:56', 'PJ000000007', '5001', 'Penjualan ke Contoh 1', '75000', '0', '47', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 04:57:56', 'PJ000000007', '1054', 'Penjualan ke Contoh 1', '0', '75000', '48', 'PJ', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 00:00:00', 'PB000000001', '1051', 'Pembelian dari TIDAK TERDAFTAR', '90000', '0', '49', 'PB', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 00:00:00', 'PB000000001', '1000', 'Pembelian dari TIDAK TERDAFTAR', '0', '90000', '50', 'PB', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 07:40:52', 'PB000000001', '1051', 'Pembelian dari PERTAMINA SURABAYA', '18000', '0', '51', 'PB', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 07:40:52', 'PB000000001', '1000', 'Pembelian dari PERTAMINA SURABAYA', '0', '18000', '52', 'PB', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 00:00:00', 'PB000000001', '1051', 'Pembelian dari PERTAMINA SURABAYA', '100000', '0', '53', 'PB', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 00:00:00', 'PB000000001', '1000', 'Pembelian dari PERTAMINA SURABAYA', '0', '100000', '54', 'PB', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 00:00:00', 'PB000000001', '1051', 'Pembelian dari PERTAMINA SURABAYA', '10000', '0', '55', 'PB', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 00:00:00', 'PB000000001', '2001', 'Pembelian dari PERTAMINA SURABAYA', '0', '10000', '56', 'PB', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 07:50:33', 'PB000000002', '1051', 'Pembelian dari TIDAK TERDAFTAR', '30000', '0', '57', 'PB', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 07:50:33', 'PB000000002', '1000', 'Pembelian dari TIDAK TERDAFTAR', '0', '30000', '58', 'PB', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 07:50:33', 'PB000000002', '1051', 'Pembelian dari TIDAK TERDAFTAR', '19700', '0', '59', 'PB', '0');
INSERT INTO `tbjurnal` VALUES ('2017-07-09 07:50:33', 'PB000000002', '2001', 'Pembelian dari TIDAK TERDAFTAR', '0', '19700', '60', 'PB', '0');
INSERT INTO `tbnoperk` VALUES ('1000', 'Kas', '1', null, null);
INSERT INTO `tbnoperk` VALUES ('1010', 'BCA - Contoh', '1', null, null);
INSERT INTO `tbnoperk` VALUES ('1051', 'Persediaan BBM', '1', null, null);
INSERT INTO `tbnoperk` VALUES ('1052', 'Persediaan BBM Dalam Perjalanan', '1', null, null);
INSERT INTO `tbnoperk` VALUES ('1061', 'Piutang Usaha', '1', null, null);
INSERT INTO `tbnoperk` VALUES ('1201', 'Piutang Simpan Pinjam', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('1202', 'Investasi', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('1210', 'Akumulasi Peny. Piutang', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('1211', 'Biaya dibayar dimuka', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('1500', 'Tanah', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('1501', 'Bangunan', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('1502', 'Inventaris', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('1503', 'AKP Aset Tetap', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('1504', 'AKP Bangunan', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('1505', 'AKP Inventaris', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('1506', 'Peralatan dan ATK', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('2001', 'Hutang Usaha', '1', null, null);
INSERT INTO `tbnoperk` VALUES ('2007', 'Dana Pendidikan', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('2008', 'Dana Sosial', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('2009', 'Simpanan Sukarela', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('2010', 'Dana Pengurus', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('2011', 'Dana Karyawan', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('2012', 'SHU Anggota', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('2013', 'Hutang Pajak', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('2014', 'Simpanan Berjangka', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('2016', 'Hutang Pihak 3', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('2103', 'Titipan Angsuran', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('2110', 'Titipan Biaya RAT', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('2111', 'Titipan kelompok', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('2112', 'DARESTA', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('2113', 'BOP', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('2114', 'Titipan Honor', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('2500', 'Hutang Bank', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('3000', 'Modal Awal', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('3001', 'Hibah', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('3100', 'Laba Ditahan', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('3101', 'Simpanan Pokok', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('3102', 'Simpanan Wajib', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('3103', 'Cadangan', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('4001', 'Penjualan BBM', '1', null, null);
INSERT INTO `tbnoperk` VALUES ('4009', 'pendapatan sewa', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('4101', 'Pendapatan Jasa', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('4104', 'Pendapatan Administrasi', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('4201', 'Pendapatan Lain', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('4202', 'Pendapatan Provisi', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('4204', 'Pendapatan Materai', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('4205', 'Pendapatan Punishment', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('5001', 'HPP BBM', '1', null, null);
INSERT INTO `tbnoperk` VALUES ('6001', 'Beban Pemakaian Internal', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6002', 'Beban Pemakaian Lain', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6003', 'Trans. Tagih', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6004', 'Biaya Konsumsi', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6006', 'Study Banding', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6007', 'Kalender', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6008', 'PAD', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6009', 'Biaya Rapat', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6010', 'Biaya Bunga', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6011', 'Biaya Keamanan', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6012', 'Biaya Arisan', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6013', 'Biaya Transportasi', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6020', 'Biaya Potongan Angsuran', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6100', 'Biaya Kebersihan', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6101', 'Bunga Tabungan', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6121', 'Biaya Organisasi', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6201', 'THR', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6202', 'Pembinaan Dinas', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6203', 'Perawatan Kendaraan', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6204', 'Parcel', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6205', 'Pajak PBB', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6206', 'Proposal', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6207', 'HR Pengurus', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6208', 'HR. Karyawan', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6209', 'HR. Pengawas', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6210', 'SW. Ke Dekopin', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6211', 'Biaya Telp&Internet', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6212', 'Biaya Air', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6213', 'Biaya Listrik', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6214', 'ATK', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6215', 'Perlengkapan Kantor', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6216', 'Servis Peralatan Kantor', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6220', 'BBM', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6221', 'Perawatan Kantor', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6401', 'Beban AKP Inventaris', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6402', 'Beban AKP Bangunan', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6403', 'Beban AKP Aset Tetap', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6501', 'Seragam', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6502', 'Pajak', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6503', 'Gaji Karyawan', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6504', 'Beban Akum. Peny. Piutang', '0', null, null);
INSERT INTO `tbnoperk` VALUES ('6505', 'Biaya Pendampingan', '0', null, null);
INSERT INTO `user` VALUES ('admin', '', 'admin', null, null);
INSERT INTO `user` VALUES ('admin1', null, 'nozzle', 'mantab', '0999888');
INSERT INTO `user` VALUES ('admin2', null, 'nozzle', 'joko', '123');
