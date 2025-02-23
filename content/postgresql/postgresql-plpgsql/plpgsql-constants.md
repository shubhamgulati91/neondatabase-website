---
title: 'PL/pgSQL Constants'
page_title: 'PL/pgSQL Constants'
page_description: 'In this tutorial, you will learn how to declare and PL/pgSQL constants in a block.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-plpgsql/plpgsql-constants/'
ogImage: ''
updatedOn: '2024-03-19T02:45:18+00:00'
enableTableOfContents: true
previousLink:
  title: 'PL/pgSQL Record Types'
  slug: 'postgresql-plpgsql/plpgsql-record-types'
nextLink:
  title: 'PL/pgSQL Errors and Messages'
  slug: 'postgresql-plpgsql/plpgsql-errors-messages'
---

**Summary**: in this tutorial, you will learn about PL/pgSQL constants whose values cannot be changed.

## Introduction to PL/pgSQL constants

In PL/pgSQL, constants are identifiers whose values cannot be changed during the execution of the code.

Typically, you use constants to assign meaningful names to values that remain constants throughout the execution of a [block](plpgsql-block-structure), a [function](../postgresql-functions), or a [stored procedure](postgresql-create-procedure).

The following are the reasons to use constants:

First, constants make code more readable and maintainable. Suppose you have the following formula:

```sqlsql
selling_price = net_price + net_price * 0.1;
```

In this formula, the magic value 0\.1 does not convey any meaning.

However, when using the following formula, the meaning for determining the selling price becomes clear:

```sql
selling_price = net_price + net_price * vat;
```

Second, constants help reduce maintenance effort.

Suppose you have a formula that calculates the selling price throughout a function. When the VAT changes from 0\.1 to 0\.12, you’ll need to update all of these hard\-coded values.

By using a constant, you only need to modify its value in one place where you define the constant.

So how do you define a constant in PL/pgSQL?

## Defining constants

To define a constant in PL/pgSQL, you use the following syntax:

```sql
constant_name constant data_type = expression;
```

In this syntax:

- First, specify the name of the constant. The name should be as descriptive as possible.
- Second, add the `constant` keyword after the name and specify the [data type](../postgresql-tutorial/postgresql-data-types) of the constant.
- Third, initialize a value for the constant after the assignment operator (`=`).

## PL/pgSQL constants example

The following example declares a constant named `vat` that stores the value\-added tax and calculates the selling price from the net price:

```sql
do $$
declare
   vat constant numeric = 0.1;
   net_price    numeric = 20.5;
begin
   raise notice 'The selling price is %', net_price * ( 1 + vat );
end $$;
```

Output:

```sql
NOTICE:  The selling price is 22.55
```

Now, if you try to change the value of the constant as follows:

```sql
do $$
declare
   vat constant numeric = 0.1;
   net_price    numeric = 20.5;
begin
   raise notice 'The selling price is %', net_price * ( 1 + vat);
   vat = 0.05; -- error
end $$;
```

You will get the following error message:

```sql
ERROR: "vat" is declared CONSTANT
SQL state: 22005
Character: 155
```

Similar to the default value of a [variable](plpgsql-variables), PostgreSQL evaluates the value for the constant when the block is entered at run\-time, not compile\-time. For example:

```sql
do $$
declare
   started_at constant time := clock_timestamp();
begin
   -- pause 3s
   perform pg_sleep(3);

   -- show the current time
   raise notice '3s later';
   raise notice 'Current time: %', clock_timestamp();

   -- pause 3s
   perform pg_sleep(3);
   -- show the value of the started_at
   -- later than the one above
   raise notice 'Started at: %', started_at;
end $$;
```

Output:

```
NOTICE:  3s later
NOTICE:  Current time: 2024-03-19 09:30:09.28782+07
NOTICE:  Started at: 09:30:06.276246
DO
```

## Summary

- A constant holds a value that cannot be changed.
- Use the `constant` keyword to define a constant in PL/pgSQL.
