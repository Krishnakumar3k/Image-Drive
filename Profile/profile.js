//Received session data and login
var username = sessionStorage.getItem("username");
if(username == null){
    window.location = "../index.html"
}

// Get data of navbar user name
var navbarBrandName = document.querySelector(".navbar-brand");
if(localStorage.getItem(username) != null){
    var userData = JSON.parse(localStorage.getItem(username));
   navbarBrandName.innerHTML = userData.firstName+" "+userData.lastName;
}

//logout coding
var logout = document.querySelector(".logout-btn");
logout.onclick = function(){
    this.innerHTML = "Wait.....";
setTimeout(()=>{
    sessionStorage.removeItem("username");
    window.location = "../index.html";
},1000)};


//start read file code
var imgUrl;
var imgName;
var allImage = [];
var uploadData = document.querySelector(".upload-input");
uploadData.onchange = function(){
    // filereader api
    var freader = new FileReader();
    freader.onload = (e)=>{
        imgUrl = e.target.result;
        imgName = uploadData.files[0];
       // console.log(imgName);
    }
    freader.readAsDataURL(uploadData.files[0]);
}
// start upload file code
var uploadBtn = document.querySelector(".upload-btn");
uploadBtn.addEventListener("click", ()=>{
    registerFunc(); 
    getImgData(); //this func call for live update img file.
});

if(localStorage.getItem(username+"_allImage") != null){
    allImage = JSON.parse(localStorage.getItem(username+"_allImage"));//for array
}
const registerFunc = ()=>{
    if(uploadData.value != ""){
       allImage.push({
        imgUrl : imgUrl,
        imgName :imgName
       });
       localStorage.setItem(username+"_allImage",JSON.stringify(allImage));
       swal("Success!", "Image Uploaded!", "success");
       }else{
        swal("Empty Field!", "Plese upload image First!", "warning");
       }
}

//  code for Showing image in card
var allImagefield = document.querySelector(".all-imgfield")
 const getImgData = ()=>{
   allImagefield.innerHTML = ""; //code for uploading img one at a time. 
    allImage.forEach((img,indx)=>{
      //console.log(img);
        
        allImagefield.innerHTML += `
        <div class="col-md-2 mb-3  text-center" index="${indx}">
            <div class="card">
                <div class="card-header">
                    <p>${img.imgName}<p>
                </div>
                <div class="card-body">
                    <img src="${img.imgUrl}" class="w-75" alt="">
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn view-btn text-white w-50" data-bs-toggle="modal"data-bs-target="#myModal"><i class="fa-solid fa-eye"></i></button>
                    <button class="btn text-white ms-2 w-50 del-btn"><i class="fa-solid fa-trash"></i></button>
                </div>       
            </div>                   
        </div>
        `;
    })

    //Delete img code.
    var allDelBtn = document.querySelectorAll(".del-btn");
    var i;
    for(i=0; i<allDelBtn.length; i++){
        allDelBtn[i].onclick = function(){
            var parent = this.parentElement.parentElement.parentElement;
           var index = parent.getAttribute("index");
          // alert(index);

           swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                allImage.splice(index,1);
                localStorage.setItem(username+"_allImage",JSON.stringify(allImage));
                parent.remove();
              swal("Poof! Your image file has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your image file is safe!");
            }
          });
           
        }
    }
    // image zoom code
    var allViewBtn = document.querySelectorAll(".view-btn");
    var imgBox = document.querySelector(".img-box");
    var modalTitle = document.querySelector(".modal-title");
    for(i=0; i<allViewBtn.length;i++){
       allViewBtn[i].onclick = function(){
           var parent = this.parentElement.parentElement;
           var imgName = parent.querySelector("p").innerHTML;
            var imgSrc = parent.querySelector("img").src;
            modalTitle.innerHTML = imgName;
            imgBox.src = imgSrc;
            

        }
    }

 }
 getImgData();


 //

// <img src="../img/krr.jpg" class="w-75" alt="">