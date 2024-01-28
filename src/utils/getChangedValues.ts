export const getChangedValues = (newValues:any, oldValues:any) => {
    const changedValues:any = {};
    for (const key in newValues) {
        if (newValues[key] !== oldValues[key]) {
            changedValues[key] = newValues[key];
        }
    }
    return changedValues;
}