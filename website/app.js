
/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = "a4f0ed1c873367931f219c4a33539a58";
let zip = "";
// Create a new date instance dynamically with JS
let d = new Date();
let m = d.getMonth() + 1;
let newDate = m+'.'+ d.getDate()+'.'+ d.getFullYear();
// Get request to weather api function
const getWeather = async (baseUrl, key, zipCode) => {
    const url = baseUrl + zipCode + "&appid=" + key;
    var res = await fetch(url);
    try{
        var response = await res.json();
        return response;
    }catch(e){
        console.log("error: ", e);
    };
};
// Get request to my end point 
const getProjectData = async (url='') => {
    const response = await fetch(url);
    try{
        var res = await response.json();
        return res;
    }
    catch(e){
        console.log('error: ', e);
    }
};
// Post request function 
const postData = async (url='', data={}) => {
    const response = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json'  
        },
        body: JSON.stringify(data)
    });
    try{
        const newData = await response.json();
        return newData
    }
    catch(error){
        console.log("error: ", error);
    };
     
}; 
// event listener to generation click
const generate = async () => {
    const inputField = document.getElementById('zip');
    zip = inputField.value;
    res = getWeather(baseURL,apiKey, zip).then((data) => {
        data['date'] = newDate;
        data['userResponse'] = document.getElementById('feelings').value;
        postData('/postData', data);
    }).then(() => {
        getProjectData('getData').then((data) => {
            document.getElementById('temp').innerHTML = "Temperature: " + data.temp + " F";
            document.getElementById('date').innerHTML = "Date: " + data.date;
            document.getElementById('content').innerHTML = "User Feeling: " + data.res;
        });
    });
};
const btn = document.getElementById('generate');
btn.addEventListener('click', generate);
