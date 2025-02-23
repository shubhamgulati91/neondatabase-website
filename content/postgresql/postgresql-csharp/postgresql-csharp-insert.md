---
title: 'PostgreSQL C#: Inserting data'
page_title: 'PostgreSQL C#: Insert'
page_description: 'In this tutorial, you will learn how to insert data into a table in PostgreSQL Database from a C# program.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-csharp/postgresql-csharp-insert/'
ogImage: ''
updatedOn: '2024-05-21T03:13:47+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL C#: Creating Tables'
  slug: 'postgresql-csharp/postgresql-csharp-create-table'
nextLink:
  title: 'PostgreSQL C#: Importing Data from a CSV File into a Table'
  slug: 'postgresql-csharp/postgresql-csharp-import-csv-file'
---

**Summary**: in this tutorial, you will learn how to insert data into a table in the PostgreSQL database from a C\# program.

This tutorial begins where the [Creating Tables in PostgreSQL database from a C\# program tutorial](postgresql-csharp-create-table) left off.

## How to insert data into PostgreSQL database using C\#

To insert a new row into a table in a PostgreSQL database from a C\# program, you follow these steps:

First, construct an `INSERT` statement:

```cs
var sql = "INSERT INTO ...";
```

In the SQL statement, you can have one or more parameters in the format `@parameter`. When you execute it, you can bind values to these parameters.

This allows you to prevent SQL injection attacks if the values come from untrusted sources such as form input.

Second, create a new data source from the connection string:

```cs
using var dataSource = NpgsqlDataSource.Create(connectionString);
```

Third, create a `NpgsqlCommand` object from the data source with the `INSERT` statement:

```cs
await using var cmd = dataSource.CreateCommand(sql);
```

Finally, execute the `INSERT` statement by calling the `ExecuteNonQueryAsync()` method of the command object:

```cs
await cmd.ExecuteNonQueryAsync();
```

## Inserting data into a table

The following C\# program inserts a row into the `students` table in the `elearning` database:

```cs
using Npgsql;

var student = new Student("John", "Doe", "[[email protected]](../cdn-cgi/l/email-protection.html)", new DateOnly(2024, 5, 20));


// Construct INSERT statement
var sql = @"INSERT INTO students(first_name, last_name, email, registration_date) " +
          "VALUES(@first_name,@last_name,@email,@registration_date)";

// Get the connection string
string connectionString = ConfigurationHelper.GetConnectionString("DefaultConnection");

try
{
    // Create a new data source
    using var dataSource = NpgsqlDataSource.Create(connectionString);

    // Create a command
    await using var cmd = dataSource.CreateCommand(sql);

    // Bind parameters
    cmd.Parameters.AddWithValue("@first_name", student.FirstName);
    cmd.Parameters.AddWithValue("@last_name", student.LastName);
    cmd.Parameters.AddWithValue("@email", student.Email);
    cmd.Parameters.AddWithValue("@registration_date", student.RegistrationDate);

    await cmd.ExecuteNonQueryAsync();

    Console.WriteLine("The row has been inserted successfully.");

}
catch (NpgsqlException ex)
{
    Console.WriteLine($"Error: {ex.Message}");
}


public record Student(string FirstName, string LastName, string Email, DateOnly RegistrationDate);

```

How it works.

First, create a new [record](https://www.csharptutorial.net/csharp-tutorial/csharp-record/) called `Student` that includes the `FirstName`, `LastName`, `Email`, and `RegistrationDate` fields:

```cs
public record Student(string FirstName, string LastName, string Email, DateOnly RegistrationDate);
```

Second, define a new instance of the `Student` record for insertion into the `students` table:

```cs
var student = new Student("John", "Doe", "[[email protected]](../cdn-cgi/l/email-protection.html)", new DateOnly(2024,5,20));
```

Third, construct an [`INSERT`](../postgresql-tutorial/postgresql-insert) statement that inserts a new row into the `students` table:

```cs
var sql = @"INSERT INTO students(first_name, last_name, email, registration_date) " +
          "VALUES(@first_name,@last_name,@email,@registration_date)";
```

These `@first_name`,`@last_name`,`@email`, and `@registration_date` are placeholders for parameters in the SQL command.

Fourth, get the connection string and establish a connection to the PostgreSQL server:

```cs
// Get the connection string
 string connectionString = ConfigurationHelper.GetConnectionString("DefaultConnection");
```

Fifth, create a new `NpgsqlCommand` object and bind the values to its parameters:

```cs
await using var cmd = new NpgsqlCommand(sql, conn);

// Bind parameters
cmd.Parameters.AddWithValue("@first_name", student.FirstName);
cmd.Parameters.AddWithValue("@last_name", student.LastName);
cmd.Parameters.AddWithValue("@email", student.Email);
cmd.Parameters.AddWithValue("@registration_date", student.RegistrationDate);
```

Sixth, execute the `INSERT` statement by calling the `ExecuteNonQueryAsync()` method:

```cs
await cmd.ExecuteNonQueryAsync();
```

Finally, display an error message if any exceptions occur during the insertion:

```cs
// ...
catch (NpgsqlException ex)
{
    Console.WriteLine($"Error: {ex.Message}");
}
```

## Verify the insert

First, open a terminal and connect to the `elearning` database using the `ed` user:

```cs
psql -U ed -d elearning
```

It’ll prompt you to enter a password for the `ed` user. Input the valid password and press Enter to connect to the PostgreSQL.

Second, query data from the `students` table:

```cs
SELECT * FROM students;
```

Output:

```cs
 id | first_name | last_name |       email        | registration_date
----+------------+-----------+--------------------+-------------------
  1 | John       | Doe       | [[email protected]](../cdn-cgi/l/email-protection.html) | 2024-05-20
(1 row)
```

The output indicates that the program has successfully inserted a new row into the `students` table.

## Summary

- Use the `NpgsqlCommand` object to execute an `INSERT` statement that inserts a row into a table.
