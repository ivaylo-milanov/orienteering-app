const buildUrl = (baseUrl, params = {}) => {
    const url = new URL(baseUrl);

    Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
            return;
        }

        if (Array.isArray(value)) {
            url.searchParams.append(key, value.join(','));
        } 
        else {
            url.searchParams.append(key, value);
        }
    });

    return url.toString();
};

export default buildUrl;