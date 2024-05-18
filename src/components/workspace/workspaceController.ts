import * as fs from "fs";
import * as path from "path";

/**
 * Main class for manipulating the « Next.js » workspace
 */
export default class NextWorkspace {
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

    getRouteFolder() {
        if (this.pathWorkspace && this.routeFolder) {
            var listFiles = fs.readdirSync(path.join(this.pathWorkspace, this.routeFolder));

            return listFiles.filter((file) => {
                return file.endsWith(".js") || file.endsWith(".jsx") || file.endsWith(".ts") || file.endsWith(".tsx");
            });

        } else {
            throw new Error(`Could not find workspace`);
        }
    }
}