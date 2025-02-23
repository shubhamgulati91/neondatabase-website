---
title: 'PostgreSQL MAX Function'
page_title: 'PostgreSQL MAX() Function'
page_description: 'This tutorial shows you how to use the PostgreSQL MAX() function to get the maximum value of a set of values.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-aggregate-functions/postgresql-max-function/'
ogImage: '/postgresqltutorial/payment-table.png'
updatedOn: '2024-01-26T03:03:53+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL COUNT Function'
  slug: 'postgresql-aggregate-functions/postgresql-count-function'
nextLink:
  title: 'PostgreSQL MIN() Function'
  slug: 'postgresql-aggregate-functions/postgresql-min-function'
---

**Summary**: in this tutorial, you will learn how to use the PostgreSQL `MAX()` function to get the maximum value of a set of values.

## Introduction to PostgreSQL MAX() function

PostgreSQL `MAX()` function is an aggregate function that returns the maximum value in a set of values.

The `MAX()` function can be useful in many cases. For example, you can use it to find the employees with the highest salary or to identify the most expensive products.

Here’s the syntax of the `MAX` function:

```csssql
MAX(expression);
```

You can use the `MAX()` function not just in the [`SELECT`](../postgresql-tutorial/postgresql-select) clause but also in the [`WHERE`](../postgresql-tutorial/postgresql-where) and [`HAVING`](../postgresql-tutorial/postgresql-having) clauses.

## PostgreSQL MAX() function examples

Let’s take some examples of using the `MAX()` function. We’ll use the `payment` table from the [sample database](../postgresql-getting-started/postgresql-sample-database).

[![payment table](/postgresqltutorial/payment-table.png)](/postgresqltutorial/payment-table.png)

### 1\) Basic PostgreSQL MAX() function example

The following query uses the `MAX()` function to find the highest amount paid by customers in the `payment` table:

```sql
SELECT
  MAX(amount)
FROM
  payment;
```

Output:

```text
  max
-------
 11.99
(1 row)
```

### 2\) Using the PostgreSQL MAX() function in subquery

The following example uses the `MAX()` function in a subquery to get the detailed payment information:

```
SELECT
  payment_id,
  customer_id,
  amount
FROM
  payment
WHERE
  amount = (
    SELECT
      MAX (amount)
    FROM
      payment
  );
```

Output:

```text
 payment_id | customer_id | amount
------------+-------------+--------
      20403 |         362 |  11.99
      22650 |         204 |  11.99
      23757 |         116 |  11.99
...
```

How it works.

- First, the subquery uses the `MAX()` function to return the highest payment.
- Second, the outer query retrieves all the payments whose amounts are equal to the highest payment returned from the subquery.

### 3\) Using PostgreSQL MAX() function with the GROUP BY clause

You can combine the `MAX`function with the [`GROUP BY`](../postgresql-tutorial/postgresql-group-by) clause to get the maximum value for each group.

The following example uses the `MAX()` function with a `GROUP BY` clause to retrieve the highest payment paid by each customer.

```
SELECT
  customer_id,
  MAX (amount)
FROM
  payment
GROUP BY
  customer_id;
```

Output:

```text
 customer_id |  max
-------------+-------
         184 |  9.99
          87 | 10.99
         477 | 10.99
         273 |  8.99
```

### 4\) Using PostgreSQL MAX() function with a HAVING clause

If you use the `MAX()` function in a [`HAVING`](../postgresql-tutorial/postgresql-having) clause, you can apply a filter for a group. For example, the following query uses the `MAX()` function to select the highest payment made by each customer and includes those that are over `8.99`:

```
SELECT
  customer_id,
  MAX (amount)
FROM
  payment
GROUP BY
  customer_id
HAVING
  MAX(amount) > 8.99;
```

Output:

```
customer_id |  max
-------------+-------
         184 |  9.99
          87 | 10.99
         477 | 10.99
         550 | 10.99
          51 |  9.99
...
```

## Summary

- Use the PostgreSQL `MAX()` function to find the maximum value of a set.
