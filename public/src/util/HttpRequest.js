class HttpRequest {



    static get(url, params = {}) {

        return HttpRequest.request('GET', url, params);
    }


    static post(url, params = {}) {

        return HttpRequest.request('POST', url, params);
    }


    static put(url, params = {}) {

        return HttpRequest.request('PUT', url, params);
    }


    static delete(url, params = {}) {

        return HttpRequest.request('DELETE', url, params);
    }

    static request(method, url, params = {}) {

        return new Promise((resolve, reject) => {
            let ajax = new XMLHttpRequest;

            ajax.open(method.toUpperCase(), url);

            ajax.onerror = e => {
                reject(e);
                //console.log(e);
            }
            ajax.onload = (event) => {
                let obj = {};
                try {
                    obj = ajax.responseText //JSON.parse(ajax.responseText);
                } catch (e) {
                    console.log('aqui No Load', e);
                    reject(e);
                }
                console.log(obj)
                resolve(obj);
            }

            ajax.setRequestHeader('Content-Type', 'application/json');
            ajax.send(JSON.stringify(params));

        })

    }

}