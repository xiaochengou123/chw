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
    element('../images/massages/success.png', '你已退出登录', '#39bf3e');
    setInterval(() => {
      window.location.href = "../html/login.html";
    }, 1000);
    localStorage.removeItem('currentUser');

  });
}
//======================订单============================
// 获取当前用户
const user = localStorage.getItem('currentUser') || 'testUser'; // 默认值防错

// 获取订单数据
let orders = JSON.parse(localStorage.getItem('orders')) || [];
// 过滤出当前用户的订单
orders = orders.filter(order => order.user === user);

// 保存更新后的订单
function saveOrders() {
  const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
  const otherUsersOrders = allOrders.filter(o => o.user !== user);
  const updated = [...otherUsersOrders, ...orders];
  localStorage.setItem('orders', JSON.stringify(updated));
}

// 当前筛选状态
let currentFilter = 'all';

// 渲染订单
function renderOrders() {
  function getImagesByOrderId(orderId) {
    const storedImages = JSON.parse(localStorage.getItem('images')) || [];
    const orderImages = storedImages.find(img => img.orderId === orderId);
    return orderImages ? orderImages.images : [];
  }

  const container = document.getElementById('ordersList');
  container.innerHTML = '';

  // 过滤订单
  const filteredOrders = orders.filter(order => {
    const now = new Date().getTime();
    const deliveryTime = new Date(order.timestamp).getTime() + 2 * 60 * 1000;
    const isDelivered = now >= deliveryTime && order.delivered !== false;
    const isReceived = order.received === true;

    if (currentFilter === 'pending') return !isDelivered && !isReceived;
    if (currentFilter === 'shipped') return isDelivered && !isReceived;
    if (currentFilter === 'received') return isReceived;
    return true; // all
  });

  if (filteredOrders.length === 0) {
    container.innerHTML = `
          <div class="text-center py-5 bg-white rounded">
            <i class="bi bi-journal-text" style="font-size: 3rem; color: #999;"></i>
            <p class="mt-3">暂无订单记录</p>
          </div>
        `;
    return;
  }

  filteredOrders.forEach(order => {
    const now = new Date().getTime();
    const deliveryTime = new Date(order.timestamp).getTime() + 2 * 60 * 1000;
    const isDelivered = now >= deliveryTime && order.delivered !== false;
    const isReceived = order.received === true;
    //总价
    const totalPrice = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    let statusText = '待发货';
    let statusClass = 'status-pending';

    if (isReceived) {
      statusText = '已完成';
      statusClass = 'status-received';
    } else if (isDelivered) {
      statusText = '已发货';
      statusClass = 'status-shipped';
    }

    const canDelete = isDelivered && isReceived; // 只有发货后才能删除,收货后才能删除

    const orderHtml = `
            <div class="order-card">
            <div class="order-with-checkbox">
              <!--明确显示复选框-->
              <div class="checkbox-col">
                <input 
                  type="checkbox" 
                  class="form-check-input order-checkbox" 
                  data-id="${order.orderId}" 
                  ${canDelete ? '' : 'disabled'} 
                >
              </div>

              <!-- 订单内容 -->
              <div class="order-content">
                <div class="order-header">
                  <span class="order-Id">订单号：${order.orderId}</span>
                  <span class="t1">用户：${order.user}</span>
                  <span class="t1">支付方式：${order.Pay}</span>
                  <span class="t1">购买时间：${order.timestamp}</span>
                  <span class="t1">总价：${totalPrice}</span>
                  
                </div>
                <div class="order-body">
                  ${order.items.map(item => `
                    <div class="order-item">
                    <a href="../html/good.html?id=${item.id}">
                      <img src=".${item.image}" alt="${item.name}">
                      <div class="order-item-info">
                       
                        <div class="order-item-name">${item.name}</div>
                        <div class="order-item-price">¥${item.price} × ${item.quantity}</div>
                        </a>
                        </div>
                      
                      <div class="order-status ${statusClass}">${statusText}</div>
                    </div>
                     
                  `).join('')}

                  <div class="order-actions">
          
                    <div class="mb-2 text-muted">收货地址：${order.address}</div>
                    ${!isDelivered ? `
                      <small class="text-muted">等待发货(倒计时): <span class="countdown" data-time="${deliveryTime}"></span></small>
                    ` : isReceived ? `
                      <span class="text-success">已收货</span>
                    ` : `
                      <div>
                        <input type="text" class="comment-input" placeholder="请输入->已收货" data-order-id="${order.orderId}">
                        <button class="btn btn-success btn-sm receive-btn" data-id="${order.orderId}" disabled>确认收货</button>
                      </div>
                    `}
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;

    container.insertAdjacentHTML('beforeend', orderHtml);
    // 获取刚插入的订单卡片
    const newOrderCard = container.lastElementChild;

    // 获取当前订单ID
    const orderId = order.orderId;

    // 从 localStorage 获取该订单的所有图片
    const images = getImagesByOrderId(orderId);

    // 如果有图片，就显示在 .image-preview 中
    if (images.length > 0) {
      const imagePreview = newOrderCard.querySelector('.image-preview');

      images.forEach(imgUrl => {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        previewItem.innerHTML = `
        <img src="${imgUrl}" alt="评价图片" style="max-width: 80px; max-height: 80px; margin: 5px;">
        <div class="remove-image" onclick="removeImage(this)">×</div>
      `;
        imagePreview.appendChild(previewItem);
      });
    }
  });

  // 绑定评论输入事件
  document.querySelectorAll('.comment-input').forEach(input => {
    input.addEventListener('input', function () {
      const orderId = this.dataset.orderId;
      if (input.value == '已收货') {
        const btn = document.querySelector(`.receive-btn[data-id="${orderId}"]`);
        btn.disabled = this.value.trim() === '';
      }
    });
  });

  // 绑定“确认收货”事件
  document.querySelectorAll('.receive-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const orderId = this.dataset.id;
      const input = document.querySelector(`.comment-input[data-order-id="${orderId}"]`);
      const comment = input.value.trim();

      if (!comment) {
        element('../images/massages/warning.png', '请先填写评价才能确认收货！', '#e6a23c')
        // alert('请先填写评价才能确认收货！');
        return;
      }

      const order = orders.find(o => o.orderId === orderId);
      if (order) {
        order.received = true;
        order.comment = comment; // 保存评论
        saveOrders();
        renderOrders();
        element('../images/massages/success.png', `订单 ${orderId} 已确认收货，交易完成！`, '#67c23a')
        // alert(`订单 ${orderId} 已确认收货，交易完成！`);
      }
    });
  });
}
// 批量删除
document.getElementById('batchDelete').addEventListener('click', function () {
  const checked = document.querySelectorAll('.order-checkbox:checked');

  if (user === 'testUser') {
    // alert('请先登录！');
    // element('../images/massages/failed.png','请先登录！','red');
    localStorage.setItem('ok-login', '0');
    window.location.href = '../html/login.html';
    return;
  }
  else if (checked.length === 0) {
    element('../images/massages/failed.png', '请先选择要删除的订单', 'red')
    // alert('请先选择要删除的订单（仅已发货订单可删除）');
    return;
  }

  if (!confirm(`确定要删除选中的 ${checked.length} 个订单吗？`)) {
    element('../images/massages/info.png', '取消删除', '#3e3e3e');
    return;
  }

  const idsToDelete = Array.from(checked).map(cb => cb.dataset.id);
  orders = orders.filter(order => !idsToDelete.includes(order.orderId));
  saveOrders();
  renderOrders();
  element('../images/massages/primary.png', '订单已删除', '#1296db')
  // alert('订单已删除');
});

// 检查发货状态
function checkDeliveryStatus() {
  const now = new Date().getTime();
  let hasUpdated = false;

  orders.forEach(order => {
    if (order.delivered) return;

    const createTime = new Date(order.timestamp).getTime();
    const deliveryTime = createTime + 2 * 60 * 1000;

    if (now >= deliveryTime) {
      order.delivered = true;
      hasUpdated = true;
    }
  });

  if (hasUpdated) {
    saveOrders();
    renderOrders();
  }
}

// 更新倒计时
function updateCountdowns() {
  const now = new Date().getTime();
  document.querySelectorAll('.countdown').forEach(countdown => {
    const targetTime = parseInt(countdown.dataset.time, 10);
    const diff = targetTime - now;

    if (diff <= 0) {
      countdown.textContent = '已发货';
      return;
    }

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    countdown.textContent = `${minutes}分 ${seconds}秒`;
  });
}

// 启动定时器
setInterval(checkDeliveryStatus, 1000);
setInterval(updateCountdowns, 1000);

// 筛选标签点击事件
document.querySelectorAll('.filter-tabs button').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.filter-tabs button').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    currentFilter = this.id.replace('filter-', '');
    renderOrders();
  });
});


//  console.log(JSON.parse(localStorage.getItem('images')).length);

// 初始化
document.addEventListener('DOMContentLoaded', function () {
  // 初次渲染
  renderOrders();
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



