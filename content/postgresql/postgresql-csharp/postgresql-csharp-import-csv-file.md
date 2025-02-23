---
title: 'PostgreSQL C#: Importing Data from a CSV File into a Table'
page_title: 'PostgreSQL C#: Import Data from a CSV File into a Table'
page_description: 'In this tutorial, you will learn how to import data from a CSV file into a table in PostgreSQL using C#.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-csharp/postgresql-csharp-import-csv-file/'
ogImage: ''
updatedOn: '2024-05-21T03:19:12+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL C#: Inserting data'
  slug: 'postgresql-csharp/postgresql-csharp-insert'
nextLink:
  title: 'PostgreSQL C#: Updating Data'
  slug: 'postgresql-csharp/postgresql-csharp-update'
---

**Summary**: in this tutorial, you will learn how to import data from a CSV file into a table in PostgreSQL using C\#.

This tutorial begins where the [Inserting data into a table in PostgreSQL tutoria](postgresql-csharp-insert)l left off.

## How to import a CSV file into the PostgreSQL database using C\#

To import data from a CSV file into a table in PostgreSQL from a C\# program, you follow these steps:

- First, read data from the CSV file into a list of records.
- Second, iterate over the list and [insert each record into the table](postgresql-csharp-insert).

## Importing a CSV file into PostgreSQL

The following program illustrates how to import data from `students.csv` file into the `students` table in the `elearning` database:

```cs
using CsvHelper;
using System.Globalization;
using Npgsql;

namespace ELearning;

public record Student(string FirstName, string LastName, string Email, DateOnly RegistrationDate);

public class Program
{
    public static IEnumerable<Student> ReadStudentsFromCSV(string filePath)
    {
        using var reader = new StreamReader(filePath);
        using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);

        // Skip header of the csv file
        csv.Read();

        // Read the header of the csv file to map to fields
        csv.ReadHeader();

        while (csv.Read())
        {
            var firstName = csv.GetField<string>("Firstname");
            var lastName = csv.GetField<string>("Lastname");
            var email = csv.GetField<string>("Email");
            var registrationDate = csv.GetField<DateOnly>("RegistrationDate");

            yield return new Student(firstName, lastName, email, registrationDate);
        }
    }
    public static async Task Main()
    {
        var csvFilePath = @"c:\db\students.csv";

        var sql = @"INSERT INTO students(first_name, last_name, email, registration_date) " +
          "VALUES(@first_name,@last_name,@email,@registration_date)";

        string connectionString = ConfigurationHelper.GetConnectionString("DefaultConnection");

        try
        {
            // Create a new data source

            await using var dataSource = NpgsqlDataSource.Create(connectionString);


            // Insert lines of CSV into the students table
            foreach (var student in ReadStudentsFromCSV(csvFilePath))
            {
                await using var cmd = dataSource.CreateCommand(sql);

                cmd.Parameters.AddWithValue("@first_name", student.FirstName);
                cmd.Parameters.AddWithValue("@last_name", student.LastName);
                cmd.Parameters.AddWithValue("@email", student.Email);
                cmd.Parameters.AddWithValue("@registration_date", student.RegistrationDate);

                await cmd.ExecuteNonQueryAsync();
            }
        }
        catch (NpgSQLException ex)
        {
            Console.WriteLine(ex.Message);
        }
    }
}
```

In this program, we use an external package for reading a CSV file called `CsvHelper`. You can install the `CsvHelper` package by running the following command in the Package Manager Console:

```cs
Install-Package CsvHelper
```

To learn more details on reading data from a CSV file using the `CsvHelper` package, check out the tutorial on [how to read a CSV file in C\# using the CsvHelper package](https://www.csharptutorial.net/csharp-file/csharp-read-csv-file/).

Note that you can [download the students.csv file](/postgresqltutorial/students.csv) from here.

Let’s discuss how the program works.

### Declaring Student record

Define a `Student` [record](https://www.csharptutorial.net/csharp-tutorial/csharp-record/) that includes the following fields: `FirstName`, `LastName`, `Email`, and `RegistrationDate`:

```cs
public record Student(string FirstName, string LastName, string Email, DateOnly RegistrationDate);
```

### Defining ReadStudentsFromCSV() method

The `ReadStudentsFromCSV()` method reads data from a CSV file specified by a `filePath` and returns an enumerable sequence of `Student` records.

```cs
public static IEnumerable<Student> ReadStudentsFromCSV(string filePath)
{
    using var reader = new StreamReader(filePath);
    using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);

    // Skip header of the csv file
    csv.Read();

    // Read the header of the csv file to map to fields
    csv.ReadHeader();

    while (csv.Read())
    {
        var firstName = csv.GetField<string>("Firstname");
        var lastName = csv.GetField<string>("Lastname");
        var email = csv.GetField<string>("Email");
        var registrationDate = csv.GetField<DateOnly>("RegistrationDate");

        yield return new Student(firstName, lastName, email, registrationDate);
    }
}
```

How it works.

First, create a `StreamReader` from the CSV file specified by the `filePath`. The `using` statement ensures that the `StreamReader` is properly closed:

```cs
using var reader = new StreamReader(filePath);
```

Second, create a `CsvReader` to parse the CSV data. The `CultureInfo.InvariantCulture` ensures consistent parsing across different locales:

```cs
using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
```

Third, read the heading line from a CSV file, which advances the reader to the next line in the CSV file:

```cs
csv.Read();
```

Fourth, read the header row of the CSV file to map the column names to fields:

```cs
csv.ReadHeader();
```

Fifth, start a loop that iterates over each line in the CSV file. The `Read()` method reads the next line from the CSV file and returns true if successful, or false if there are no more lines:

```cs
while (csv.Read())
```

Sixth, retrieve the values of the columns of the CSV file:

```cs
var firstName = csv.GetField<string>("Firstname");
var lastName = csv.GetField<string>("Lastname");
var email = csv.GetField<string>("Email");
var registrationDate = csv.GetField<DateOnly>("RegistrationDate");
```

Finally, return a new `Student` record for each row in the CSV file. The `yield return` returns multiple `Student` records iteratively without loading them all in memory:

```cs
yield return new Student(firstName, lastName, email, registrationDate);
```

### Defining Main() method

First, declare a variable `csvFilePath` and initialize it with the path to the CSV file:

```cs
var csvFilePath = @"c:\db\students.csv";
```

Next, declare a variable `sql` and initialize it with an SQL `INSERT` statement:

```cs
var sql = @"INSERT INTO students(first_name, last_name, email, registration_date) " +
          "VALUES(@first_name,@last_name,@email,@registration_date)";
```

Then, get a connection string from the `appsettings.json` file using the `ConfigurationHelper` class:

```cs
var connectionString = ConfigurationHelper.GetConnectionString("DefaultConnection");
```

After that, create a data source that represents the PostgreSQL database:

```cs
await using var dataSource = NpgsqlDataSource.Create(connectionString);
```

Finally, iterate over each `Student` record list returned by the `ReadStudentsFromCSV()` method and execute the `INSERT` statement to insert the new row into the `students` table:

```cs
foreach(var student in ReadStudentsFromCSV(csvFilePath)) {
  await using
  var cmd = dataSource.CreateCommand(sql);

  cmd.Parameters.AddWithValue("@first_name", student.FirstName);
  cmd.Parameters.AddWithValue("@last_name", student.LastName);
  cmd.Parameters.AddWithValue("@email", student.Email);
  cmd.Parameters.AddWithValue("@registration_date", student.RegistrationDate);

  await cmd.ExecuteNonQueryAsync();
}
```

## Verify the inserts

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

```
 id | first_name | last_name |            email             | registration_date
----+------------+-----------+------------------------------+-------------------
  1 | John       | Doe       | [[email protected]](../cdn-cgi/l/email-protection.html)           | 2024-05-20
  2 | Emma       | Smith     | [[email protected]](../cdn-cgi/l/email-protection.html)         | 2024-05-20
  3 | Liam       | Johnson   | [[email protected]](../cdn-cgi/l/email-protection.html)       | 2024-05-20
  4 | Olivia     | Williams  | [[email protected]](../cdn-cgi/l/email-protection.html)    | 2024-05-20
  5 | Noah       | Brown     | [[email protected]](../cdn-cgi/l/email-protection.html)         | 2024-05-15
  6 | Ava        | Jones     | [[email protected]](../cdn-cgi/l/email-protection.html)          | 2024-05-15
  7 | William    | Garcia    | [[email protected]](../cdn-cgi/l/email-protection.html)     | 2024-05-15
  8 | Sophia     | Miller    | [[email protected]](../cdn-cgi/l/email-protection.html)      | 2024-05-10
  9 | James      | Davis     | [[email protected]](../cdn-cgi/l/email-protection.html)        | 2024-05-10
 10 | Isabella   | Rodriguez | [[email protected]](../cdn-cgi/l/email-protection.html) | 2024-05-10
 11 | Benjamin   | Martinez  | [[email protected]](../cdn-cgi/l/email-protection.html)  | 2024-05-10
(11 rows)
```

The output indicates that the program has successfully imported 10 rows from the `students.csv` file into the `students` table.

## Summary

- Utilize the `CsvHelper` package to read data from a CSV file.
- Call the `ExecuteNonQueryAsync()` method of the `NpgsqlCommand` object to execute an SQL `INSERT` statement to load data from a CSV file into a table in the SQLite database.
