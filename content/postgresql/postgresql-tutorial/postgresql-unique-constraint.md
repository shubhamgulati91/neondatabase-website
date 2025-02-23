---
title: 'PostgreSQL UNIQUE Constraint'
page_title: 'PostgreSQL UNIQUE Constraint'
page_description: 'Learn how to use a PostgreSQL UNIQUE constraint to ensure values stored in a column or a group of columns are unique across rows.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-unique-constraint/'
ogImage: ''
updatedOn: '2024-01-25T09:57:33+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL CHECK Constraints'
  slug: 'postgresql-tutorial/postgresql-check-constraint'
nextLink:
  title: 'PostgreSQL Not-Null Constraint'
  slug: 'postgresql-tutorial/postgresql-not-null-constraint'
---

**Summary**: in this tutorial, you will learn about PostgreSQL `UNIQUE` constraint to make sure that values stored in a column or a group of columns are unique across rows in a table.

## Introduction to PostgreSQL UNIQUE constraint

Sometimes, you want to ensure that values stored in a column or a group of columns are unique across the whole table such as email addresses or usernames.

PostgreSQL provides you with the `UNIQUE` constraint that maintains the uniqueness of the data correctly.

When a `UNIQUE` constraint is in place, every time you [insert a new row](postgresql-insert), it checks if the value is already in the table. It rejects the change and issues an error if the value already exists. The same process is carried out for [updating existing data](postgresql-update).

When you add a `UNIQUE` constraint to a column or a group of columns, PostgreSQL will automatically create a [unique index](../postgresql-indexes/postgresql-unique-index) on the column or the group of columns.

## PostgreSQL UNIQUE constraint example

The following statement [creates a new table](postgresql-create-table) named `person` with a `UNIQUE` constraint for the `email` column.

```sql
CREATE TABLE person (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR (50),
  last_name VARCHAR (50),
  email VARCHAR (50) UNIQUE
);
```

Note that the `UNIQUE` constraint above can be rewritten as a table constraint as shown in the following query:

```sql
CREATE TABLE person (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR (50),
  last_name VARCHAR (50),
  email VARCHAR (50),
  UNIQUE(email)
);
```

First, insert a new row into the `person` table using [`INSERT`](postgresql-insert) statement:

```sql
INSERT INTO person(first_name,last_name,email)
VALUES('john','doe','[[email protected]](../cdn-cgi/l/email-protection.html)');
```

Second, insert another row with a duplicate email.

```sql
INSERT INTO person(first_name,last_name,email)
VALUES('jack','doe','[[email protected]](../cdn-cgi/l/email-protection.html)');
```

PostgreSQL issued an error message.

```sql
[Err] ERROR:  duplicate key value violates unique constraint "person_email_key"
DETAIL:  Key (email)=([[email protected]](../cdn-cgi/l/email-protection.html)) already exists.
```

## Creating a UNIQUE constraint on multiple columns

PostgreSQL allows you to create a `UNIQUE` constraint to a group of columns using the following syntax:

```sql
CREATE TABLE table (
    c1 data_type,
    c2 data_type,
    c3 data_type,
    UNIQUE (c2, c3)
);
```

The combination of values in the columns c2 and c3 will be unique across the whole table. The value of the column c2 or c3 needs not to be unique.

## Adding unique constraints using a unique index

Sometimes, you may want to add a unique constraint to an existing column or group of columns. Let’s take a look at the following example.

First, suppose you have a table named `equipment`:

```sql
CREATE TABLE equipment (
  id SERIAL PRIMARY KEY,
  name VARCHAR (50) NOT NULL,
  equip_id VARCHAR (16) NOT NULL
);
```

Second, create a unique index based on the `equip_id` column.

```sql
CREATE UNIQUE INDEX CONCURRENTLY equipment_equip_id
ON equipment (equip_id);
```

Third, add a unique constraint to the `equipment` table using the `equipment_equip_id` index.

```sql
ALTER TABLE equipment
ADD CONSTRAINT unique_equip_id
UNIQUE USING INDEX equipment_equip_id;
```

Notice that the [`ALTER TABLE`](postgresql-alter-table) statement acquires an exclusive lock on the table. If you have any pending transactions, it will wait for all transactions to complete before changing the table. Therefore, you should check the pg_stat_activity table to see the current pending transactions that are ongoing using the following query:

```sql
SELECT
  datid,
  datname,
  usename,
  state
FROM
  pg_stat_activity;
```

You should look at the result to find the `state` column with the value  `idle in transaction`. Those are the transactions that are pending to complete.

## Summary

- Use the `UNIQUE` constraints to enforce values stored in a column or a group of columns unique across rows within the same table.
