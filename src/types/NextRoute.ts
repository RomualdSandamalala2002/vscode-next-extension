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
        var route = fileUri.replace(pathWorkspace,"");
        route = route.replace(/page\.tsx?$/i, '');
        this.routeUrl = route;

    }
}