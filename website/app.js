/* Global Variables */

const apiKey = "Insert your api here";
const endpoint = `https://api.openweathermap.org/data/2.5/weather?zip=`;
// zip code 94040
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

alert('insert api key first');
//-------------------selectors -------------------//

const Userresponse = document.getElementById('feelings');

//--------------- Making a get request function ---------------//
const getData = async (endpoint = '', zip, apiKey) => {

    const response = await fetch(`${endpoint}${zip},us&appid=${apiKey}&units=imperial`, {
        method: 'GET',
        credentials: 'same-origin'
    });
    // Note it responds with cors issue when adding headers { Content-Type : 'application/json'}
    try {
        const data = await response.json();
        return data;
    } catch (e) {
        console.log('Error: ', e);
    }



}

//------------------ Making a post request -------------------//
const postRequest = async (url = '', data = {}) => {
    console.log(data, "sent")
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            temperature: data.temperature,
            date: data.date,
            userResponse: data.userResponse

        })
    });

    try {
        const data = await response.json();
        return data;
    } catch (e) {
        console.log('Error: ', e);
    }
}


//--------------Update UI function----------------//
const updateUI = (data = {}) => {
    const temp = document.getElementById('temp');
    const date = document.getElementById('date');
    const content = document.getElementById('content');

    console.log(data)
    temp.innerHTML = data.temperature;
    date.innerHTML = data.date;
    content.innerHTML = data.userResponse;
}

//------------- creating event listener ------------------//
const button = document.getElementById('generate');
button.addEventListener('click', (ev) => {
    ev.preventDefault();
    let zip = document.getElementById('zip');
    let data = getData(endpoint, zip.value, apiKey);
    data.then(data => {
        postRequest('/add', {
            temperature: data.main.temp,
            date: newDate,
            userResponse: Userresponse.value
        }).then(res => {
            updateUI(res);
        }).catch(e => console.log(e));
    }
    ).catch(e => console.log(e))
});