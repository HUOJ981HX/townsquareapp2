import { Prisma } from "@prisma/client";

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


export const removeEmptyObjValues = (obj: Record<string, any>): Record<string, any> | null => {
    const finalObj = Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => {
            if (value === null || value === undefined || value === '') return false;
            if (typeof value === 'object') {
                const cleaned = removeEmptyObjValues(value);
                if (cleaned === null || Object.keys(cleaned).length === 0) return false;
            }
            return true;
        }).map(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
                const cleaned = removeEmptyObjValues(value);
                return [key, cleaned];
            }
            return [key, value];
        })
    );

    return Object.keys(finalObj).length > 0 ? finalObj : null;
};

export function cleanObject(obj: any, keysToRemove: any) {
    // Helper function to determine if a value is an object
    const isObject = (value: any) => value && typeof value === 'object' && !Array.isArray(value);

    // Helper function to clean a single object
    const clean: any = (currentObj: any) => {
        if (Array.isArray(currentObj)) {
            return currentObj.map(clean).filter((item) => item && Object.keys(item).length > 0);
        } else if (isObject(currentObj)) {
            return Object.keys(currentObj).reduce((acc: any, key) => {
                const value = currentObj[key];
                if (!keysToRemove.includes(key) && value !== null) {
                    const cleanedValue = clean(value);
                    if (cleanedValue !== null && (isObject(cleanedValue) ? Object.keys(cleanedValue).length > 0 : true)) {
                        acc[key] = cleanedValue;
                    }
                }
                return acc;
            }, {});
        }
        return currentObj;
    };

    return clean(obj);
}

// export const removeEmptyObjValues = (obj: any): any => {
//     if (obj === null || obj === undefined || obj === '') {
//         return null; // Remove the property
//     }

//     if (typeof obj === 'object' && !Array.isArray(obj)) {
//         const cleanedObject: any = {};
//         for (const key in obj) {
//             if (Object.prototype.hasOwnProperty.call(obj, key)) {
//                 const cleanedValue = removeEmptyObjValues(obj[key]);
//                 if (cleanedValue !== undefined) {
//                     cleanedObject[key] = cleanedValue;
//                 }
//             }
//         }
//         return Object.keys(cleanedObject).length > 0 ? cleanedObject : null;
//     }

//     return obj;
// };
