import * as fs from 'fs';
import * as path from 'path';

export interface Dependency{
    name:string;
    version:string;
}

/**
 * Main class for manipulate the package.json file
 */
export class PackageExplorer {
    public dependencies: Array<Dependency>;
    public devDependencies: Array<Dependency>;

    static packageName:string = 'package.json';

    constructor(private workspace:string){
        this.dependencies = new Array<Dependency>();
        this.devDependencies = new Array<Dependency>();
        this.initPackageJsonExplorer();
    }

    /**
     * Get all the values of the dependencies and devDependencies from package.json
     */
    initPackageJsonExplorer(){
        // Take the value from the package.json of the project
        const packages = fs.readFileSync(path.join(this.workspace, PackageExplorer.packageName),"utf-8");
        
        const packageJson = JSON.parse(packages);


        // Get the dependencies and devDependencies from the package.json file
        this.devDependencies = Object.keys(packageJson.devDependencies).map(key =>{
            return {
                name:key,
                version:packageJson.devDependencies[key]
            };
        });

        this.dependencies = Object.keys(packageJson.dependencies).map(key =>{
            return {
                name:key,
                version:packageJson.dependencies[key]
            };
        });
    }


}