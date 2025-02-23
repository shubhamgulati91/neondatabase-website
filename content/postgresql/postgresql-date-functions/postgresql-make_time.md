---
title: 'PostgreSQL MAKE_TIME() Function'
page_title: 'PostgreSQL MAKE_TIME() Function'
page_description: 'In this tutorial, you will learn how to use the PostgreSQL MAKE_TIME() function to create a time value from hour, minute, and second values.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-date-functions/postgresql-make_time/'
ogImage: ''
updatedOn: '2024-03-25T02:56:31+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL MAKE_DATE() Function'
  slug: 'postgresql-date-functions/postgresql-make_date'
nextLink:
  title: 'PostgreSQL AGE() Function'
  slug: 'postgresql-date-functions/postgresql-age'
---

**Summary**: in this tutorial, you will learn how to use the PostgreSQL `MAKE_TIME()` function to create a time value from hour, minute, and second values.

## Introduction to the PostgreSQL MAKE_TIME() function

The `MAKE_TIME()` function allows you to create a [time](../postgresql-tutorial/postgresql-time) value from hour, minute, and second values.

Here’s the syntax of the `MAKE_TIME()` function:

```sql
MAKE_TIME ( hour int, min int, sec double precision ) → time
```

In this syntax:

- `hour`: The hour part of the time. The valid range for the hour is from 0 to 23\. 0 represents midnight (12:00 AM) and 24 represents noon.
- `min`: The minute part of the time. The valid range for the second is from 0 to 59\.
- `sec`: The second within a minute. Its valid range is from 0 to `59.999999`.

The `MAKE_TIME()` function returns a time value constructed from the hour, min, and sec.

If you use invalid values for hour, min, and sec, the function will issue an error.

## PostgreSQL MAKE_TIME() function examples

Let’s explore some examples of using the `MAKE_TIME()` function.

### 1\) Basic MAKE_TIME() function examples

The following example uses the `MAKE_TIME()` function to construct a time `22:30:45` from hour, minute, and second:

```sql
SELECT MAKE_TIME(22,30,45);
```

Output:

```text
 make_time
-----------
 22:30:45
(1 row)
```

The following example attempts to use invalid values for hour, minute, and second to construct a time and results in an error:

```sql
SELECT MAKE_TIME(25,30,45);
```

Error:

```sql
ERROR:  time field value out of range: 25:30:45
```

### 2\) Using the MAKE_TIME() function with string arguments

Even though the type of hour and minute parameters are integers and seconds are double precision, you can pass string arguments to the `MAKE_TIME()` function.

Behind the scenes, the function will implicitly convert these string arguments to the proper types, as long as the results of the conversions are in the valid range.

```sql
SELECT MAKE_TIME('8', '30', '59.999999');
```

Output:

```text
    make_time
-----------------
 08:30:59.999999
(1 row)
```

## Summary

- Use the `MAKE_TIME()` function to create a time value from hour, minute, and second values.
