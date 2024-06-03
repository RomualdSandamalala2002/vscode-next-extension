import * as vscode from "vscode";
import NextWorkspace from "../components/workspace/workspaceController";
import * as path from "path";
import NextApiRoute from "../types/NextApiRoute";

/**
 * Class for the NextJS Route view
 */
export default class NextJsApiRouteView implements vscode.TreeDataProvider<NextApiRouteItem>{
    private _nextWorkspaceService: NextWorkspace;

    constructor(private workspaceRoot:string){
        this._nextWorkspaceService = new NextWorkspace(workspaceRoot);
    }

    onDidChangeTreeData?: vscode.Event<void | NextApiRouteItem | NextApiRouteItem[] | null | undefined> | undefined;
    
    getTreeItem(element: NextApiRouteItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: NextApiRouteItem | undefined): vscode.ProviderResult<NextApiRouteItem[]> {
        const routeFolder = this._nextWorkspaceService.getApiRoute();
        
        var items = routeFolder.map((route)=> {
            return new NextApiRouteItem(route);
        });
        
        return Promise.resolve(items);
    }
    getParent?(element: NextApiRouteItem): vscode.ProviderResult<NextApiRouteItem> {
        throw new Error("Method not implemented.");
    }
    resolveTreeItem?(item: vscode.TreeItem, element: NextApiRouteItem, token: vscode.CancellationToken): vscode.ProviderResult<vscode.TreeItem> {
        throw new Error("Method not implemented.");
    }
    
}

export class NextApiRouteItem extends vscode.TreeItem{
    routeObject:NextApiRoute;

    constructor(routeObject:NextApiRoute){
        super(routeObject.apiRouteUrl);
        this.routeObject = routeObject;
        this.description = routeObject.fileUri;
    }

    iconPath = {
        light: path.join(__filename, '..', '..', 'asset', 'indicator', 'logo-api-light.svg'),
        dark: path.join(__filename, '..', '..', 'asset', 'indicator', 'logo-api-dark.svg')
      };
}