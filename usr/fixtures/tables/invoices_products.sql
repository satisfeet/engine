CREATE TABLE `invoices_products` (
  `invoice_id`  int(5) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(5) unsigned NOT NULL,
  PRIMARY KEY (`invoice_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `invoices_products_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE,
  CONSTRAINT `invoices_products_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
