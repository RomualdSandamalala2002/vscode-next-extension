import { AppStructure } from "../provider/AppStructureProvider";

/**
 * Class that represents the API route of the Next.js project with its file
 */
export default class NextApiRoute{
    fileUri:string = "";
    apiRouteUrl:string = "";
    pathWorkspace: string = "";
    appStructure: AppStructure | null = null;

    /**
     * Init the NextRoute object
     * @param fileUri Path to the API route file
     * @param pathWorkspace Path to the workspace
     */
    constructor(fileUri:string, pathWorkspace:string, appStructure?:AppStructure) {
        this.fileUri = fileUri;
        this.pathWorkspace = pathWorkspace;
        if(appStructure)
            this.appStructure = appStructure;
        this.apiRouteUrl = this.getRoute();
    }

    getRoute(){
        var route = this.fileUri
            .replace(this.pathWorkspace,"")
            .replace(/\.(tsx?|jsx?)/,"");

        // Specific for the "App Router" only
        if(this.appStructure == AppStructure.APP_ROUTER) {
            route = route.replace("route","");
        }

        return route;
    }
}