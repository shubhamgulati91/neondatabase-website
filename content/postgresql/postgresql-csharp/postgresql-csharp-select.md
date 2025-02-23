---
title: 'PostgreSQL C#: Selecting Data'
page_title: 'PostgreSQL C#: Selecting Data'
page_description: 'In this tutorial, you will learn how to retrieve data from a PostgreSQL table from the C# program.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-csharp/postgresql-csharp-select/'
ogImage: ''
updatedOn: '2024-05-21T03:40:01+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL C#: Deleting Data'
  slug: 'postgresql-csharp/postgresql-csharp-delete'
nextLink:
  title: 'PostgreSQL C#: Transaction'
  slug: 'postgresql-csharp/postgresql-csharp-transaction'
---

**Summary**: in this tutorial, you will learn how to retrieve data from a PostgreSQL table from the C\# program.

This tutorial begins where [Deleting data from PostgreSQL using C\#](postgresql-csharp-delete) is left off.

## How to query data from PostgreSQL using C\#

To query data from PostgreSQL using C\# ADO.NET, you follow these steps:

First, create a data source that represents the PostgreSQL database.

Second, create a command object `NpgsqlCommand` with a `SELECT` statement from the data source.

Third, execute the `SELECT` statement by calling one of the following methods of the `NpgsqlCommand` object:

- `ExecuteReaderAsync()` – executes a query that returns a result set. The method returns a `NpgsqlDataReader` that can be used to read rows from the query’s result set.
- `ExecuteScalarAsync()` – executes a query that returns a scalar value such as a query that uses an [aggregate function](../postgresql-aggregate-functions) to return a [count](../postgresql-aggregate-functions/postgresql-count-function), [sum](../postgresql-aggregate-functions/postgresql-sum-function), [maximum](../postgresql-aggregate-functions/postgresql-max-function), [minimum](../postgresql-aggregate-functions/postgresql-min-function), and [average value](../postgresql-aggregate-functions/postgresql-avg-function).

Finally, iterate over the result set and use the Get\* methods of the NpgsqlDataReader object to retrieve the values of columns in each row.

## Querying all rows from a table

The following program queries all rows from the `students` table in the `elearning` database:

```cs
using Npgsql;

var sql = @"SELECT
              id,
              first_name,
              last_name,
              email,
              registration_date
            FROM
              students";

string connectionString = ConfigurationHelper.GetConnectionString("DefaultConnection");

try
{
    // Open a connection
    await using var dataSource = NpgsqlDataSource.Create(connectionString);

    // Create a Command
    await using var cmd = dataSource.CreateCommand(sql);

    // Create a new data reader
    using var reader = await cmd.ExecuteReaderAsync();

    // Read data from the table
    while (await reader.ReadAsync())
    {
        var id = reader.GetInt32(0);
        var firstName = reader.GetString(1);
        var lastName = reader.GetString(2);
        var email = reader.GetString(3);
        var registrationDate = reader.GetDateTime(4);

        // Display the student details
        Console.WriteLine($"{id}\t{firstName}\t{lastName}\t{email}\t{registrationDate.ToShortDateString()}");
    }
}
catch (NpgsqlException ex)
{
    Console.WriteLine($"Error: {ex.Message}");
}
```

Output:

```cs
2       Emma    Smith   [[email protected]](../cdn-cgi/l/email-protection.html)    5/20/2024
3       Liam    Johnson [[email protected]](../cdn-cgi/l/email-protection.html)  5/20/2024
4       Olivia  Williams        [[email protected]](../cdn-cgi/l/email-protection.html)       5/20/2024
5       Noah    Brown   [[email protected]](../cdn-cgi/l/email-protection.html)    5/15/2024
6       Ava     Jones   [[email protected]](../cdn-cgi/l/email-protection.html)     5/15/2024
7       William Garcia  [[email protected]](../cdn-cgi/l/email-protection.html)        5/15/2024
8       Sophia  Miller  [[email protected]](../cdn-cgi/l/email-protection.html) 5/10/2024
9       James   Davis   [[email protected]](../cdn-cgi/l/email-protection.html)   5/10/2024
10      Isabella        Rodriguez       [[email protected]](../cdn-cgi/l/email-protection.html)    5/10/2024
11      Benjamin        Martinez        [[email protected]](../cdn-cgi/l/email-protection.html)     5/10/2024
```

## Querying data with parameters

The following program shows how to retrieve the students who registered on `2024-05-10` from the `students` table:

```cs
using Npgsql;

var sql = @"SELECT
              first_name,
              registration_date
            FROM
              students
            WHERE
              registration_date=@registration_date";

string connectionString = ConfigurationHelper.GetConnectionString("DefaultConnection");

try
{
    // Open a connection
    await using var dataSource = NpgsqlDataSource.Create(connectionString);


    // Create a Command
    await using var cmd = dataSource.CreateCommand(sql);

    cmd.Parameters.AddWithValue(
        "@registration_date",
        new DateOnly(2024, 5, 10)
    );

    // Create a new data reader
    using var reader = await cmd.ExecuteReaderAsync();

    // Read data from the table
    while (await reader.ReadAsync())
    {
        var firstName = reader.GetString(0);
        var registrationDate = reader.GetDateTime(1);

        Console.WriteLine($"{firstName}\t{registrationDate.ToShortDateString()}");
    }
}
catch (NpgsqlException ex)
{
    Console.WriteLine($"Error: {ex.Message}");
}
```

Output:

```cs
Sophia  5/10/2024
James   5/10/2024
Isabella        5/10/2024
Benjamin        5/10/2024
```

## Querying a scalar value

The following program shows how to select the total number of students from the `students` table using the [count(\*)](../postgresql-aggregate-functions/postgresql-count-function) aggregate function:

```cs
using Npgsql;

var sql = @"SELECT count(*) FROM students";

string connectionString = ConfigurationHelper.GetConnectionString("DefaultConnection");

try
{
    // Open a connection
    await using var dataSource = NpgsqlDataSource.Create(connectionString);

    // Create a Command
    await using var cmd = dataSource.CreateCommand(sql);

    // Return the total number of students
    var studentCount = await cmd.ExecuteScalarAsync();

    Console.WriteLine($"Student count: {studentCount}");
}
catch (NpgsqlException ex)
{
    Console.WriteLine($"Error: {ex.Message}");
}
```

Output:

```
Student count: 10
```

## Summary

- Call the `ExecuteReaderAsync()` method of a `NpgsqlCommand` object to execute a query that returns a result set.
- Call the `ExecuteScalarAsync()` method of the `NpgsqlCommand` object to execute a query that returns a scalar value.
