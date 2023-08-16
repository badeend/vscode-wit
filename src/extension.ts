import * as vscode from 'vscode';

const wellKnownNames = [
	"wasi:clocks/monotonic-clock",
	"wasi:clocks/wall-clock",
	"wasi:clocks/timezone",
	"wasi:clocks",
	"wasi:io/streams",
	"wasi:io",
	"wasi:filesystem/preopens",
	"wasi:filesystem/types",
	"wasi:filesystem",
	"wasi:random/insecure-seed",
	"wasi:random/insecure",
	"wasi:random/random",
	"wasi:random",
	"wasi:poll/poll",
	"wasi:poll",
	"wasi:sockets/instance-network",
	"wasi:sockets/ip-name-lookup",
	"wasi:sockets/network",
	"wasi:sockets/tcp-create-socket",
	"wasi:sockets/tcp",
	"wasi:sockets/udp-create-socket",
	"wasi:sockets/udp",
	"wasi:sockets",
	"wasi:nn/tensor",
	"wasi:nn/graph",
	"wasi:nn/inference",
	"wasi:nn/errors",
	"wasi:nn",
	"wasi",
];

const builtinTypes = [
	"u8",
	"u16",
	"u32",
	"u64",
	"s8",
	"s16",
	"s32",
	"s64",
	"float32",
	"float64",
	"char",
	"bool",
	"string",
	"tuple",
	"list",
	"option",
	"result",
	"borrow",
];

const keywords = [
	"_",
	"as",
	"constructor",
	"enum",
	"export",
	"flags",
	"func",
	"import",
	"include",
	"interface",
	"interface",
	"package",
	"record",
	"resource",
	"static",
	"type",
	"union",
	"use",
	"variant",
	"with",
	"world",
];

const staticCompletions = new vscode.CompletionList([
	...keywords.map(keyword => new vscode.CompletionItem(keyword, vscode.CompletionItemKind.Keyword)),
	...builtinTypes.map(type => new vscode.CompletionItem(type, vscode.CompletionItemKind.Struct)),
	...wellKnownNames.map(name => new vscode.CompletionItem(name, vscode.CompletionItemKind.Module)),
], /* isIncomplete: */ true);

export function activate(context: vscode.ExtensionContext) {

	// Registering the provider directly on `wit` would disable VSCode's buil-in suggestions.
	// That's not what we want; we want both!
	// The "fix" is to register it for all languages (`*`) and then dynamically check the document type.
	const provider = vscode.languages.registerCompletionItemProvider('*', {
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
			if (document.languageId !== 'wit') {
				return;
			}

			return staticCompletions;
		}
	});

	context.subscriptions.push(provider);
}

export function deactivate() {

}
