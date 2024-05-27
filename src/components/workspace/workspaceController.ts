import * as fs from "fs";
import * as path from "path";
import * as fg from "fast-glob";
import NextRoute from "../../types/NextRoute";

/**
 * Main class for manipulating the « Next.js » workspace
 */
export default class NextWorkspace {

    // TODO : Implement if the Next.js workspace use the src directory for the project
    
    private pathWorkspace: string | null = null;

    private routeFolder?: string;

    constructor(workspace: string) {
        this.pathWorkspace = workspace;
        if (this.pathWorkspace) {
            var listFolder = fs.readdirSync(this.pathWorkspace);

            // Find if the workspace use the "app" folder or the "src"
            if (listFolder.indexOf("app")) { this.routeFolder = "app"; }
            else if (listFolder.indexOf("src")) { this.routeFolder = "src"; }
            else { throw new Error(`Could not find the "app" or "src" folder`); }
        }
    }


    /**
     * Get the routeof the Next.js project
     * 
     * @returns {string}
     */
    getRoute() {
        if (this.pathWorkspace && this.routeFolder) {

            // Get the path of the route folder with the workspace folder
            var pathRoute: string = path.join(this.pathWorkspace, this.routeFolder);

            const routeList: Array<string> = fg.sync(path.join(pathRoute, "**", "page.{js,jsx,ts,tsx}"));

            const routeNext: Array<NextRoute> = routeList.map(
                r=> new NextRoute(r,pathRoute)
            );

            return routeNext;

        } else {
            throw new Error(`Could not find workspace`);
        }
    }

    /**
     * Get the API route of the Next.js project
     * 
     * @returns {string}
     */
    getApiRoute() {
       
        if (this.pathWorkspace && this.routeFolder) {

            // Get the path of the route folder with the workspace folder
            var pathRoute: string = path.join(this.pathWorkspace, this.routeFolder);

            const apiRouteList: Array<string> = fg.sync(path.join(pathRoute, "**", "route.{js,ts}"));

            return apiRouteList;

        } else {
            throw new Error(`Could not find workspace`);
        }
    }
    
}