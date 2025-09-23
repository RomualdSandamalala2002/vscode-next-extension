/**
 * Class that represents the route of the Next.js project with its file
 */
export default class NextRoute{
    routeUrl:string = "";
    fileUri:string = "";

    /**
     * Init the NextRoute object
     * @param fileUri Path to the component
     * @param pathWorkspace Path to the workspace
     */
    constructor(fileUri:string, pathWorkspace:string) {
        this.fileUri = fileUri;
        this.routeUrl = NextRoute.replacePathFolderToRoute(fileUri,pathWorkspace);
    }

    /**
     * Create a route string based on Next.js route protocol
     * @param path 
     * @param pathWorkspace 
     * @returns 
     */
    static replacePathFolderToRoute(path:string,pathWorkspace:string):string{
        var route = path.replace(pathWorkspace,"");

        route = route
            .replace(/page\.tsx?$/i, '')
            .replace(/\/\(.+\)/,"");

        return route;
    }
}