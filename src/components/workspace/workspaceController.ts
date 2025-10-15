import * as path from "path";
import * as fg from "fast-glob";
import NextRoute from "../../types/NextRoute";
import NextApiRoute from "../../types/NextApiRoute";
import { AppStructureProvider, AppStructureProviderError } from "../../provider/AppStructureProvider";

/**
 * Main class for manipulating the « Next.js » workspace
 */
export default class NextWorkspace {

  private pathWorkspace: string | null = null;
  private structure: AppStructureProvider | null = null;

  constructor(workspace: string) {
    this.pathWorkspace = workspace;
    if (this.pathWorkspace) {
      const appStructure = AppStructureProvider.getAppStructure(this.pathWorkspace);
      if(appStructure)
        this.structure = new AppStructureProvider(appStructure[1],appStructure[0]);
      else
        throw new AppStructureProviderError("Could not find app structure (either Pages router or App router)")
    }
  }

  /**
   * Get the routeof the Next.js project
   *
   * @returns {string}
   */
  getRoute(): Array<NextRoute> {
    if (this.pathWorkspace && this.structure) {
      const routeList = this.structure.getRouteFiles();
      const pathRoute = this.structure.pathRouteFolder;

      const routeNext: Array<NextRoute> = routeList.map(
        (r) => new NextRoute(r, pathRoute)
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
  getApiRoute(): Array<NextApiRoute> {
    if (this.pathWorkspace && this.structure) {
      const apiRouteList: Array<string> = this.structure.getApiRouteFiles();
      const pathRoute = this.structure.pathRouteFolder;

      const apiRouteNext: Array<NextApiRoute> = apiRouteList.map(
        (r) => new NextApiRoute(r, pathRoute)
      );

      return apiRouteNext;
    } else {
      throw new Error(`Could not find workspace`);
    }
  }
}
