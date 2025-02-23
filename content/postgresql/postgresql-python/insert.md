---
title: 'PostgreSQL Python: Insert Data Into a Table'
page_title: 'PostgresSQL Python: Insert Data Into a Table'
page_description: 'This tutorial shows you the step by step how to insert one or more rows into a PostgreSQL table in Python.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-python/insert/'
ogImage: '/postgresqltutorial/vendors_table.png'
updatedOn: '2024-05-19T08:29:59+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL Python: Create Tables'
  slug: 'postgresql-python/create-tables'
nextLink:
  title: 'PostgreSQL Python: Update Data in a Table'
  slug: 'postgresql-python/update'
---

**Summary**: in this tutorial, you will learn to insert one or more rows into a PostgreSQL table from Python.

This tutorial picks up from where the [Creating Tables Tutorial](create-tables) left off.

## Steps for inserting one row into a table from Python

To insert one or more rows into a table from Python, you follow these steps:

- First, [connect to the PostgreSQL server](connect).
- Next, create a `cursor` object from the `connection` object.
- Then, execute the [INSERT](../postgresql-tutorial/postgresql-insert) statement with values by calling the `execute()` or `executemany()` method of the `cursor` object.
- After that, commit the transaction by calling the `commit()` method of the `connection` object.
- Finally, obtain the inserted ID by calling the `fetchone()` method of the `cursor` object.

## Inserting data into a table example

We will use the `vendors` table in the `suppliers` database for the demonstration purposes:

![vendors_table](/postgresqltutorial/vendors_table.png)

### 1\) Inserting one row into a table

First, create a new file named insert.py.

Second, define a `insert_vendor()` function in the insert.py file:

```pythonsql
import psycopg2
from config import load_config


def insert_vendor(vendor_name):
    """ Insert a new vendor into the vendors table """

    sql = """INSERT INTO vendors(vendor_name)
             VALUES(%s) RETURNING vendor_id;"""

    vendor_id = None
    config = load_config()

    try:
        with  psycopg2.connect(**config) as conn:
            with  conn.cursor() as cur:
                # execute the INSERT statement
                cur.execute(sql, (vendor_name,))

                # get the generated id back
                rows = cur.fetchone()
                if rows:
                    vendor_id = rows[0]

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        return vendor_id


if __name__ == '__main__':
    insert_vendor("3M Co.")
```

The `insert_vendor()` function will insert a new row into the `vendors` table and return the inserted `vendor_id`.

### 2\) Inserting multiple rows into a table

The steps for inserting multiple rows into a table are similar to the steps for inserting one row.

The key difference is in the third step: instead of calling the `execute()` method of the `cursor` object, you use the `executemany()` method.

For example, the following defines `insert_many_vendors()` function that inserts multiple rows into the `vendors` table:

```python
def insert_many_vendors(vendor_list):
    """ Insert multiple vendors into the vendors table  """

    sql = "INSERT INTO vendors(vendor_name) VALUES(%s) RETURNING *"
    config = load_config()
    try:
        with  psycopg2.connect(**config) as conn:
            with  conn.cursor() as cur:
                # execute the INSERT statement
                cur.executemany(sql, vendor_list)

            # commit the changes to the database
            conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
```

The following uses the `insert_vendor()` and `insert_many_vendors()` functions to insert one and multiple rows into the `vendors` table:

```css
if __name__ == '__main__':
    insert_vendor("3M Co.")

    insert_many_vendors([
        ('AKM Semiconductor Inc.',),
        ('Asahi Glass Co Ltd.',),
        ('Daikin Industries Ltd.',),
        ('Dynacast International Inc.',),
        ('Foster Electric Co. Ltd.',),
        ('Murata Manufacturing Co. Ltd.',)
    ])
```

### 3\) Execute the insert.py module

First, open the Command Prompt on Windows or Terminal on Unix\-like systems.

Second, run the following command to execute the `insert.py` module:

```
python insert.py
```

### 4\) Verify the inserts

First, [connect to the PostgreSQL server](connect) using the `psql`:

```
psql -U postgres
```

Second, change the current database to `suppliers`:

```
\c suppliers
```

Third, retrieve data from the `vendors` table:

```
SELECT * FROM vendors;
```

Output:

```
 vendor_id |          vendor_name
-----------+-------------------------------
         1 | 3M Co.
         2 | AKM Semiconductor Inc.
         3 | Asahi Glass Co Ltd.
         4 | Daikin Industries Ltd.
         5 | Dynacast International Inc.
         6 | Foster Electric Co. Ltd.
         7 | Murata Manufacturing Co. Ltd.
(7 rows)
```

[Download the project source code](/postgresqltutorial/insert.zip)

## Summary

- Use the `execute()` or `executemany()` method of the `cursor` object to insert one or more rows into a table from Python.
