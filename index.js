// create object and add in local storage (done)
// get items from local storage and add it in an array (done)
// put the items of array in html file (done)
// if there are items in html file create delete button (ddone)
// search by title
// search by category
// update data item (done)
// delete the item(done)
let mainForm = document.querySelector(".main-form");
let title = document.querySelector(".title");
let priceCountainer = document.querySelector(".price-countainer");
let price = document.querySelector(".price");
let taxes = document.querySelector(".taxes");
let ads = document.querySelector(".ads");
let discount = document.querySelector(".discount");
let totleNumber = document.querySelector(".totle-number");
let count = document.querySelector(".count");
let category = document.querySelector(".category");
let create = document.querySelector(".create");
let update = document.querySelector(".update");
let searchTitleBtn = document.querySelector(".search-by-title");
let searchCategoryBtn = document.querySelector(".search-by-category");
let table = document.querySelector("table");
let tbody = document.querySelector("tbody");
let searchTitle = document.querySelector(".search-title");
let searchCategory = document.querySelector(".search-category");
let priceMore = document.querySelector(".price-more");
let priceLess = document.querySelector(".price-less");
let searchBtn = document.querySelector(".search-btn");
let search = document.querySelector(".search");

let arrayOfData = [];

// localStorage.clear();
if (window.localStorage.getItem("task")) {
  arrayOfData = JSON.parse(window.localStorage.getItem("task"));
}

create.addEventListener("click", function () {
  if (
    title.value != "" &&
    price.value != "" &&
    ads.value != "" &&
    discount.value != "" &&
    taxes.value != "" &&
    count.value != "" &&
    category.value != ""
  ) {
    addToArray();
  }
});

function addToArray() {
  let percent = +price.value / 10;
  if (arrayOfData.length != 0) {
    document.querySelector(".delete-all").remove();
  }

  for (let i = 0; i < count.value; i++) {
    data = {
      id: arrayOfData.length + 1,
      title: title.value,
      price: +price.value,
      taxes: +taxes.value,
      ads: +ads.value,
      discount: +discount.value,
      totle:
        +price.value +
        (percent * +ads.value) / 10 +
        +taxes.value -
        (percent * +discount.value) / 10,
      category: category.value,
      count: count.value,
    };
    arrayOfData.push(data);
  }
  console.log(arrayOfData);
  addToLocalStorage(arrayOfData);
  addToPage();
}

function addToLocalStorage(arr) {
  window.localStorage.setItem("task", JSON.stringify(arr));
  arrayOfData = JSON.parse(window.localStorage.getItem("task"));
}

function addToPage() {
  tbody.innerHTML = "";

  for (let i = 0; i < arrayOfData.length; i++) {
    let tr = document.createElement("tr");
    tr.setAttribute("data-id", arrayOfData[i].id);
    let updateBtn = document.createElement("td");
    updateBtn.classList.add("btn");
    updateBtn.classList.add("btn-update");
    updateBtn.appendChild(document.createTextNode("update"));
    let deleteBtn = document.createElement("td");
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-delete");
    deleteBtn.appendChild(document.createTextNode("delete"));

    tr.appendChild(document.createElement("td")).appendChild(
      document.createTextNode(i + 1)
    );
    tbody.appendChild(tr);

    tr.appendChild(document.createElement("td")).appendChild(
      document.createTextNode(arrayOfData[i].title)
    );
    tbody.appendChild(tr);

    tr.appendChild(document.createElement("td")).appendChild(
      document.createTextNode(arrayOfData[i].price)
    );
    tbody.appendChild(tr);

    tr.appendChild(document.createElement("td")).appendChild(
      document.createTextNode(arrayOfData[i].taxes)
    );
    tbody.appendChild(tr);

    tr.appendChild(document.createElement("td")).appendChild(
      document.createTextNode(arrayOfData[i].ads)
    );
    tbody.appendChild(tr);

    tr.appendChild(document.createElement("td")).appendChild(
      document.createTextNode(arrayOfData[i].discount)
    );
    tbody.appendChild(tr);

    tr.appendChild(document.createElement("td")).appendChild(
      document.createTextNode(arrayOfData[i].totle)
    );
    tbody.appendChild(tr);

    tr.appendChild(document.createElement("td")).appendChild(
      document.createTextNode(arrayOfData[i].category)
    );
    tbody.appendChild(tr);

    tr.appendChild(updateBtn);
    tbody.appendChild(tr);

    tr.appendChild(document.createElement("td")).appendChild(
      document.createTextNode("")
    );
    tbody.appendChild(tr);

    tr.appendChild(deleteBtn);
    tbody.appendChild(tr);
  }
  createDeleteAll();
}

priceCountainer.addEventListener("input", function () {
  theTotle();
});

function theTotle() {
  if (price.value != "" && ads.value != "" && taxes.value != "") {
    let percent = +price.value / 10;
    document.querySelector(".totle-price").classList.remove("empty");
    if (discount.value == "") {
      console.log(+price.value + (percent * +ads.value) / 10 + +taxes.value);
      totleNumber.innerHTML =
        +price.value + (percent * +ads.value) / 10 + +taxes.value;
    } else {
      totleNumber.innerHTML =
        +price.value +
        (percent * +ads.value) / 10 +
        +taxes.value -
        (percent * +discount.value) / 10;
    }
  } else {
    totleNumber.innerHTML = "";
    document.querySelector(".totle-price").classList.add("empty");
  }
}

mainForm.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-all")) {
    arrayOfData.length = 0;
    addToLocalStorage(arrayOfData);
    addToPage();
    e.target.remove();
  }
});

table.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-delete")) {
    deleteTask(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("btn-update")) {
    title.value = e.target.parentElement.children[1].innerHTML;
    price.value = e.target.parentElement.children[2].innerHTML;
    taxes.value = e.target.parentElement.children[3].innerHTML;
    ads.value = e.target.parentElement.children[4].innerHTML;
    discount.value = e.target.parentElement.children[5].innerHTML;
    document.querySelector(".totle-price").classList.remove("empty");
    totleNumber.innerHTML = e.target.parentElement.children[6].innerHTML;
    count.style.visibility = "hidden";
    category.value = e.target.parentElement.children[7].innerHTML;
    create.style.display = "none";
    update.style.display = "block";
    document.querySelector(".update").onclick = function () {
      arrayOfData.forEach(function (arr) {
        if (arr.id == e.target.parentElement.getAttribute("data-id")) {
          arr.title = title.value;
          arr.price = +price.value;
          arr.taxes = +taxes.value;
          arr.ads = +ads.value;
          arr.discount = +discount.value;
          arr.totle = +totleNumber.innerHTML;
          arr.category = category.value;
          console.log(arrayOfData);
          addToLocalStorage(arrayOfData);
          addToPage();
          document.querySelector(".delete-all").remove();
          create.style.display = "block";
          update.style.display = "none";
          document.querySelectorAll("input").forEach(function (input) {
            input.value = "";
          });
          count.style.visibility = "visible";
          theTotle();
        }
      });
    };
  }
});

function deleteTask(id) {
  arrayOfData = arrayOfData.filter((task) => task.id != id);
  addToLocalStorage(arrayOfData);
  addToPage();
  document.querySelector(".delete-all").remove();
}

function createDeleteAll() {
  if (arrayOfData.length != 0) {
    let p = document.createElement("p");
    p.classList.add("delete-all");
    p.appendChild(document.createTextNode(`delete all(${arrayOfData.length})`));
    mainForm.appendChild(p);
  }
}

searchTitleBtn.addEventListener("click", function () {
  searchTitle.style.display = "inherit";
  searchCategory.style.display = "none";
  search.style.display = "none";
  searchTitle.focus();
});
searchCategoryBtn.addEventListener("click", function () {
  searchCategory.style.display = "inherit";
  searchTitle.style.display = "none";
  search.style.display = "none";
  searchCategory.focus();
});

searchTitle.oninput = function () {
  if (arrayOfData.length != 0) {
    document.querySelectorAll("tbody tr").forEach(function (e) {
      if (e.children[1].innerHTML.includes(searchTitle.value)) {
        e.children[1].parentElement.classList.remove("hidden");
      } else {
        e.children[1].parentElement.classList.add("hidden");
      }
    });
  }
};

searchCategory.oninput = function () {
  if (arrayOfData.length != 0) {
    document.querySelectorAll("tbody tr").forEach(function (e) {
      if (e.children[7].innerHTML.includes(searchCategory.value)) {
        e.children[7].parentElement.classList.remove("hidden");
      } else {
        e.children[7].parentElement.classList.add("hidden");
      }
    });
  }
};

searchBtn.onclick = function () {
  if (arrayOfData.length != 0) {
    document.querySelectorAll("tbody tr").forEach(function (e) {
      if (
        Number(e.children[6].innerHTML) >= priceMore.value &&
        Number(e.children[6].innerHTML) <= priceLess.value
      ) {
        e.children[6].parentElement.classList.remove("hidden");
      } else {
        e.children[6].parentElement.classList.add("hidden");
      }
      if (priceMore.value == "" && priceLess.value == "") {
        e.children[6].parentElement.classList.remove("hidden");
      }
      if (priceMore.value == "" || priceLess.value == "") {
        e.children[6].parentElement.classList.remove("hidden");
      }
    });
  }
};

document.querySelector(".search-price").oninput = function () {
  if (priceMore.value == "" || priceLess.value == "") {
    document.querySelectorAll("tbody tr").forEach(function (e) {
      e.children[6].parentElement.classList.remove("hidden");
    });
  }
};

addToPage();
if (price.value != "" && ads.value != "" && taxes.value != "") {
  document.querySelector(".totle-price").classList.remove("empty");
} else {
  document.querySelector(".totle-price").classList.add("empty");
}
