---
title: 'PostgreSQL PHP: Delete Data From a Table'
page_title: 'PostgreSQL PHP: Delete Data In a Table'
page_description: 'In this tutorial, you will learn how to delete data from a PostgreSQL table in PHP application using PDO API.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-php/delete/'
ogImage: ''
updatedOn: '2024-01-30T00:55:55+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL PHP: Working with Binary Data'
  slug: 'postgresql-php/postgresql-blob'
nextLink:
  title: 'PostgreSQL Python'
  slug: 'postgresql-php/../postgresql-python'
---

**Summary**: This tutorial shows you how to delete data from a PostgreSQL table using the PHP PDO.

## Steps for deleting data in the PostgreSQL using PHP PDO

To delete data from a PostgreSQL table in PHP, you use the following steps:

1. [Connect to the PostgreSQL database server](connect) by creating an instance of the PDO class.
2. Prepare the [DELETE](../postgresql-tutorial/postgresql-delete) statement for execution by calling the `prepare()` method of the PDO object. The `prepare()` method returns a `PDOStatement` object.
3. Bind values to the DELETE statement by calling the `bindValue()` method of the `PDOStatement` object.
4. Execute the `DELETE` statement by calling the `execute()` method.
5. Get the number of rows deleted using the `rowCount()` method.

## Deleting data examples

We will use the `stocks` table for the demonstration. If you have not created the `stocks` table yet, you can follow the [creating table tutorial](create-tables).

Let’s create a new class named StockDB that contains all the methods for deleting data in a table.

```phpsql
<?php
namespace PostgreSQLTutorial;

/**
 * PostgreSQL PHP delete data demo
 */
class StockDB {

    /**
     * PDO object
     * @var \PDO
     */
    private $pdo;

    /**
     * Initialize the object with a specified PDO object
     * @param \PDO $pdo
     */
    public function __construct($pdo) {
        $this->pdo = $pdo;
    }
    // other methods
    // ...
}
```

The following `delete()` method deletes a row specified by id from the `stocks` table

```php
   /**
     * Delete a row in the stocks table specified by id
     * @param int $id
     * @return the number row deleted
     */
    public function delete($id) {
        $sql = 'DELETE FROM stocks WHERE id = :id';

        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':id', $id);

        $stmt->execute();

        return $stmt->rowCount();
    }
```

The following `deleteAll()` method deletes all rows from the `stocks` table.

```php
   /**
     * Delete all rows in the stocks table
     * @return int the number of rows deleted
     */
    public function deleteAll() {

        $stmt = $this->pdo->prepare('DELETE FROM stocks');
        $stmt->execute();
        return $stmt->rowCount();
    }
```

Before running the methods, we query the data from the `stocks` table.

```php
stocks=# SELECT * FROM stocks
stocks-# ORDER BY id;
 id | symbol |        company
----+--------+-----------------------
  1 | MSFT   | Microsoft Corporation
  2 | GOOGL  | Alphabet Inc.
  3 | YHOO   | Yahoo! Inc.
  4 | FB     | Facebook, Inc.
(4 rows)
```

Use the following code in the index.php file to delete the row with id 1\.

```sql
<?php

require 'vendor/autoload.php';

use PostgreSQLTutorial\Connection as Connection;
use PostgreSQLTutorial\StockDB as StockDB;

try {
    // connect to the PostgreSQL database
    $pdo = Connection::get()->connect();
    //
    $stockDB = new StockDB($pdo);
    // delete a stock with a specified id
    $deletedRows = $stockDB->delete(1);
    echo 'The number of row(s) deleted: ' . $deletedRows . '<br>';

} catch (\PDOException $e) {
    echo $e->getMessage();
}

```

The following is the output:

```
The number of row(s) deleted: 1
```

We query data from the stocks table again to verify.

```sql
stocks=# SELECT * FROM stocks
stocks-# ORDER BY id;
 id | symbol |    company
----+--------+----------------
  2 | GOOGL  | Alphabet Inc.
  3 | YHOO   | Yahoo! Inc.
  4 | FB     | Facebook, Inc.
(3 rows)
```

The row with id 1 was deleted as expected.

In the `index.php` file, modify the code to call the `deleteAll()` method instead of the `delete()` method and execute it. The following is the output of the script:

```sql
The number of row(s) deleted: 3
```

The following shows the output when we query data from the `stocks` table.

```
stocks=# SELECT * FROM stocks
stocks-# ORDER BY id;
 id | symbol | company
----+--------+---------
(0 rows)
```

All rows in the stocks table have been deleted as expected.

In this tutorial, we have shown you how to delete data from a PostgreSQL table in the PHP application using PDO API.
