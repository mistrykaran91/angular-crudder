const common = {
    'printWidth': 80,
    'tabWidth': 2,
    'singleQuote': true,
    'htmlWhitespaceSensitivity': 'ignore'
}

export const PRETTIER_CONFIG = {
    html: Object.assign({}, common, { 'parser': "html" }),
    typescript: Object.assign({}, common, { 'parser': "typescript" })
};


