import * as path from "path";
import * as fs from "node:fs";

/**
 * It take all the dependencies from "package.json"
 */
export class PackageJsonProvider {
    readonly package = "package.json";
    data: string = "";
    fileUri: string = "";
    dependencies: any = {};
    devDependencies: any = {};


    constructor(workspace: string | undefined) {
        var jsonValue;

        if (!workspace) {
            throw new PackageJsonProviderException(
                "Workspace not found",
                "You don't have a specified workspace"
            );
        }

        this.fileUri = path.join(workspace, this.package);
        this.data = fs.readFileSync(this.fileUri, "utf-8");

        jsonValue = JSON.parse(this.data);

        try {
            this.devDependencies = jsonValue.devDependencies;
            this.dependencies = jsonValue.dependencies;
        } catch (error) {
            throw new PackageJsonProviderException(
                "package.json Error",
                "There is a problem in your package.json file."
            );
        }
    }
}

/**
 * Exception for the package provider
 */
export class PackageJsonProviderException implements Error {
    name: string;
    message: string;
    stack?: string | undefined;

    constructor(name: string, message: string, stack?: string | undefined) {
        this.message = message;
        this.name = name;
        this.stack = stack;
    }
}