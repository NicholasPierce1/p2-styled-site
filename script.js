// creates global var to hold dom state
let domElements = {
        height: window.document.getElementById("height"),
        width: window.document.getElementById("width"),
        length: window.document.getElementById("length"),
        errorDisplay: window.document.getElementById("errorDisplay"),
        form: window.document.getElementById("form"),
        jokeDisplay: window.document.getElementById("jokeDisplay"),
        volumeDisplay: window.document.getElementById("volumeDisplay")
    };

// creates global var to hold key value of current volume sum
const volumeSumKey = "volumeSumKey";

// creates a function that takes the name of the errored element and displays a const string msg
function displayError(){
    domElements.errorDisplay.innerHTML = "one or more elements are non-empty or not between 1-100.";
}

// creates a function that'll remove the error elements text
function clearError(){
    domElements.errorDisplay.innerHTML = "";
}

// appends an event that increments the local storage of the current sum of the volume
window.addEventListener("load", async()=>{
    
    // checks if local storage key is not null
    if(window.localStorage.getItem(volumeSumKey)){
        // creates prompt to display current sum to user
        window.alert(`Current Volume total: ${window.localStorage.getItem(volumeSumKey)}.`);
    }
    else{
        // inits volume key
        window.localStorage.setItem(volumeSumKey, 0); 
    }
    
    // sets form to prevent submissions/reloads
    if(domElements.form){
    domElements.form.getElementById("form").addEventListener("submit", (event)=>{
        
        // enjoins form to prevent submission
        event.preventDefault();
        
        // clears all input fields
        domElements.height.value = "";
        domElements.length.value = "";
        domElements.width.value = "";
    });
    }
})

// checks validity of all input elements and conditionally raises/clear event
window.document.addEventListener("click", (event)=>{
    
    // checks if event target is an input type
   if(event.target && event.target.value){
       
       // checks if its value is the calculate button -- trigger calculate action
       if(event.target.value.toLowerCase() === "calculate"){
       
           // if all input elements within form are valid then calculate volume and clear error text + update local storage
       if(domElements.form.checkValidity()){
           clearError();
           const volume = calculateVolume();
           updateLocalStorage(volume);
       }
       else{
           // display error message prompting user that 1:m elements arent sufficient per constraints
           displayError();
       }
       }
       // if joke action is targeted, displays joke from api source
       else if(event.target.value.toLowerCase() === "get joke"){
           getJoke();
       }
   }
                                         
});

// calculates volume and displays it as a span & returns volume value
function calculateVolume(){
    const volume = parseInt(domElements.height.value) * parseInt(domElements.width.value) * parseInt(domElements.length.value);
    
    domElements.volumeDisplay.innerHTML = `Volume is: ${volume}<br>`;
    
    return volume;
}

// TEST: calculates volume and displays it as a span & returns volume value (does not parse element values but takes input)
function calculateVolume(width, height, length){
    const volume = width * height *length;
    
    return volume;
}

// gets joke via ajax and displays joke in span
async function getJoke(){
    
    // acquires joke from URI
    const url = 'https://api.icndb.com/jokes/random?limitTo=[nerdy]'
    const rep = await fetch(url);
    const jokeJson = await rep.json();
   
    // sets joke text to span element
    domElements.jokeDisplay.innerHTML = `<br> ${jokeJson.value.joke}<br>` || '<br>no joke to display now';

}

// updates local storage with new volume to accrue
function updateLocalStorage(numberToAdd){
    const currentSum = parseInt(window.localStorage.getItem(volumeSumKey));
    window.localStorage.setItem(volumeSumKey, currentSum + numberToAdd);
}
