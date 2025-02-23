---
title: 'PostgreSQL REAL Data Type'
page_title: 'PostgreSQL REAL Data Type'
page_description: 'In this tutorial, you will learn how to use the PostgreSQL REAL data type to store single-precision floating-point numbers in the database.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-real-data-type/'
ogImage: ''
updatedOn: '2024-04-19T03:13:41+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL DOUBLE PRECISION Data Type'
  slug: 'postgresql-tutorial/postgresql-double-precision-type'
nextLink:
  title: 'PostgreSQL Integer Data Types'
  slug: 'postgresql-tutorial/postgresql-integer'
---

**Summary**: in this tutorial, you will learn how to use the PostgreSQL `REAL` data type to store single\-precision floating\-point numbers in the database.

## Introduction to the PostgreSQL REAL data type

The `REAL` data type allows you to store single\-precision floating\-point numbers in the database.

A value of the real type takes 4 bytes of storage space. Its valid range is from `-3.40282347 × 1038` and `3.40282347 × 1038`.

Typically, you use the `REAL` data type to store floating\-point numbers with relatively large ranges and precision is not critical, or when you are concerned about the storage space.

However, you can use the [double precision](postgresql-double-precision-type) data type if you need higher precision.

## PostgreSQL REAL data type example

First, [create a table](postgresql-create-table) called `weathers` to store wind speed (meter per second) and temperature (celsius) data:

```sql
CREATE TABLE weathers(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    location VARCHAR(255) NOT NULL,
    wind_speed_mps REAL NOT NULL,
    temperature_celsius REAL NOT NULL,
    recorded_at TIMESTAMP NOT NULL
);
```

Second, [insert rows](postgresql-insert) into the `weathers` table:

```sql
INSERT INTO weathers (location, wind_speed_mps, temperature_celsius, recorded_at)
VALUES
    ('New York', 5.2, 15.3, '2024-04-19 09:00:00'),
    ('New York', 4.8, 14.9, '2024-04-19 10:00:00'),
    ('New York', 6.0, 16.5, '2024-04-19 11:00:00'),
    ('New York', 5.5, 15.8, '2024-04-19 12:00:00'),
    ('New York', 4.3, 14.2, '2024-04-19 13:00:00'),
    ('New York', 5.9, 16.1, '2024-04-19 14:00:00'),
    ('New York', 6.8, 17.3, '2024-04-19 15:00:00'),
    ('New York', 5.1, 15.6, '2024-04-19 16:00:00'),
    ('New York', 4.7, 14.8, '2024-04-19 17:00:00'),
    ('New York', 5.3, 15.9, '2024-04-19 18:00:00');
```

Third, calculate the [average](../postgresql-aggregate-functions/postgresql-avg-function) wind speed and temperature in `New York` on `April 19, 2024`:

```sql
SELECT
  AVG(wind_speed_mps)       wind_speed,
  AVG(temperature_celsius) temperature_celsius
FROM
  weathers
WHERE
  location = 'New York'
  AND DATE(recorded_at) = '2024-04-19';
```

Output:

```text
    wind_speed     | temperature_celsius
-------------------+---------------------
 5.360000038146973 |  15.639999961853027
(1 row)
```

## Summary

- Use the PostgreSQL `REAL` data type to store single\-precision floating\-point numbers in the database.
