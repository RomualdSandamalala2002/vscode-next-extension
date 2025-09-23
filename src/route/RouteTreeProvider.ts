import { CancellationToken, Event, ProviderResult, TreeDataProvider, TreeItem } from "vscode";
import { PackageJsonProvider } from "../provider/PackageJsonProvider";

export class RouteTreeProvider implements TreeDataProvider<string> {
    packageJsonProvider: PackageJsonProvider;

    constructor(private workspaceRoot: string | undefined) {
        this.packageJsonProvider = new PackageJsonProvider(this.workspaceRoot);
    }

    onDidChangeTreeData?: Event<void | string | string[] | null | undefined> | undefined;

    getTreeItem(element: string): TreeItem | Thenable<TreeItem> {
        return new TreeItem(element.toString());
    }
    getChildren(element?: string | undefined): ProviderResult<string[]> {
        return [Object.keys(this.packageJsonProvider.dependencies).toString()];
    }
    getParent?(element: string): ProviderResult<string> {
        return null;
    }
    resolveTreeItem?(item: TreeItem, element: string, token: CancellationToken): ProviderResult<TreeItem> {
        return null;
    }
}