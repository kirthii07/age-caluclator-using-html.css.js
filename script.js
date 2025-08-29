# script.js
div.textContent = text;
messages.innerHTML = '';
messages.appendChild(div);
}


function calcAge(){
clearMessages();
status.textContent = '';


if(!dobInput.value){ showAlert('warn', 'Please select your birth date.'); results.hidden = true; return; }


const birth = startOfDay(new Date(dobInput.value));
const today = startOfDay(new Date());


if(isNaN(birth.getTime())){ showAlert('err', 'Invalid date. Please re-enter.'); results.hidden = true; return; }
if(birth > today){ showAlert('err', 'Birth date cannot be in the future.'); results.hidden = true; return; }


let y = today.getFullYear() - birth.getFullYear();
let m = today.getMonth() - birth.getMonth();
let d = today.getDate() - birth.getDate();


if(d < 0){
const prevMonthIndex = (today.getMonth() - 1 + 12) % 12;
const prevMonthYear = prevMonthIndex === 11 ? today.getFullYear() - 1 : today.getFullYear();
d += daysInMonth(prevMonthYear, prevMonthIndex);
m -= 1;
}
if(m < 0){ m += 12; y -= 1; }


ageYMD.textContent = `${y} year${y!==1?'s':''}, ${m} month${m!==1?'s':''}, ${d} day${d!==1?'s':''}`;


const diffMs = today - birth;
const totalDays = Math.floor(diffMs / (1000*60*60*24));
daysLived.textContent = formatNumber(totalDays);


const currentYear = today.getFullYear();
let next = new Date(currentYear, birth.getMonth(), birth.getDate());


if(birth.getMonth() === 1 && birth.getDate() === 29){
const isLeap = (yr)=> (yr%4===0 && yr%100!==0) || (yr%400===0);
next = new Date(currentYear, 1, isLeap(currentYear) ? 29 : 28);
}


if(next < today){
const ny = currentYear + 1;
if(birth.getMonth() === 1 && birth.getDate() === 29){
const isLeap = (yr)=> (yr%4===0 && yr%100!==0) || (yr%400===0);
next = new Date(ny, 1, isLeap(ny) ? 29 : 28);
} else {
next = new Date(ny, birth.getMonth(), birth.getDate());
}
}


const msToNext = startOfDay(next) - today;
const daysToNext = Math.round(msToNext / (1000*60*60*24));
nextBday.textContent = daysToNext === 0 ? '🎉 Today!' : `${formatNumber(daysToNext)} day${daysToNext!==1?'s':''}`;


const weekdayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
weekday.textContent = weekdayNames[birth.getDay()];


results.hidden = false; status.textContent = 'Calculated!';
}


function resetAll(){ dobInput.value = ''; results.hidden = true; clearMessages(); status.textContent = 'Cleared.'; dobInput.focus(); }


setDateLimits();
calcBtn.addEventListener('click', calcAge);
resetBtn.addEventListener('click', resetAll);
dobInput.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') calcAge(); });
})();
```
