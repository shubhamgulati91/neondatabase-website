---
title: 'PostgreSQL MD5() Function'
page_title: 'PostgreSQL MD5() Function'
page_description: 'The PostgreSQL MD5() function calculates the MD5 hash of a string and returns the result in hexadecimal.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-string-functions/postgresql-md5/'
ogImage: ''
updatedOn: '2024-01-29T01:39:25+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL FORMAT() Function'
  slug: 'postgresql-string-functions/postgresql-format'
nextLink:
  title: 'PostgreSQL LEFT() Function'
  slug: 'postgresql-string-functions/postgresql-left'
---

The PostgreSQL `MD5()` function calculates the [MD5](https://en.wikipedia.org/wiki/MD5) hash of a string and returns the result in hexadecimal.

## Syntax

The following illustrates the syntax of the `MD5()` function:

```sql
MD5(string)
```

## Arguments

The `MD5()` function accepts one argument.

**1\) `string`**

The `string` argument is the string of which the MD5 hash is calculated.

## Return value

The `MD5()` function returns a string in [`TEXT`](../postgresql-tutorial/postgresql-char-varchar-text) data type.

## Examples

The following example shows how to use the `MD5()` function to return the MD5 hash of the message `'PostgreSQL MD5'`:

```
SELECT MD5('PostgreSQL MD5');
```

The result is:

```
        md5
----------------------------------
 f78fdb18bf39b23d42313edfaf7e0a44
(1 row)
```

In this tutorial, you have learned how to use the PostgreSQL `MD5()` function to calculate the MD5 hash of a string.
