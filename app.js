document.getElementById('test-api').addEventListener('click',pullEndpoint);
document.getElementById('header_remove_button').addEventListener('click',removeHeaderInputField);
document.getElementById('query_remove_button').addEventListener('click',removeQueryInputField);


document.getElementById('add-header').addEventListener('click',addHeaderInputField);
document.getElementById('add-query').addEventListener('click',addQueryInputField);


function addQueryInputField(){
    query = `
        <div id="query-item" class="add-margin-top">
            <div id="query_container">
                <input type="text" placeholder="Name" class="col-4">&nbsp;=
                <input type="text" placeholder="Value">
                &nbsp;<span class="x-symbol" id="query_remove_button" onclick="removeQueryInputField()">&times;</span>
            </div>
        </div>
    `;
    document.getElementById('query_param').insertAdjacentHTML('beforeend',query);
}

function addHeaderInputField(){

    header = `
    <div id="header-item" class="add-margin-top">
        <select name="headers" id="headers" class="custom-select col-4">
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
        :&nbsp;<input type="text" placeholder="Value">
        <span class="x-symbol" id="header_remove_button" onclick="removeHeaderInputField()">&times;</span>
    </div>
    `;

    document.getElementById('header-form').insertAdjacentHTML('beforeend',header);

}

function removeHeaderInputField(){
    document.getElementById('header-item').parentNode.removeChild(document.getElementById('header-item'))
}

function removeQueryInputField(){
    document.getElementById('query-item').parentNode.removeChild(document.getElementById('query-item'))
    // document.getElementById('query-item').innerHTML = '';
}

function pullEndpoint(){

    method = document.getElementById('method').value;
    output = document.getElementById('output-box');
    output.innerHTML = '';
    url = document.getElementById('url').value;

    // Check at URL end whether it's ending with / or not?
    if(url.charAt(url.length - 1) != "/"){
        url += "/"
    }

    if(method == "POST"){

        // Grabing Data from Header Input Fields
        header_li = []

        dict = {}
        headers_el = document.querySelectorAll('#header-item')

        for(i=0; i<headers_el.length; i++){
            for(j=0; j<2; j++){
                header_li.push(document.querySelectorAll('#header-item')[i].children[j].value);
            }
        }

        for(i=0; header_li.length; i++){
            dict[header_li[i]] = `${header_li[++i]}`;
        }

        //////////////////////


        // Query String


        query_list = []

        for(i=0; i<document.querySelectorAll('#query_container').length; i++){
            for(j=0; j<2; j++){
                query_list.push(document.querySelectorAll('#query_container')[i].children[j].value)
            }
        }

        main_query = ""

        for(i=0; i<query_list.length; i++){
            main_query += query_list[i]
            main_query += "="
            main_query += query_list[++i]
            main_query += "&"
        }
        // Query String Ends Here

        // Modifying URL by adding query fields into the main URL
        url += `?${main_query}`
        
        fetch(url, {
            method: method, // *GET, POST, PUT, DELETE, etc.
            // mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: "same-origin", // include, same-origin, *omit
            headers: dict,
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            // body: JSON.stringify(data), // body data type must match "Content-Type" header
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
        // Grabing Data from Header Input Fields
        header_li = []

        dict = {}
        headers_el = document.querySelectorAll('#header-item')

        for(i=0; i<headers_el.length; i++){
            for(j=0; j<2; j++){
                header_li.push(document.querySelectorAll('#header-item')[i].children[j].value);
            }
        }

        for(i=0; header_li.length; i++){
            dict[header_li[i]] = `${header_li[++i]}`;
        }

        //////////////////////


        // Query String


        query_list = []

        for(i=0; i<document.querySelectorAll('#query_container').length; i++){
            for(j=0; j<2; j++){
                query_list.push(document.querySelectorAll('#query_container')[i].children[j].value)
            }
        }

        main_query = ""

        for(i=0; i<query_list.length; i++){
            main_query += query_list[i]
            main_query += "="
            main_query += query_list[++i]
            main_query += "&"
        }
        // Query String Ends Here
        fetch(url,{
            method: method,
            // mode: "cors",
            cache: "no-cache",
            headers: dict,
            redirect: "follow",
            referrer: "no-referrer",
            // body: JSON.stringify(data),
        })
        .then(function(response){
            document.getElementById('status-code').innerHTML = `Response Code: ${response.status}`;
            console.log(response.status)
            return response.json()
    
        })
        .then(function(data){
            document.getElementById('output-box').innerHTML = `<p>Info has been UPDATED!</p>`;
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
            document.getElementById('output-box').innerHTML = `<p>Info has been DELETED!</p>`;
            // document.getElementById('output-box').appendChild(
            //     renderjson(data)
            // );
            console.log(data);
        })
        .catch(err => console.log(err));
    }
}


// header_li = []
// dict = {}
// headers_el = document.querySelectorAll('#header-item')

// for(i=0; i<headers_el.length; i++){
//     for(j=0; j<2; j++){
//         header_li.push(document.querySelectorAll('#header-item')[i].children[j].value);
//     }
// }

// for(i=0; header_li.length; i++){
//     dict[header_li[i]] = `${header_li[++i]}`;
// }


//////////////////////////////////////////////////////////

// / Query String

// query_list = []

// for(i=0; i<document.querySelectorAll('#query_container').length; i++){
// 	for(j=0; j<2; j++){
// 		query_list.push(document.querySelectorAll('#query_container')[i].children[j].value)
// 	}
// }

// main_query = ""

// for(i=0; i<query_list.length; i++){
// 	main_query += query_list[i]
// 	main_query += "="
// 	main_query += query_list[++i]
// 	main_query += "&"
// }