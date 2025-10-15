import * as path from "path";
import * as fg from "fast-glob";
import { readdirSync } from "fs";

export enum AppStructure {
    APP_ROUTER,
    PAGES_ROUTER
}

export class AppStructureProviderUtils {
    static checkAppRouter(listFiles: Array<string>) {
        var condition = false,
            hasMainPage = false,
            hasMainLayout = false;
        for (let e of listFiles) {
            if(e.search(/page\.(tsx?|jsx?)/) !== -1) hasMainPage = true;
            if(e.search(/layout\.(tsx?|jsx?)/) !== -1) hasMainLayout = true;

            if(hasMainPage && hasMainLayout){
                condition = true;
                break;
            }
        }

        return condition;
    }

    static checkPagesRouter(listFiles: Array<string>) {
        var condition = false,
            hasIndex = false,
            hasDocument = false;

        for (let e of listFiles) {
            if(e.search(/index\.(tsx?|jsx?)/) !== -1) hasIndex = true;

            if(e.search(/_document\.(tsx?|jsx?)/) !== -1) hasDocument = true;
            
            if(hasIndex && hasDocument) {
                condition = true;
                break;
            }
        }

        return condition;

    }
}


/**
 * 
 */
export class AppStructureProvider {
    appStructure: AppStructure | null = null;
    pathRouteFolder: string;

    constructor(pathRouteFolder: string, appStructure?: AppStructure) {
        this.pathRouteFolder = pathRouteFolder;

        if (appStructure) {
            this.appStructure = appStructure;
        }
    }

    /**
     * Return if a Next.js workspace use the App Router or the Pages Router
     */
    static getAppStructure(pathWorkspace: string):[AppStructure,string]|null {
        var listFolder = fg.sync(path.join(pathWorkspace, "**", "{app,pages}"),
            { absolute: true, ignore: ["**/node_modules/**", "**/.git/**", "**/.next/**"],onlyDirectories:true}
        );
        for(let folder of listFolder) {
            var listFiles = readdirSync(folder);
            if (listFiles.length > 0) {
               listFiles = listFiles.map(e=>path.join(folder,e));
                if(AppStructureProviderUtils.checkAppRouter(listFiles)) return [AppStructure.APP_ROUTER,folder];
                if(AppStructureProviderUtils.checkPagesRouter(listFiles)) return [AppStructure.PAGES_ROUTER,folder];
            }
        }
        return null;
    }

    /**
     * Get list of files for the route (pages)
     * @returns 
     */
    getRouteFiles() {
        if (this.appStructure === null) return [];

        var pattern = "";

        if (this.appStructure == AppStructure.APP_ROUTER) {
            pattern = path.join("**", "page.{js,jsx,ts,tsx}");
        } else {
            pattern = path.join("**", "*.{js,jsx,ts,tsx}");
        }
        const routeList: Array<string> = fg.sync(
            path.join(this.pathRouteFolder, pattern)
        );

        return routeList;
    }

    /**
     * Get list of files for the route (API)
     * @returns 
     */
    getApiRouteFiles() {
        if (this.appStructure === null) return [];

        var pattern = "";

        if (this.appStructure == AppStructure.APP_ROUTER) {
            pattern = path.join("**", "route.{js,ts}");
        } else {
            pattern = path.join("**", "api", "*.{js,jsx,ts,tsx}");
        }

        const apiRouteList: Array<string> = fg.sync(
            path.join(this.pathRouteFolder, pattern)
        );

        return apiRouteList;
    }
}

export class AppStructureProviderError extends Error {


}