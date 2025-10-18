//===========================登入检验=============================
const t2 = document.querySelector('.t2');
const currentUser = localStorage.getItem('currentUser') || [];
const a = document.querySelector('.a1');
if (currentUser.length == 0) {
  element('../images/massages/warning.png', '请先登录', '#e6a23c');
  // alert('请先登录!!! 点击确定即跳转登入界面');
  localStorage.setItem('ok-login','0');
  window.location.href = "./login.html";
}
else {
  t2.innerHTML = currentUser;
  t2.style.color = ' #999';
  window.location.href = "javascript:;";
}
//===================退出===================
const bar_content=document.querySelector('.bar-content');
bar_content.addEventListener('click',()=>{
  localStorage.removeItem('currentUser');
  console.log(localStorage.getItem('currentUser'));
  element('../images/massages/primary.png', '你已退出登录', '#1296db');
setInterval(()=>{
 window.location.href='../html/login.html';
},1000)
})


//============================左侧栏==============================
//left按钮
const src = ['../images/data/rigth.png', '../images/data/left.png'];
let index = 0;
const menusrc = ['../images/data/user-active.png', '../images/data/user.png'
  , '../images/data/hot.png', '../images/data/hot-active.png'
];
const sub_btn = document.querySelector('.sub-icon');//获取left按钮
const flexdd = document.querySelector('.flexdd');//获取宽高div属性
const t1 = document.querySelectorAll('.t1');//获取所有文字
const menu = document.querySelectorAll('.el-menu-item')//获取所有选项
const icon = document.querySelectorAll('.icon');//获取所有icon按钮
//点击左右按钮(隐藏/显示)
sub_btn.addEventListener('click', () => {
  if (index == 0) {//64px
    flexdd.style.width = '64px';
    //隐藏文字
    t1.forEach(t => {
      t.style.display = 'none';
    });
    sub_btn.src = src[index];
    index++;
  } else {//200px
    flexdd.style.width = '200px';
    //显示文字
    t1.forEach(t => {
      t.style.display = 'inline';//在一行里
    });
    sub_btn.src = src[index];
    index = 0;
  }

})
//点击选项显示具体数据
menu.forEach((meu, index) => {
  meu.addEventListener('click', () => {
    // console.log(icon[index]);
    if (index == 0) {
      t1[index + 2].style.color = '#000';
      t1[index + 1].style.color = 'rgb(15, 153, 20)';

      menu[index].classList.add('is-active');
      menu[index + 1].classList.remove('is-active');
      icon[index].src = menusrc[index + 3];
      icon[index + 1].src = menusrc[index + 1];
    } else {
      t1[index].style.color = '#000';
      t1[index + 1].style.color = 'rgb(15, 153, 20)';

      // console.log(menu[index]);
      menu[index].classList.add('is-active');
      menu[index - 1].classList.remove('is-active');
      icon[index].src = menusrc[index - 1];
      icon[index - 1].src = menusrc[index + 1];
    }

  })
})
//获取本地数据
let soldProducts = JSON.parse(localStorage.getItem('soldProducts')) || [];
//===========================分页查询功能===========================
//页面加载时
document.addEventListener('DOMContentLoaded', () => {
  // 获取输入框的值
  let input = document.querySelector('input');
  // 使用 keyup 事件替代 input 事件，只在用户按下回车键或失去焦点时处理
  input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') { // 用户按下回车键时处理
      handlePageInput();
    }
  });

  // 或者使用 blur 事件，在输入框失去焦点时处理
  input.addEventListener('blur', () => {
    handlePageInput();
  });

  let current = 0;
  let total = Math.ceil(soldProducts.length / 3);

  // console.log(Math.ceil(soldProducts.length/3)+Math.ceil(soldProducts.length%3));
  // 创建分页按钮
  function createPageButtons() {
    const pageContainer = document.getElementById('pagination');
    pageContainer.innerHTML = ''; // 清空

    // 上一页按钮
    const prevLi = document.createElement('li');
    prevLi.innerHTML = `<a href="javascript:;" class="${current === 0 ? 'btn-active' : ''}" id="prev-page">&lt;</a>`;
    pageContainer.appendChild(prevLi);

    // 生成页码逻辑
    if (total <= 5) {
      // 总页数小于等于5，显示所有页码
      for (let i = 0; i < total; i++) {
        const pageLi = document.createElement('li');
        pageLi.innerHTML = `<a href="javascript:;" class="${i === current ? 'active' : ''}" data-page="${i + 1}">${i + 1}</a>`;
        pageContainer.appendChild(pageLi);
      }
    } else {
      // 总页数大于5，需要省略号
      // 显示第1页
      const firstLi = document.createElement('li');
      firstLi.innerHTML = `<a href="javascript:;" class="${current === 0 ? 'active' : ''}" data-page="1">1</a>`;
      pageContainer.appendChild(firstLi);

      if (current <= 2) {
        // 当前页在前3页 (1,2,3)
        for (let i = 1; i <= 2; i++) {
          const pageLi = document.createElement('li');
          pageLi.innerHTML = `<a href="javascript:;" class="${i === current ? 'active' : ''}" data-page="${i + 1}">${i + 1}</a>`;
          pageContainer.appendChild(pageLi);
        }
        // 添加省略号
        const ellipsis = document.createElement('li');
        ellipsis.innerHTML = `<span class="ellipsis">...</span>`;
        pageContainer.appendChild(ellipsis);
      } else if (current >= total - 3) {
        // 当前页在后3页
        const ellipsis = document.createElement('li');
        ellipsis.innerHTML = `<span class="ellipsis">...</span>`;
        pageContainer.appendChild(ellipsis);

        // 显示倒数第3页到倒数第2页
        for (let i = total - 3; i < total - 1; i++) {
          const pageLi = document.createElement('li');
          pageLi.innerHTML = `<a href="javascript:;" class="${i === current ? 'active' : ''}" data-page="${i + 1}">${i + 1}</a>`;
          pageContainer.appendChild(pageLi);
        }
      } else {
        // 当前页在中间
        const ellipsis1 = document.createElement('li');
        ellipsis1.innerHTML = `<span class="ellipsis">...</span>`;
        pageContainer.appendChild(ellipsis1);

        // 显示当前页前后各1页
        for (let i = current - 1; i <= current + 1; i++) {
          const pageLi = document.createElement('li');
          pageLi.innerHTML = `<a href="javascript:;" class="${i === current ? 'active' : ''}" data-page="${i + 1}">${i + 1}</a>`;
          pageContainer.appendChild(pageLi);
        }

        const ellipsis2 = document.createElement('li');
        ellipsis2.innerHTML = `<span class="ellipsis">...</span>`;
        pageContainer.appendChild(ellipsis2);
      }

      // 显示最后一页
      const lastLi = document.createElement('li');
      lastLi.innerHTML = `<a href="javascript:;" class="${current === total - 1 ? 'active' : ''}" data-page="${total}">${total}</a>`;
      pageContainer.appendChild(lastLi);
    }

    // 下一页按钮
    const nextLi = document.createElement('li');
    nextLi.innerHTML = `<a href="javascript:;" class="${current === total - 1 ? 'btn-active' : ''}" id="next-page">&gt;</a>`;
    pageContainer.appendChild(nextLi);

    // 此时 DOM 已生成，再绑定事件
    addEventListeners();
  }
  createPageButtons();
  //在createHas用于更新表格数据
  function createHas(current) {
    let soldProducts1 = soldProducts.slice(current * 3, current * 3 + 3);// current 0 开始索引:0*3=0 ，结束索引:0*3+3=3
    //获取3个数据
    //获取当前has-gutter属性，用于创建表格
    const has_gutte = document.querySelector('.has-gutte');
    const has_gutter = document.querySelector('.has-gutter');
    let tr = document.createElement('tr');
    if (soldProducts1.length == 0) {
      //清空
      has_gutte.innerHTML = '';
      has_gutter.innerHTML = '';
      tr.innerHTML = `
         <th>ID</th>
         <th>名称</th>
         <th>价格</th>
         <th>数量</th>
         <th>状态</th>
   `;
      has_gutter.appendChild(tr);
      for (let i = 0; i < 3; i++) {
        tr = document.createElement('tr');
        tr.innerHTML = `
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>`;
        has_gutte.appendChild(tr);//生成
      }
    } else {
      //清空
      has_gutte.innerHTML = '';
      has_gutter.innerHTML = '';
      tr.innerHTML = `
         <th>ID</th>
         <th>名称</th>
         <th>价格</th>
         <th>数量</th>
         <th>状态</th>
   `;
      has_gutter.appendChild(tr);
      for (let i = 0; i < soldProducts1.length; i++) {
        tr = document.createElement('tr');
        // console.log(`-------------第${i+1}部分----------`);
        //  console.log(`id: ${soldProducts1[i].id}`);
        //  console.log(`name: ${soldProducts1[i].name}`);
        //  console.log(`price: ${soldProducts1[i].price}`);
        //  console.log(`quantity: ${soldProducts1[i].quantity}`);
        tr.innerHTML = `
          <td>${soldProducts1[i].id}</td>
          <td>${soldProducts1[i].name}</td>
          <td>${soldProducts1[i].price}</td>
          <td>${soldProducts1[i].quantity}</td>
          <td>已完成</td>`;
        has_gutte.appendChild(tr);//生成
      }
    }

  }
  createHas(current);

  // 处理页码输入的函数
  function handlePageInput() {
    const value = input.value.trim();
    if (value === '') {
      // 如果输入为空，重置为当前页
      input.value = current + 1;
      return;
    }

    const pageNum = parseInt(value);
    // 检查输入是否为有效数字
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= total) {
      pageTo(pageNum - 1);
    } else {
      // 如果输入无效，重置为当前页
      input.value = current + 1;
    }
  }

  function pageTo(page) {
    // 修正边界检查
    if (page < 0) {
      page = 0;
    }

    if (page > total - 1) {
      page = total - 1;
    }

    // 更新当前页码
    current = page;
    createHas(current);
    // 更新输入框的值
    input.value = page + 1;

    // 重新生成分页按钮（这样可以确保激活状态正确显示）
    createPageButtons();
  }


  // 事件监听函数 - 使用事件委托
  function addEventListeners() {
    // 设置输入框的值
    input.value = current + 1;
  }

  // 在 createPageButtons 函数末尾添加事件委托
  function createPageButtons() {
    const pageContainer = document.getElementById('pagination');
    if (!pageContainer) return;

    pageContainer.innerHTML = ''; // 清空

    // 上一页按钮
    const prevLi = document.createElement('li');
    prevLi.innerHTML = `<a href="javascript:;" class="${current === 0 ? 'btn-active' : ''}" id="prev-page">&lt;</a>`;
    pageContainer.appendChild(prevLi);

    // 生成页码逻辑
    if (total <= 5) {
      // 总页数小于等于5，显示所有页码
      for (let i = 0; i < total; i++) {
        const pageLi = document.createElement('li');
        pageLi.innerHTML = `<a href="javascript:;" class="${i === current ? 'active' : ''}" data-page="${i + 1}">${i + 1}</a>`;
        pageContainer.appendChild(pageLi);
      }
    } else {
      // 总页数大于5，需要省略号
      // 显示第1页
      const firstLi = document.createElement('li');
      firstLi.innerHTML = `<a href="javascript:;" class="${current === 0 ? 'active' : ''}" data-page="1">1</a>`;
      pageContainer.appendChild(firstLi);

      if (current <= 2) {
        // 当前页在前3页 (1,2,3)
        for (let i = 1; i <= 2; i++) {
          const pageLi = document.createElement('li');
          pageLi.innerHTML = `<a href="javascript:;" class="${i === current ? 'active' : ''}" data-page="${i + 1}">${i + 1}</a>`;
          pageContainer.appendChild(pageLi);
        }
        // 添加省略号
        const ellipsis = document.createElement('li');
        ellipsis.innerHTML = `<span class="ellipsis">...</span>`;
        pageContainer.appendChild(ellipsis);
      } else if (current >= total - 3) {
        // 当前页在后3页
        const ellipsis = document.createElement('li');
        ellipsis.innerHTML = `<span class="ellipsis">...</span>`;
        pageContainer.appendChild(ellipsis);

        // 显示倒数第3页到倒数第2页
        for (let i = total - 3; i < total - 1; i++) {
          const pageLi = document.createElement('li');
          pageLi.innerHTML = `<a href="javascript:;" class="${i === current ? 'active' : ''}" data-page="${i + 1}">${i + 1}</a>`;
          pageContainer.appendChild(pageLi);
        }
      } else {
        // 当前页在中间
        const ellipsis1 = document.createElement('li');
        ellipsis1.innerHTML = `<span class="ellipsis">...</span>`;
        pageContainer.appendChild(ellipsis1);

        // 显示当前页前后各1页
        for (let i = current - 1; i <= current + 1; i++) {
          const pageLi = document.createElement('li');
          pageLi.innerHTML = `<a href="javascript:;" class="${i === current ? 'active' : ''}" data-page="${i + 1}">${i + 1}</a>`;
          pageContainer.appendChild(pageLi);
        }

        const ellipsis2 = document.createElement('li');
        ellipsis2.innerHTML = `<span class="ellipsis">...</span>`;
        pageContainer.appendChild(ellipsis2);
      }

      // 显示最后一页
      const lastLi = document.createElement('li');
      lastLi.innerHTML = `<a href="javascript:;" class="${current === total - 1 ? 'active' : ''}" data-page="${total}">${total}</a>`;
      pageContainer.appendChild(lastLi);
    }

    // 下一页按钮
    const nextLi = document.createElement('li');
    nextLi.innerHTML = `<a href="javascript:;" class="${current === total - 1 ? 'btn-active' : ''}" id="next-page">&gt;</a>`;
    pageContainer.appendChild(nextLi);
  }

  // 使用事件委托处理分页点击事件
  document.getElementById('pagination').addEventListener('click', function (e) {
    e.preventDefault();
    const target = e.target;
    // 处理上一页
    if (target.id === 'prev-page') {
      if (current > 0) {
        pageTo(current - 1);
      }
      return;
    }
    // 处理下一页
    if (target.id === 'next-page') {
      if (current < total - 1) {
        pageTo(current + 1);
      }
      return;
    }
    // 处理页码点击
    if (target.hasAttribute('data-page')) {
      const page = parseInt(target.dataset.page) - 1;
      pageTo(page);
    }
  });
  addEventListeners();
});

let category = [];
for (let i = 0; i < soldProducts.length; i++) {
  let flag = false;
  if (category.length == 0) {
    category.push(
      {
        category: soldProducts[i].category,
        quantity: soldProducts[i].quantity
      }
    )
  } else {
    for (let j = 0; j < category.length; j++) {
      if (category[j].category == soldProducts[i].category) {
        category[j].quantity += soldProducts[i].quantity;
        flag = true;
      }
    }
    if (flag == false) {
      category.push(
        {
          category: soldProducts[i].category,
          quantity: soldProducts[i].quantity
        }
      );
    }
  }
}



// console.log(category);
// 图表
var myChart = echarts.init(document.getElementById('chart_box_main'));

// 指定图表的配置项和数据
var option = {

  xAxis: {
    type: 'category',
    data: [
      categoryswitch(category[0].category),
      categoryswitch(category[1].category),
      categoryswitch(category[2].category),
      categoryswitch(category[3].category),
      categoryswitch(category[4].category),
      categoryswitch(category[5].category),
    ]
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      barWidth: '40%',           // 控制柱子宽度
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#5470C6' },    // 上色
        { offset: 1, color: '#AAB8FF' }     // 下色

      ]),
      borderRadius: 8,       // 圆角更现代
      shadowColor: 'rgba(0,0,0,0.1)',
      shadowBlur: 5,        // 轻微阴影
      emphasis: {
        itemStyle: {
          color: '#436EEE'   // 鼠标悬停时颜色变深
        }
      },

      data: [
        category[0].quantity
        , category[1].quantity
        , category[2].quantity
        , category[3].quantity
        , category[4].quantity
        , category[5].quantity
      ],
      type: 'bar',

    },
  ]
};
function categoryswitch(key) {
  switch (key) {
    case 'freshfruits': return '新鲜水果';
    case 'meats': return '肉类禽蛋';
    case 'Grains': return '粮油米面';
    case 'seafoods': return '水产海鲜';
    case 'drys': return '干货特产';
    case 'natures': return '自然律动';
  }
}

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
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