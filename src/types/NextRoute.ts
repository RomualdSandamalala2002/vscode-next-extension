import { AppStructure } from "../provider/AppStructureProvider";

/**
 * Class that represents the route of the Next.js project with its file
 */
export default class NextRoute {
    routeUrl: string = "";
    fileUri: string = "";
    pathWorkspace: string = "";
    appStructure: AppStructure | null = null;

    /**
     * Init the NextRoute object
     * @param fileUri Path to the component
     * @param pathWorkspace Path to the workspace
     */
    constructor(fileUri: string, pathWorkspace: string,appStructure?:AppStructure) {
        this.fileUri = fileUri;
        this.pathWorkspace = pathWorkspace;
        if(appStructure)
            this.appStructure = appStructure;
        this.routeUrl = this.replacePathFolderToRoute();
    }

    /**
     * Create a route string based on Next.js route protocol
     * @returns 
     */
    replacePathFolderToRoute(): string {
        var route = this.fileUri.replace(this.pathWorkspace, "");
        route = route
            .replace(/\.(tsx?|jsx?)/,"");

        if(this.appStructure == AppStructure.APP_ROUTER){
            route = route
                .replace("page","");
        } else {
            route = route
                .replace("index","");
        }

        return route;
    }
}