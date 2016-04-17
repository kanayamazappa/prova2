/*
SQLyog Community v12.09 (64 bit)
MySQL - 5.5.46 : Database - prova2
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`prova2` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `prova2`;

/*Table structure for table `person` */

DROP TABLE IF EXISTS `person`;

CREATE TABLE `person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `local` varchar(150) DEFAULT NULL,
  `idioma` varchar(150) DEFAULT NULL,
  `foto` varchar(150) DEFAULT NULL,
  `descricao` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `person` */

insert  into `person`(`id`,`nome`,`local`,`idioma`,`foto`,`descricao`) values (1,'Paulo Kanayama','Cravinhos, São Paulo','en','https://pbs.twimg.com/profile_images/311595467/kanayama_normal.jpeg','Testando Updade'),(2,'Paulo Kanayama','Cravinhos, São Paulo','en','https://pbs.twimg.com/profile_images/311595467/kanayama_normal.jpeg','');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
