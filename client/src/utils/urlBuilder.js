const buildWhereClause = (params) => {
    const clauses = [];
    var obj = Object.fromEntries(params.entries());

    Object.keys(obj).forEach((key) => {
        clauses.push(`${key} LIKE "${obj[key]}"`);
    });

    return clauses.length > 0 ? `where=${encodeURIComponent(clauses.join(' AND '))}` : '';
};

const buildUrl = (baseUrl, params) => {
    let url = baseUrl;

    const whereClause = buildWhereClause(params);
    if (whereClause) {
        url += `?${whereClause}`;
    }

    return url;
};

export default buildUrl;