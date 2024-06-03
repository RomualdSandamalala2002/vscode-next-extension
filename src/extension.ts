// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import NextJsOverview from "./view/NextJsOverview";
import NextJsRouteView from "./view/NextJsRoute";
import NextJsApiRouteView from "./view/NextJsApiRoute";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Init the workspace path
    const rootPath =
        vscode.workspace.workspaceFolders &&
        vscode.workspace.workspaceFolders.length > 0
            ? vscode.workspace.workspaceFolders[0].uri.fsPath
            : undefined;

	// Initialize the views of the routes
    const nextJsRouteView = new NextJsRouteView(rootPath as string);
    const nextJsApiRouteView = new NextJsApiRouteView(rootPath as string);

    // Inject the package view into the windows
    vscode.window.createTreeView("nextjs-overview", {
        treeDataProvider: new NextJsOverview(rootPath as string),
    });

    vscode.window.createTreeView("nextjs-route", {
        treeDataProvider: nextJsRouteView,
    });

    vscode.window.createTreeView("nextjs-api-route", {
        treeDataProvider: nextJsApiRouteView,
    });

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log("Next.js extension is activated");
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json

	// Inject the refresh 
    let refreshCommand = vscode.commands.registerCommand(
		"nextjs.refresh-workspace",()=>{
			nextJsRouteView.refresh();
		}
	);

    context.subscriptions.push(refreshCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
