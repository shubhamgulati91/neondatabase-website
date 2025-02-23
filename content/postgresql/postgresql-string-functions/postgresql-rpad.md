---
title: 'PostgreSQL RPAD() Function'
page_title: 'PostgreSQL RPAD() Function'
page_description: 'In this tutorial, you will learn how to use the PostgreSQL RPAD() function to extend a string to a length by filing characters.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-string-functions/postgresql-rpad/'
ogImage: '/postgresqltutorial/film.png'
updatedOn: '2024-01-29T01:09:47+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL LPAD() Function'
  slug: 'postgresql-string-functions/postgresql-lpad'
nextLink:
  title: 'PostgreSQL CONCAT() Function'
  slug: 'postgresql-string-functions/postgresql-concat-function'
---

**Summary**: in this tutorial, you will learn how to use the PostgreSQL `RPAD()` function to extend a string to a length by filing characters.

## Introduction to the PostgreSQL RPAD() function

The `RPAD()` function allows you to extend a string to a length by appending specified characters.

Here’s the basic syntax of the `RPAD()` function:

```sqlsql
RPAD(string, length, fill)
```

In this syntax:

- `string`: The input string that you want to extend.
- `length`: The desired length of the string after padding.
- `fill`: The character or string used for padding.

The `RPAD()` function returns the string, right\-padded with the string `fill` to a length of `length` characters.

If the length of the `string` is greater than the desired `length`, the `RPAD()` function truncates the `string` to the `length` characters.

If any argument `string`, `length`, or `fill` is `NULL`, the `RPAD()` function returns [`NULL`](https://www.mysqltutorial.org/mysql-basics/mysql-null/).

The `RPAD()` function can be particularly useful when you need to format text with a consistent length, align text in columns, or prepare data for display.

To left\-pad a string to a length with specified characters, you can use the [`LPAD()`](postgresql-lpad) function.

## PostgreSQL RPAD() function examples

Let’s explore some examples of using the PostgreSQL `RPAD()` function.

### 1\) Basic PostgreSQL RPAD() function

The following example uses the `RPAD()` function to extend a string by filling zeros (‘0’) to make it six characters long:

```sql
SELECT RPAD('123', 6, '0');
```

Output:

```text
  rpad
--------
 123000
(1 row)
```

### 2\) Using the RPAD() function with the table data example

We’ll use the `film` table from the [sample database](../postgresql-getting-started/postgresql-sample-database):

![](/postgresqltutorial/film.png)The following example uses the `RPAD()` function to right\-pad the titles from the `film` table with the character ‘.’ to make it 50 characters long:

```sql
SELECT
  RPAD(title, 50, '.')
FROM
  film;
```

Output:

```text
                        rpad
----------------------------------------------------
 Chamber Italian...................................
 Grosse Wonderful..................................
 Airport Pollock...................................
 Bright Encounters.................................
 Academy Dinosaur..................................
...
```

### 3\) Using the RPAD() function to truncate strings

The following example uses the `RPAD()` function to truncate the titles if their lengths are more than 10 characters:

```
SELECT
  title, RPAD(title, 10, '') result
FROM
  film;
```

Output:

```
            title            |   result
-----------------------------+------------
 Chamber Italian             | Chamber It
 Grosse Wonderful            | Grosse Won
 Airport Pollock             | Airport Po
 Bright Encounters           | Bright Enc
 Academy Dinosaur            | Academy Di
 Ace Goldfinger              | Ace Goldfi
...
```

## Summary

- Use PostgreSQL `RPAD()` function to extend a string to a length by appending specified characters.
