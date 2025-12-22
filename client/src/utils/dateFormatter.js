export const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    
    const date = new Date(isoString);
    
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC'
    });
};