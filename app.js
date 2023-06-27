 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
 import { getDatabase, push, ref, onValue, set, } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyDH6OAPpDRkyCHctLv5kS4ClaOwHeG2zes",
   authDomain: "e-commerce-with-fb-and-db-real.firebaseapp.com",
   projectId: "e-commerce-with-fb-and-db-real",
   storageBucket: "e-commerce-with-fb-and-db-real.appspot.com",
   messagingSenderId: "231759262067",
   appId: "1:231759262067:web:ec53d1b47856e4d64b1506",
   measurementId: "G-1XY61Q7ZFB"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);


 var db = getDatabase()



 
var img = document.getElementById("image");
var price = document.getElementById("price");
var description = document.getElementById("des");
var location = document.getElementById("location");
var cat = document.getElementById("cars")

function emp() {
  img.value = "";
  price.value = "";
  description.value = "";
  location.value = "";
}

window.addProduct = function () {
  var obj = {
    imageUrl: img.value,
    price: price.value,
    des: description.value,
    location: location.value,
    cat: cat.value,
  };
  var userRef = push(ref(db, "Product/"));
  obj.id = userRef.key;
  set(userRef, obj);
  emp();
  console.log(obj);
};

window.get = function () {
  var render = document.getElementById("render");
  onValue(ref(db, "Product"), function (productData) {
    var Pro = Object.values(productData.val());
    render.innerHTML = "";
    for (var i = 0; i < Pro.length; i++) {
      console.log(Pro[i]);
      var app = Pro[i];
      render.innerHTML += `
      <div class="col-md-3 mb-3 border shadow rounded">
          <img src="${app.imageUrl}" width="100%" height="200px" />
          <div
            class="border p-2 mt-3 border-end-0 border-start-0 border-bottom-0"
          >
            <p class="fs-5 fw-medium">RS ${app.price}</p>
            <p>${app.des}</p>
            <p>
              <i class="fa-solid fa-location-dot"></i> ${app.location}
            </p>
            <button onclick="proDel('${app.id}')" class="btn btn-danger w-100">Delete Product</button>
          </div>
        </div>
      `;
    }
    console.log(Pro);
  });
};

window.proDel = function (key) {
  remove(ref(db, `Product/${key}`));
  alert("Product Removed");
};

get();


 