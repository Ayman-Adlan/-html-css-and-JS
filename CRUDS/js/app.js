// Set Variables
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
// testing
// console.log(title,price,taxes,ads,discount,total,count,category,submit)

let mode = 'create';
let tmp;

// Get total
function getTotal(){
  if(price.value != ''){
    let result = (+price.value + +taxes.value + +ads.value)
    - +discount.value
    total.innerHTML = result;
    total.style.background = 'green';
  }else{
    total.innerHTML = '';
    total.style.background = 'rgb(48, 114, 114)';
  }
};


// Create Product
/*
Making an if the condition so we can keep the data from
a1- If the storage is not empty (null) then we put the action
to make the array = local storage data that we created before
2- Make an else condition to empty the array or keep it empty if there is no data there
*/
let dataArr = [];

if(localStorage.products != null){
  dataArr = JSON.parse(localStorage.products)
  // }else{
    
    // }
}
// Making a function works when we press on submit button
submit.onclick = function(){
  /*
  Make an object to collect data from inputs
  so that we can store it in the array
  */
  let objData = {
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
  };
  
  if(title.value != ''
  && price.value != ''
  && category.value != ''
  && objData.count < 100){
    if(mode === 'create'){
      if(objData.count > 1){
        for(let i = 0; i < objData.count;i++){
          dataArr.push(objData);
        }
      }else{
      // Save the object we made in the array by using PUSH
        dataArr.push(objData);
      }
    }else{
      dataArr[tmp] = objData;
      mode = 'create';
      submit.innerHTML = 'Create';
      count.style.display = 'block';
    }
  clearData();
  }
  // console.log(dataArr); // Testing
  // Save the product in local storage
  localStorage.setItem('products', JSON.stringify(dataArr));
  showData();
}

// Clear data
/*
Setting the value of each input item to empty ('')
To CLEAR the input after clicking submit so that we can enter a new item
*/
function clearData(){
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}

// Read data in main page

function showData(){
  getTotal();

  let table = '';
  for(let i = 0; i < dataArr.length;i++){
    table += `
      <tr>
        <td>${i+1}</td>
        <td>${dataArr[i].title}</td>
        <td>${dataArr[i].price}</td>
        <td>${dataArr[i].taxes}</td>
        <td>${dataArr[i].ads}</td>
        <td>${dataArr[i].discount}</td>
        <td>${dataArr[i].total}</td>
        <td>${dataArr[i].category}</td>
        <td><button onclick='updateData(${i})' id="updateBtn">update</button></td>
        <td><button onclick='deleteData(${i})' id="deleteBtn">delete</button></td>
      </tr>
    `
  }
  document.getElementById('tbody').innerHTML = table;

  let deleteAllBtn = document.getElementById('delete-all');
  if(dataArr.length > 0){
    deleteAllBtn.innerHTML = `
    <button onclick='deleteAll()'>Delete All (${dataArr.length})</button>
    `
  }else{
    deleteAllBtn.innerHTML = '';
  }
}
showData();

// Delete one item from the table
function deleteData(i){
  dataArr.splice(i,1);
  localStorage.products = JSON.stringify(dataArr);
  showData();
};

//Delete All data from the page
function deleteAll(){
  localStorage.clear();
  dataArr.splice(0);
  showData();
};

// Update Data
function updateData(i){
  // console.log(i)
  title.value = dataArr[i].title;
  price.value = dataArr[i].price;
  taxes.value = dataArr[i].taxes;
  ads.value = dataArr[i].ads;
  discount.value = dataArr[i].discount;
  category.value = dataArr[i].category;
  getTotal();
  mode = 'update';
  submit.innerHTML = 'Update';
  count.style.display = 'none';
  tmp = i;
  scroll({
    top:0,
    behavior:'smooth',
  })
};

// Search by title and category
let searchMode = 'title';
function getSearch(id){
  // console.log(id)
  let search = document.getElementById('search');
  if(id == 'searchTitle'){
    searchMode = 'title'
  }else{
    searchMode = 'category'
  }
  search.focus();
  search.placeholder= 'Search by ' + searchMode;
  search.value = '';
  showData();
  // console.log(searchMode)
}

function mainSearch(value){
  let table = '';
  for(let i = 0;i < dataArr.length; i++){
    if(searchMode == 'title'){
        if(dataArr[i].title.includes(value.toLowerCase())){
          table += `
            <tr>
              <td>${i}</td>
              <td>${dataArr[i].title}</td>
              <td>${dataArr[i].price}</td>
              <td>${dataArr[i].taxes}</td>
              <td>${dataArr[i].ads}</td>
              <td>${dataArr[i].discount}</td>
              <td>${dataArr[i].total}</td>
              <td>${dataArr[i].category}</td>
              <td><button onclick='updateData(${i})' id="updateBtn">update</button></td>
              <td><button onclick='deleteData(${i})' id="deleteBtn">delete</button></td>
            </tr>
          `
        }
    }else{
        if(dataArr[i].category.includes(value.toLowerCase())){
          table += `
            <tr>
              <td>${i}</td>
              <td>${dataArr[i].title}</td>
              <td>${dataArr[i].price}</td>
              <td>${dataArr[i].taxes}</td>
              <td>${dataArr[i].ads}</td>
              <td>${dataArr[i].discount}</td>
              <td>${dataArr[i].total}</td>
              <td>${dataArr[i].category}</td>
              <td><button onclick='updateData(${i})' id="updateBtn">update</button></td>
              <td><button onclick='deleteData(${i})' id="deleteBtn">delete</button></td>
            </tr>
          `
        } 
    }
  }
  document.getElementById('tbody').innerHTML = table;
}