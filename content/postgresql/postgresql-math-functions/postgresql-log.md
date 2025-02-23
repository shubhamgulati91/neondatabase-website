---
title: 'PostgreSQL LOG() Function'
page_title: 'PostgreSQL LOG() Function'
page_description: 'In this tutorial, you will learn how to use the PostgreSQL LOG() function to calculate the logarithm of a number'
prev_url: 'https://www.postgresqltutorial.com/postgresql-math-functions/postgresql-log/'
ogImage: ''
updatedOn: '2024-04-19T01:55:53+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL LN() Function'
  slug: 'postgresql-math-functions/postgresql-ln'
nextLink:
  title: 'PostgreSQL POWER() Function'
  slug: 'postgresql-math-functions/postgresql-power'
---

**Summary**: in this tutorial, you will learn how to use the PostgreSQL `LOG()` function to calculate the logarithm of a number

## Introduction to the PostgreSQL LOG() function

In PostgreSQL, the `LOG()` function allows you to calculate the logarithm of a number. PostgreSQL offers two `LOG()` functions:

Base\-10 logarithm: The base\-10 logarithm is the most commonly used logarithm in science and engineering applications.

Here’s the syntax of the `LOG()` function that calculates the base\-10 logarithm of a number:

```sql
LOG(n)
```

In this syntax:

- `n` is a number with the type [numeric](../postgresql-tutorial/postgresql-numeric) or [double precision](../postgresql-tutorial/postgresql-double-precision-type) you want to calculate the base\-10 logarithm.

The `LOG()` function returns the base\-10 logarithm with the same type as the type of the input number (`n`), which is `numeric` and `double precision` respectively. If n is `NULL` the `LOG()` function returns `NULL`.

If `n` is a text string, the `LOG()` function will attempt to convert it into a number before calculating the logarithm. It raises an error if the conversion fails.

The second `LOG()` function allows you to calculate the logarithm of a number with a specified base:

```sql
LOG(b, n)
```

In this syntax:

- `b` is the base of the logarithm. `b` can be a value of the [numeric](../postgresql-tutorial/postgresql-numeric) type.
- `n` has the same meaning in the `LOG(n)` function.

To calculate the natural logarithm of a number, you use the `LN()` function instead.

## PostgreSQL LOG() function examples

Let’s take some examples of using the `LOG()` function.

### 1\) Basic PostgreSQL LOG() function examples

The following example uses the `LOG()` function to calculate the base\-10 logarithm of `100`:

```sql
SELECT LOG(100);
```

Output:

```text
 log
-----
   2
```

The following statement uses the second form of the `LOG()` function to calculate the base\-10 logarithm of 100:

```sql
SELECT LOG(10,100);
```

Output:

```text
        log
--------------------
 2.0000000000000000
```

The following statement uses the `LOG()` function to calculate the base\-2 logarithm of 8:

```sql
SELECT LOG(2,8);
```

Output:

```text
        log
--------------------
 3.0000000000000000
```

### 2\) Using LOG() function with text

The following statement uses the `LOG()` function to calculate the base\-2 logarithm of the text `'64'`:

```sql
SELECT LOG(2, '64');
```

Output:

```text
        log
--------------------
 6.0000000000000000
(1 row)
```

In this example, the `LOG()` function converts the text `'64'` into a number and calculate the base\-2 logarithm of 64\.

The following example raises an error because the `LOG()` function cannot convert the string `'64x'` into a number for calculation:

```sql
SELECT LOG('64x');
```

Error:

```sql
ERROR:  invalid input syntax for type double precision: "64x"
LINE 1: SELECT LOG('64x');                  ^
```

## Summary

- Use `LOG(n)` function to calculate the base\-10 logarithm of the number `n`.
- Use `LOG(b, n)` function to calculate the logarithm of the number `n` with the base `b`.
