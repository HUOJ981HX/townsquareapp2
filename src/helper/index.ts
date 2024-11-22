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