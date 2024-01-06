const myApiRequest = async (request, errMsg) => {
    try {
        const response = await fetch(request);
        if(!response.ok) throw new Error("Reload the App Please");
    } catch(err) {
        errMsg = err.message; 
    } finally {
        return errMsg;
    }
}

export default myApiRequest;