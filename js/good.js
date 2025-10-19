
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

//渲染商品
const infoDom = document.getElementById('good-info');
//创建商品卡片
const nameDiv = document.createElement('div');
const priceDiv = document.createElement('div');

nameDiv.className = 'good-name';
nameDiv.textContent = product.name;//商品名字
priceDiv.className = 'good-price';
priceDiv.textContent = '¥ ' + product.price.toFixed(2);




//插入到页面
infoDom.appendChild(nameDiv);
infoDom.appendChild(priceDiv);

//渲染商品款式
const designDom = document.getElementById('good-design');
//创建款式卡片
const designDiv = document.createElement('div');
designDiv.className = 'good-design';
// designDiv.classList = 'selected';
//创建款式左图片
const imgDiv = document.createElement('img');
imgDiv.className = 'good-image';
imgDiv.src ="."+product.image;
//创建右名称
const titleDiv = document.createElement('div');
titleDiv.className = 'good-title';
titleDiv.textContent = product.Atter;//商品属性
designDiv.appendChild(imgDiv);
designDiv.appendChild(titleDiv);
designDom.appendChild(designDiv);

//当前款式id
let designId = -1;
let index = 0;
//给商品款式添加点击事件
designDiv.addEventListener('click', function () {
    designId = product.id
    const dom = document.getElementsByClassName('good-design')
    // dom[0].style.border = "1px solid rgb(255, 80, 0)";
    if (index == 0) {
        // console.log('222');
        titleDiv.classList.remove('selected');
        dom[index].style.border = "1px solid rgb(255, 80, 0)";
        dom[index].style.color = "red";
        index = 1;
    } else {
        // console.log('111');
        index = 0;
        titleDiv.classList.add('selected');
        dom[index].style.border = "1px solid rgb(214, 214, 214)";
        dom[index].style.color = "#000";
        designId = -1;
    }
});

//增上线
let addMaxFlag = false;
const ADD_MAX = "999"
//减上线
let reduceMaxFlag = true;
const REDUCE_MAX = "1"

//给增加按钮添加点击事件
const addBtn = document.getElementsByClassName('num-plus');
const reduceBtn = document.getElementsByClassName('num-minus');
const num = document.getElementsByClassName('num-num');
addBtn[0].addEventListener('click', function () {
    if (addMaxFlag) {
        return
    }
    //设置文本
    num[0].textContent = parseInt(num[0].textContent) + 1;
    if (num[0].textContent == ADD_MAX) {
        addBtn[0].style.color = "rgb(211,211,211)";
        addBtn[0].style.cursor = "default";
        addMaxFlag = true;
    }
    //调整减少按钮样式
    if (reduceMaxFlag) {
        const minus = document.getElementsByClassName('num-minus');
        minus[0].style.color = "black";
        reduceBtn[0].style.cursor = "pointer";
        reduceMaxFlag = false;
    }
});
reduceBtn[0].addEventListener('click', function () {
    if (reduceMaxFlag) {
        return
    }
    //设置文本
    num[0].textContent = parseInt(num[0].textContent) - 1;
    if (num[0].textContent == REDUCE_MAX) {
        reduceBtn[0].style.color = "rgb(211,211,211)";
        reduceBtn[0].style.cursor = "default";
        reduceMaxFlag = true;
    }
    //调整增加按钮样式
    if (addMaxFlag) {
        const add = document.getElementsByClassName('num-plus');
        add[0].style.color = "black";
        add[0].style.cursor = "pointer";
        addMaxFlag = false;
    }
});

function updateCartCount(userData) {
    sum = 0;
    userData.cart.forEach(tab => {
        sum += tab.quantity;
    })
    //  alert(sum);
    homeCartCount.textContent = sum;
}


//加入购物车点击事件
const addToCart = document.getElementsByClassName('add');
addToCart[0].addEventListener('click', function () {
    if (designId == -1) {
        // window.alert('请选择商品的款式');
        element('../images/massages/warning.png', '请选择商品的款式', '#e6a23c')
        return
    }
    //获取当前用户
    const user = window.localStorage.getItem('currentUser')
    //获取当前用户对应的存储信息
    let userInfo = JSON.parse(window.localStorage.getItem(user))
    let cart = userInfo.cart
    //判断商品是否存在
    let index = cart.findIndex(tab => tab.id === product.id)
    //获取商品数量
    let quantityNum = parseInt(num[0].textContent)
    if (index !== -1) {
        cart[index].quantity += quantityNum
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantityNum
        })
    }
    //将cart重新写入localStrorage
    userInfo.cart = cart
    localStorage.setItem(user, JSON.stringify(userInfo))
    // 更新购物车数量显示
    // updateCartCount(userData);
    // alert('已成功添加到购物车');
    element('../images/massages/success.png', '已成功添加到购物车', '#67c23a');
    setInterval(() => {
        window.location.href = `../html/good.html?id=${product.id}`;
    }, 600);

});


//渲染左侧大图
const bigImg = document.getElementById('good-left-image');
const imgLeft = document.createElement('img');
imgLeft.src ="."+product.image;
imgLeft.className = 'good-left-image';
bigImg.appendChild(imgLeft);

//渲染放大镜中的图片
const bigImageIn = document.getElementById('big');
const imgIn = document.createElement('img');
imgIn.className = 'img';
imgIn.src ="."+product.image;
bigImageIn.appendChild(imgIn);

//放大镜
// 等待 DOM 加载完成后再执行放大镜相关代码
document.addEventListener('DOMContentLoaded', function () {
    var mask = document.querySelector('.mask');
    var box = document.querySelector('.box');
    var big = document.querySelector('#big');
    var image = document.querySelector('.img');
    var border_bottom = document.querySelector('.tips');

    box.addEventListener('mouseover', function () {
        mask.style.display = 'block';
        big.style.display = 'block';
        //设置边框为0
        border_bottom.style.borderBottom = "0px";
    });

    box.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
        //设置边框为border-bottom: 1px solid rgb(235, 235, 235);
        border_bottom.style.borderBottom = "1px solid rgb(235, 235, 235)";
    });

box.addEventListener('mousemove', function (e) {
        // 得到的x和y是鼠标在盒子内的坐标  this指向box
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;

        // 将获取到的鼠标的值给遮罩层（减去一半是因为让鼠标在遮罩层中央） 让它跟着鼠标移动
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;

        // 设置最大移动距离
        var maskWidth = box.offsetWidth - mask.offsetWidth;
        var maskHeight = box.offsetHeight - mask.offsetHeight;

        // 控制mask移动的范围
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskWidth) {
            maskX = maskWidth;
        }

        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskHeight) {
            maskY = maskHeight;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';

        // 大图最大移动距离
        var imgWidth = image.offsetWidth - big.offsetWidth;
        var imgHeight = image.offsetHeight - big.offsetHeight;

        // 大图片的移动距离 = mask移动距离 * 大图最大移动距离 /mask的最大移动距离  
        var bigX = maskX * imgWidth / maskWidth;
        var bigY = maskY * imgHeight / maskHeight;

        // 赋值
        image.style.left = (-bigX) + 'px';
        image.style.top = (-bigY) + 'px';
    });
});
//=========================评论===========================

// 上传图片处理
function handleImageUpload(event) {
    const fileInput = event.target; // 当前的 .image-upload 元素
    const files = fileInput.files;
    const imagePreviews = document.querySelector('.image-preview'); // 当前订单的预览区
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.match('image.*')) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            previewItem.innerHTML = `
        <img src="${e.target.result}" class="img1">
        <div class="remove-image" onclick="removeImage(this)">×</div>
      `;
            imagePreviews.appendChild(previewItem);
        };
        reader.readAsDataURL(file);
    }
}
// 移除图片
function removeImage(element) {
    //移除图片
    element.parentElement.remove();
}
//==========通过本地存储保存数据==============
const userData = [{
    id: '',
    user: '',
    content: '',
    images: '',
    image: []
}];
// ==发送评论==
const textarea = document.querySelector('.evaluation');
const imagePreviews = document.querySelector('.image-preview');


const evaluation = document.querySelector('.eva-but');
evaluation.addEventListener('click', function (e) {
    // 检查评论内容
    if (textarea.value.trim() === "" && imagePreviews.children.length === 0) {
        element('../images/massages/warning.png', '请输入评论', '#e6a23c')
        // alert("请输入评论");
        return;
    }



    // 获取商品 id
    const productId = new URLSearchParams(window.location.search).get('id');
    if (!productId) {
        element('../images/massages/failed.png', '商品 ID 不存在', 'red');
        // alert("商品 ID 不存在");
        return;
    }

    // 获取用户名并加密
    const username = localStorage.getItem('currentUser');
    const username1 = username ? username.replace(username.substring(1, username.length - 1), '***') : '用户';

    // 获取图片数组
    const imgElements = imagePreviews.querySelectorAll('.img1');
    const imageArray = Array.from(imgElements).map(img => img.src);

    // 关键：从 localStorage 读取已有评论列表
    let commentsList = JSON.parse(localStorage.getItem('userData')) || [];
    // 添加新评论
    commentsList.push({
        id: productId,
        user: username1,
        content: textarea.value,
        images: (JSON.parse(localStorage.getItem(username)).image) == '' ? '../images/index/avatar-default.png' : JSON.parse(localStorage.getItem(username)).image,
        image: imageArray
    });

    // 保存回 localStorage
    localStorage.setItem('userData', JSON.stringify(commentsList));
    element('../images/massages/success.png', '评论成功！', '#67c23a');
    // alert("评论成功！");
    setInterval(() => {
        window.location.reload(); // 刷新页面，重新渲染
    }, 600)

});
//===========================渲染评价数据================================
function renderComments() {
    // 1. 从 localStorage 获取评论数据（应为数组）
    const userDataArray = JSON.parse(localStorage.getItem('userData')) || [];

    // 2. 获取 URL 中的 id 参数（商品 id）
    const productId = new URLSearchParams(window.location.search).get('id');

    // 3. 获取容器
    const container = document.querySelector('.list');
    if (!container) {
        console.error('未找到评论容器 .list');
        return;
    }

    // 4. 检查是否为数组
    if (!Array.isArray(userDataArray)) {
        container.innerHTML = '<p>数据格式错误，应为数组。</p>';
        return;
    }

    // 5. 筛选出 id 匹配的所有评论
    const matchedComments = userDataArray.filter(comment => comment.id === productId);

    // 6. 如果没有匹配的评论
    if (matchedComments.length === 0) {
        container.innerHTML = '<div class="eva-info">当前没有任何评价信息哦~</div>';
        return;
    }

    // 7. 清空容器
    container.innerHTML = '';

    // 8. 遍历每一条匹配的评论，生成 <li>
    matchedComments.forEach(comment => {
        const item = document.createElement('li');
        item.className = 'item';

        // 处理图片：确保 image 是数组
        const imageUrls = Array.isArray(comment.image) ? comment.image : [comment.image];
        const validImages = imageUrls.filter(src => src && src.trim() !== '');

        // 生成图片 HTML
        const imagesHTML = validImages.map(imgSrc => `
      <div class="term">
        <img src="${imgSrc}" class="img">
      </div>
    `).join('');

        // 插入结构
        item.innerHTML = `
      <div class="comment-user">
        <img src="${comment.images}" class="headimg" >
        <div class="nickname">${comment.user || '匿名用户'}</div>
      </div>
      <div class="info text-ellipsis-2">${comment.content || ''}</div>
      <div class="imgs">
        ${imagesHTML}
      </div>
    `;
        // console.log(JSON.parse(localStorage.getItem(currentUser)).image);

        container.appendChild(item);
    });
}

//=============================放大图片弹框====================================
document.addEventListener('DOMContentLoaded', function () {
    renderComments();
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const imageInfo = document.getElementById('imageInfo');
    const closeBtn = document.getElementById('closeModal');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const imgItems = document.querySelectorAll('.item');

    // 使用事件委托绑定所有 .image-preview 容器
    document.querySelectorAll('.image-preview').forEach(previewContainer => {
        previewContainer.addEventListener('click', function (e) {
            // 判断点击的是否是 .img1 图片
            if (e.target && e.target.classList.contains('img1')) {
                // 获取当前点击的图片
                const clickedImg = e.target;

                // 示例：获取属性、索引等
                const allImgs = this.querySelectorAll('.img1');
                const imageGroup = [];
                for (let i = 0; i < allImgs.length; i++) {
                    imageGroup.push({
                        src: allImgs[i].getAttribute('src'),
                        alt: allImgs[i].getAttribute('alt')
                    });
                }
                const index = Array.from(allImgs).indexOf(clickedImg);
                openModal(imageGroup, index); // 打开模态框，传入当前组的图片和起始索引
            }
        });
    });

    // 遍历每个 .item 元素
    imgItems.forEach((item, itemIndex) => {
        // 获取当前 .item 内部所有的 .img 元素（位于 .term 下）
        const imgs = item.querySelectorAll('.term .img');
        const imageGroup = [];
        imgs.forEach(img => {
            imageGroup.push({
                src: img.src,
                alt: img.alt
            });
        });
        imgs.forEach((img, index) => {
            img.addEventListener('click', () => {
                openModal(imageGroup, index); // 打开模态框，传入当前组的图片和起始索引
            });
        })
    });

    let currentIndex = 0;
    let currentImageList = []; // 当前选中的图片列表

    // 打开模态框
    function openModal(imageList, startIndex) {
        currentImageList = imageList;
        currentIndex = startIndex;
        modalImage.src = currentImageList[currentIndex].src;
        imageInfo.textContent = currentImageList[currentIndex].alt;
        modal.classList.add('active');
        modal.style.display = 'flex';
        updateNavButtons();
    }

    // 关闭模态框
    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // 切换到下一张图片
    function nextImage() {
        currentIndex = (currentIndex + 1) % currentImageList.length;
        modalImage.src = currentImageList[currentIndex].src;
        imageInfo.textContent = currentImageList[currentIndex].alt;
        updateNavButtons();
    }

    // 切换到上一张图片
    function prevImage() {
        currentIndex = (currentIndex - 1 + currentImageList.length) % currentImageList.length;
        modalImage.src = currentImageList[currentIndex].src;
        imageInfo.textContent = currentImageList[currentIndex].alt;
        updateNavButtons();
    }

    // 更新导航按钮的状态
    function updateNavButtons() {
        if (currentImageList.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'inline-block';
            nextBtn.style.display = 'inline-block';

        }
    }

    // 事件监听
    closeBtn.addEventListener('click', closeModal);

    prevBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        prevImage();
    });

    nextBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        nextImage();
    });

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 键盘导航
    document.addEventListener('keydown', function (e) {
        if (modal.style.display === 'flex') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        }
    });
    //图片上传
    // 点击“+”按钮，触发对应订单的文件上传
    document.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('add-image-btn')) {
            const fileInput = document.querySelector('.image-upload');
            fileInput.click();
        }
    });

    // 监听文件选择变化
    document.addEventListener('change', function (e) {
        if (e.target && e.target.classList.contains('image-upload')) {
            handleImageUpload(e); // 传入事件对象
        }
    });

});

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
document.addEventListener('DOMContentLoaded', function () {
    // 如果该元素需要登录才能点击，并且用户未登录，则拦截
    if (!currentUser) {
        // alert('请先登录');
        localStorage.setItem('ok-login','0');
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
        element('../images/massages/primary.png','你已退出登录','#1296db');
        // alert('你已退出登录');
        setInterval(() => {
            window.location.href = "../html/login.html";
            localStorage.removeItem('currentUser');
        },1000)

    });
}
//===================楼层效果=========================
const elevator_totop = document.querySelector('.elevator_totop');
const elevator_img = document.querySelector('.elevator_img');
/*top_img鼠标移入 */
elevator_totop.onmouseover = () => {
    elevator_img.src = '../images/elevator/返回顶部下.png';
}
/*top_img鼠标移出 */
elevator_totop.onmouseout = () => {
    elevator_img.src = '../images/elevator/返回顶部.png';
}
const card_a = document.querySelector('.elevator_item');
const card_img = document.querySelector('.cart-img');
/*card_img鼠标移入 */
card_a.onmouseover = () => {
    card_img.src = '../images/elevator/购物车下.png';
}
/*card_img鼠标移出 */
card_a.onmouseout = () => {
    card_img.src = '../images/elevator/购物车.png';
}
//回到顶部 
const elevator_item = document.querySelector('.elevator_item');
//加载时
window.onload = function () {
    const totop = document.getElementById('elevator_totop');

    window.onscroll = function () {
        //获取滚动高度
        if (window.pageYOffset >= 300)//Y轴，用于滚动显示
        {
            totop.style.display = 'inline-block';
            //border-radius: 8px 0 0 0显示问题 
            elevator_item.classList.add('elevator_active');
        } else {
            //border-radius: 8px 0 0 8px显示问题 
            totop.style.display = 'none';
            elevator_item.classList.remove('elevator_active');
        }
    }
    totop.onclick = function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // 平滑滚动
        });
    }

}
//================购物车数量====================
//定义商品购物车数量
let sum = 0;
//获取DOM
const homeCartCount = document.getElementById('homeCartCount');
//更新购物车数量
function updateCartCount(userData) {
    sum = 0;
    userData.cart.forEach(tab => {
        sum += tab.quantity;
    })
    //  alert(sum);
    homeCartCount.textContent = sum;
}
// 页面加载时初始化购物车数量
function initCartCount() {
    let unameUser = localStorage.getItem('currentUser');
    if (unameUser) {
        let userData = JSON.parse(localStorage.getItem(unameUser));
        if (userData) {
            updateCartCount(userData);
        }
    }
}

//========================立即购买===============
const buy=document.querySelector('.buy');
buy.addEventListener('click',()=>{
    if (designId == -1) {
        // window.alert('请选择商品的款式');
        element('../images/massages/warning.png', '请选择商品的款式', '#e6a23c')
        return
    }
    window.location.href=`../html/ConfirmOrder.html?id=${product.id}`;
})
//=======================弹窗=====================
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
//===================初始化购物车数量============================
document.addEventListener('DOMContentLoaded', function () {
    initCartCount(); // 初始化购物车数量
});


