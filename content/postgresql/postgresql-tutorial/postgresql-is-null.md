---
title: 'PostgreSQL IS NULL'
page_title: 'PostgreSQL IS NULL'
page_description: 'In this tutorial, you will learn how to use the PostgreSQL IS NULL operator to check if a value is NULL or not.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-is-null/'
ogImage: '/postgresqltutorial/address.png'
updatedOn: '2024-05-14T13:59:22+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL LIKE'
  slug: 'postgresql-tutorial/postgresql-like'
nextLink:
  title: 'PostgreSQL Joins'
  slug: 'postgresql-tutorial/postgresql-joins'
---

**Summary**: in this tutorial, you will learn how to use the PostgreSQL `IS NULL` operator to check if a value is NULL or not.

## Introduction to NULL

In the database world, NULL means missing information or not applicable. NULL is not a value, therefore, you cannot compare it with other values like numbers or strings.

The comparison of NULL with a value will always result in NULL. Additionally, NULL is not equal to NULL so the following expression returns NULL:

```phpsqlsql
SELECT null = null AS result;
```

Output:

```text
 result
--------
 null
(1 row)
```

## IS NULL operator

To check if a value is NULL or not, you cannot use the equal to (`=`) or not equal to (`<>`) operators. Instead, you use the `IS NULL` operator.

Here’s the basic syntax of the `IS NULL` operator:

```sql
value IS NULL
```

The `IS NULL` operator returns true if the `value` is NULL or false otherwise.

To negate the `IS NULL` operator, you use the `IS NOT NULL` operator:

```php
value IS NOT NULL
```

The `IS NOT NULL` operator returns true if the value is not NULL or false otherwise.

To learn how to deal with NULL in sorting, check out the [ORDER BY tutorial](postgresql-order-by).

PostgreSQL offers some useful functions to handle NULL effectively such as [NULLIF](postgresql-nullif), [ISNULL](postgresql-isnull), and [COALESCE](postgresql-coalesce).

To ensure that a column does not contain NULL, you use the [NOT NULL constraint](postgresql-not-null-constraint).

## PostgreSQL IS NULL operator examples

We’ll use the `address` table from the [sample database](../postgresql-getting-started/postgresql-sample-database):

![address table](/postgresqltutorial/address.png)
Please note that the `psql` program displays `NULL` as an empty string by default. To change how `psql` shows NULL in the terminal, you can use the command: `\pset null null`. It will display NULL as null.

### 1\) Basic IS NULL operator example

The following example uses the `IS NULL` operator to find the addresses from the `address` table that the `address2` column contains `NULL`:

```php
SELECT
  address,
  address2
FROM
  address
WHERE
  address2 IS NULL;
```

Output:

```
       address        | address2
----------------------+----------
 47 MySakila Drive    | null
 28 MySQL Boulevard   | null
 23 Workhaven Lane    | null
 1411 Lillydale Drive | null
(4 rows)
```

### 2\) Using the IS NOT NULL operator example

The following example uses the `IS NOT NULL` operator to retrieve the address that has the `address2` not NULL:

```
SELECT
  address,
  address2
FROM
  address
WHERE
  address2 IS NOT NULL;
```

Output:

```
                address                 | address2
----------------------------------------+----------
 1913 Hanoi Way                         |
 1121 Loja Avenue                       |
 692 Joliet Street                      |
 1566 Inegl Manor                       |
```

Notice that the `address2` is empty, not NULL. This is a good example of **bad practice** when it comes to storing empty strings and NULL in the same column.

To fix it, you can use the `UPDATE` statement to change the empty strings to NULL in the `address2` column, which you will learn in the [UPDATE tutorial](postgresql-update).

## Summary

- In databases, NULL means missing information or not applicable.
- The `IS NULL` operator returns true if a value is NULL or false otherwise.
- Use the `IS NOT NULL` operator returns true if a value is not NULL or false otherwise.
