# *.wit syntax

VS Code support for working with [WebAssembly Component Model Interface Types](https://github.com/WebAssembly/component-model/blob/main/design/mvp/WIT.md)

## Features:
- `*.wit` Syntax highlighting.
- Basic markdown highlighting in comments.
- Automatically continues doc-comments on next line.
- Simple list-based autocomplete of:
	- WIT keywords,
	- WIT builtin types,
	- Common WASI packages & interfaces

![demo screenshot](./screenshot.png)

## Caveats

The official WIT specification is _very_ liberal in what text it accepts as valid input. The syntax highlighting provided by this extension only supports a subset of the full WIT syntax. Notably:


### Braces, brackets & parentheses must open on the same line as the thing they're opening.
✅ Works:

```wit
enum state {
	open,
	closed
}

export log: func(
	msg: string
) -> result<_ err>
```

❌ Broken:
```wit
enum state
{
	open,
	closed
}

export log: func
(
	msg: string
) -> result<_ err>
```

### Return type annotations must start on the same line as the closing parenthesis of the parameter list.
✅ Works:

```wit
export log: func(msg: string) -> result<_ err>

export magic: func(
	a: u32,
	b: u32
) -> (
	c: u32,
	d: u32
)
```

❌ Broken:
```wit
export log: func(msg: string)
	 -> result<_ err>

export magic: func(
	a: u32,
	b: u32
)
->
(
	c: u32,
	d: u32
)
```

### Names of declarations must appear on the same line as the preceding keyword.
✅ Works:
```wit
record point { /* ... */ }
```

❌ Broken:
```wit
record
point { /* ... */ }
```