---
title: 'PostgreSQL SPLIT_PART() Function'
page_title: 'PostgreSQL SPLIT_PART() Function'
page_description: 'How to use the PostgreSQL SPLIT_PART() function to split a string based on a specified delimiter and return the nth substring.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-string-functions/postgresql-split_part/'
ogImage: '/postgresqltutorial/payment-table.png'
updatedOn: '2024-02-13T13:52:15+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL SUBSTRING() Function'
  slug: 'postgresql-string-functions/postgresql-substring'
nextLink:
  title: 'PostgreSQL REPLACE() Function'
  slug: 'postgresql-string-functions/postgresql-replace'
---

**Summary**: in this tutorial, you will learn how to use the PostgreSQL SPLIT_PART() function to retrieve a part of a string at a specified position after splitting.

## Introduction to the PostgreSQL SPLIT_PART() function

The `SPLIT_PART()` function splits a [string](../postgresql-tutorial/postgresql-char-varchar-text) on a specified delimiter and returns the nth substring.

The following illustrates the syntax of the PostgreSQL `SPLIT_PART()` function:

```phpsql
SPLIT_PART(string, delimiter, position)
```

The `SPLIT_PART()` function requires three arguments:

**1\) `string`**

This is the string to be split.

**2\) `delimiter`**

The delimiter is a string used as the delimiter for splitting.

**3\) `position`**

This is the position of the part to return, starting from 1\. The position must be a positive integer.

If the `position` is greater than the number of parts after splitting, the `SPLIT_PART()` function returns an empty string.

The `SPLIT_PART()` function returns a part as a string at a specified position.

## PostgreSQL SPLIT_PART() function examples

Let’s take some examples of using the PostgreSQL `SPLIT_PART()` function.

### 1\) Basic PostgreSQL SPLIT_PART() function example

The following example uses the `SPLIT_PART()` function to split a string by a comma (`,`) and returns the third substring:

```
SELECT SPLIT_PART('A,B,C', ',', 2);
```

The string `'A,B,C'` is split on the comma delimiter (,) that results in 3 substrings: ‘A’, ‘B’, and ‘C’.

Because the `position` is 2, the function returns the 2nd substring which is ‘B’.

Here is the output:

```text
 split_part
------------
 B
(1 row)
```

### 1\) Using PostgreSQL SPLIT_PART() function with a position that does not exist

The following example returns an empty string because the position is greater than the number of parts (3\):

```
SELECT SPLIT_PART('A,B,C', ',', 4) result;
```

Output:

```
 result
--------

(1 row)
```

### 3\) Using the SPLIT_PART() function with table data

See the following `payment` table in the [sample database.](../postgresql-getting-started/postgresql-sample-database)

![payment table](/postgresqltutorial/payment-table.png)
The following statement uses the `SPLIT_PART()` function to return the year and month of the payment date:

```
SELECT
    split_part(payment_date::TEXT,'-', 1) y,
    split_part(payment_date::TEXT,'-', 2) m,
    amount
FROM
    payment;
```

Output:

```
  y   | m  | amount
------+----+--------
 2007 | 02 |   7.99
 2007 | 02 |   1.99
 2007 | 02 |   7.99
...
```

## Summary

- Use the PostgreSQL `SPLIT_PART()` function to retrieve a part of a string at a specified position after splitting.
