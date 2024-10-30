export const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        
        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // Log the error to the console for debugging
        console.error('Fetch error:', error);
        // Re-throw the error to be handled elsewhere if needed
        throw error;
    }
}