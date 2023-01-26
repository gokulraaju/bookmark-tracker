let webAdd =[]

let input = document.querySelector("#input-el")
let saveBtn = document.querySelector("#save-btn")
let address = document.querySelector("#bookmarks")
let deleteBtn = document.querySelector("#delete-btn")
let saveTab = document.querySelector("#save-tab")
let popBtn = document.querySelector("#pop-btn")
const listFromLocalStorage = JSON.parse(localStorage.getItem("webAdd"))

if(listFromLocalStorage){
    webAdd = listFromLocalStorage
    allAddress(webAdd)
}

saveBtn.addEventListener("click",function(){
    webAdd.push(input.value)
    input.value=""
    localStorage.setItem("webAdd",JSON.stringify(webAdd))
    allAddress(webAdd)
    
})

function allAddress(webAdd){
    let listAdd =""
    for(let i=0;i<webAdd.length;i++){
        listAdd += `<li>
                        <a target="_blank" href="${webAdd[i]}">
                            ${webAdd[i]}
                        </a>
                    </li>`
    }
    address.innerHTML = listAdd
}

saveTab.addEventListener("click",function(){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        webAdd.push(tabs[0].url)
        localStorage.setItem("webAdd",JSON.stringify(webAdd))
        allAddress(webAdd)

    })
})

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    webAdd = []
    allAddress(webAdd)
})

popBtn.addEventListener("click",function(){
    webAdd.pop()
    localStorage.setItem("webAdd",JSON.stringify(webAdd))
    allAddress(webAdd)
})