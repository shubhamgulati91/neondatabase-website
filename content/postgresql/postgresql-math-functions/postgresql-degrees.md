---
title: 'PostgreSQL DEGREES() Function'
page_title: 'PostgreSQL DEGREES() Function'
page_description: 'In this tutorial, you will learn how to use the PostgreSQL DEGREES() function to convert radians to degrees.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-math-functions/postgresql-degrees/'
ogImage: ''
updatedOn: '2024-02-18T03:54:44+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL DIV() Function'
  slug: 'postgresql-math-functions/postgresql-div'
nextLink:
  title: 'PostgreSQL EXP() Function'
  slug: 'postgresql-math-functions/postgresql-exp'
---

**Summary**: in this tutorial, you will learn how to use the PostgreSQL `DEGREES()` function to convert radians to degrees.

## Introduction to the PostgreSQL DEGREES() function

The `DEGREES()` function converts radians to degrees. Here’s the syntax of the `DEGREES()` function:

```sql
DEGREES(radians_value)
```

In this syntax, the `radians_value` is a value in radians that you want to convert to degrees.

The `DEGREES()` function returns the value of the `radians_value` in degrees.

If the `radians_value` is `NULL`, the `DEGREES()` function returns `NULL`.

## PostgreSQL DEGREES() function examples

Let’s take some examples of using the `DEGREES()` function.

### 1\) Basic DEGREES() function examples

The following example uses the `DEGREES()` function to convert 1 radian to its equivalent degrees:

```sql
SELECT DEGREES(1);
```

Output:

```text
      degrees
-------------------
 57.29577951308232
(1 row)
```

The following example uses the `DEGREES()` function to convert the value of π (pi) radians to its equivalent in degrees:

```sql
SELECT DEGREES(PI());
```

Output:

```text
 degrees
---------
     180
(1 row)
```

Note that the `PI()` function returns the value of π (pi) radians.

### 2\) Using the DEGREES() function with table data

First, [create a new table](../postgresql-tutorial/postgresql-create-table) called `angles` to store radian data:

```sql
CREATE TABLE angles (
    id SERIAL PRIMARY KEY,
    angle_radians NUMERIC
);
```

Second, [insert some rows](../postgresql-tutorial/postgresql-insert) into the `angles` table:

```sql
INSERT INTO angles (angle_radians)
VALUES
    (2*PI()),
    (PI()),
    (PI()/2),
    (NULL)
RETURNING *;
```

Third, use the `DEGREES()` function to convert radians to degrees:

```sql
SELECT
    id,
    angle_radians,
    ROUND(DEGREES(angle_radians)::numeric, 0) AS angle_degrees
FROM
    angles;
```

Output:

```text
 id |  angle_radians   | angle_degrees
----+------------------+---------------
  1 | 6.28318530717959 |           360
  2 | 3.14159265358979 |           180
  3 |  1.5707963267949 |            90
  4 |             null |          null
(4 rows)
```

## Summary

- Use the PostgreSQL `DEGREES()` function to convert radians to degrees.
