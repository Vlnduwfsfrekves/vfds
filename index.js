let input = document.querySelector('input')
let div = document.querySelector('div')
let array = []
input.addEventListener('input',_.debounce(function (event) {
    fetch('https://restcountries.com/v2/all')
        .then(
            response => response.json()
    )
    .then(
        resp => {
            array = resp
        }
    )
    let inp = input.value
    const results = []
    let resultsObje = []
    for(let i = 0; i < array.length;i++){
        if(array[i].name.toLowerCase().includes(inp.toLowerCase())){
            results.push(array[i].name)
            resultsObje.push(array[i])
        }
    }
    if(results.length>10 || resultsObje.length === 0){
        div.innerHTML = ``
        function showNotification(){
            PNotify.error({
              text:"⚠️Необхідно зробити запит більш специфічним",
              delay:2000,
              closerHover:true,
            })
          }
          showNotification()
    }else if(results.length<=10 && results.length>=2){
        let foolUl = ``
        for(let dhk = 0;dhk<results.length; dhk++){
            foolUl+=`<li>${results[dhk]}</li>`
        }
        div.innerHTML = `<ul>${foolUl}</ul>`
    }else{
        let foolUl = ``
        for(let dhk = 0;dhk<resultsObje[0].languages.length; dhk++){
            if(dhk===0){
            foolUl+=`<li>${resultsObje[0].languages[dhk].name}</li>`
            }else{
                foolUl+=`<li style='margin-top:20px'>${resultsObje[0].languages[dhk].name}</li>`
            }
        }
        div.innerHTML =`
        <h1 style="display: flex;justify-content: center;">${results[0]}</h1>
            <ul style="display: flex; list-style: none;padding: 0;">
            <li style='padding-right: 30px'>
              <ul style="list-style: none;">
              <li style='padding-top:20px'><b>Capital:</b>${resultsObje[0].capital}</li>
              <li style='padding-top:20px'><b>Population:</b>${resultsObje[0].population}</li>
              <li style='padding-top:20px'><b>Languares:</b></li>
              <ul style='padding-top:20px;list-style-type: circle;'>${foolUl}</ul>
              </ul>
            </li>
            <li><img src="${resultsObje[0].flags['png']}"></li>
            </ul>
        </ul>`
    }
},500))