import * as vscode from "vscode";
import NextWorkspace from "../components/workspace/workspaceController";
import NextRoute from "../types/NextRoute";
import * as path from "path";

/**
 * Class for the NextJS Route view
 */
export default class NextJsRouteView
    implements vscode.TreeDataProvider<NextRouteItem> {
    private _nextWorkspaceService: NextWorkspace;

    private _onDidChangeTreeData: vscode.EventEmitter<
        NextRouteItem | undefined | null | void
    > = new vscode.EventEmitter<NextRouteItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<
        NextRouteItem | undefined | null | void
    > = this._onDidChangeTreeData.event;

    constructor(private workspaceRoot: string) {
        this._nextWorkspaceService = new NextWorkspace(workspaceRoot);
    }

    getTreeItem(
        element: NextRouteItem
    ): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(
        element?: NextRouteItem | undefined
    ): vscode.ProviderResult<NextRouteItem[]> {
        const routeFolder = this._nextWorkspaceService.getRoute();

        var items = routeFolder.map((route) => {
            return new NextRouteItem(route);
        });

        return Promise.resolve(items);
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }
}

export class NextRouteItem extends vscode.TreeItem {
    routeObject: NextRoute;

    constructor(routeObject: NextRoute) {
        super(routeObject.fileUri);
        this.routeObject = routeObject;
        this.description = routeObject.fileUri;
        this.label = this.routeObject.routeUrl;
        this.resourceUri = vscode.Uri.file(this.routeObject.fileUri);
        this.command = {
            command: "vscode.open",
            arguments: [this.resourceUri],
            title: "Open file",
            tooltip: "Open the file"
        }
    }

    iconPath = {
        light: path.join(
            __filename,
            "..",
            "..",
            "asset",
            "indicator",
            "logo-route-light.svg"
        ),
        dark: path.join(
            __filename,
            "..",
            "..",
            "asset",
            "indicator",
            "logo-route-dark.svg"
        ),
    };
}
