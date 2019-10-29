export enum HTMLType {
    TEXT = 'text',
    RADIO = 'radio'
}
export const TypeScriptMap = new Map([
    [HTMLType.TEXT, 'string'],
    ['string', 'string'],
    ['select', 'string'],
    [HTMLType.RADIO, 'string'],
    ['textarea', 'string'],

    ['number', 'number'],

    ['boolean', 'boolean'],
    ['bool', 'boolean'],
]);