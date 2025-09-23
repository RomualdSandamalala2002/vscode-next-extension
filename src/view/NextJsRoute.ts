import * as vscode from "vscode";
import NextWorkspace from "../components/workspace/workspaceController";
import NextRoute from "../types/NextRoute";
import * as path from "path";

/**
 * Class for the NextJS Route view
 */
export default class NextJsRouteView
    implements vscode.TreeDataProvider<NextRouteItem>
{
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

    getParent?(element: NextRouteItem): vscode.ProviderResult<NextRouteItem> {
        throw new Error("Method not implemented.");
    }

    resolveTreeItem?(
        item: vscode.TreeItem,
        element: NextRouteItem,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.TreeItem> {
        throw new Error("Method not implemented.");
    }

    refresh():void{
        this._onDidChangeTreeData.fire();
    }
}

export class NextRouteItem extends vscode.TreeItem {
    routeObject: NextRoute;

    constructor(routeObject: NextRoute) {
        super(routeObject.routeUrl);
        this.routeObject = routeObject;
        this.description = routeObject.fileUri;
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
