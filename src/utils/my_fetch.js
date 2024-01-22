async function get(url, headers) {
    let data = null;
    let error = null;
    let status = null;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        });

        if (response.status !== 200) {
            throw new Error(`Error: ${response.status}`);
        }
        status = response.status;
        const fetchedData = await response.json();
        data = fetchedData;
        error = null;
    } catch (err) {
        error = err.message;
        data = null;
    }
    return {data,error,status};
}

async function put(url, headers,body) {
    let data = null;
    let error = null;
    let status = null;
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        status = response.status;
        const fetchedData = await response.json();
        data = fetchedData;
        error = null;
    } catch (err) {
        error = err.message;
        data = null;
    }
    return {data,error,status};
}

async function deleteData(url, headers,body) {
    let data = null;
    let error = null;
    let status = null;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: headers,
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        status = response.status;
        const fetchedData = await response.json();
        data = fetchedData;
        error = null;
    } catch (err) {
        error = err.message;
        data = null;
    }
    return {data,error,status};
}

export const myFetch = {get,put,deleteData}
