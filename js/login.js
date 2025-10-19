/*=================实现轮播图=========================== */
// 获取指定CSS的属性
const imgbtn = document.querySelector('.qrcode-warp');
const imgAll = ['banner1.jpg', 'banner2.jpg', 'banner3.jpg', 'banner4.jpg'];
const img = document.querySelector('.img1');
const bnt = document.querySelectorAll('.banner-btn li');
//定义下标
let index = 0;
//定义换图
const img_func = function () {
  // console.log(`../images/login/${imgAll[index]}`);
  img.src = `../images/login/${imgAll[index]}`;
  for (let i = 0; i < bnt.length; i++) {
    bnt[i].className = '';
  }
  bnt[index].className = 'banner-active';
}
//定时器
let time = setInterval(
  function () {
    index++;
    if (index > imgAll.length - 1) {
      index = 0;
    }
    img_func();
  }, 3000);
//悬停效果
for (let i = 0; i < bnt.length; i++) {
  bnt[i].onmouseover = () => {
    index = i;
    img_func();
    clearInterval(time);
  }
  bnt[i].onmouseout = () => {
    index = i;
    img_func();
    time = setInterval(
      function () {
        index++;
        if (index > imgAll.length - 1) {
          index = 0;
        }
        img_func();
      }, 3000);
  }
}
/*=================实现一键清除=========================== */
//获取指定css属性
const names = document.querySelector('.uname');
const pawd = document.querySelector('.upawd');
const clear = document.querySelector('.clears');
const submitbtn = document.querySelector('.login-btn');
//定义一键清除函数
const clearfunc = function () {
  clear.style.display = 'block';
  clear.onclick = function () {
    names.value = '';
    clear.style.display = 'none';
  }
}
//输入时获取输入的对象
names.oninput = function () {
  if (names.value.length == 0) {
    clear.style.display = 'none';
  }
  else {
    clearfunc();
  }
}
/*=================实现一键清除=========================== */
//获取指定css属性
const names = document.querySelector('.uname');
const pawd = document.querySelector('.upawd');
const clear = document.querySelector('.clears');
const submitbtn = document.querySelector('.login-btn');
//定义一键清除函数
const clearfunc = function () {
  clear.style.display = 'block';
  clear.onclick = function () {
    names.value = '';
    clear.style.display = 'none';
    input();
  }
}
//输入时获取输入的对象
names.oninput = function () {
  if (names.value.length == 0) {
    clear.style.display = 'none';
  }
  else {
    clearfunc();
  }
}
//==========================输入框的验证===============================
const loginLink = document.querySelector('.loginLink');
names.oninput=function(){
  input();
}
pawd.oninput = function () {
input();
}
function input() {
  if (names.value.trim().length > 0 && pawd.value.trim().length > 0) {

    submitbtn.className = 'login-btn-active login-submit-btn';
    //用户登入验证
    submitbtn.addEventListener('click', opent);
  }
  else {
    submitbtn.className = 'login-btn login-submit-btn';
    submitbtn.removeEventListener('click', log);
    loginLink.removeEventListener("click", (e) => {
      e.preventDefault(); // 阻止默认跳转
      window.location.href = "javascript:void(0);"; // 手动跳转
    });
  }
}

//===========================登入拦截器==============================
const log = function () {
  //先判断用户(邮箱)是否存在
  if (names.value in localStorage) {
    //获取本地登入信息
    const userData = JSON.parse(localStorage.getItem(names.value));//把JOSN格式转换成字符串
    //校验密码
    if (userData.password == pawd.value) {
      //保存当前登入用户邮箱(关键一步)
      localStorage.setItem('currentUser', names.value);
      localStorage.setItem('u', '1');
      window.location.href = "/chw/";
    } else {

      close()
      setTimeout(() => {
        element('../images/massages/failed.png', '密码错误', 'red');
      }, 100)


      // alert('密码错误');
    }
  } else {
    close()
    setTimeout(() => {
      element('../images/massages/warning.png', `没有该用户哈！！！`, '#e6a23c');
    }, 100)
    // alert(`没有该用户哈！！！,请点击立即注册，然后在登入`);
  }
}
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
//首页未登入
function login() {
  const ok = localStorage.getItem('ok-login') == '0' ? '0' : null;
  if (ok == '0') {
    element('../images/massages/failed.png', '请先登录', 'red');
    setInterval(() => {
      localStorage.removeItem('ok-login');
    }, 1000);
  }
}
login();
//========================验证码区域============================

/*获取DOM元素*/
let BtmImage = ['1.png', '1_b.jpg', '2.png', '2_b.jpg', '3.png', '3_b.jpg'
  , '4.png', '4_b.jpg', '5.png', '5_b.jpg', '6.png', '6_b.jpg', '7.png', '7_b.jpg'
  , '8.png', '8_b.jpg'
];//更新图片
let Btnindex = null; // 0, 2, 4, 6, 8, 10 ,12,14 索引
const move_img = document.querySelector('.move-img');/*滑动按钮*/
const slide_path = document.querySelector('.slide_path');/*滑动块*/
const slideTip = document.querySelector('.slideTip');/*滑动验证*/
const checkingTip = document.querySelector('.checkingTip');/*  请拖动滑块将图像还原*/

const result = document.querySelector('.img_loading_refreshTips');/*result*/
const error = document.querySelector('.img_loading');/*error*/
const captcha_footer = document.querySelector('.captcha_modal_pc');/*验证码区域*/
const BtnImg = document.querySelector('.optBtmImg');/*刷新按钮*/
const BtnText = document.querySelector('.optBtnText');/*刷新按钮*/

const captcha_body = document.querySelector(".captcha_body");
const m1 = document.createElement('div');

// let Btnindex = 0;
// let BtmImage = ['1.png', '1_b.jpg', '2.png', '2_b.jpg'];//更新图片
let TELF = ['158px', '159px', '118px', '119px', '158px', '159px', '138px', '139px', '167px', '168px',
  '143px', '144px', '134px', '135px', '129px', '130px'
]
let isDragging = false;  // 标记是否正在拖动
let offsetX;    // 鼠标相对于元素左上角的偏移
// let offsetY;

const captcha_drop = document.querySelector('.captcha_drop');
//打开验证码弹窗
function opent() {
  Btnindex = Math.floor(Math.random() * 8) * 2;
  m1.innerHTML = `
      <img src="../images/login/capt/${BtmImage[Btnindex + 1]}" id="main_img" style>
          <!-- 1.top:-5px  2.top:-7px -->
    <img src="../images/login/capt/${BtmImage[Btnindex]}" id="slot_img" style>`;
  captcha_body.appendChild(m1);
  //刷新按钮鼠标点击
  const slot_img = document.getElementById('slot_img');/*滑动图片*/
  const main_img = document.getElementById('main_img');/*背景图片*/
  BtnImg.addEventListener('click', () => {
    if (Btnindex == 14) {
      Btnindex = 0;
    } else {
      Btnindex += 2;
    }
    slot_img.src = '../images/login/capt/' + (BtmImage[Btnindex]);
    main_img.src = '../images/login/capt/' + (BtmImage[Btnindex + 1]);
    console.log(Btnindex);
  })
  BtnText.addEventListener('click', () => {
    if (Btnindex == 14) {
      Btnindex = 0;
    } else {
      Btnindex += 2;
    }
    slot_img.src = '../images/login/capt/' + (BtmImage[Btnindex]);
    main_img.src = '../images/login/capt/' + (BtmImage[Btnindex + 1]);
    console.log(Btnindex);

  })
  //打开能见框
  captcha_drop.classList.add('active');
  captcha_footer.classList.add('active');
  document.body.style.overflow = 'hidden';//防止背景滚动
  // 滑动鼠标按下
  move_img.addEventListener('mousedown', (e) => {
     
    isDragging = true;
    // 计算鼠标在元素内的偏移
    offsetX = e.clientX - move_img.offsetLeft;
    // 防止文本选中
    e.preventDefault();
  //   window.scrollTo({
  //       top: 0,
  //       behavior: "smooth" // 平滑滚动
  //     });
  });
  // 滑动鼠标移动
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    // 计算新位置
    const newX = e.clientX - offsetX;
    if (newX <= 0) {
      return;
    } else if (newX >= 240) {
      return;
    }
    slideTip.style.display = 'none';
    checkingTip.style.display = 'block';
    // 设置元素位置
    move_img.style.left = newX + 'px';
    slot_img.style.left = newX + 'px';
    slide_path.style.width = newX + 'px';
    // 防止文本选中
    e.preventDefault();
  });
  //滑动鼠标释放（停止拖动）
  document.addEventListener('mouseup', (e) => {
    if (move_img.style.left == TELF[Btnindex] || move_img.style.left == TELF[Btnindex + 1]) {
      log();
      result.style.display = 'block';
      move_img.className = 'move-img-active';
      move_img.src = '../images/login/success.png';

    }
    else if (move_img.style.left > '0px') {
      error.style.display = 'block';
      move_img.className = 'move-img-active';
      move_img.src = '../images/login/error-active.png';
      slide_path.style.background = 'rgb(252, 236, 239)';
      setTimeout(() => {
        //刷新
        if (Btnindex == 14) {
          Btnindex = 0;
        } else {
          Btnindex += 2;
        }
        slot_img.src = '../images/login/capt/' + (BtmImage[Btnindex]);
        main_img.src = '../images/login/capt/' + (BtmImage[Btnindex + 1]);
      }, 1000)

    }
    setTimeout(() => {
      error.style.display = 'none';
      result.style.display = 'none';
      move_img.src = '../images/login/滑动.png';
      move_img.className = 'move-img';
      checkingTip.style.display = 'none';
      slideTip.style.display = 'block';
      move_img.style.left = 0 + 'px';

      slide_path.style.width = 0 + 'px';
      slot_img.style.left = 0 + 'px';
      slide_path.style.background = 'rgba(220, 220, 220, 0.5)';
    }, 1000)
    isDragging = false;
  });


}
// 按ESC键关闭弹窗
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' || captcha_drop.onclick) {
    //提示:取消
    element('../images/massages/info.png', '取消', '#3e3e3e');
    close();
  }
});
// 监听点击：点击 captcha_drop 关闭
captcha_drop.addEventListener('click', () => {
  element('../images/massages/info.png', '取消', '#3e3e3e');
  close(); // 执行关闭逻辑
});
function close() {
  captcha_footer.classList.remove('active');
  captcha_drop.classList.remove('active');
  document.body.style.overflow = 'auto';//防止背景滚动

}



