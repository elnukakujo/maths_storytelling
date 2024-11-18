import { apiUrl } from "../constants";

export const fetchData = async (url) => {
    try {
        const response = await fetch(apiUrl+url);
        
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

export const postData = async (url, data) => {
    try {
        const response = await fetch(apiUrl+url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.text();
        console.log('Response:', responseData);
        return responseData;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}