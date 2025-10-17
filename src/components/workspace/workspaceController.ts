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
   * Renew the workspace folder
   */
  refreshWorkspace(){
    if(this.structure && this.structure.appStructure){
      this.structure = new AppStructureProvider(this.structure?.pathRouteFolder,this.structure?.appStructure);
    }
  }

  /**
   * Get the routeof the Next.js project
   *
   * @returns {string}
   */
  getRoute(): Array<NextRoute> {
    if (this.pathWorkspace && this.structure) {
      return this.structure.getRouteFiles();
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
      return this.structure.getApiRouteFiles();
    } else {
      throw new Error(`Could not find workspace`);
    }
  }
}
