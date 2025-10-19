//=========================================顶部开始区域=======================================
/* 顶部菜单栏 */
/* 悬浮时的样式 */
/* 菜单父级+图片获取id选择器属性 */
const baractive = document.getElementById("hoverDropdown");
const bar = document.querySelector('.cascade-bar');
const img = document.getElementById("imageemnu");
const imgArr_top = ["../images/index/emnu1.png", "../images/index/emnu2.png"];
const emnu = document.querySelector('.emnu');
/*买家中心 菜单+图片 */
/* 鼠标移入，进行添加 */
baractive.addEventListener('mouseenter', function () {
  img.src = imgArr_top[0];
  this.classList.add('active');
});

/* 鼠标移出,进行删除 */
baractive.addEventListener('mouseleave', function () {
  img.src = imgArr_top[1];
  this.classList.remove('active');
});
//==================拦截器=================
const left = document.querySelector('.f-c-left');
const rigth = document.querySelector('.f-c-rigth');
const left_iten = document.querySelector('.left-iten');
const currentUser = localStorage.getItem('currentUser');
//获取DOM拦截器,指定的拦截器
document.addEventListener('DOMContentLoaded', function () {
  // 如果该元素需要登录才能点击，并且用户未登录，则拦截
  if (!currentUser) {
    // alert('请先登录');
    localStorage.setItem('ok-login', '0');
    window.location.href = "../html/login.html";
  }
  // else if(){//判断地址是否为空

  // }
});
if (currentUser) {
  left.style.display = "none";
  rigth.style.display = "none";
  //修改文字原本的颜色
  left_iten.style.color = "red";

  //修改div的文字内容
  bar.innerHTML = `<div class="cascade-bar f-c">${currentUser}<img id="imageemnu" src="../images/index/emnu2.png" style="width: 8px"></div>`;
  //点击退出
  emnu.addEventListener('click', () => {
    // alert('你已退出登录');
    element('../images/massages/primary.png', '你已退出登入', '#1296db')
    setInterval(() => {
      window.location.href = "../html/login.html";
    }, 1000);

    localStorage.removeItem('currentUser');

  });
}
//=========================================顶部结束区域=======================================

//==================================内容开始区域====================================
// 存储键名
const STORAGE_KEY = 'userAddresses';
// 地址数据存储
let addresses = [];
let ID = 1;
//订单和已售商品数据存储
let orders = JSON.parse(localStorage.getItem('orders')) || []; // 存储所有订单
let soldProducts = JSON.parse(localStorage.getItem('soldProducts')) || [];//存储所有已售商品信息

// 获取当前用户的地址数据
function getUserAddresses() {
  const userData = JSON.parse(localStorage.getItem(currentUser)) || {};
  return userData.userAddresses || [];
}

// 保存地址到用户数据中
function saveUserAddresses(addressData) {
  const userData = JSON.parse(localStorage.getItem(currentUser)) || {};
  userData.userAddresses = addressData;
  localStorage.setItem(currentUser, JSON.stringify(userData));
  // 更新当前 addresses 数组
  addresses = addressData;
}

//根据id寻找对应数据
function findProductById() {
  //获取url参数
  const id = new URLSearchParams(window.location.search).get('id');
  if (id) {
    if (id <= 12) {
      return window.products.find(p => p.id === parseInt(id));
    } else {
      return window.seckill.find(s => s.id === parseInt(id));
    }

  } else {
    // alert('请登入');
    localStorage.setItem('ok-login', '0');
    window.location.href = '../html/login.html';
    return;
  }
}

//当前商品
let product = findProductById();
//==============================创建商品卡片============================
function initGood() {
  const shopping = document.querySelector('.shopping');
  const buyItemInfoWrapperWithPresale = document.createElement('div');
  const totalPrice = document.querySelector('.totalPrice');
  const price_w = document.querySelector('.price-w');
  buyItemInfoWrapperWithPresale.className = 'buyItemInfoWrapperWithPresale';
  buyItemInfoWrapperWithPresale.innerHTML = `
       <div class="buyItemInfoWrapperNew">
                  <!-- 商品区域 -->
                  <div class="itemGoodWrapper">

                    <div class="GoodWrapper">
                      <!--商品图-->
                      <a href="../html/good.html?id=${product.id}" class="GWrapper">
                        <img class="GImg" src="${product.image}" alt="">
                      </a>
                      <!-- 说明 -->
                      <div class="GcontentWrappe">
                        <br/>
                        <a href="../html/good.html?id=${product.id}" class="Gtitle">${product.name}</a>
                      </div>
                    </div>

                  </div>
                  <!-- 属性区域 -->
                  <div class="itemAttrssWrapper">
                    <div class="AttrssWrapper">
                      <span class="Atttrss-title">${product.Atter}</span>
                    </div>
                  </div>
                  <!-- 数量区域-->
                  <div class="itemQuantityWrapper">
                    <br />
                    <div class="buyQuantity">
                      <!--按钮区域-->
                      <div class="quantityWrapper" title="数量1">
                        <div class="minus">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="12" height="12">
                            <path d="M2.25 6.563h7.5a.563.563 0 0 0 0-1.125h-7.5a.563.563 0 0 0 0 1.125Z"
                              fill-rule="evenodd" fill="#CACFD7" class="fill" ></path>
                          </svg>
                        </div>
                        <input type="text" value="1" class="inputWrapper ant-input">
                        <div class="add">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="12" height="12">
                            <path
                              d="M5.438 5.438V2.25a.563.563 0 0 1 1.125 0v3.188H9.75a.563.563 0 0 1 0 1.125H6.562V9.75a.563.563 0 0 1-1.125 0V6.562H2.25a.563.563 0 0 1 0-1.125h3.188Z"
                              fill-rule="evenodd" fill="#000" class="fill"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--价格区域-->
                  <div class="itemPriceWrapper">
                    <br/>
                    <div class="price-container" style="color: rgb(122, 122, 122);">
                      <span class="trade-price-symbol">￥</span>
                      <span class="price">${product.price.toFixed(2)}</span>
                    </div>
                  </div>

                </div>
  `;
  totalPrice.innerHTML = `<span class="trade-price-symbol totalPrice_unit">￥</span>
                  <!--商品价格-->
                  <span class="trade-price-integer totalPrice_num">${product.price.toFixed(2)}</span>`;
  shopping.appendChild(buyItemInfoWrapperWithPresale);//生成商品卡片
  price_w.appendChild(totalPrice);//生成价格
}
initGood();

//===========================增减功能===========================
increaseordecrease = function () {
  //增上线
  let addMaxFlag = false;
  const ADD_MAX = "999";
  //减上线
  let reduceMaxFlag = true;
  const REDUCE_MAX = "1";
  //获取minus(-),add(+),ant_input(输入框),fill(按钮，用于变换颜色，限制是否要点击)
  // num(共有(多少)件商品),price(价格),numtitle(标题数量) class属性
  const minus = document.querySelector('.minus');
  const add = document.querySelector('.add');
  const ant_input = document.querySelector('.ant-input');
  const fill = document.querySelectorAll('.fill');
  const num = document.getElementById('num');
  const price = document.querySelector('.totalPrice_num');
  const numtitle = document.querySelector('.quantityWrapper');
  ant_input.onblur = function () {
    // console.log(typeof ant_input.value);//测试什么类型的数据
    if (ant_input.value == ADD_MAX) {//增上线，每个人都有上线
      ADD();
    } else if (+ant_input.value < +ADD_MAX) {
      updateTXT();
      fill[1].style.fill = '#000';
      add.style.cursor = "pointer";
      addMaxFlag = false;
    }
    if (ant_input.value == REDUCE_MAX) {//减上线，每个人都有上线
      MINUS();
    } else if (ant_input.value > REDUCE_MAX) {
      updateTXT();
      fill[0].style.fill = '#000';
      minus.style.cursor = "pointer";
      reduceMaxFlag = false;
    }
    //超范围
    if (+ant_input.value < +REDUCE_MAX) {
      element('../images/massages/failed.png', '超出范围,至1', 'red')
      ant_input.value = "1";
      MINUS();
    } else if (+ant_input.value > +ADD_MAX) {
      //提示
      element('../images/massages/failed.png', '超出范围,至999', 'red')
      ant_input.value = "999";
      ADD();
    }
  }

  //给减按钮添加点击事件
  minus.addEventListener('click', () => {
    if (reduceMaxFlag) {//不能在减了
      return;
    } else {
      //设置文本
      ant_input.value = +(ant_input.value) - 1;
      MINUS();
    }

  })
  //给加按钮添加点击事件
  add.addEventListener('click', () => {
    if (addMaxFlag) {//不能在加了
      return
    } else {
      //设置文本
      ant_input.value = +(ant_input.value) + 1;
      ADD();
    }

    // console.log('+');
  })

  //加的逻辑函数
  function ADD() {
    updateTXT();
    if (ADD_MAX == ant_input.value) {//不能在加了
      fill[1].style.fill = '#CACFD7';
      // ant_input.value = 999;
      add.style.cursor = "default";
      addMaxFlag = true;
    }

    //调整减的按钮样式
    if (reduceMaxFlag) {
      // console.log(fill[0].style.fill);
      fill[0].style.fill = '#000';
      minus.style.cursor = "pointer";
      reduceMaxFlag = false;
    }
  }
  //减的逻辑函数  
  function MINUS() {
    updateTXT();
    if (REDUCE_MAX == ant_input.value) {//不能在减了
      fill[0].style.fill = '#CACFD7';
      // ant_input.value = 1;
      minus.style.cursor = "default";
      reduceMaxFlag = true;
    }
    // console.log('-');
    //调整加的按钮样式
    if (addMaxFlag) {
      fill[1].style.fill = '#000';
      add.style.cursor = "pointer";
      addMaxFlag = false;
    }
  }
  //文本更新(price,num,numtitle) 
  function updateTXT() {
    //1.更新共有多少件商品数量
    //  num.textContent='';
    num.innerHTML = ant_input.value;
    // console.log(num.innerHTML);
    //2.更新价格  注意:在Js中都是string,要转:+,parseInt,Number (a)。不信小陈,可以用(typeof 变量名)测试,嘻嘻
    //toFixed(2)保留2位小数点 比如:2.564 2.56
    price.innerHTML = '';
    price.innerHTML = (parseFloat(product.price) * +ant_input.value).toFixed(2);
    // console.log((parseFloat(product.price)*+ant_input.value).toFixed(2));
    // console.log(round(2.555,2));//2.56
    //3.更新标题数量
    numtitle.title = '';
    numtitle.title = '数量' + (ant_input.value);

  }
}
increaseordecrease();


//================================订单功能==============================
const btn = document.querySelector('.btn');
btn.addEventListener('click', function () {
  addresses = getUserAddresses();
  if (addresses.length == 0) {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // 防止背景滚动
    initModal("新增地址", 0);
  } else {

    const el_overlay = document.querySelector('.el-overlay');
    initP();
    el_overlay.classList.add('active-btn');
    document.body.style.overflow = 'hidden'; // 防止背景滚动
  }


})
function OrderSubmitted() {
  // 获取地址
  let adAddres = addresses.map(item => item).find(item => item.id == 1 ? item : null);
  if (adAddres == null) {
    return;
  }
  //获取支付
  let pay = document.querySelector('input[name="payment"]:checked').value;
  // console.log(`支付方式:${pay},id:${adAddres.id},用户名:${adAddres.username},地址:${adAddres.address}`);
  const address = adAddres.address.trim();//地址
  const user = adAddres.username;//用户
  const totalPrice_num = document.querySelector('.totalPrice_num').textContent;//价格
  const totalPrice_quantity = document.getElementById('num').textContent;//数量
  const products = {
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    quantity: +totalPrice_quantity,
    selected: true
  };

  // 生成订单信息
  const order = {
    orderId: 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 10000), // 随机订单号
    user: user,
    items: [products], // 拷贝商品
    totalQuantity: parseInt(totalPrice_quantity),
    totalPrice: totalPrice_num,
    timestamp: new Date().toLocaleString(), // 下单时间
    address: address,
    Pay: pay,
    comment: '', // 先留空，等评论提交再填
    delivered: false, // 初始未送达
    deliveryTime: new Date().getTime() + 2 * 60 * 1000 // 2分钟后送达（时间戳）
  };
  // console.log(order);
  // console.log(product);
  //保存已售商品信息  id(商品id) name(商品名称) price(商品价格) quantity(商品数量)
  //获取已经售商品id，数量进行相加，不用保存重复的
  for (let j = 0; j < soldProducts.length; j++) {
    if (soldProducts[j].id === product.id) {
      soldProducts[j].quantity += parseInt(totalPrice_quantity);
      break;
    }
    //保存已售商品信息
  }

  console.log(soldProducts);
  localStorage.setItem('soldProducts', JSON.stringify(soldProducts));//存储到本地soldProducts
  // // 保存订单
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
  //确定结算后自动跳转
  window.location.href = "../html/orders.html";

}
//================================确认弹窗========================
//渲染确认弹窗
function initP() {
  // console.log('111');
  const el_overlay = document.querySelector('.el-overlay');
  // 清除之前可能存在的container
  const existingModal = el_overlay.querySelector('.container');
  if (existingModal) {
    existingModal.remove();
  }
  const container = document.createElement('div');
  container.className = "container";
  container.innerHTML = `
        <div class="header">
            <i class="fas fa-info-circle"></i>
            <h2>确认操作</h2>
        </div>
        <div class="content">
            <p class="message">
                是否要支付钱
            </p>
            
            <div class="buttons">
                <button class="btn btn-cancel" id="CancelBtn">
                    <i class="fas fa-times"></i> 取消
                </button>
                <button class="btn btn-confirm">
                    <i class="fas fa-check"></i> 确认
                </button>
            </div>
        </div>
        
        <div class="footer">
            需要帮助？请访问我们的帮助中心或联系客服
        </div>`;
  el_overlay.appendChild(container);//生成
  // 添加按钮交互效果
  const closeModalBtn = document.getElementById('CancelBtn');
  const submitModalBtn = document.querySelector('.btn-confirm')
  // 关闭弹窗
  function closeModal() {

    el_overlay.classList.remove('active-btn');
    document.body.style.overflow = 'auto'; // 恢复背景滚动

  }
  function close() {

    closeModalBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 取消中...';
    setTimeout(() => {
      closeModal();
      closeModalBtn.innerHTML = '<i class="fas fa-times"></i> 取消';
    }, 1000);
  }
  //取消
  closeModalBtn.addEventListener('click', function () {
    //提示:取消
    element('../images/massages/info.png', '取消', '#3e3e3e');
    close();
  });
  //确认
  submitModalBtn.addEventListener('click', function () {
    submitModalBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 确认中...';
    setTimeout(() => {
      //提示:支付成功
      element('../images/massages/success.png', '支付成功', '#39bf3e');
      submitModalBtn.innerHTML = '<i class="fas fa-check"></i> 确认';
      setTimeout(() => {
        OrderSubmitted();
        let ant_input = document.querySelector('.ant-input');
        ant_input.value = "1";
        document.getElementById('myForm').reset();
      }, 1000);
    }, 1000);
  });
  // 按ESC键关闭弹窗
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      close();
    }
  });
}



//=================================使用新地址================================
// 获取DOM元素
const openModalBtn = document.querySelector('.adAddress');

//定义地址名(新建/修改地址)，当前用户名，获取当前用户头像
let addresstitle;
let username = document.getElementById('username');
let userimage = JSON.parse(localStorage.getItem(currentUser)).image || '../images/index/avatar-default.png';

let listItemWrap;
//渲染地址列表
function initlistItem() {
  const listWrap = document.querySelector('.listWrap');
  listWrap.innerHTML = '';//清除旧的

  for (let i = addresses.map(item => item).length - 1; i >= 0; i--) {
    if(addresses[i].username==currentUser)
    {
    listItemWrap = document.createElement('div');
    listItemWrap.className = 'listItemWrap';
    let active;//谁第一，就给他border属性
    if (addresses[i].id == 1) {
      active = 'listItem-active';
      listItemWrap.innerHTML = `
                <!-- 地址列表核心区域 -->
                <div class="listItem ${active}">
                  <div class="addressContent" data-id="${addresses[i].id}">
                    <div class="addressInfo">
                      &nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <div class="trade-clamp-wrap trade-clamp-ellipsis addressDetail"
                     >${addresses[i].address}</div>
                     <div class="userinfo">

                      <div class="trade-clamp-wrap " >${addresses[i].username}</div>
                     </div>
                     <div class="editBtn">编辑</div>
                     <div class="deletBtn" >删除</div>
                  </div>
                </div>
                <!-- 空隙，有个间距 -->
                <div class="listErrorTip"></div>
   `;//新增新的

    } else {
      listItemWrap.innerHTML = `
                <!-- 地址列表核心区域 -->
                <div class="listItem ${active}">
                  <div class="addressContent" data-id="${addresses[i].id}">
                    <div class="addressInfo">
                      &nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <div class="trade-clamp-wrap trade-clamp-ellipsis addressDetail"
                     >${addresses[i].address}</div>
                     <div class="userinfo">

                      <div class="trade-clamp-wrap " >${addresses[i].username}</div>
                     </div>
                     <div class="editBtn">编辑</div>
                  </div>
                </div>
                <!-- 空隙，有个间距 -->
                <div class="listErrorTip"></div>
   `;//新增新的
    }

    listWrap.appendChild(listItemWrap);
  }

  }
  //为啥放这里，因为没有渲染啊，直接放上去报错,获取DOM元素
  const editBtn = document.querySelectorAll('.editBtn');
  //编辑操作
  editBtn.forEach((element) => {
    element.addEventListener('click', (e) => {
      // 获取当前地址列表的 ID（从父级 addressContent 上取）
      const addressId = element.closest('.addressContent').dataset.id;
      addresstitle = '修改地址';
      initModal(addresstitle, addressId);
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // 防止背景滚动
    })
  });
//删除操作
  const deletBtn = document.querySelectorAll('.deletBtn');
  deletBtn.forEach((element) => {
    element.addEventListener('click', () => {
      // 获取当前操作的 addressContent 元素 和它的 id
      const addressContent = element.closest('.addressContent');
      const addressId = parseInt(addressContent.dataset.id); // 转为数字

      // 找到最外层的 listItemWrap 并删除它
      // 假设结构: <li class="listItemWrap"> ... <div class="addressContent"> ... </div> ... </li>
      const listItemWrap = addressContent.closest('.listItemWrap');
      if (addressId == 1) {//只要第一的有权利删除
        console.log(addressId);
        listItemWrap.remove(); // 删除指定的 listItemWrap
      } else {
        return;
      }
      //从 addresses 数组中过滤掉被删除的项
      addresses = addresses.filter(item => item.id !== addressId);
      // 如果删除后没有地址了，清空 userAddresses
      if (addresses.length === 0) {
        saveUserAddresses([]);
      } else {
        // 重新排序 
        addresses.sort((a, b) => b.id - a.id); // 确保倒序
        //a-b 正序  b-a 倒序
        addresses = addresses.map((item) => ({
          id: item.id - 1,
          username: item.username,
          address: item.address
        }));
        // 保存整个更新后的数组
        saveUserAddresses(addresses); 
        initlistItem();
      }
    });
  });
  //点击置顶效果
  function list() {
  }
  list();
}
//初始化地址列表
document.addEventListener('DOMContentLoaded', function () {
  addresses = getUserAddresses();
  if (addresses.length == 0) {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // 防止背景滚动
    initModal("新增地址", 0);
  }
  initlistItem();
})

//渲染弹窗
function initModal(title, Id) {
  const modal_overlay = document.querySelector('.modal-overlay');
  // 清除之前可能存在的modal
  const existingModal = modal_overlay.querySelector('.modal');
  if (existingModal) {
    existingModal.remove();
  }
  const modal = document.createElement('div');
  modal.className = "modal";
  modal.innerHTML = `
      <div class="modal-header">
        <h2 class="modal-title">${title}</h2>
        <button class="close-btn" id="closeModalBtn">&times;</button>
      </div>
      <div class="modal-body">
        <form id="addressForm">
          <div class="form-group">
            <label class="form-label" for="username">用户名</label>
            <input type="text" class="form-control" id="username" value="${currentUser}" readonly>
          </div>

          <div class="form-group">
            <label class="form-label" for="address">地址</label>
            <input type="text" class="form-control" id="address" placeholder="请输入详细地址" required >
          </div>
          <div class="form-group">
            <label class="form-label">头像</label>
            <div class="avatar-preview" id="avatarPreview">
             <img src="${userimage}">
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-cancel" id="cancelBtn">取消</button>
        <button class="btn btn-submit" id="submitBtn">保存</button>
      </div>`;
  modal_overlay.appendChild(modal);
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalOverlay = document.getElementById('modalOverlay');
  const cancelBtn = document.getElementById('cancelBtn');
  const submitBtn = document.getElementById('submitBtn');
  const addressForm = document.getElementById('addressForm');
  let address = document.getElementById('address');

  // 关闭弹窗
  function closeModal() {
    //提示:取消
    // element('../images/massages/info.png','取消','#3e3e3e');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto'; // 恢复背景滚动
  }

  closeModalBtn.addEventListener('click', function () {
    //提示:取消
    element('../images/massages/info.png', '取消', '#3e3e3e');
    closeModal();
  });
  cancelBtn.addEventListener('click', function () {
    //提示:取消
    element('../images/massages/info.png', '取消', '#3e3e3e');
    closeModal();
  });
  if (title == '修改地址')//查询
  {
    let value = null;
    for (let i = 0; i < addresses.map(item => item).length; i++) {
      if (+Id == +addresses[i].id) {
        value = addresses[i].address;
        break;
      }
    }
    address.value = value;
  }
  // 提交表单
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const address = document.getElementById('address').value;
    let flog = true;
    for (let i = 0; i < addresses.map(item => item).length; i++) {
      if (address == addresses[i].address) {
        flog = false;
        break;
      }
    }
    const validCharRegex = /^[\u4e00-\u9fa5a-zA-Z0-9\s\-_.#＃]+$/;
    const Regex = /^[A-Za-z0-9]+$/;
    if (!address.trim()) {//1.检查是否为空格
      // alert('请输入地址');
      element('../images/massages/failed.png', '请输入地址', 'red');
      return;
    } else if (!flog) { // 2. 检查地址是否重复
      element('../images/massages/warning.png', '地址重复了', '#e6a23c');
      // alert('地址重复了');
      addressForm.reset();
      return;
    }
    else if (address.length < 5) {//3. 检查长度（太短不合理）
      element('../images/massages/failed.png', ' 地址太短，至少5个字符！', 'red');
      return;
    }
    else if (/^\d+$/.test(address.trim())) { // 4. 检查是否为纯数字
      element('../images/massages/failed.png', '地址不能是纯数字！', 'red');
      return;
    }
    // 5. 检查是否包含非法字符
    else if (!validCharRegex.test(address.trim())) {
      element('../images/massages/failed.png', '地址包含非法字符（请勿使用 @、!、%、<、> 等）', 'red');
      return;
    }
    //6.不能以数字和字母组合
    else if (Regex.test(address.trim())) {
      element('../images/massages/failed.png', '不能以数字和字母组合，只送国内', 'red');
      return;
    }
    //校验通过后执行的逻辑  
    if (addresses.length == 0) {
      //提示地址保存成功；
      element('../images/massages/success.png', '地址保存成功', '#39bf3c');
      saveUserAddresses(Insert(ID, currentUser, address));//第一次提交
    }
    // 这里可以添加表单提交逻辑
    // alert('地址保存成功！');
    else if (addresses.length != 0 && title != '修改地址') {//添加
      //置顶效果
      for (let i = 0; i < addresses.map(item => item).length; i++) {
        //map遍历数组
        addresses[i] = {
          id: addresses[i].id + 1,
          username: addresses[i].username,
          address: addresses[i].address
        }
        saveUserAddresses(addresses);
      }
      //提示地址保存成功；
      element('../images/massages/success.png', '地址保存成功', '#39bf3c');
      saveUserAddresses(Insert(ID, currentUser, address));
    } else {//更新
      saveUserAddresses(Updata(Id, address));
    }
    initlistItem();
    closeModal();
    addressForm.reset();
  });

  //插入数据
  function Insert(id, username, address) {
    const userData =
    {
      id: id,//id,用于交换
      username: username,//用户
      address: address//地址
    };
    addresses.push(userData)
    return addresses;
  }
  //更新数据
  function Updata(editId, address) {
    let index = addresses.map(item => item).find(item => +item.id == +editId);
    console.log(+index.id);
    if (+index.id !== -1) {
      for (let i = 0; i < addresses.map(item => item).length; i++) {
        //map遍历数组
        if (+addresses[i].id == +index.id) {
          addresses[i] = {
            id: addresses[i].id,
            username: addresses[i].username,
            address: address
          }
          console.log(addresses[i]);
        }
      }

      return (addresses.map(item => item));
    }
  }

  //删除数据
  function Delete() {

  }
  //查询数据
  function Select() {

  }


  // 按ESC键关闭弹窗
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active') && addresses.length != 0) {
      //提示:取消
      element('../images/massages/info.png', '取消', '#3e3e3e');
      closeModal();
    }
  });

}
// 打开使用新地址弹窗
openModalBtn.addEventListener('click', () => {
  addresstitle = '新增地址';
  initModal(addresstitle, 0);
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // 防止背景滚动
  // console.log(userimage);
});







//================================管理地址=========================





//=============================弹窗========================
function element(imgSrc, textContent, textColor) {
  const top = document.querySelector('.top');
  const img = document.querySelector('.img-elment');
  const text = document.querySelector('.txt-elment');

  // 清除之前的动画类（可选）
  top.style.transition = 'top 0.3s ease';

  // 设置内容
  img.src = imgSrc;
  text.textContent = textContent;
  text.style.color = textColor;

  let showTimer = null;
  let hideTimer = null;

  // 显示弹窗：向下移动出现
  showTimer = setTimeout(() => {
    top.style.top = '30px';

    // 3秒后开始隐藏（可配置）
    hideTimer = setTimeout(() => {
      top.style.top = '-60px'; // 隐藏到上方
    }, 1000); // 显示1秒后自动隐藏
  }, 100);

  // 清除定时器的函数（防止多次调用冲突）
  function clearTimers() {
    if (showTimer) clearTimeout(showTimer);
    if (hideTimer) clearTimeout(hideTimer);
  }

  // 如果你需要外部能控制关闭，可以返回 clearTimers
  return clearTimers;
}
//=================================内容结束区域=====================================
