---
title: 'PostgreSQL CLOCK_TIMESTAMP() Function'
page_title: 'PostgreSQL CLOCK_TIMESTAMP() Function'
page_description: 'In this tutorial, you will learn how to use the PostgreSQL CLOCK_TIMESTAMP() function to return the current date and time.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-date-functions/postgresql-clock_timestamp/'
ogImage: ''
updatedOn: '2024-03-20T09:24:37+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL CURRENT_TIMESTAMP Function'
  slug: 'postgresql-date-functions/postgresql-current_timestamp'
nextLink:
  title: 'PostgreSQL STATEMENT_TIMESTAMP() Function'
  slug: 'postgresql-date-functions/postgresql-statement_timestamp'
---

**Summary**: in this tutorial, you will learn how to use the PostgreSQL `CLOCK_TIMESTAMP()` function to return the current date and time.

## Introduction to the PostgreSQL CLOCK_TIMESTAMP() function

The `CLOCK_TIMESTAMP()` function returns the current date and time with a timezone.

Here’s the basic syntax of the `CLOCK_TIMESTAMP()` function:

```sql
CLOCK_TIMESTAMP()
```

The `CLOCK_TIMESTAMP()` function has no parameters.

The `CLOCK_TIMESTAMP()` function returns the current date and time as a [timestamp with a timezone](postgresql-current_timestamp).

When you call the `CLOCK_TIMESTAMP()` function multiple times within a statement, you’ll get different results.

## PostgreSQL CLOCK_TIMESTAMP() function examples

Let’s take some examples of using the `CLOCK_TIMESTAMP()` function.

### 1\) Basic CLOCK_TIMESTAMP() function example

The following example uses the `CLOCK_TIMESTAMP()` function to obtain the current date and time:

```sql
SELECT CLOCK_TIMESTAMP();
```

Output:

```text
        clock_timestamp
-------------------------------
 2024-03-20 14:49:07.875891-07
(1 row)
```

The result is a timestamp with a time zone.

### 2\) Calling CLOCK_TIMESTAMP() function multiple times within a statement

The following example calls the `CLOCK_TIMESTAMP()` function multiple times within a statement:

```sql
SELECT
  clock_timestamp(),
  pg_sleep(3),
  clock_timestamp(),
  pg_sleep(3),
  clock_timestamp();
```

Output:

```sql
-[ RECORD 1 ]---+------------------------------
clock_timestamp | 2024-03-20 14:51:21.92144-07
pg_sleep        |
clock_timestamp | 2024-03-20 14:51:24.924244-07
pg_sleep        |
clock_timestamp | 2024-03-20 14:51:27.931263-07
```

The output shows that the `CLOCK_TIMESTAMP()` function returns the actual date and time between the calls within the same statement.

### 3\) Using the CLOCK_TIMESTAMP() function to measure the execution time of a statement

First, [define a new function](../postgresql-plpgsql/postgresql-create-function) called `time_it` to measure the execution time of a statement:

```sql
CREATE OR REPLACE FUNCTION time_it(
    p_statement TEXT
) RETURNS NUMERIC AS $$
DECLARE
    start_time TIMESTAMP WITH TIME ZONE;
    end_time TIMESTAMP WITH TIME ZONE;
    execution_time NUMERIC; -- ms
BEGIN
    -- Capture start time
    start_time := CLOCK_TIMESTAMP();

    -- Execute the statement
    EXECUTE p_statement;

    -- Capture end time
    end_time := CLOCK_TIMESTAMP();

    -- Calculate execution time in milliseconds
    execution_time := EXTRACT(EPOCH FROM end_time - start_time) * 1000;

    RETURN execution_time;
END;
$$ LANGUAGE plpgsql;
```

Second, use the `time_it()` function to measure the execution time of the statement that uses the `pg_sleep()` function:

```sql
SELECT time_it('SELECT pg_sleep(1)');
```

Output:

```text
   time_it
-------------
 1007.731000
```

It takes about 1008 ms or 1s to complete.

## Summary

- Use the `CLOCK_TIMESTAMP()` function to return the current date and time.
