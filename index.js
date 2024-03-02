const img= document.querySelector(".weather-img");
const temp= document.querySelector(".temp");
const info= document.querySelector(".weather-info");
const dd= document.querySelector(".date-day");
const time= document.querySelector(".time");
const place= document.querySelector(".place");
const input= document.querySelector(".location");

const getWeather=async ()=>{
    const target= input.value;
    const url=`https://api.weatherapi.com/v1/current.json?key=92f1e3287b4d40248a9153629240103&q=${target}`
    const response= await fetch(url);
    const data= await response.json();
    const{current:{temp_c,
          condition:{text,icon}},
          location:{region,localtime}}= data;
    updateDom(temp_c,text,region,icon,localtime);

};

function updateDom(temp_c,text,name,icon,localtime){
    img.src= icon;
    img.style.display= 'block' ;
    temp.innerText=`${temp_c}°C`;
    info.innerText= text;
    place.innerText= name;
    const [exactDate,exactTime]= localtime.split(" ");
    const exactDay= new Date(exactDate).getDay();
     const[hour,min]= exactTime.split(":");
     let hour12 = hour % 12 || 12; // Handle midnight (0) as 12 AM
     const period = hour < 12 ? 'AM' : 'PM';
      
   
    time.innerText=`${hour12}:${min} ${period}`;
    dd.innerText= `${exactDate} ${getDay(exactDay)}`;
}

function getDay(num){
    switch (num) {
        case 0:
            return "Sunday";
            case 1:
                return "Monday";
            case 2:
                 return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
        default:
                return "Your Deathday";
    }
}