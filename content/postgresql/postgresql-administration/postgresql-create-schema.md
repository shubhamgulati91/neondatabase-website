---
title: 'PostgreSQL CREATE SCHEMA'
page_title: 'PostgreSQL CREATE SCHEMA Statement'
page_description: 'In this tutorial, you will learn how to use the PostgreSQL CREATE SCHEMA statement to create a new schema in a database.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-administration/postgresql-create-schema/'
ogImage: '/postgresqltutorial/postgresql-create-schema-example.png'
updatedOn: '2024-02-12T12:34:40+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL Schema'
  slug: 'postgresql-administration/postgresql-schema'
nextLink:
  title: 'PostgreSQL ALTER SCHEMA'
  slug: 'postgresql-administration/postgresql-alter-schema'
---

**Summary**: in this tutorial, you will learn how to use the PostgreSQL `CREATE SCHEMA` statement to create a new schema in a database.

## Introduction to PostgreSQL CREATE SCHEMA statement

The `CREATE SCHEMA` statement allows you to create a new [schema](postgresql-schema) in the current database.

The following illustrates the syntax of the `CREATE SCHEMA` statement:

```csssql
CREATE SCHEMA [IF NOT EXISTS] schema_name;
```

In this syntax:

- First, specify the name of the schema after the `CREATE SCHEMA` keywords. The schema name must be unique within the current database.
- Second, optionally use `IF NOT EXISTS` to conditionally create the new schema only if it does not exist. Attempting to create a new schema that already exists without using the `IF NOT EXISTS` option will result in an error.

Note that to execute the `CREATE SCHEMA` statement, you must have the `CREATE` privilege in the current database.

You can also create a schema for a user:

```css
CREATE SCHEMA [IF NOT EXISTS]
AUTHORIZATION username;
```

In this case, the schema will have the same name as the `username`.

PostgreSQL allows you to create a schema and a list of objects such as tables and [views](../postgresql-views) using a single statement as follows:

```css
CREATE SCHEMA schema_name
    CREATE TABLE table_name1 (...)
    CREATE TABLE table_name2 (...)
    CREATE VIEW view_name1
        SELECT select_list FROM table_name1;
```

Notice that each subcommand does not end with a semicolon (;).

## PostgreSQL CREATE SCHEMA statement examples

Let’s take some examples of using the `CREATE SCHEMA` statement.

### 1\) Basic CREATE SCHEMA statement example

The following statement uses the `CREATE SCHEMA` statement to create a new schema named `marketing`:

```
CREATE SCHEMA marketing;
```

The following statement returns all schemas from the current database:

```
SELECT *
FROM pg_catalog.pg_namespace
ORDER BY nspname;
```

This picture shows the output:

![postgresql create schema example](/postgresqltutorial/postgresql-create-schema-example.png)

### 2\) Using CREATE SCHEMA statement to create a schema for a user example

First, [create a new role](postgresql-roles) with named `john`:

```php
CREATE ROLE john
LOGIN
PASSWORD 'Postgr@s321!';
```

Second, create a schema for `john`:

```
CREATE SCHEMA AUTHORIZATION john;
```

Third, create a new schema called `doe` that will be owned by `john`:

```
CREATE SCHEMA IF NOT EXISTS doe AUTHORIZATION john;
```

### 3\) Using CREATE SCHEMA statement to create a schema and its objects example

The following example uses the `CREATE SCHEMA` statement to create a new schema named `scm`. It also creates a table named `deliveries` and a view named `delivery_due_list` that belongs to the `scm` schema:

```
CREATE SCHEMA scm
    CREATE TABLE deliveries(
        id SERIAL NOT NULL,
        customer_id INT NOT NULL,
        ship_date DATE NOT NULL
    )
    CREATE VIEW delivery_due_list AS
        SELECT ID, ship_date
        FROM deliveries
        WHERE ship_date <= CURRENT_DATE;
```

## Summary

- Use the PostgreSQL `CREATE SCHEMA` statement to create a new schema in a database.
