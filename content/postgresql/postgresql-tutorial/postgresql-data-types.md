---
title: 'PostgreSQL Data Types'
page_title: 'Getting Started with PostgreSQL Data Types'
page_description: 'In this tutorial, you will learn about PostgreSQL data types including Boolean, character, number, temporal, special types, and array.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-data-types/'
ogImage: '/postgresqltutorial/PostgreSQL-Data-Types-300x254.png'
updatedOn: '2024-05-08T22:50:24+00:00'
enableTableOfContents: true
previousLink:
  title: 'Export PostgreSQL Table to CSV File'
  slug: 'postgresql-tutorial/export-postgresql-table-to-csv-file'
nextLink:
  title: 'PostgreSQL CREATE TABLE'
  slug: 'postgresql-tutorial/postgresql-create-table'
---

**Summary**: in this tutorial, you will learn about **PostgreSQL data types** including Boolean, character, numeric, temporal, array, json, UUID, and special types.

## PostgreSQL Data TypesOverview of PostgreSQL data types

PostgreSQL supports the following data types:

- [Boolean](postgresql-boolean)
- [Character](postgresql-char-varchar-text) types such as [`char`, `varchar`, and `text`](postgresql-char-varchar-text).
- Numeric types such as integer and floating\-point number.
- Temporal types such as [date](postgresql-date), [time](postgresql-time), [timestamp](postgresql-timestamp), and [interval](postgresql-interval)
- [UUID](postgresql-uuid) for storing Universally Unique Identifiers
- [Array](postgresql-array) for storing array strings, numbers, etc.
- [JSON](postgresql-json) stores JSON data
- [hstore](postgresql-hstore) stores key\-value pair
- Special types such as network address and geometric data.

## Boolean

A [Boolean](postgresql-boolean) data type can hold one of three possible values: true, false, or null. You use `boolean` or `bool` keyword to declare a column with the Boolean data type.

When you [insert data](postgresql-insert) into a Boolean column, PostgreSQL converts it to a Boolean value

- `1`, `yes`, `y`, `t`, `true` values are converted to `true`
- `0`, `no`, `false`, `f` values are converted to `false`.

When you [select data](postgresql-select) from a Boolean column, PostgreSQL converts the values back e.g., `t` to true, `f` to `false` and `space` to `null`.

## Character

PostgreSQL provides three [character data types](postgresql-char-varchar-text): `CHAR(n)`, `VARCHAR(n)`, and `TEXT`

- `CHAR(n)` is the fixed\-length character with space padded. If you insert a string that is shorter than the length of the column, PostgreSQL pads spaces. If you insert a string that is longer than the length of the column, PostgreSQL will issue an error.
- `VARCHAR(n)` is the variable\-length character string. The `VARCHAR(n)` allows you to store up to `n` characters. PostgreSQL does not pad spaces when the stored string is shorter than the length of the column.
- `TEXT` is the variable\-length character string. Theoretically, text data is a character string with unlimited length.

## Numeric

PostgreSQL provides two distinct types of numbers:

- [integers](postgresql-integer)
- floating\-point numbers

### Integer

There are three kinds of integers in PostgreSQL:

- Small integer ( `SMALLINT`) is a 2\-byte signed integer that has a range from \-32,768 to 32,767\.
- Integer ( `INT`) is a 4\-byte integer that has a range from \-2,147,483,648 to 2,147,483,647\.
- [Serial](postgresql-serial) is the same as integer except that PostgreSQL will automatically generate and populate values into the `SERIAL` column. This is similar to [`AUTO_INCREMENT`](https://www.mysqltutorial.org/mysql-basics/mysql-auto_increment/) column in MySQL or [`AUTOINCREMENT`](http://www.sqlitetutorial.net/sqlite-autoincrement/) column in SQLite.

### Floating\-point number

There are three main types of floating\-point numbers:

- `float(n)`  is a floating\-point number whose precision, is at least, n, up to a maximum of 8 bytes.
- `real`or `float8`is a 4\-byte floating\-point number.
- [`numeric`](postgresql-numeric)or `numeric(p,s)` is a real number with p digits with s number after the decimal point. This `numeric(p,s)` is the exact number.

## Temporal data types

The temporal data types allow you to store date and /or time data. PostgreSQL has five main temporal data types:

- [`DATE`](postgresql-date) stores the dates only.
- [`TIME`](postgresql-time) stores the time of day values.
- [`TIMESTAMP`](postgresql-timestamp) stores both date and time values.
- [`TIMESTAMPTZ`](postgresql-timestamp) is a timezone\-aware timestamp data type. It is the abbreviation for [timestamp](postgresql-timestamp) with the time zone.
- [`INTERVAL`](postgresql-interval) stores periods.

The `TIMESTAMPTZ` is PostgreSQL’s extension to the SQL standard’s temporal data types.

## Arrays

In PostgreSQL, you can store an [array](postgresql-array) of strings, an array of integers, etc., in array columns. The array comes in handy in some situations e.g., storing days of the week, and months of the year.

## JSON

PostgreSQL provides two JSON data types: [`JSON`](postgresql-json) and `JSONB` for storing JSON data.

The `JSON` data type stores plain JSON data that requires reparsing for each processing, while `JSONB` data type stores `JSON` data in a binary format which is faster to process but slower to insert. In addition, `JSONB` supports indexing, which can be an advantage.

## UUID

The `UUID` data type allows you to store Universal Unique Identifiers defined by [RFC 4122](https://tools.ietf.org/html/rfc4122 'UUID') . The `UUID` values guarantee a better uniqueness than [`SERIAL`](postgresql-serial) and can be used to hide sensitive data exposed to the public such as values of `id` in URL.

## Special data types

Besides the primitive data types, PostgreSQL also provides several special data types related to geometry and network.

- `box` – a rectangular box.
- `line`– a set of points.
- `point` – a geometric pair of numbers.
- `lseg` – a line segment.
- `polygon` – a closed geometric.
- `inet` – an IP4 address.
- `macaddr`– a MAC address.

In this tutorial, we have introduced you to the PostgreSQL data types so that you can use them to create tables in the next tutorial.
