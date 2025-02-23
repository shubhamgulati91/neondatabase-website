---
title: 'How to Generate a Random Number in a Range'
page_title: 'How to Generate a Random Number in A Range'
page_description: 'This tutorial shows you how to develop a user-defined function that generates a random number in a range'
prev_url: 'https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-random-range/'
ogImage: ''
updatedOn: '2024-02-17T02:51:29+00:00'
enableTableOfContents: true
previousLink:
  title: 'How to Compare Two Tables in PostgreSQL'
  slug: 'postgresql-tutorial/compare-two-tables-in-postgresql'
nextLink:
  title: 'How To Delete Duplicate Rows in PostgreSQL'
  slug: 'postgresql-tutorial/how-to-delete-duplicate-rows-in-postgresql'
---

**Summary**: This tutorial shows you how to develop a user\-defined function that generates a random number between two numbers.

PostgreSQL provides the [`random()`](../postgresql-math-functions/postgresql-random) function that returns a random number between 0 and 1\. The following statement returns a random number between 0 and 1\.

```sql
SELECT random();
```

```text
      random
-------------------
 0.867320362944156
(1 row)
```

To generate a random number between 1 and 11, you use the following statement:

```sql
SELECT random() * 10 + 1 AS RAND_1_11;
```

```text
    rand_1_11
------------------
 7.75778411421925
(1 row)
```

If you want to generate the random number as an integer, you apply the `floor()` function to the expression as follows:

```sql
SELECT floor(random() * 10 + 1)::int;
```

```text
 floor
-------
     9
(1 row)
```

Generally, to generate a random number between two integers low and high, you use the following statement:

```sql
SELECT floor(random() * (high-low+1) + low)::int;
```

You can [develop a user\-defined function](../postgresql-plpgsql/postgresql-create-function) that returns a random number between two numbers `low` and `high`:

```sql
CREATE OR REPLACE FUNCTION random_between(low INT ,high INT)
   RETURNS INT AS
$$
BEGIN
   RETURN floor(random()* (high-low + 1) + low);
END;
$$ language 'plpgsql' STRICT;
```

The following statement calls the `random_between()` function and returns a random number between 1 and 100:

```sql
SELECT random_between(1,100);
```

```text
 random_between
----------------
             81
(1 row)
```

If you want to get multiple random numbers between two integers, you use the following statement:

```sql
SELECT random_between(1,100)
FROM generate_series(1,5);
```

```text
 random_between
----------------
             37
             82
             19
             92
             43
(5 rows)
```

In this tutorial, you have learned how to generate a random number between a range of two numbers.
