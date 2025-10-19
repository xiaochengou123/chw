//=================================注册拦截器====================================
let pwd = false;
let Email = false;
let codE = false;
//=============================获取验证码！=======================================
//1.随机验证码的数据，获取css指定原始，定义Code用于验证
const Codearr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const getbtn = document.getElementById('btnZM');
let Code = '';
getbtn.addEventListener('click', function () {
  //把旧的数据清除
  document.getElementById('btnZM').value = '';
  Code = '';
  //获取新的验证码
  for (let i = 0; i < 6; i++) {
    getbtn.value = getbtn.value + " " + Codearr[Math.floor(Math.random() * Codearr.length)];
  }
  Code = Code + getbtn.value;
  Code = Code.split(' ').join('');
  console.log(Code);
})
//=================================输入框验证==================================
//把所有错误信息清除
// clearErrors();
//邮箱验证
const email = document.getElementById('phoneNickName');
const emailError = document.querySelector('.Emailerror');
const emailmessage = document.querySelector('.fm_Email_message');
const emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;
//实时显示邮箱校验信息
const emailfunc = () => {
  emailError.style.display = 'none';
  emailmessage.style.display = 'none';
  if (email.value.length == 0) {
    emailError.textContent = '请输入邮箱';
    emailError.style.display = 'block';
    document.getElementById('phoneNickName').focus();
    Email = false;
  }
  //test是测试表单数据是否正确
  else if (!emailReg.test(email.value)) {
    emailError.style.display = 'block';
    emailError.textContent = '请输入正确的邮箱号!!';
    Email = false;
  } else if (email.value in localStorage) {
    emailError.style.display = 'block';
    emailError.textContent = '哎呀！用户已经存在了，换一个试试把~~!!';
    Email = false;
  } else {
    emailError.style.display = 'none';
    emailmessage.style.display = 'inline-block';
    Email = true;
  }
}
email.oninput = function () {
  emailfunc();
}
//密码校验
const passwordInput = document.getElementById('phonePWd');
const passwordError = document.querySelector('.PWderror');
const passwordMessage = document.querySelector('.fm_password_message');
const strengthBars = document.querySelectorAll('.strength-bar');
const passwordRegex = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/;
const strengthText = document.querySelector('.strength-text');
const passwordfunc = () => {
  //=================================密码强度检测=================================
  const password = passwordInput.value;

  
  let strength = 0;
  //校验
  if (password.length > 0) strength++;
  if (password.length > 6) strength++;
  if (passwordRegex.test(password)) strength++;
  // 重置所有bar
  strengthBars.forEach(bar => bar.style.background = '#eee');
  // 根据强度设置颜色
  if (strength > 0) {
    strengthBars[0].style.background = '#ff4d4f';
    strengthText.textContent = '密码强度：弱';
  }
  if (strength > 1) {
    strengthBars[1].style.background = '#faad14';
    strengthText.textContent = '密码强度：中';
  }
  if (strength > 2) {
    strengthBars[2].style.background = '#52c41a';
    strengthText.textContent = '密码强度：强';
  }
  //密码校验
  const password1 = passwordInput.value;
  passwordError.style.display = 'none';
  passwordMessage.style.display = 'none';
  if (password1.length === 0) {
    passwordError.textContent = '请输入密码';
    passwordError.style.display = 'block';
    pwd = false;
  }
  if (password1.length < 6) {
    passwordError.textContent = '密码长度应为6-20个字符';
    passwordError.style.display = 'block';
    pwd = false;
  } else if (!passwordRegex.test(password1)) {
    passwordError.textContent = '建议使用大小写字母、数字、特殊符号组合';
    passwordError.style.display = 'block';
    pwd = false;
  } else {
    passwordError.style.display = 'none';
    passwordMessage.style.display = 'inline-block';
    pwd = true;
  }
};
passwordInput.addEventListener('input', passwordfunc);

//验证码校验
const code = document.getElementById('phoneCode');
const codeError = document.querySelector('.Codeerror');
const codemessage = document.querySelector('.fm_Code_message');
const codeReg = /^\d+$/;
//实时显示验证码校验信息
const codefunc = () => {
  codeError.style.display = 'none';
  codemessage.style.display = 'none';
  if (code.value.length == 0) {
    codeError.textContent = '请输入验证码';
    codeError.style.display = 'block';
    document.getElementById('phoneCode').focus();
    codE = false;
  } else if (!codeReg.test(code.value)) {
    codeError.style.display = 'block';
    codeError.textContent = '请输入正确的验证码,验证码只能有数字!!';
    codE = false;
  } else if (Code.trim() == String(code.value)) {//验证码匹配
    codeError.style.display = 'none';
    codemessage.style.display = 'inline-block';
    codE = true;
  } else if (code.value.length > 6) {
    codeError.style.display = 'block';
    codeError.textContent = '验证码只能是六位数字!!';
    codE = false;
  } else {
    codeError.style.display = 'block';
    codeError.textContent = '验证码不匹配!!';
    codE = false;
  }
}
code.oninput = () => {
  codefunc();
}
//提交
const register = document.querySelector('.submit-btn');
// const regsubmit = document.querySelector('.submit');
register.onclick = function(){
  //如果都满足直接保存邮箱和密码到本地仓库，否则提示不能提交
  if (pwd && Email && codE) {
    // 创建用户数据对象
    const userData = {
      email: email.value,
      password: passwordInput.value,
      cart: [], // 空购物车
      image:'',
      userAddresses:[]
    };
    // 存储用户数据
    localStorage.setItem(email.value, JSON.stringify(userData));
    // alert(`用户${email.value}已注册成功!!!`);
    element('../images/massages/success.png',`用户${email.value}已注册成功!!!`,'#39bf3e');
    setInterval(() => {
     //注册成功后自动到登入界面
    window.location.href='../html/login.html';
    }, 1000);
   
    //注册拦截器
    pwd = false;
    Email = false;
    codE = false;
  }else{
    element('../images/massages/failed.png','注册失败，请看右边红色信息','red');
    //  alert(`注册失败，请看右边红色信息`);
  }
}
//清除
const clear = document.querySelector('.reset-btn');
clear.onclick = function () {
  element('../images/massages/info.png','清除成功','#3e3e3e');
  //邮箱
  email.value = '';
  emailError.style.display = 'none';
  emailmessage.style.display = 'none';
  //验证码
  code.value = '';
  getbtn.value = '获取验证码';
  Code = '';
  codeError.style.display = 'none';
  codemessage.style.display = 'none';
  //密码
  passwordInput.value = '';
  passwordError.style.display = 'none';
  passwordMessage.style.display = 'none';
  //密码强度
  strength = 0;
  // 重置所有bar
  strengthBars.forEach(bar => bar.style.background = '#eee');
  strengthText.textContent = '密码强度：弱';
  //注册拦截器
  pwd = false;
  Email = false;
  codE = false;
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





