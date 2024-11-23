export const concatenatePostFilterArray = (items: any[]) => {
    return items
        .map(item => {
            if (Array.isArray(item)) {
                return item.join(", ");
            }
            return item;
        })
        .join(" > ");
}


export const removeEmptyObjValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => {
            if (value === null || value === undefined || value === '') return false
            if (typeof value === 'object' && Object.keys(removeEmptyObjValues(value)).length === 0) return false
            return true
        }).map(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
                const cleaned = removeEmptyObjValues(value)
                return [key, cleaned]
            }
            return [key, value]
        })
    )
}