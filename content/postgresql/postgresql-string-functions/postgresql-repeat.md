---
title: 'PostgreSQL REPEAT() Function'
page_title: 'PostgreSQL REPEAT() Function'
page_description: 'In this tutorial, you will learn how to use the PostgreSQL REPEAT() function to repeat a string a specified number of times.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-string-functions/postgresql-repeat/'
ogImage: 'https://www.mysqltutorial.org//postgresqltutorial/products.svg'
updatedOn: '2024-01-28T13:56:31+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL REVERSE() Function'
  slug: 'postgresql-string-functions/postgresql-reverse'
nextLink:
  title: 'PostgreSQL LENGTH() Function'
  slug: 'postgresql-string-functions/postgresql-length-function'
---

**Summary**: in this tutorial, you will learn how to use the PostgreSQL `REPEAT()` function to repeat a string a specified number of times.

## Introduction to PostgreSQL REPEAT() function

In PostgreSQL, the `REPEAT()` function repeats a string a specified number of times.

Here’s the basic syntax of the `REPEAT()` function:

```sql
REPEAT(string, number)
```

In this syntax:

- `string`. The string that you want to repeat.
- `number`. The number of times that you want to repeat the `string` in the resulting string.

The `REPEAT()` function returns a string that repeats `number` times. If the `number` is less than 1, the function returns an empty string.

If `string` or `number` is `NULL`, the `REPEAT()` function returns `NULL`.

The `REPEAT()` function can be particularly useful when you want to format the data for display.

## PostgreSQL REPEAT() function examples

Let’s explore some examples of using the `REPEAT()` function.

### 1\) Basic REPEAT() function example

The following example uses the `REPEAT()` function to repeat the letter “A” there times:

```sql
SELECT REPEAT('A',3);
```

Output:

```text
 repeat
--------
 AAA
(1 row)
```

In this example, the `REPEAT()` function returns a string `"AAA"` that repeats the letter `"A"` three times.

### 2\) Using the REPEAT() function to draw a bar chart

We’ll use the `film` table from the [sample database](../postgresql-getting-started/postgresql-sample-database) for the demonstration:

![PostgreSQL REPEAT() Function - Sample Table](https://www.mysqltutorial.org//postgresqltutorial/products.svg)
The following example uses the `REPEAT()` function to create a bar chart illustrating the counts of films based on their ratings:

```sql
SELECT
  rating,
  count(film_id),
  REPEAT(
    '*',
    (
      COUNT(film_id) / 10
    ) :: INT
  ) chart
FROM
  film
GROUP BY
  rating;
```

Output:

```text
 rating | count |         chart
--------+-------+------------------------
 PG-13  |   223 | **********************
 NC-17  |   210 | *********************
 R      |   195 | *******************
 G      |   178 | *****************
 PG     |   194 | *******************
(5 rows)
```

## Summary

- Use the `REPEAT()` function to repeat a string a specified number of times.
