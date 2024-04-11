const btnAdd = document.querySelector(".btn_add");
const inputTxt = document.querySelector(".inputTxt");
const list = document.querySelector(".list");
const list_footer = document.querySelector(".list_footer");
const tabList = document.querySelectorAll(".tab li");
let togglesStatus = "all";
//新資料
let data = [];

function renderData() {
  let showData = []; //切換tab時顯示的data
  let str = "";

  if (togglesStatus === "all") {
    showData = data;
  } else if (togglesStatus === "work") {
    showData = data.filter(function (item) {
      return item.checked == ""; //記得要用return將值回傳 不然就用箭頭函式
    });
  } else if (togglesStatus === "done") {
    showData = data.filter(function (item) {
      return item.checked == "checked";
    });
  }

  //左下角計算data中待完成數量
  const workNum = document.querySelector(".work_num");
  const dataLength = data.filter(function (item) {
    return item.checked == "";
  }).length;

  workNum.innerHTML = dataLength;
  console.log(dataLength);

  showData.forEach(function (item, i) {
    str += `<li data-num=${item.id}>
    <label class="checkbox" for="">
      <input type="checkbox" class="check" ${item.checked}/>
      <span>${item.content}</span>
    </label>
    <a href="#" class="delete" ></a>
  </li>`;
  });
  list.innerHTML = str;
  //計算待完成項目
  // workNum.innerHTML = data.length;
}

//新增項目
btnAdd.addEventListener("click", function (e) {
  if (inputTxt.value.trim() == "") {
    alert("請輸入待辦項目");
    return;
  }
  let str = {
    content: inputTxt.value.trim(), //確保不是空值
    checked: "",
    id: new Date().getTime(), //建立id
  };
  e.preventDefault(); //阻止默認行為 切換頁面
  str.content = inputTxt.value;
  // console.log(inputTxt.value);
  data.unshift(str);
  // console.log(data);
  let togglesStatus = "all"; //狀態為all
  inputTxt.value = "";

  tabList.forEach(function (item) {
    item.classList.remove("active");
    if (item.getAttribute("data-tab") === togglesStatus) {
      //確認有這屬性再加上active
      item.classList.add("active");
    }
    renderData();
  });
});

//刪除、checkbox
list.addEventListener("click", function (e) {
  // 要先找對應的data-index

  let index = parseInt(e.target.closest("li").dataset.num); //closest 找最接近的li

  // console.log(index);
  if (e.target.getAttribute("class") === "delete") {
    console.log("要刪除");
    data.forEach(function (item, i) {
      if (item.id === index) {
        data.splice(i, 1);
      }
    });
    renderData();
    alert("刪除成功囉");
  } else if (e.target.getAttribute("class") === "check") {
    data.forEach(function (item) {
      //確認li id和 data id一樣
      if (item.id === index) {
        // console.log(item.id);
        if (item.checked === "checked") {
          //切換不打勾
          item.checked = "";
        } else {
          item.checked = "checked";
        }
      }
    });
  }
  renderData();
});

const tabs = document.querySelector(".tab");

//tab切換
tabList.forEach(function (tab) {
  tab.addEventListener("click", function (e) {
    //取得點擊的DOM li
    // console.log(e.target);
    togglesStatus = e.target.getAttribute("data-tab");
    tabList.forEach(function (item) {
      item.classList.remove("active");
    });
    e.target.classList.add("active");
    renderData();
  });
});

//清除完成項目
list_footer.addEventListener("click", function (e) {
  if (e.target.getAttribute("class") !== "delete_all") {
    // console.log('點錯');
    return;
  } else {
    e.preventDefault(); //阻止a默認行為
    data = data.filter(function (item) {
      return item.checked == ""; //因為已完成tab要顯示 'checked' ，將資料data都變為未完成項目，重新賦予值
    });
    console.log(data);
  }
  renderData();
});
