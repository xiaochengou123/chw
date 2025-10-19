/* 顶部菜单栏 */
/* 悬浮时的样式 */
/* 菜单父级+图片获取id选择器属性 */
const baractive = document.getElementById("hoverDropdown");
const bar1active = document.getElementById("hoverbar");
const bar = document.querySelector('.cascade-bar');
const img = document.getElementById("imageemnu");
const img1 = document.getElementById("imageemnu1");
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
document.addEventListener('click', function (event) {
    // 获取当前是否登录


    // 判断点击的元素或其祖先是否有 data-login-required 属性
    const target = event.target;
    const requiresLogin = target.closest('[data-login-required]');

    // 如果该元素需要登录才能点击，并且用户未登录，则拦截
    if (!currentUser && requiresLogin) {
        event.preventDefault(); // 阻止默认行为（比如按钮点击）
        // alert('请先登录');
        localStorage.setItem('ok-login', '0');
        window.location.href = "../html/login.html";
    }


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
//===================结算弹框===========================
let user = localStorage.getItem('currentUser');
let cart = JSON.parse(localStorage.getItem(user))?.cart || [];
const modal = document.getElementById('checkoutModal');
const openBtn = document.getElementById('openCheckout');
const closeBtn = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelCheckout');
// 打开模态框
openBtn.addEventListener('click', function () {
    const selectedItems = cart.filter(item => item.selected);
    if (selectedItems.length == 0) {
          element('../images/massages/warning.png', '请选择要结算的商品', '#e6a23c');
    } else {
        openM(selectedItems);
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }

});

// 关闭模态框
function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // 恢复背景滚动
}

// 监听关闭按钮
closeBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);
function openM(selectedItems) {
    // const  = cart.filter(item => item.selected);
    const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('modalTotalQuantity').textContent = totalQuantity;
    document.getElementById('modalTotalPrice').textContent = `¥${totalPrice.toFixed(2)}`;
}
//========================购物车=====================
//获取本地存储数据


// 初始化购物车
document.addEventListener('DOMContentLoaded', function () {
    let orders = JSON.parse(localStorage.getItem('orders')) || []; // 存储所有订单
    let soldProducts = JSON.parse(localStorage.getItem('soldProducts')) || [];//存储所有已售商品信息
    // 渲染购物车
    renderCart(cart);
    updateSummary(cart);

    // 全选功能
    document.getElementById('selectAll').addEventListener('change', function () {
        const checkboxes = document.querySelectorAll('.product-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
            const productId = parseInt(checkbox.dataset.id);
            const product = cart.find(item => item.id === productId);
            if (product) product.selected = this.checked;
        });
        updateSummary(cart);
        saveCartToLocalStorage(cart);
    });

    // 批量删除
    document.getElementById('batchDelete').addEventListener('click', function () {
        const selectedItems = cart.filter(item => item.selected);
        if (selectedItems.length === 0) {
            // alert('请选择要删除的商品');
            element('../images/massages/warning.png', '请选择要删除的商品', '#e6a23c');
            return;
        }

        if (!confirm(`确定要删除选中的 ${selectedItems.length} 件商品吗？`)) {
            element('../images/massages/info.png', '取消', '#3e3e3e');
            return;
        } else {
            element('../images/massages/success.png', '成功删除', '#67c23a')
            cart = cart.filter(item => !item.selected);
            renderCart(cart);
            updateSummary(cart);
            saveCartToLocalStorage(cart);
        }
    });
    // 结算确认
document.getElementById('confirmCheckout').addEventListener('click', function () {

        const selectedItems = cart.filter(item => item.selected);//获取已选商品
  
        // 获取地址
        let addressInput = document.getElementById('addressInput');
        //获取支付
        let pay = document.querySelector('input[name="payment"]:checked').value;
        //  addressInput.value='';
        const address = addressInput.value.trim();
        if (!address) {
            // alert('请填写收货地址');
            element('../images/massages/warning.png', '请填写收货地址', '#e6a23c');
            return;
        }

        //    console.log(document.querySelector('input[name="payment"]:checked').value);
        // 生成订单信息
        const order = {
            orderId: 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 10000), // 随机订单号
            user: user,
            items: selectedItems.map(item => ({ ...item })), // 拷贝商品
            totalQuantity: selectedItems.reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2),
            timestamp: new Date().toLocaleString(), // 下单时间
            address: address,
            Pay: pay,
            comment: '', // 先留空，等评论提交再填
            delivered: false, // 初始未送达
            deliveryTime: new Date().getTime() + 2 * 60 * 1000, // 2分钟后送达（时间戳）
                  
        };
        // console.log(order);
        
        //生成已售商品信息  id(商品id) name(商品名称) price(商品价格) quantity(商品数量)
        //循环保存数据
        for (let i = 0; i < selectedItems.length; i++) {
            //获取已经售商品id，数量进行相加，不用保存重复的
            let find = false;
            for (let j = 0; j < soldProducts.length; j++) {
                if (soldProducts[j].id === selectedItems[i].id) {
                    soldProducts[j].quantity += selectedItems[i].quantity;
                    find = true;
                    break;
                }
                console.log(selectedItems[i]);
            }
            if (find) continue;
            //保存已售商品信息
            soldProducts.push({
                id: selectedItems[i].id,
                name: selectedItems[i].name,
                price: selectedItems[i].price,
                quantity: selectedItems[i].quantity,
                category: selectedItems[i].category
            });
        }
        localStorage.setItem('soldProducts', JSON.stringify(soldProducts));//存储到本地soldProducts

        // 保存订单
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        // 隐藏模态框
        element('../images/massages/success.png', '成功支付', '#67c23a');
        closeModal();
        // const modal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
        // modal.hide();


        addressInput.value = '';
        // 从购物车中移除已结算的商品
        cart = cart.filter(item => !item.selected);
        renderCart(cart);
        updateSummary(cart);
        saveCartToLocalStorage(cart);
        //确定结算后自动跳转
        window.location.href = "../html/orders.html";
    });

    //取消确认
    function qx() {
        // 获取地址
        let addressInput = document.getElementById('addressInput');
        const btn = document.querySelector('.btn-secondary');
        btn.addEventListener('click', () => {
            addressInput.value = '';
            element('../images/massages/info.png', '取消', '#3e3e3e');
        })
    }
    qx();
    // 更新模态框中的信息
    // document.getElementById('checkoutModal').addEventListener('show.bs.modal', function () {
    //     const selectedItems = cart.filter(item => item.selected);
    //     const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
    //     const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    //     document.getElementById('modalTotalQuantity').textContent = totalQuantity;
    //     document.getElementById('modalTotalPrice').textContent = `¥${totalPrice.toFixed(2)}`;
    // });



    // 渲染购物车商品
    function renderCart(cartData) {
        const cartItemsContainer = document.getElementById('cartItems');

        if (cartData.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-cart-x" style="font-size: 3rem;"></i>
                    <p class="mt-3">购物车空空如也</p>
                    <a href="/chw/" class="btn btn-jd mt-2" data-login-required>去购物</a>
                </div>
            `;
            return;
        }

        cartItemsContainer.innerHTML = cartData.map(product => `
            <div class="row align-items-center border-bottom py-3">
                <div class="col-1">
                    <input class="form-check-input product-checkbox" type="checkbox" data-id="${product.id}" ${product.selected ? 'checked' : ''}>
                </div>
                <div class="col-3">
                    <img src=".${product.image}" alt="${product.name}" class="product-img">
                </div>
                <div class="col-4">
                    <h6>${product.name}</h6>
                    <p class="text-danger mb-0">¥${product.price}</p>
                </div>
                <div class="col-2">
                    <div class="d-flex align-items-center">
                        <button class="quantity-btn decrease" data-id="${product.id}">-</button>
                        <input type="text" class="quantity-input mx-1" value="${product.quantity}" data-id="${product.id}">
                        <button class="quantity-btn increase" data-id="${product.id}">+</button>
                    </div>
                </div>
                <div class="col-2 text-end">
                    <p class="fw-bold text-danger">¥${(product.price * product.quantity).toFixed(2)}</p>
                    <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${product.id}">删除</button>
                </div>
            </div>
        `).join('');

        // 添加事件监听器（同原逻辑）
        document.querySelectorAll('.product-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                const productId = parseInt(this.dataset.id);
                const product = cart.find(item => item.id === productId);
                if (product) product.selected = this.checked;
                updateSummary(cart);
                saveCartToLocalStorage(cart);
                updateSelectAllState(cart);
            });
        });

        document.querySelectorAll('.increase').forEach(btn => {
            btn.addEventListener('click', function () {
                const productId = parseInt(this.dataset.id);
                const product = cart.find(item => item.id === productId);
                if (product) {
                    product.quantity++;
                    renderCart(cart);
                    updateSummary(cart);
                    saveCartToLocalStorage(cart);
                }
            });
        });

        document.querySelectorAll('.decrease').forEach(btn => {
            btn.addEventListener('click', function () {
                const productId = parseInt(this.dataset.id);
                const product = cart.find(item => item.id === productId);
                if (product && product.quantity > 1) {
                    product.quantity--;
                    renderCart(cart);
                    updateSummary(cart);
                    saveCartToLocalStorage(cart);
                }
            });
        });

        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function () {
                const productId = parseInt(this.dataset.id);
                const product = cart.find(item => item.id === productId);
                const newQuantity = parseInt(this.value) || 1;
                if (product && newQuantity > 0) {
                    product.quantity = newQuantity;
                    renderCart(cart);
                    updateSummary(cart);
                    saveCartToLocalStorage(cart);
                }
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const productId = parseInt(this.dataset.id);
                if (confirm('确定要删除这个商品吗？')) {
                    cart = cart.filter(item => item.id !== productId);
                    renderCart(cart);
                    updateSummary(cart);
                    saveCartToLocalStorage(cart);
                }
            });
        });
    }

    // 更新汇总信息
    function updateSummary(cartData) {
        const selectedItems = cartData.filter(item => item.selected);
        const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        document.getElementById('totalQuantity').textContent = totalQuantity;
        document.getElementById('totalPrice').textContent = `¥${totalPrice.toFixed(2)}`;
        document.getElementById('payableAmount').textContent = `¥${totalPrice.toFixed(2)}`;
    }

    // 更新全选复选框状态
    function updateSelectAllState(cartData) {
        const selectAllCheckbox = document.getElementById('selectAll');
        const allSelected = cartData.length > 0 && cartData.every(item => item.selected);
        const someSelected = cartData.some(item => item.selected);
        selectAllCheckbox.checked = allSelected;
        selectAllCheckbox.indeterminate = someSelected && !allSelected;
    }

    // 保存购物车数据到本地存储
    function saveCartToLocalStorage(cartData) {
        const userDataStr = localStorage.getItem(user);
        if (!userDataStr) return;
        try {
            const userData = JSON.parse(userDataStr);
            userData.cart = cartData;
            localStorage.setItem(user, JSON.stringify(userData));
        } catch (e) {
            console.error('保存购物车失败', e);
        }
    }
});
//弹窗
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


