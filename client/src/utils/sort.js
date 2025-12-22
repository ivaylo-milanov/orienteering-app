export default function sortAgeGroups(a, b) {
    if (a.name === "Open") return 1;
    if (b.name === "Open") return -1;

    const regex = /([A-Za-z]+)(\d+)(.*)/;

    const aMatch = a.name.match(regex);
    const bMatch = b.name.match(regex);

    if (!aMatch || !bMatch) return a.localeCompare(b);

    const [, aPrefix, aNumber] = aMatch;
    const [, bPrefix, bNumber] = bMatch;

    if (aPrefix === bPrefix) {
        return parseInt(aNumber) - parseInt(bNumber);
    }

    return (aPrefix === "M" ? -1 : 1) - (bPrefix === "M" ? -1 : 1);
}
