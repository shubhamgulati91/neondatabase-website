---
title: 'PostgreSQL Cross Join'
page_title: 'PostgreSQL CROSS JOIN'
page_description: 'In this tutorial, you will learn how to use the PostgreSQL CROSS JOIN to produce the cartesian product of rows from the joined tables.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-cross-join/'
ogImage: '/postgresqltutorial/PostgreSQL-CROSS-JOIN-illustration.png'
updatedOn: '2024-04-08T04:05:33+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL FULL OUTER JOIN'
  slug: 'postgresql-tutorial/postgresql-full-outer-join'
nextLink:
  title: 'PostgreSQL NATURAL JOIN'
  slug: 'postgresql-tutorial/postgresql-natural-join'
---

**Summary**: in this tutorial, you will learn how to use the PostgreSQL `CROSS JOIN` to produce a cartesian product of rows from the joined tables.

## Introduction to the PostgreSQL CROSS JOIN clause

In PostgreSQL, a cross\-join allows you to join two tables by combining each row from the first table with every row from the second table, resulting in a complete combination of all rows.

In the set theory, we can say that a cross\-join produces the [cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) of rows in two tables.

Unlike other [join](postgresql-joins) clauses such as [LEFT JOIN](postgresql-left-join)  or [INNER JOIN](postgresql-inner-join), the `CROSS JOIN` clause does not have a join predicate.

Suppose you have to perform a `CROSS JOIN` of `table1` and `table2`.

If `table1` has `n` rows and `table2` has `m` rows, the `CROSS JOIN` will return a result set that has `nxm` rows.

For example, the `table1` has `1,000` rows and `table2` has `1,000` rows, the result set will have `1,000 x 1,000` \= `1,000,000` rows.

Because a `CROSS JOIN` may generate a large result set, you should use it carefully to avoid performance issues.

Here’s the basic syntax of the `CROSS JOIN` syntax:

```sqlsql
SELECT
  select_list
FROM
  table1
CROSS JOIN table2;
```

The following statement is equivalent to the above statement:

```sql
SELECT
  select_list
FROM
  table1,table2;
```

Alternatively, you can use an `INNER JOIN` clause with a condition that always evaluates to true to simulate a cross\-join:

```sql
SELECT
  select_list
FROM
  table1
  INNER JOIN table2 ON true;
```

## PostgreSQL CROSS JOIN example

The following [CREATE TABLE](postgresql-create-table) statements create `T1` and `T2` tables and [insert sample data](postgresql-insert) for the cross\-join demonstration.

```sql
DROP TABLE IF EXISTS T1;

CREATE TABLE
  T1 (LABEL CHAR(1) PRIMARY KEY);

DROP TABLE IF EXISTS T2;

CREATE TABLE
  T2 (score INT PRIMARY KEY);

INSERT INTO
  T1 (LABEL)
VALUES
  ('A'),
  ('B');

INSERT INTO
  T2 (score)
VALUES
  (1),
  (2),
  (3);
```

The following statement uses the `CROSS JOIN` operator to join `T1` table with `T2` table:

```sql
SELECT *
FROM T1
CROSS JOIN T2;
```

```
 label | score
-------+-------
 A     |     1
 B     |     1
 A     |     2
 B     |     2
 A     |     3
 B     |     3
(6 rows)
```

The following picture illustrates how the `CROSS JOIN` works when joining the `T1` table with the `T2` table:

![PostgreSQL CROSS JOIN illustration](/postgresqltutorial/PostgreSQL-CROSS-JOIN-illustration.png)

## Some practical examples of using CROSS JOIN

In practice, you can find the `CROSS JOIN` useful when you need to combine data from two tables without specific matching conditions. For example:

### 1\) Scheduling

Suppose you have a table for `employees` and `shifts`, and you want to create a schedule that lists all possible combinations of employees and shifts to explore various staffing scenarios:

```
SELECT *
FROM employees
CROSS JOIN shift;
```

### 2\) Inventory management

In an inventory management system, you have tables for `warehouses` and `products`. A `CROSS JOIN` can help you analyze the availability of each product in every warehouse:

```sql
SELECT *
FROM products
CROSS JOIN warehouses;
```

## Summary

- Use the PostgreSQL `CROSS JOIN` clause to make a cartesian product of rows in two tables.
