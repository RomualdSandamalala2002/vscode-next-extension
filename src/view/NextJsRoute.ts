import * as vscode from "vscode";
import NextWorkspace from "../components/workspace/workspaceController";

export default class NextJsRouteView implements vscode.TreeDataProvider<NextRoute>{
    private _nextWorkspaceService: NextWorkspace;

    constructor(private workspaceRoot:string){
        this._nextWorkspaceService = new NextWorkspace(workspaceRoot);
    }

    onDidChangeTreeData?: vscode.Event<void | NextRoute | NextRoute[] | null | undefined> | undefined;
    
    getTreeItem(element: NextRoute): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: NextRoute | undefined): vscode.ProviderResult<NextRoute[]> {
        const routeFolder = this._nextWorkspaceService.getRouteFolder();
        
        var items = routeFolder.map((route)=> {
            return new NextRoute(route);
        });
        
  

        return Promise.resolve(items);
    }
    getParent?(element: NextRoute): vscode.ProviderResult<NextRoute> {
        throw new Error("Method not implemented.");
    }
    resolveTreeItem?(item: vscode.TreeItem, element: NextRoute, token: vscode.CancellationToken): vscode.ProviderResult<vscode.TreeItem> {
        throw new Error("Method not implemented.");
    }
    
}

export class NextRoute extends vscode.TreeItem{
    constructor(label:string){
        super(label);
    }
}