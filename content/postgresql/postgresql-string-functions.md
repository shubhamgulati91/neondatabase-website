---
title: 'PostgreSQL String Functions'
page_title: 'PostgreSQL String Functions'
page_description: 'This page provides you with the most commonly used PostgreSQL string functions that help you manipulate strings effectively.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-string-functions/'
ogImage: 'https://www.postgresqltutorial.com//postgresqltutorial/string-functions.png'
updatedOn: '2024-03-20T02:04:54+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL PG_SLEEP() Function'
  slug: 'postgresql-date-functions/postgresql-pg_sleep'
nextLink:
  title: 'PostgreSQL ASCII() Function'
  slug: 'postgresql-string-functions/postgresql-ascii'
---

This page provides the most commonly used PostgreSQL string functions that allow you to manipulate string data effectively.

| Function                                                                | Description                                                                                              | Example                                              | Result             |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------ |
| [ASCII](postgresql-string-functions/postgresql-ascii)                   | Return the ASCII code value of a character or Unicode code point of a UTF8 character                     | ASCII(‘A’)                                           | 65                 |
| [CHR](postgresql-string-functions/postgresql-chr)                       | Convert an ASCII code to a character or a Unicode code point to a UTF8 character                         | CHR(65\)                                             | ‘A’                |
| [CONCAT](postgresql-string-functions/postgresql-concat-function)        | Concatenate two or more strings into one                                                                 | CONCAT(‘A’,’B’,’C’)                                  | ‘ABC’              |
| [CONCAT_WS](postgresql-string-functions/postgresql-concat_ws)           | Concatenate strings with a specified separator.                                                          | CONCAT_WS(‘,’,’A’,’B’,’C’)                           | ‘A,B,C’            |
| [FORMAT](postgresql-string-functions/postgresql-format)                 | Format a string based on a template                                                                      | FORMAT(‘Hello %s’,’PostgreSQL’)                      | ‘Hello PostgreSQL’ |
| [INITCAP](postgresql-string-functions/postgresql-letter-case-functions) | Convert words in a string to title case                                                                  | INITCAP(‘hI tHERE’)                                  | Hi There           |
| [LEFT](postgresql-string-functions/postgresql-left)                     | Return the first n character in a string                                                                 | LEFT(‘ABC’,1\)                                       | ‘A’                |
| [LENGTH](postgresql-string-functions/postgresql-length-function)        | Return the number of characters in a string                                                              | LENGTH(‘ABC’)                                        | 3                  |
| [LOWER](postgresql-string-functions/postgresql-lower)                   | Convert a string to lowercase                                                                            | LOWER(‘hI tHERE’)                                    | ‘hi there’         |
| [LPAD](postgresql-string-functions/postgresql-lpad)                     | Extending a string to a length by padding specified characters on the left                               | LPAD(‘123′, 5, ’00’)                                 | ‘00123’            |
| [LTRIM](postgresql-string-functions/postgresql-ltrim)                   | Remove the longest string that contains specified characters from the left of the input string           | LTRIM(‘00123’)                                       | ‘123’              |
| [MD5](postgresql-string-functions/postgresql-md5)                       | Return MD5 hash of a string in hexadecimal                                                               | MD5(‘ABC’)                                           |                    |
| [POSITION](postgresql-string-functions/postgresql-position)             | Return the location of a substring in a string                                                           | POSITION(‘B’ in ‘A B C’)                             | 3                  |
| [REGEXP_MATCHES](postgresql-string-functions/postgresql-regexp_matches) | Replace substrings that match a POSIX regular expression with a new substring                            | SELECT REGEXP_MATCHES(‘ABC’, ‘^(A)(..)$’, ‘g’);      | \{A,BC\}           |
| [REGEXP_REPLACE](postgresql-string-functions/regexp_replace)            | Replace a substring using regular expressions.                                                           | REGEXP_REPLACE(‘John Doe’,'(.\*) (.\*)’,’\\2, \\1′); | ‘Doe, John’        |
| [REPEAT](postgresql-string-functions/postgresql-repeat)                 | Repeat a string the specified number of times.                                                           | REPEAT(‘\*’, 5\)                                     | ‘\*\*\*\*\*’       |
| [REPLACE](postgresql-string-functions/postgresql-replace)               | Replace a substring within a string with a new one.                                                      | REPLACE(‘ABC’,’B’,’A’)                               | ‘AAC’              |
| [REVERSE](postgresql-string-functions/postgresql-reverse)               | Replace a substring within a string with a new one                                                       | REVERSE(‘ABC’)                                       | ‘CBA’              |
| [RIGHT](postgresql-string-functions/postgresql-right)                   | Return the last n characters in the string. When n is negative, return all but the first \\n characters. | RIGHT(‘ABC’, 2\)                                     | ‘BC’               |
| [RPAD](postgresql-string-functions/postgresql-rpad)                     | Extend a string to a length by appending specified characters.                                           | RPAD(‘ABC’, 6, ‘xo’)                                 | ‘ABCxox’           |
| [RTRIM](postgresql-string-functions/postgresql-rtrim)                   | Remove the longest string that contains specified characters from the right of the input string          | RTRIM(‘abcxxzx’, ‘xyz’)                              | ‘abc’              |
| [SPLIT_PART](postgresql-string-functions/postgresql-split_part)         | Split a string on a specified delimiter and return nth substring                                         | SPLIT_PART(‘2017\-12\-31′,’\-‘,2\)                   | ’12’               |
| [SUBSTRING](postgresql-string-functions/postgresql-substring)           | Extract a substring from a string                                                                        | SUBSTRING(‘ABC’,1,1\)                                | A’                 |
| [TRIM](postgresql-string-functions/postgresql-trim-function)            | Remove the leading and trailing characters from a string.                                                | TRIM(‘ ABC  ‘)                                       | ‘ABC’              |
| [UPPER](postgresql-string-functions/postgresql-upper)                   | Convert a string to uppercase                                                                            | UPPER(‘hI tHERE’)                                    | ‘HI THERE’         |
