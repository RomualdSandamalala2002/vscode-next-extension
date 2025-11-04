import * as vscode from "vscode";
import NextWorkspace from "../components/workspace/workspaceController";
import * as path from "path";
import NextApiRoute from "../types/NextApiRoute";

/**
 * Class for the NextJS Route view
 */
export default class NextJsApiRouteView implements vscode.TreeDataProvider<NextApiRouteItem> {
    private _nextWorkspaceService: NextWorkspace;
    private _onDidChangeTreeData: vscode.EventEmitter<
        NextApiRouteItem | undefined | null | void
    > = new vscode.EventEmitter<NextApiRouteItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<
        NextApiRouteItem | undefined | null | void
    > = this._onDidChangeTreeData.event;

    constructor(private workspaceRoot: string) {
        this._nextWorkspaceService = new NextWorkspace(workspaceRoot);
    }

    getTreeItem(element: NextApiRouteItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: NextApiRouteItem | undefined): vscode.ProviderResult<NextApiRouteItem[]> {
        const routeFolder = this._nextWorkspaceService.getApiRoute();

        var items = routeFolder.map((route) => {
            return new NextApiRouteItem(route);
        });

        return Promise.resolve(items);
    }

    refresh() {
        this._onDidChangeTreeData.fire();
    }
}

export class NextApiRouteItem extends vscode.TreeItem {
    routeObject: NextApiRoute;
    resourceUri?: vscode.Uri | undefined;

    constructor(routeObject: NextApiRoute) {
        super(routeObject.fileUri);
        this.routeObject = routeObject;
        this.description = routeObject.fileUri;
        this.label = this.routeObject.apiRouteUrl;
        this.resourceUri = vscode.Uri.file(this.routeObject.fileUri);
        this.command = {
            command: "vscode.open",
            arguments: [this.resourceUri],
            title: "Open file",
            tooltip: "Open the file"
        }
    }

    iconPath = {
        light: path.join(__filename, '..', '..', 'asset', 'indicator', 'logo-api-light.svg'),
        dark: path.join(__filename, '..', '..', 'asset', 'indicator', 'logo-api-dark.svg')
    };
}