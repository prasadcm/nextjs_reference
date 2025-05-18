export function isValidParam(value: unknown): value is string {
    return typeof value === 'string' && value.trim() !== '';
}
