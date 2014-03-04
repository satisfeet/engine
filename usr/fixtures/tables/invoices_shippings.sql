CREATE TABLE `invoices_shippings` (
  `invoice_id`  int(5) unsigned NOT NULL AUTO_INCREMENT,
  `shipping_id` int(5) unsigned NOT NULL,
  PRIMARY KEY (`invoice_id`),
  KEY `shipping_id` (`shipping_id`),
  CONSTRAINT `invoices_shippings_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE,
  CONSTRAINT `invoices_shippings_2` FOREIGN KEY (`shipping_id`) REFERENCES `shippings` (`id`) ON DELETE CASCADE,
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
