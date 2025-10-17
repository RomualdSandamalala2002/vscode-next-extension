import * as vscode from "vscode";
import { PackageExplorer } from "../components/package/packageExplorer";
import { AppStructure } from "../provider/AppStructureProvider";

export default class NextJsOverview implements vscode.TreeDataProvider<vscode.TreeItem>{
    private _packageExplorer: PackageExplorer;
    private appStructure?: AppStructure;

    constructor(private workspaceRoot:string, appStructure?:AppStructure){
        this._packageExplorer = new PackageExplorer(workspaceRoot);
        this.appStructure = appStructure;
    }

    onDidChangeTreeData?: vscode.Event<void | vscode.TreeItem | vscode.TreeItem[] | null | undefined> | undefined;
    getTreeItem(element: vscode.TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }
    getChildren(element?: vscode.TreeItem | undefined): vscode.ProviderResult<vscode.TreeItem[]> {
        const nextJsDetail = this._packageExplorer.dependencies.filter(d => d.name === "next")[0];
        const reactDetail = this._packageExplorer.dependencies.filter(d => d.name === "react")[0];

        
        const items = [
            new NextJsOverviewItem("Next.js version : ", nextJsDetail.version),
            new NextJsOverviewItem("React version : ", reactDetail.version),
        ];

        if(this.appStructure){
            const description = this.appStructure === AppStructure.PAGES_ROUTER ? "Page router" : "App router";
            items.push(new NextJsOverviewItem("Application structure : ",description))
        }

        return Promise.resolve(items);
    }
    getParent?(element: vscode.TreeItem): vscode.ProviderResult<vscode.TreeItem> {
        throw new Error("Method not implemented.");
    }
    resolveTreeItem?(item: vscode.TreeItem, element: vscode.TreeItem, token: vscode.CancellationToken): vscode.ProviderResult<vscode.TreeItem> {
        throw new Error("Method not implemented.");
    }
}

export class NextJsOverviewItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly description: string,
        public readonly tooltip?: string
    ) {
        super(label);
        this.tooltip = tooltip || undefined;
        this.description = description;
    }
}
