### Pull Request Template Syntax

When you create a pull request, you may see a template that looks like this:

| 🔥 | 🐞 | 🙋 | 🚫 | 🚀 |
|----|----|----|----|----|
|    |    |    |    |    |

Here's what each row means:

|  Emoji  | Meaning |
|---------|---------|
| 🔥      | Is this PR urgent? (Answer `Yes`, or leave blank for `no`) |
| 🐞      | The issue number. Format: `#123` |
| 🙋      | Reference any people whose attention is needed for this PR. Format: `@someuser, @someotheruser` |
| 🚫      | Blockers to be addressed before deploying. Eg: reference blocking issues (`#123`), or write out conditions ("Do not deploy before legal clearance from Cindy") |
| 🚀      | Deployment Instructions. Eg: "Add ENV variable `SOME_VAR` before deploying", Enable `SomeThirdPartyService` before deploying" |

To format your answer row, start with a pipe (`|`) and separate each column by adding another pipe. You don't need to align pipe symbols to the above row - GitHub will figure it out

For more on markdown table formatting, see [Github's table markdown page](https://help.github.com/articles/organizing-information-with-tables)

