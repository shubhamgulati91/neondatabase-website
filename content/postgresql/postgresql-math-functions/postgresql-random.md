---
title: 'PostgreSQL RANDOM() Function'
page_title: 'PostgreSQL RANDOM() Function'
page_description: 'In this tutorial, you will learn how to use the PostgreSQL RANDOM() function to generate random values.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-math-functions/postgresql-random/'
ogImage: ''
updatedOn: '2024-02-16T14:56:59+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL RADIANS() Function'
  slug: 'postgresql-math-functions/postgresql-radians'
nextLink:
  title: 'PostgreSQL ROUND() Function'
  slug: 'postgresql-math-functions/postgresql-round'
---

**Summary**: in this tutorial, you will learn how to use the PostgreSQL `RANDOM()` function to generate random values.

## Introduction to the PostgreSQL RANDOM() function

The `RANDOM()` function allows you to generate random values. Here’s the basic syntax of the `RANDOM()` function:

```sql
RANDOM()
```

The `RANDOM()` function returns a random value between 0 and 1\.

In practice, you’ll find the `RANDOM()` function useful in various applications such as:

- Generate random data.
- Shuffling results.
- Select random rows from a table.

## PostgreSQL RANDOM() function examples

Let’s take some examples of using the PostgreSQL `RANDOM` function.

### 1\) Basic PostgreSQL RANDOM() function example

The following query uses the `RANDOM()` function to generate a random value between 0 and 1:

```sql
SELECT RANDOM() AS random;
```

Output:

```text
       random
--------------------
 0.1118658328429385
(1 row)
```

### 2\) Generating random integers

To generate a random integer, you need to use the `RANDOM()` function with the [`FLOOR()`](postgresql-floor) function. For example, the following generates a random integer between 1 and 100:

```sql
SELECT floor(random() * 100) + 1 AS random_integer;
```

Sample output:

```text
 random_integer
----------------
             34
(1 row)
```

### 3\) Retrieving random records

Sometimes, you may need to retrieve random records from a table. To do that, you can utilize the `RANDOM()` function in conjunction with the `ORDER` `BY` clause.

For example, the following query uses the `RANDOM()` function to retrieve a random film from the `film` table in the [sample database](../postgresql-getting-started/postgresql-sample-database):

```sql
SELECT title
FROM film
ORDER BY RANDOM()
LIMIT 1;
```

Sample output:

```text
       title
-------------------
 Outfield Massacre
(1 row)
```

### 4\) Shuffling results

You can use the `RANDOM()` function to shuffle the rows in a result set of a query.

For example, the following query uses the `RANDOM()` function to shuffle the rows from the film table:

```sql
SELECT title FROM film ORDER BY RANDOM();
```

Sample output:

```text
            title
-----------------------------
 Shootist Superfly
 Beauty Grease
 Craft Outfield
 Amistad Midsummer
 Lord Arizona
...
```

### 5\) Seed for reproducibility

By default, PostgreSQL uses a deterministic pseudo\-random number generator to generate random numbers.

But if you need to generate the same random number, you can reissue the `SETSEED()` function in the same session with the same argument.

For example, the following query always returns the same random number:

```sql
SELECT SETSEED(0.5), RANDOM();
```

## Summary

- Use the `RANDOM()` function to generate a random number between 0 and 1\.
