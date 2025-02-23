---
title: 'How to Compare Two Tables in PostgreSQL'
page_title: 'How to Compare two Tables in PostgreSQL'
page_description: 'In this tutorial, you will learn how to compare two tables in PostgreSQL using the EXCEPT and UNION operators or an outer join.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-tutorial/compare-two-tables-in-postgresql/'
ogImage: '/postgresqltutorial/compare-two-tables-postgresql.jpg'
updatedOn: '2024-02-01T14:06:45+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL Composite Types'
  slug: 'postgresql-tutorial/postgresql-composite-types'
nextLink:
  title: 'How to Generate a Random Number in a Range'
  slug: 'postgresql-tutorial/postgresql-random-range'
---

**Summary**: in this tutorial, you will learn various ways to compare two tables in PostgreSQL.

There are several ways to compare the content of two tables to find the differences between them. We will show you two commonly used techniques to compare the data from two tables.

## Comparing two tables using EXCEPT and UNION operators

First, [create table](postgresql-create-table) two tables called `foo` and `bar`, and [insert](postgresql-insert) some sample data for demonstration purposes:

```phpsql
CREATE TABLE foo (
  id INT PRIMARY KEY,
  name VARCHAR (50)
);

CREATE TABLE bar (
  id INT PRIMARY KEY,
  name VARCHAR (50)
);

INSERT INTO foo (id, name)
VALUES
  (1, 'a'),
  (2, 'b');

INSERT INTO bar (id, name)
VALUES
  (1, 'a'),
  (2, 'b');

```

The `foo` table has the same structure and data as the `bar` table.

Next, [update](postgresql-update) one row in the `bar` table.

```sql
UPDATE
  bar
SET
  name = 'c'
WHERE
  id = 2;
```

![compare-two-tables-postgresql](/postgresqltutorial/compare-two-tables-postgresql.jpg)Then, find the rows in the `foo` table but not in the `bar` table using the following [query](postgresql-select):

```sql
SELECT
  id,
  name,
  'not in bar' AS note
FROM
  foo
EXCEPT
SELECT
  id,
  name,
  'not in bar' AS note
FROM
  bar;

```

Output:

```text
 id | name |    note
----+------+------------
  2 | b    | not in bar
(1 row)
```

We used the `EXCEPT` operator that returns the rows in the `foo` table but not in the `bar` table. We can apply the same technique to find the rows that are in the `bar` table but not in the `foo` table.

```
SELECT
  ID,
  NAME,
  'not in foo' AS note
FROM
  bar
EXCEPT
SELECT
  ID,
  NAME,
  'not in foo' AS note
FROM
  foo;
```

Output:

```text
 id | name |    note
----+------+------------
  2 | c    | not in foo
(1 row)
```

Finally, use the [UNION operator](postgresql-union) to combine the results of both queries to find the rows in the `bar` table but not in the `foo` table and vice versa:

```
SELECT
  id,
  name,
  'not in bar' AS note
FROM
  foo
EXCEPT
SELECT
  id,
  name,
  'not in bar' AS note
FROM
  bar
UNION
SELECT
  ID,
  NAME,
  'not in foo' AS note
FROM
  bar
EXCEPT
SELECT
  ID,
  NAME,
  'not in foo' AS note
FROM
  foo;
```

Output:

```
 id | name |    note
----+------+------------
  2 | c    | not in foo
  2 | b    | not in bar
(2 rows)
```

## Comparing two tables using an outer join

You can use the outer join to compare two tables as follows:

```
SELECT
  id,
  name
FROM
  foo FULL
  OUTER JOIN bar USING (id, name)
WHERE
  foo.id IS NULL
  OR bar.id IS NULL;
```

It returns the differences between the two tables:

```text
 id | name
----+------
  2 | b
  2 | c
(2 rows)
```

To find the number of rows that are in the `foo` table but not `bar` table and vice versa, you use the [COUNT function](../postgresql-aggregate-functions/postgresql-count-function) as follows:

```
SELECT
  COUNT (*)
FROM
  foo FULL
  OUTER JOIN bar USING (id, name)
WHERE
  foo.id IS NULL
  OR bar.id IS NULL;
```

Output:

```
 count
-------
     2
(1 row)

```

## Summary

- Use `UNION` and `EXCEPT` operators or outer join to compare two tables in PostgreSQL.
