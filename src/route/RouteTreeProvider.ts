import { CancellationToken, Event, ProviderResult, TreeDataProvider, TreeItem } from "vscode";
import * as vscode from "vscode";
import * as fs from "node:fs";
import * as path from "node:path";
import { PackageJsonProvider } from "../provider/PackageJsonProvider";

export class RouteTreeProvider implements TreeDataProvider<String> {
    packageJsonProvider: PackageJsonProvider;

    constructor(private workspaceRoot: string | undefined) {
        this.packageJsonProvider = new PackageJsonProvider(this.workspaceRoot);
    }

    onDidChangeTreeData?: Event<void | String | String[] | null | undefined> | undefined;

    getTreeItem(element: String): TreeItem | Thenable<TreeItem> {
        return new TreeItem(element.toString());
    }
    getChildren(element?: String | undefined): ProviderResult<String[]> {
        return [Object.keys(this.packageJsonProvider.dependencies).toString()];
    }
    getParent?(element: String): ProviderResult<String> {
        return null;
    }
    resolveTreeItem?(item: TreeItem, element: String, token: CancellationToken): ProviderResult<TreeItem> {
        return null;
    }
}