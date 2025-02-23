---
title: 'PostgreSQL Python'
page_title: 'PostgreSQL Python'
page_description: 'This PostgreSQL Python section shows how to work with PostgreSQL from Python programming language using the psycopg2 database driver.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-python/'
ogImage: 'https://www.postgresqltutorial.com//postgresqltutorial/PostgreSQL-Python.png'
updatedOn: '2024-05-19T08:36:25+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL PHP: Delete Data From a Table'
  slug: 'postgresql-php/delete'
nextLink:
  title: 'PostgreSQL Python: Connect to PostgreSQL Database Server'
  slug: 'postgresql-python/connect'
---

This PostgreSQL Python section shows you how to work with PostgreSQL using the [Python programming language](https://www.pythontutorial.net/).

Python has various database drivers for PostgreSQL. Currently, the [psycopg](http://initd.org/psycopg/) is the most popular PostgreSQL database adapter for the Python language. The psycopg fully implements the Python DB\-API 2\.0 specification.

The current version of the psycopg is 2 or psycopg2\. The psycopg2 database adapter is implemented in C as a [libpq](https://www.postgresql.org/docs/9.0/static/libpq.html) wrapper resulting in both fast and secure. The psycopg2 provides many useful features such as client\-side and server\-side [cursors](postgresql-plpgsql/plpgsql-cursor), asynchronous notification and communication, COPY command support, etc.

Besides, the psycopg2 driver supports many Python types out\-of\-the\-box. The psycopg2 matches Python objects to the [PostgreSQL data types](postgresql-tutorial/postgresql-data-types), e.g., list to the [array](postgresql-tutorial/postgresql-array), tuples to records, and dictionary to [hstore](postgresql-tutorial/postgresql-hstore).  If you want to customize and extend the type adaption, you can use a flexible object adaption system.

This PostgreSQL Python section covers the most common activities for interacting with PostgreSQL in Python applications:

- [Connecting to the PostgreSQL database server](postgresql-python/connect) – show you how to connect to the PostgreSQL database server from Python.
- [Creating new PostgreSQL tables in Python](postgresql-python/create-tables) – show you how to create new tables in PostgreSQL from Python.
- [Inserting data into the PostgreSQL table in Python](postgresql-python/insert) – explain to you how to insert data into a PostgreSQL database table in Python.
- [Updating data in the PostgreSQL table in Python](postgresql-python/update) – learn various ways to update data in the PostgreSQL table.
- [Transaction](postgresql-python/transaction) – show you how to perform transactions in Python.
- [Calling a PostgreSQL function in Python](postgresql-python/postgresql-python-call-postgresql-functions) – show you step by step how to call a PostgreSQL function in Python.
- [Calling a PostgreSQL stored procedure in Python](postgresql-python/call-stored-procedures) – guide you on how to call a stored procedure from in a Python application.
- [Handling PostgreSQL BLOB data in Python](postgresql-python/blob)– give you an example of inserting and selecting the PostgreSQL BLOB data in a Python application.
- [Querying data from the PostgreSQL tables](postgresql-python/query) – walk you through the steps of querying data from the PostgreSQL tables in a Python application.
- [Deleting data from PostgreSQL tables in Python](postgresql-python/delete) – show you how to delete data in a table in Python.

For demonstration purposes, we will use the `suppliers` sample database. The following picture illustrates the structure of the `suppliers` database:

![PostgreSQL Python Sample Database Diagram](/postgresqltutorial/PostgreSQL-Python-Sample-Database-Diagram.png)The `suppliers` database has the following tables:

1. `vendors` table: stores vendor data.
2. `parts` table: stores parts data.
3. `parts_drawings` table: stores the drawing of a part.
4. `vendor_parts` table: stores the data of which parts are supplied by which vendor.
