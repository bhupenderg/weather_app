const form  = document.querySelector('form');
const input = document.querySelector('.input');
const submit = document.querySelector('.submit-btn');
var msg1 = document.querySelector('.message-1');
var msg2 = document.querySelector('.message-2');


form.addEventListener('submit', (e) => {
    e.preventDefault();

    msg1.textContent = 'Loading..';
    msg2.textContent = '';

    var place = `http://localhost:3000/weather?address=${input.value}`;

    fetch(place).then((response) => {
        response.json().then((data) => {
            // if(!place.trim()) {
            //     msg1.textContent = "";
                
            // }

            // else{

            //     msg1.innerHTML = `<h2>${data.temperature}</h2>`;
            // }

            

            if(data) {
                msg1.innerHTML = `<h2>${data.temperature}</h2>`;
            }

            else{
                console.log("error")
            }

            
            

            console.log(data)
        })

    });

});
    
