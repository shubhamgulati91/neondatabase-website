---
title: 'How To Delete Duplicate Rows in PostgreSQL'
page_title: 'How to Delete Duplicate Rows in PostgreSQL'
page_description: 'This tutorial shows you how to use various techniques: DELETE join, subquery, and immediate table to delete duplicate rows in PostgreSQL.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-tutorial/how-to-delete-duplicate-rows-in-postgresql/'
ogImage: ''
updatedOn: '2024-02-01T03:13:27+00:00'
enableTableOfContents: true
previousLink:
  title: 'How to Generate a Random Number in a Range'
  slug: 'postgresql-tutorial/postgresql-random-range'
nextLink:
  title: 'PostgreSQL CASE'
  slug: 'postgresql-tutorial/postgresql-case'
---

**Summary**: in this tutorial, you will learn how to use various techniques to delete duplicate rows in PostgreSQL.

## Preparing sample data

First, [create a new table](postgresql-create-table) named `basket` that stores fruits:

```sql
CREATE TABLE basket(
    id SERIAL PRIMARY KEY,
    fruit VARCHAR(50) NOT NULL
);
```

Second, [insert](postgresql-insert) some fruits into the `basket` table.

```sql
INSERT INTO basket(fruit)
VALUES
  ('apple'),
  ('apple'),
  ('orange'),
  ('orange'),
  ('orange'),
  ('banana');
```

Third, [query data](postgresql-select) from the `basket` table:

```sql
SELECT
    id,
    fruit
FROM
    basket;
```

Output:

```text
 id | fruit
----+--------
  1 | apple
  2 | apple
  3 | orange
  4 | orange
  5 | orange
  6 | banana
(6 rows)
```

The output indicates some duplicate rows such as 2 apples and 3 oranges in the `basket` table.

## Finding duplicate rows

If the table has few rows, you can easily see which ones are duplicates immediately. However, this is not the case with a table that has lots of rows.

The find the duplicate rows, you use the following statement:

```
SELECT
    fruit,
    COUNT( fruit )
FROM
    basket
GROUP BY
    fruit
HAVING
    COUNT( fruit )> 1
ORDER BY
    fruit;
```

Output:

```text
 fruit  | count
--------+-------
 apple  |     2
 orange |     3
(2 rows)
```

## Deleting duplicate rows using DELETE USING statement

The following statement uses the `DELETE USING` statement to remove duplicate rows:

```
DELETE FROM
    basket a
        USING basket b
WHERE
    a.id < b.id
    AND a.fruit = b.fruit;
```

In this example, we joined the `basket` table to itself and checked if two different rows (a.id \< b.id) have the same value in the `fruit` column.

The following query retrieves data from the `basket` table to verify the duplication removal:

```sql
SELECT
	id,
	fruit
FROM
	basket;
```

Output:

```text
 id | fruit
----+--------
  2 | apple
  5 | orange
  6 | banana
(3 rows)
```

The output indicates that the statement removes the duplicate rows with the lowest IDs and keeps the one with the highest id.

If you want to keep the duplicate rows with the lowest id, you need to flip the operator in the `WHERE` clause:

```
DELETE  FROM
    basket a
        USING basket b
WHERE
    a.id > b.id
    AND a.fruit = b.fruit;
```

To check whether the statement works correctly, let’s verify the data in the `basket` table:

```sql
SELECT
    id,
    fruit
FROM
    basket;
```

Output:

```text
 id | fruit
----+--------
  1 | apple
  3 | orange
  6 | banana
(3 rows)
```

The output indicates that duplicate rows with the lowest ids are retained.

## Deleting duplicate rows using subquery

The following statement uses a subquery to delete duplicate rows and keep the row with the lowest id.

```
DELETE FROM basket
WHERE id IN
    (SELECT id
    FROM
        (SELECT id,
         ROW_NUMBER() OVER( PARTITION BY fruit
        ORDER BY  id ) AS row_num
        FROM basket ) t
        WHERE t.row_num > 1 );
```

In this example, the subquery returned the duplicate rows except for the first row in the duplicate group. The outer `DELETE` statement deleted the duplicate rows returned by the subquery.

If you want to keep the duplicate row with the highest ID, just change the order in the subquery:

```sql
DELETE FROM basket
WHERE id IN
    (SELECT id
    FROM
        (SELECT id,
         ROW_NUMBER() OVER( PARTITION BY fruit
        ORDER BY  id DESC ) AS row_num
        FROM basket ) t
        WHERE t.row_num > 1 );
```

In case you want to delete duplicates based on values of multiple columns, here is the query template:

```sql
DELETE FROM table_name
WHERE id IN
    (SELECT id
    FROM
        (SELECT id,
         ROW_NUMBER() OVER( PARTITION BY column_1,
         column_2
        ORDER BY  id ) AS row_num
        FROM table_name ) t
        WHERE t.row_num > 1 );
```

In this case, the statement will delete all rows with duplicate values in the `column_1` and `column_2` columns.

## Deleting duplicate rows using an immediate table

To delete rows using an immediate table, you use the following steps:

1. [Create a new table](postgresql-create-table) with the same structure as the one whose duplicate rows should be removed.
2. [Insert](postgresql-insert) [distinct](postgresql-select-distinct) rows from the source table to the immediate table.
3. [Drop](postgresql-drop-table) the source table.
4. [Rename](postgresql-rename-table) the immediate table to the name of the source table.

The following illustrates the steps for removing duplicate rows from the `basket` table:

```sql
-- step 1
CREATE TABLE basket_temp (LIKE basket);

-- step 2
INSERT INTO basket_temp(fruit, id)
SELECT
    DISTINCT ON (fruit) fruit,
    id
FROM basket;

-- step 3
DROP TABLE basket;

-- step 4
ALTER TABLE basket_temp
RENAME TO basket;
```

In this tutorial, you have learned how to delete duplicate rows in PostgreSQL using the `DELETE USING` statement, subquery, and the immediate table techniques.
