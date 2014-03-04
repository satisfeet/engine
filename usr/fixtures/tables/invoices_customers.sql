CREATE TABLE `invoices_customers` (
  `invoice_id`  int(5) unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` int(5) unsigned NOT NULL,
  PRIMARY KEY (`invoice_id`),
  UNIQUE KEY (`invoice_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `invoices_customers_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE,
  CONSTRAINT `invoices_customers_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
