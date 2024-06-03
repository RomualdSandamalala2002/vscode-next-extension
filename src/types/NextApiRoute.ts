/**
 * Class that represents the API route of the Next.js project with its file
 */
export default class NextApiRoute{
    apiRouteUrl:string = "";
    fileUri:string = "";

    /**
     * Init the NextRoute object
     * @param fileUri Path to the API route file
     * @param pathWorkspace Path to the workspace
     */
    constructor(fileUri:string, pathWorkspace:string) {
        this.fileUri = fileUri;
        var route = fileUri.replace(pathWorkspace,"");
        route = route.replace(/route\.tsx?$/i, '');
        this.apiRouteUrl = route;
    }
}