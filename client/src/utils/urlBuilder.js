const buildWhereClause = (params) => {
    const clauses = [];

    Object.keys(params).forEach((key) => {
        if (params[key] !== '') {
            clauses.push(`${key} LIKE "${params[key]}"`);
        }
    });

    return `where=${encodeURIComponent(clauses.join(' AND '))}`;
};

const buildUrl = (baseUrl, params) => {
    let url = baseUrl;
    const queries = [];

    if (Object.keys(params).length !== 0) {
        url += '?';

        const { sortField, sortDir, pageSize, offset, properties, ...where } = params;

        if (sortField && sortDir) {
            queries.push(`sortBy=${sortField}${sortDir === 'desc' ? ' desc' : ''}`);
        }

        if (offset) {
            queries.push(`offset=${offset}`);
        }

        if (pageSize) {
            queries.push(`pageSize=${pageSize}`);
        }

        if (properties) {
            queries.push(`select=${encodeURIComponent(properties.join(','))}`)
        }

        if (Object.keys(where).length > 0) {
            queries.push(buildWhereClause(where));
        }
    }

    return url + queries.join('&');
};

export default buildUrl;