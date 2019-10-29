export class PropertyWithPath {
    key?: string;
    label?: string;
    path?: string;
    htmlPath? : string;

    constructor(key: string, label: string, path: string, htmlPath: string) {
        this.key = key;
        this.label = label;
        this.path = path;
        this.htmlPath = htmlPath;
    }
}