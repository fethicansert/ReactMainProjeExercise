async function apiRequest (url='', options=null, errMsg=null){
    try {
        console.log(`Requseted URL: ${url}`);
        const response = await fetch(url, options);
        if(!response.ok) throw Error("Please reload to App");
    } catch(err) {
        errMsg = err.message;
    } finally {
        return errMsg;
    }
}

export default apiRequest;

//I creare a function that can request to json-server api it's take arguments url,
//options than can take method propertie to decide to reques type ex GET POST PATCH DELETE
//lasty returning errMsg we can do something acording to