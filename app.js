document.getElementById('test-api').addEventListener('click',pullEndpoint);
document.getElementById('header_remove_button').addEventListener('click',removeHeaderInputField);
document.getElementById('query_remove_button').addEventListener('click',removeQueryInputField);
document.getElementById('add-header').addEventListener('click',addHeaderInputField);

function addHeaderInputField(){

    document.getElementById('header-form').appendChild(`
        <div id="header-item">
            <select name="headers" id="headers">
                <option value="A-IM">A-IM</option>
                <option value="Accept">Accept</option>
                <option value="Accept-Charset">Accept-Charset</option>
                <option value="Accept-Encoding">Accept-Encoding</option>
                <option value="Accept-Language">Accept-Language</option>
                <option value="Accept-Datetime">Accept-Datetime</option>
                <option value="Access-Control-Request-Method">Access-Control-Request-Method</option>
                <option value="Authorization">Authorization</option>
                <option value="Cache-Control">Cache-Control</option>
                <option value="Connection">Connection</option>
                <option value="Content-Length">Content-Length</option>
                <option value="Content-MD5">Content-MD5</option>
                <option value="Content-Type">Content-Type</option>
                <option value="Cookie">Cookie</option>
                <option value="Date">Date</option>
                <option value="Expect">Expect</option>
                <option value="Forwarded">Forwarded</option>
                <option value="From">From</option>
                <option value="Host">Host</option>
            </select>
            :&nbsp;<input type="text">
            <span class="x-symbol" id="x-button">&times;</span>
        </div>
    `);

}

function removeHeaderInputField(){
    document.getElementById('header-item').innerHTML = '';
}

function removeQueryInputField(){
    document.getElementById('query-item').innerHTML = '';
}


function pullEndpoint(){
    method = document.getElementById('method').value;
    url = document.getElementById('url').value;
    output = document.getElementById('output-box');
    output.innerHTML = '';
    
    if(method == "POST"){
        data = '';
        url += `?{}`
        fetch(url, {
            method: method, // *GET, POST, PUT, DELETE, etc.
            // mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: "same-origin", // include, same-origin, *omit
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(function(response){
            document.getElementById('status-code').innerHTML = `Response Code: ${response.status}`;
            console.log(response.status)
            return response.json()
    
        })
        .then(function(data){
                document.getElementById('output-box').innerHTML = `<p>Info has been POSTED!`;
            console.log(data);
        })
        .catch(err => console.log(err));
    }
    if(method == "GET"){
        fetch(url)
        .then(function(response){
            document.getElementById('status-code').innerHTML = `Response Code: ${response.status}`;
            console.log(response.status)
            return response.json()
    
        })
        .then(function(data){
                document.getElementById('output-box').appendChild(
                    renderjson(data)
                );
            console.log(data);
        })
        .catch(err => console.log(err));
    }
    if(method == "PUT"){
        fetch(url,{
            method: method,
            // mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify(data),
        })
        .then(function(response){
            document.getElementById('status-code').innerHTML = `Response Code: ${response.status}`;
            console.log(response.status)
            return response.json()
    
        })
        .then(function(data){
            document.getElementById('output-box').innerHTML = `<p>Info has been UPDATED!`;
            // document.getElementById('output-box').appendChild(
            //     renderjson(data)
            // );
            console.log(data);
        })
        .catch(err => console.log(err));
    }
    if(method == "DELETE"){
        fetch(url)
        .then(function(response){
            document.getElementById('status-code').innerHTML = `Response Code: ${response.status}`;
            console.log(response.status)
            return response.json()
    
        })
        .then(function(data){
            document.getElementById('output-box').innerHTML = `<p>Info has been DELETED!`;
            // document.getElementById('output-box').appendChild(
            //     renderjson(data)
            // );
            console.log(data);
        })
        .catch(err => console.log(err));
    }

}

    