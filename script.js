const addBookText=document.querySelector("#click-text");
let addBookForm=document.querySelector("#myForm");
let closeButton=document.querySelector("#close");
let addButton=document.querySelector("addButton");
let myShelfContainer=document.querySelector(".shelf-container");
let titleInput=document.querySelector("#title");
let authorInput=document.querySelector("#author");
//Is for hiding the form for adding books initially
addBookForm.style.visibility="hidden";

let library=[];
let indexNum=0;//For counting the number of index for the library array
let submit=true;

function Book(data){
    this.data=data;
    bookValues={};
}
//For placing the input values in to an object
Book.prototype.extractValues=function(){
    bookValues.title=this.data.get("title");
    bookValues.by=this.data.get("author");
    bookValues.pages=this.data.get("pages");
    if(this.data.get("readStatus")==="read"){
        bookValues.read="yes";
    }
    else{
        bookValues.read="no";
    }
    library.push(bookValues);
    addBookToLibrary();
}
//Updates the the library array after the read status has been changed
Book.prototype.readStatus=function(n,s){
    library[n].read=s;  
}
//Updates the library array after an item is deleted by the user
Book.prototype.closeShelfItem=function(n){
    library.splice(n,1);
    console.log(library);
}

function addBookToLibrary(){
    let myShelfItem=document.createElement("div");
    myShelfContainer.appendChild(myShelfItem);
    myShelfItem.setAttribute("data-index",indexNum);

    indexNum+=1;

   let closeButton2=document.createElement("button");
   let titleContent=document.createElement("p");
   let byContent=document.createElement("p");
   let pagesContent=document.createElement("p");
   let readContent=document.createElement("button");
//Adding the user input to the library shelf
   closeButton2.textContent="X";
   titleContent.textContent="Title: "+library[library.length-1].title;
   byContent.textContent="By: "+library[library.length-1].by;
   pagesContent.textContent="Pages: "+library[library.length-1].pages;
   readContent.textContent="Read: "+library[library.length-1].read;
   if(readContent.textContent==="Read: yes"){
    readContent.style.background="#65B741";
   }
//Appending the child elements inputs from the user to the book shelf div using map method
   let myArray=[closeButton2,titleContent,byContent,pagesContent,readContent];
   myArray.map(item=>myShelfItem.appendChild(item));

//Making the read button responsive after its clicked by the user and calling a prototype for updating the library array
   readContent.addEventListener("click",(e)=>{
    let readClicked=new Book();
    let status="";
    if(e.target.textContent==="Read: no"){
        e.target.textContent="Read: yes";
        status="yes";
        e.target.style.background="#65B741";
    }
    else{
        e.target.textContent="Read: no"
        status="no";
        e.target.style.background="#A79277";
    }
    readClicked.readStatus(e.target.parentElement.getAttribute("data-index"),status);
   });
//Making the close button for shelf items responsive after its clicked and calling a prototype for updating the library array 
   closeButton2.addEventListener("click",(e)=>{
    myShelfContainer.removeChild(e.target.parentElement);
    let close2Clicked=new Book();
    close2Clicked.closeShelfItem(e.target.parentElement.getAttribute("data-index"));

    let myShelfNodeList=document.querySelectorAll(".shelf-container>div");
    
    let newIndexNum=0;
    indexNum-=1;
    //Assigning new data-index attribute identifier after a shelf item is removed
    myShelfNodeList.forEach((item)=>{
        item.setAttribute("data-index",newIndexNum);
        newIndexNum+=1;
    });
   });
}
//Making the form responsive after just a click on the "Click here to add new book" text
addBookText.addEventListener("click",()=>{
    if(addBookForm.style.visibility==="hidden"){
        addBookForm.style.visibility="visible";
    }
    titleInput.setAttribute("required","required");
    authorInput.setAttribute("required","required");
}); 
//Removing or make the form hiden after the close button is clicked by the user
closeButton.addEventListener("click",(e)=>{
    addBookForm.style.visibility="hidden";
    //For removing the required attributes from the input b/c its causing error if the form is closed with out filling it
    titleInput.removeAttribute("required");
    authorInput.removeAttribute("required");
    submit=false;
}) 
//Submitting the form after its filled by the user
document.querySelector("#myForm").addEventListener("submit",(e)=>{
    e.preventDefault;//Avoids sending the form data to the server by default
    if(submit){
        let formData=new FormData(e.target);
        let callBook=new Book(formData);
        callBook.extractValues();
        addBookForm.reset();
    }
    else{
        submit=true;
    }
});
