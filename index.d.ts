declare class Config<D> {
    private folder;
    static parsers: {
        [key: string]: Parser;
    };
    private defaultFile;
    private specificFile;
    private parser;
    constructor(folder: string, extension?: string);
    data(): D;
    private static merge(o1, o2);
}
export default Config;
export interface Parser {
    parse(file: string): Object;
}
