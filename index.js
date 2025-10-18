//======================================商品列表 · 开始区============================================
//将products提升到全局变量
window.products = [
  // 新鲜水果
  { id: 1, name: '山东红富士苹果', price: 29.90, category: 'freshfruits', image: '../images/product/山东红富士苹果.jpg', Atter: '【脆甜多汁】山东烟台红富士苹果 5斤家庭装 新鲜水果' },
  { id: 2, name: '海南金煌芒果', price: 39.90, category: 'freshfruits', image: '../images/product/海南金煌芒果.jpg', Atter: '【果香浓郁】海南金煌大芒果 3斤精品装 当季新鲜水果' },
  // 肉类禽蛋
  { id: 3, name: '内蒙古草原羊肉', price: 128.00, category: 'meats', image: '../images/product/内蒙古草原羊肉.jpg', Atter: '【鲜嫩不膻】内蒙古草原新鲜羊肉 2斤整切装 冷链直达' },
  { id: 4, name: '农家散养土鸡蛋', price: 45.90, category: 'meats', image: '../images/product/农家散养土鸡蛋 .png', Atter: '【蛋黄醇香】农家散养柴鸡蛋 30枚 无激素 新鲜禽蛋' },
  // 粮油米面
  { id: 5, name: '东北五常大米', price: 99.90, category: 'Grains', image: '../images/product/东北五常大米 10kg.jpg', Atter: '【米香四溢】东北五常稻花香大米 10公斤 真正原产地装' },
  { id: 6, name: '鲁花花生油', price: 139.90, category: 'Grains', image: '../images/product/鲁花花生油.jpg', Atter: '【压榨纯香】鲁花一级压榨花生油 5L 家庭食用油' },
  // 水产海鲜
  { id: 7, name: '阳澄湖大闸蟹', price: 198.00, category: 'seafoods', image: '../images/product/阳澄湖大闸蟹 4只装.png', Atter: '【膏肥黄满】阳澄湖精品大闸蟹 4只礼盒装（公3.5两/母2.5两）' },
  { id: 8, name: '舟山带鱼', price: 68.80, category: 'seafoods', image: '../images/product/舟山带鱼 1kg.jpg', Atter: '【肉厚刺少】舟山深海野生带鱼段 1kg 冷冻保鲜 海鲜速达' },
  // 干货特产
  { id: 9, name: '新疆特级红枣', price: 35.90, category: 'drys', image: '../images/product/新疆特级红枣 500g.png', Atter: '【自然甜润】新疆若羌特级灰枣 500g 精选大果 干果礼盒' },
  { id: 10, name: '福建古田银耳', price: 42.80, category: 'drys', image: '../images/product/福建古田银耳.jpg', Atter: '【胶质丰富】福建古田头茬银耳 150g 精品干货 养颜滋补' },
  // 自然律动（杀虫剂）
  { id: 11, name: '自然律动·果蔬卫士', price: 59.90, category: 'natures', image: '../images/product/自然律动·果蔬卫士.jpg', Atter: '【植物配方】自然律动果蔬清洗剂 果蔬卫士 500ml 食品级安全' },
  { id: 12, name: '自然律动·虫害克星', price: 78.50, category: 'natures', image: '../images/product/自然律动·虫害克星.jpg', Atter: '【绿色防护】自然律动虫害克星 1L 天然植物驱虫喷雾 家居可用' }
]
window.seckill = [
  // 8:00-10:00   
  { id: 13, name: '老上海风味咸蛋黄粢饭团', price: 35.80, y_money: 44.30, time: 10, image: '../images/seckill/米达.jpg', Atter: '【经典口味】老上海风味咸蛋黄粢饭团，多重美味一网打尽' },
  { id: 14, name: '中秋礼品梨子雪梨水果礼盒', price: 19.20, y_money: 27.43, time: 10, image: '../images/seckill/雪梨.jpg', Atter: '【中秋佳选】精选梨子雪梨水果礼盒，健康美味共享团圆' },
  { id: 15, name: '国产脆蜜桃', price: 17.90, y_money: 24.90, time: 10, image: '../images/seckill/桃子.jpg', Atter: '【鲜甜爽口】国产脆蜜桃，自然成熟，口感绝佳' },
  { id: 16, name: '大葡萄整箱装', price: 26.40, y_money: 75.60, time: 10, image: '../images/seckill/葡萄.jpg', Atter: '【果香四溢】大葡萄整箱装，新鲜直达，味美多汁' },
  { id: 17, name: '绿心猕猴桃', price: 12.69, y_money: 14.69, time: 10, image: '../images/seckill/猕猴桃.jpg', Atter: '【营养丰富】绿心猕猴桃，维C满满，健康每一天' },
  { id: 18, name: '蔬菜病虫害诊断指南', price: 117.00, y_money: 130.00, time: 10, image: '../images/seckill/蔬菜病虫害诊断书.jpg', Atter: '【专业指导】蔬菜病虫害诊断指南，助您轻松解决种植难题' },

  // 10:00-12:00  
  { id: 19, name: '福建平和红心柚', price: 20.9, y_money: 34.8, time: 12, image: '../images/seckill/红心柚.jpg', Atter: '【甜蜜多汁】福建平和红心柚，鲜甜爽口，每一口都是享受' },
  { id: 20, name: '陕西大荔冬枣青枣', price: 19.6, y_money: 29.6, time: 12, image: '../images/seckill/青枣.jpg', Atter: '【天然鲜甜】陕西大荔冬枣青枣，清甜可口，营养丰富' },
  { id: 21, name: '印度青苹果', price: 32, y_money: 42, time: 12, image: '../images/seckill/青苹果.jpg', Atter: '【纯甜不酸】印度青苹果，现摘现发，品质保证' },
  { id: 22, name: '东北农家红糙米', price: 20.8, y_money: 30.2, time: 12, image: '../images/seckill/红米新米.jpg', Atter: '【健康之选】东北农家红糙米，营养丰富，健康饮食首选' },
  { id: 23, name: '山药刀削面', price: 5.9, y_money: 9, time: 12, image: '../images/seckill/干拌面.jpg', Atter: '【独特风味】含20%山药的刀削面，劲道十足，美味更健康' },
  { id: 24, name: '兽医预防科目高效复习书', price: 40, y_money: 60, time: 12, image: '../images/seckill/兽医官方预防科目.jpg', Atter: '【备考必备】兽医预防科目高效复习书，助力考试成功' },

  // 12:00-14:00
  { id: 25, name: '东北农家红糙米', price: 20.8, y_money: 30.2, time: 14, image: '../images/seckill/红米新米.jpg', Atter: '【健康之选】东北农家红糙米，营养丰富，健康饮食首选' },
  { id: 26, name: '广西蜜桔', price: 9.9, y_money: 12.9, time: 14, image: '../images/seckill/橘子.jpg', Atter: '【清甜多汁】广西蜜桔，果香浓郁，老少皆宜' },

  // 14:00-16:00
  { id: 27, name: '应季新鲜孕妇水果礼盒', price: 56.80, y_money: 126.80, time: 16, image: '../images/seckill/石榴.jpg', Atter: '【贴心呵护】应季新鲜孕妇水果礼盒，精选优质果品，关爱孕期健康' },
  { id: 28, name: '广西蜜桔', price: 9.9, y_money: 12.9, time: 16, image: '../images/seckill/橘子.jpg', Atter: '【清甜多汁】广西蜜桔，果香浓郁，老少皆宜' },
  { id: 29, name: '香辣味豆腐', price: 42, y_money: 35, time: 16, image: '../images/seckill/豆腐干.png', Atter: '【麻辣过瘾】香辣味豆腐，豆香浓郁，越嚼越香' },
  { id: 30, name: '云南野生山慈菇干货', price: 319, y_money: 368, time: 16, image: '../images/seckill/药材.jpg', Atter: '【地道药材】云南野生山慈菇干货，无硫加工，传统滋补佳品' },

  // 16:00-18:00
  { id: 31, name: '深海小鱼条', price: 69.90, y_money: 80, time: 18, image: '../images/seckill/鱼.jpg', Atter: '【鲜嫩可口】深海小鱼条，肉质紧实，适合多种烹饪方式' },
  { id: 32, name: '小米蕉香蕉', price: 6.8, y_money: 12.8, time: 18, image: '../images/seckill/小米蕉香蕉.jpg', Atter: '【软糯香甜】小米蕉香蕉，小巧玲珑，一口一个超满足' },
  { id: 33, name: '法兰西西梅干', price: 38.11, y_money: 59.9, time: 18, image: '../images/seckill/西梅.jpg', Atter: '【0添加】法兰西西梅干，自然风干，果肉厚实，酸甜开胃' },
  { id: 34, name: '茶叶绿色高效种植技术书', price: 50, y_money: 36.9, time: 18, image: '../images/seckill/茶叶.jpg', Atter: '【科技助农】茶叶绿色高效种植与加工新技术，提升产量与品质' },

  // 18:00-20:00
  { id: 35, name: '福建平和红心柚', price: 20.9, y_money: 34.8, time: 20, image: '../images/seckill/红心柚.jpg', Atter: '【甜蜜多汁】福建平和红心柚，鲜甜爽口，每一口都是享受' },
  { id: 36, name: '陕西大荔冬枣青枣', price: 19.6, y_money: 29.6, time: 20, image: '../images/seckill/青枣.jpg', Atter: '【天然鲜甜】陕西大荔冬枣青枣，清甜可口，营养丰富' },
  { id: 37, name: '印度青苹果', price: 32, y_money: 42, time: 20, image: '../images/seckill/青苹果.jpg', Atter: '【纯甜不酸】印度青苹果，现摘现发，品质保证' },
  { id: 38, name: '东北农家红糙米', price: 20.8, y_money: 30.2, time: 20, image: '../images/seckill/红米新米.jpg', Atter: '【健康之选】东北农家红糙米，营养丰富，健康饮食首选' }
];
//======================================商品列表 · 结束区============================================

//根据路径判断是否渲染
if (window.location.pathname.includes('/html/index.html')) {
  //获取本地存储数据
  let user = localStorage.getItem('currentUser');
  /* 顶部菜单栏 */
  /* 悬浮时的样式 */
  /* 菜单父级+图片获取id选择器属性 */
  const baractive = document.getElementById("hoverDropdown");
  const bar = document.querySelector('.cascade-bar');
  const img = document.querySelector('.imageemnu');
  const imgArr_top = ["../images/index/emnu1.png", "../images/index/emnu2.png"];
  const emnu = document.querySelector('.emnu');
  /*买家中心 菜单+图片 */
  /* 鼠标移入，进行添加 */
  baractive.addEventListener('mouseenter', function () {
    // console.log(imgArr_top[0]);
    img.src = imgArr_top[0];
    this.classList.add('active');
  });
  /* 鼠标移出,进行删除 */
  baractive.addEventListener('mouseleave', function () {
    // console.log(imgArr_top[1]);
    img.src = imgArr_top[1];
    this.classList.remove('active');
  });


  //==================拦截器=================
  const left = document.querySelector('.f-c-left');
  const rigth = document.querySelector('.f-c-rigth');
  const left_iten = document.querySelector('.left-iten');
  const currentUser = localStorage.getItem('currentUser');
  const login_btn = document.querySelector('.login-btn');
  //获取DOM拦截器,指定的拦截器
  document.addEventListener('click', function (event) {
    // 获取当前是否登录
    // 判断点击的元素或其祖先是否有 data-login-required 属性
    const target = event.target;
    const requiresLogin = target.closest('[data-login-required]');
    // // 如果该元素需要登录才能点击，并且用户未登录，则拦截
    if (!currentUser && requiresLogin) {
      event.preventDefault(); // 阻止默认行为（比如按钮点击）

      // alert('请先登录');
      // 倒计时3秒后跳转到登录页面
      localStorage.setItem('ok-login', '0');

      window.location.href = "../html/login.html";

    }
  });
  var u = localStorage.getItem('u') == '1' ? '1' : null;
  if (u == '1') {
    //你已登入
    audio_open('../audio/login.wav');
    element('../images/massages/success.png', '你已登入', '#39bf3e');
    localStorage.removeItem('u');
  }
  if (currentUser) {
    left.style.display = "none";
    rigth.style.display = "none";
    //修改文字原本的颜色
    left_iten.style.color = "red";
    //隐藏登录按钮
    login_btn.style.display = "none";
    //修改登入后的文字
    document.querySelector(".hn-text").
      innerHTML = `<span class="hn-text">Hi,${currentUser}</span>`;
    //修改div的文字内容
    bar.innerHTML = `<div class="cascade-bar f-c">${currentUser}<img id="imageemnu" src="../images/index/emnu2.png" style="width: 8px"></div>`;


    //点击退出
    emnu.addEventListener('click', () => {
      // alert('你已退出登录');

      element('../images/massages/primary.png', '你已退出登录', '#1296db');
      setTimeout(() => {
        window.location.href = "../html/login.html";
        localStorage.removeItem('currentUser');
      }, 1000);

      //删除登入按钮

    });
  }

  /*--------- */
  /*===========搜索文字变化=========== */
  //获取输入款文字
  let search = document.querySelector('.search-ctn');
  //切换输入框的文字
  let alist = ['请输入您要的货品', '山东红富士苹果', '海南金煌芒果', '内蒙古草原羊肉', '农家散养土鸡蛋', '东北五常大米',
    '鲁花花生油', '阳澄湖大闸蟹', '舟山带鱼', '新疆特级红枣', '福建古田银耳', '自然律动·果蔬卫士', '自然律动·虫害克星'];

  let index = 0;
  //以周期3秒,设置Html的标准属性:节点.属性="指定的属性"
  setInterval(
    function () {
      index++;
      if (index > alist.length - 1) {
        index = 0;
      }
      //设置placeholder属性,重点
      search.placeholder = alist[index];
    }, 3000
  )

  /*==========模糊查询====================== */
  let resultList = document.querySelector('.result-list');
  let s_r = document.querySelector('.s-r');

  //点击搜索时获取属性值
  s_r.onclick = function () {
    let flog = false;
    resultList.innerHTML = '';
    for (let i = 1; i < alist.length; i++) {
      //校验
      if (alist[i].indexOf(search.value) != -1) {
        const id_alist = products.find(item => item.name === alist[i])?.id;
        /*不能跳转方法 */
        resultList.innerHTML = resultList.innerHTML + `<p><a href="./good.html?id=${id_alist}">${alist[i]}</a></p>`;
        // console.log(products.find(item=>item.name===alist[i])?.id);
        // --
        resultList.style.display = 'block';
        flog = true;
      }
    }
    if (flog == false) {
      /*不能跳转方法 */
      resultList.innerHTML = resultList.innerHTML + `<p>没有该商品信息</p>`;
      resultList.style.display = 'block';
    }
  }
  /*老办法 */
  // //鼠标失去焦点执行
  search.onblur = function () {
    resultList.style.display = 'none';
  }
  /*=====================实现轮播图=========================*/
  const slidesContainer = document.querySelector('.slides-container');
  const lis = document.querySelectorAll('.banner-btn li');
  const banner_pre = document.querySelector('.banner-pre');
  const banner_next = document.querySelector('.banner-next');
  setInterval(nextSlide, 2500);
  let currentIndex = 0;
  const totalSlides = 3; // 实际只有3张不同的图片
  let isTransitioning = false;

  // 更新指示器
  function updateIndicators() {
    lis.forEach((li, index) => {
      if (index === currentIndex) {
        li.classList.add('banner-active');
      } else {
        li.classList.remove('banner-active');
      }
    });
  }

  // 切换到指定幻灯片
  function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;

    // 计算transform值
    let transformValue = -index * 25; // 每张图片占25%

    // 如果从第3张切换到第1张，使用第4张（第1张的副本）来实现平滑过渡
    if (currentIndex === 2 && index === 0) {
      // 先滑动到第4张（第1张的副本）
      slidesContainer.style.transform = `translateX(-75%)`;

      // 动画结束后瞬间跳转到真正的第1张
      setTimeout(() => {
        slidesContainer.style.transition = 'none';
        slidesContainer.style.transform = `translateX(0%)`;

        // 强制重绘
        slidesContainer.offsetHeight;

        // 恢复动画效果
        slidesContainer.style.transition = 'transform 0.5s ease-in-out';
        isTransitioning = false;
      }, 500);
    } else {
      // 正常滑动
      slidesContainer.style.transform = `translateX(${transformValue}%)`;

      // 动画结束后重置标志
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }

    currentIndex = index;
    updateIndicators();
  }

  // 下一个幻灯片
  function nextSlide() {
    const nextIndex = (currentIndex + 1) % totalSlides;
    goToSlide(nextIndex);
  }

  // 上一个幻灯片
  function prevSlide() {
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(prevIndex);
  }

  // 事件监听
  banner_next.addEventListener('click', nextSlide);
  banner_pre.addEventListener('click', prevSlide);

  // 指示器点击事件
  lis.forEach((li, index) => {
    li.addEventListener('click', function () {
      if (index !== currentIndex) {
        goToSlide(index);
      }
    });
  });


  // 鼠标悬停暂停轮播
  const homeBanner = document.querySelector('.home-banner');
  let speed = -40;
  var banner_time;
  homeBanner.addEventListener('mouseenter', function () {
    banner_next.style.display = 'block';
    banner_pre.style.display = 'block';
  });

  homeBanner.addEventListener('mouseleave', function () {
    banner_next.style.display = 'none';
    banner_pre.style.display = 'none';
  });

  // 初始更新指示器
  updateIndicators();

  //====================购物车===============
  //商品加载到购物车
  //215行,遍历商品数据并创建商品卡片，然后重新渲染商品及按钮点击效果
  //定义商品购物车数量
  let sum = 0;
  //获取DOM
  const homeCartCount = document.getElementById('homeCartCount');
  let soldProducts = JSON.parse(localStorage.getItem('soldProducts')) || [];//获取所有已售商品信息
  //预加载时渲染，请别忽略他的存在
  function createData() {
    if (soldProducts.length == 0) {
      fetch('../json/data.json')
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            soldProducts.push(
              {
                id: data[i].id,
                name: data[i].name,
                price: data[i].price,
                quantity: data[i].quantity,
                category: data[i].category
              }
            );
          }
          localStorage.setItem('soldProducts', JSON.stringify(soldProducts));//存储到本地soldProducts

        });
    }
  }
  //================商品列表 · 方法区==================
  // 获取DOM元素
  const tabItems = document.querySelectorAll('.tab-item');
  const tabItemtabItem = document.querySelectorAll('.item-title');
  const productList = document.getElementById('product-list');

  // 初始化：渲染所有商品
  renderProducts(products, soldProducts);

  // 为每个Tab添加点击事件
  tabItems.forEach(tab => {
    tab.addEventListener('click', () => {
      // 移除所有active类
      tabItems.forEach(item => item.classList.remove('active'));
      // 为当前点击的Tab添加active类
      tab.classList.add('active');
      // 获取当前分类
      const category = tab.dataset.category;

      // 根据分类过滤商品
      let filteredProducts = [];
      if (category === 'all') {
        filteredProducts = products;
      } else {
        filteredProducts = products.filter(product => product.category === category);
      }
      // 渲染过滤后的商品
      renderProducts(filteredProducts, soldProducts);
    });
  });
  tabItemtabItem.forEach(tabit => {
    tabit.addEventListener('click', () => {
      tabItemtabItem.forEach(items => items.classList.remove('title-active'));
      tabit.classList.add('title-active');
    })
  })
  // 将addItem和updatecart移到外部，成为全局函数
  let addItem, updatecart;

  function renderProducts(products, soldProducts) {

    // 清空当前列表
    productList.innerHTML = '';

    if (products.length === 0) {
      productList.innerHTML = '<div class="no-product">暂无商品</div>';
      return;
    }

    // 遍历商品数据并创建商品卡片
    for (let i = 0; i < products.length; i++) {
      //清空上一个商品的数量
      let quantitys = 0;
      for (let index = 0; index < soldProducts.length; index++) {
        if (soldProducts[index].id == products[i].id) {
          quantitys += soldProducts[index].quantity;
          break;
        }
      }
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.dataset.id = products[i].id;
      productCard.innerHTML = `
       <div data-login-required>
      <img src="${products[i].image}" class="product-image">
      <span class="product-name">${products[i].name}</span>
      <div class="product-price">¥ ${products[i].price.toFixed(2)}<p class="Sold">已售${quantitys}+</p>
        <a class="product-btn" href="javascript:;" data-id="${products[i].id}">&nbsp;加入购物车</a>
      </div>
    `;
      productList.appendChild(productCard);
    }


  }

  // console.log(localStorage.getItem('orders'));

  //商品 -》为容器列表添加事件 (点击后，把所有信息转入到一个容器)
  function addProductEvents() {
    //获取数据dom
    const productDoms = document.getElementById('product-list')
    //绑定事件
    productDoms.addEventListener('click', function (e) {
      // 搜索被点击的div
      const clickDivDom = e.target.closest('[data-login-required]');
      //判断是否点击的div
      if (clickDivDom && !e.target.classList.contains('product-btn')) {
        // 获取当前商品卡片的 ID（从父级 product-card 上取）
        const productCard = clickDivDom.closest('.product-card');
        const productId = productCard ? parseInt(productCard.dataset.id) : null;

        // 搜索对应的商品信息
        const product = productId ? products.find(p => p.id === productId) : null;

        if (product) {
          //  console.log(product);
          // console.log('点击了商品：', product.id);
          // 跳转商品详情
          window.location.href = `../html/good.html?id=${productId}`;
        }

      }
    });
  }
  addProductEvents()
  function addSeckillEvents() {
    //获取数据dom
    const Doms = document.querySelector('.seckilwarp');
    //绑定事件
    Doms.addEventListener('click', function (e) {
      // 搜索被点击的div
      const clickDivDom = e.target.closest('[data-login-required]');
      //判断是否点击的div
      if (clickDivDom) {
        // 获取当前商品卡片的 ID（从父级 item 上取）
        const productCard = clickDivDom.closest('.item');
        const productId = productCard ? parseInt(productCard.dataset.id) : null;
        // 搜索对应的商品信息
        const product = productId ? seckill.find(s => s.id === productId) : null;

        if (product) {
          //  console.log(productId);
          // console.log('点击了商品：', product.id);
          // 跳转商品详情
          window.location.href = `../html/good.html?id=${productId}`;
        }
      }
    });
  }
  addSeckillEvents();

  ///将updateCartCount移到initProductEvents方法外保证执行
  function updateCartCount(userData) {
    sum = 0;
    userData.cart.forEach(tab => {
      sum += tab.quantity;
    })
    //  alert(sum);
    homeCartCount.textContent = sum;
  }
  let ste = 0;
  // 初始化事件监听
  function initProductEvents() {
    // 使用事件委托处理动态生成的按钮
    productList.addEventListener('click', function (e) {
      if (e.target.classList.contains('product-btn')) {
        const productId = parseInt(e.target.dataset.id);
        addItem(productId);
      }
    });

    // 定义addItem函数
    addItem = function (productId) {
      let unameUser = localStorage.getItem('currentUser');
      // alert(unameUser);
      // let sting=localStorage.getItem(unameUser);
      // alert(JSON.parse(sting))
      let userData = JSON.parse(localStorage.getItem(unameUser));
      updatecart(userData, productId);
    };


    // 定义updatecart函数
    updatecart = function (userData, productId) {
      const product = products.find(p => p.id === productId);
      const existingItem = userData.cart.find(item => item.id === productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        userData.cart.push({
          id: product.id,
          name: product.name,
          price: product.price.toFixed(2),
          image: product.image,
          quantity: 1,
          category: product.category
        });
      }
      // console.log(userData);
      // 保存整个用户数据，而不仅仅是购物车
      localStorage.setItem(userData.email, JSON.stringify(userData));
      // 更新购物车数量显示
      updateCartCount(userData);
      audio_open('../audio/successful.ogg');
      element('../images/massages/success.png', '添加成功', '#39bf3e');
      // alert('已成功添加到购物车');
    };

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

  // 初始化页面
  document.addEventListener('DOMContentLoaded', function () {
    initProductEvents();
    initCartCount(); // 初始化购物车数量
  });

  //======================吸顶效果========================
  document.addEventListener('DOMContentLoaded', function () {
    const shortcutHeader = document.getElementById('shortcutHeader');
    //HTMLElement.offsetHeight 是一个只读属性，它返回该元素的像素高度，高度包含该元素的垂直内边距和边框，且是一个整数。
    const originalHeaderHeight = shortcutHeader.offsetHeight;
    const scrollTrigger = originalHeaderHeight / 2;
    let lastScrollTop = 0;
    let ticking = false;

    // 防抖函数
    function debounce(func, wait) {
      let timeout;
      return function () {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(context, args);
        }, wait);
      };
    }

    function handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (!ticking) {
        window.requestAnimationFrame(function () {
          if (scrollTop > scrollTrigger) {
            if (scrollTop > lastScrollTop) {
              // 向下滚动
              shortcutHeader.classList.add('fixed');
              document.querySelector('.shortcut').style.display = 'none';
              document.body.style.paddingTop = originalHeaderHeight + 'px';
            }
          } else {
            // 向上滚动到顶部区域
            document.querySelector('.shortcut').style.display = 'block';
            shortcutHeader.classList.remove('fixed');
            document.body.style.paddingTop = '0';
          }

          lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
          ticking = false;
        });

        ticking = true;
      }
    }

    // 使用防抖优化滚动事件
    const debouncedScroll = debounce(handleScroll, 10);
    window.addEventListener('scroll', debouncedScroll);

    // 初始化检查
    checkScrollPosition();

    function checkScrollPosition() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > scrollTrigger) {
        shortcutHeader.classList.add('fixed');
        document.body.style.paddingTop = originalHeaderHeight + 'px';
      }
    }
  });
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

  //=============头像==================
  document.addEventListener('DOMContentLoaded', function () {
    const avatarImg = document.getElementById('avatarImg');
    const uploadInput = document.getElementById('avatarUpload');
    // const changeBtn = document.getElementById('changeAvatarBtn');

    // 从 localStorage 加载已保存的头像
    const savedAvatar = localStorage.getItem(user);
    // console.log(JSON.parse(savedAvatar).image);
    if (JSON.parse(savedAvatar).image === '') {
      avatarImg.src = '../images/index/avatar-default.png';
    } else {
      avatarImg.src = JSON.parse(savedAvatar).image;
    }

    // 点击按钮触发文件选择
    avatarImg.addEventListener('click', () => {
      uploadInput.click();
    });

    // 文件选择后处理
    uploadInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (event) {
        const base64Image = event.target.result;

        // 更新头像
        avatarImg.src = base64Image;
        const userData = JSON.parse(savedAvatar);
        // savedAvatar.image=base64Image;
        userData.image = base64Image;
        // 保存到 localStorage
        localStorage.setItem(user, JSON.stringify(userData));

        // alert('头像更换成功！');
        element('../images/massages/primary.png', '恭喜您，成功更换头像!', '#1296db');
      };
      reader.readAsDataURL(file);
    });
  });
  let pro;
  //动态渲染first-item选项卡
  let index1 = 0;
  let catearr = ['商品选项卡图片', '../images/cate/cate-sgzw.png', '../images/cate/cate-qcrd.png'
    , '../images/cate/cate-lymm.png', '../images/cate/cate-ggkb.png'
    , '../images/cate/cate-shuic.png', '../images/cate/cate-mmhc.png'
  ];
  const category_bg = document.querySelector('.category-bg');
  products.forEach(product => {
    // console.log(product);
    if (pro == product.category) {
      return;
    } else {
      pro = fiswicth(product.category);
      index1 += 1;
    }
    const first = document.createElement('div');
    first.className = 'first-item';
    first.innerHTML = ` <img src="${catearr[index1]}" alt="" class="cate-icon">
                <a href="javascript:;" class="o-line">
                ${pro}
                </a>`;
    category_bg.appendChild(first);
    pro = product.category;
  })
  function fiswicth(n) {
    switch (n) {
      case 'freshfruits':
        return '新鲜水果';
      case 'meats':
        return '肉类禽蛋';
      case 'Grains':
        return '粮油米面';
      case 'seafoods':
        return '干货特产';
      case 'drys':
        return '水产海鲜';
      case 'natures':
        return '自然律动';
      default:
        break;
    }

  }
  let cate;
  const r_cate_bg = document.querySelector('.r-cate-bg');
  function cate_ctn(index) {
    // console.log(index);

    const categoryMap = ['freshfruits', 'meats', 'Grains', 'seafoods', 'drys', 'natures'];
    const cate = categoryMap[index];

    if (cate === undefined) {
      console.warn('Invalid index:', index);
      return;
    }

    // 清空容器
    r_cate_bg.innerHTML = '';

    // 创建外层容器
    const container = document.createElement('div');
    container.className = 'cate-ctn';

    // 只添加一次标题
    const titleHtml = `
    <div class="tab-item1">
      <p class="t2">${fiswicth(cate)}</p>
    </div>
  `;
    container.insertAdjacentHTML('beforeend', titleHtml);

    // 创建商品列表容器
    const listContainer = document.createElement('div');
    listContainer.className = 'c-list';
    container.appendChild(listContainer);

    let hasProducts = false;

    // 遍历商品，只往 .c-list 里添加商品项
    for (let i = 0; i < products.length; i++) {
      if (cate === products[i].category) {
        hasProducts = true;
        const a = document.createElement('a');
        a.href = './good.html?id=' + products[i].id;;
        a.className = 'c-l-items';
        a.textContent = products[i].name;
        listContainer.appendChild(a);
      }
    }

    // 把完整结构添加到页面
    if (hasProducts) {
      r_cate_bg.appendChild(container);
    } else {
      const placeholder = document.createElement('div');
      placeholder.textContent = '暂无该分类商品';
      r_cate_bg.appendChild(placeholder);
    }
  }
  //====================first-item选项卡(商品菜单栏)========================
  const first_item = document.querySelectorAll('.first-item');

  const m1 = document.querySelector('.m1');

  let hideTimer;

  first_item.forEach((item, index) => {
    item.addEventListener('mouseenter', function () {

      cate_ctn(index);
      clearTimeout(hideTimer);

      r_cate_bg.classList.add('r-cate-active');
    });

    item.addEventListener('mouseleave', function () {
      hideTimer = setTimeout(() => {
        r_cate_bg.classList.remove('r-cate-active');
      }, 150); // 延迟150ms隐藏
    });
  });

  // 关键：让 r_cate_bg 自己也监听 mouseenter/leave
  r_cate_bg.addEventListener('mouseenter', function () {
    clearTimeout(hideTimer); // 鼠标进入背景，阻止隐藏
  });

  r_cate_bg.addEventListener('mouseleave', function () {
    r_cate_bg.classList.remove('r-cate-active');
  });
  /*==============================秒杀  计时器+移动==================================*/


  // ====== DOM 元素缓存 ======
  const hour = document.querySelector('.hours');
  const minute = document.querySelector('.minutes');
  const second = document.querySelector('.seconds');
  const seckilwarp = document.querySelector('.seckilwarp');
  const pre = document.querySelector('.pre');
  const next = document.querySelector('.next');
  const timetitle = document.querySelectorAll('.timetitle');

  // ====== 商品渲染（只在时间段变化时调用）======
  let currentStartHour = null;

  function renderSeckills(start, end) {
    // console.log(start);
    // 只有当时间段变化时才重新渲染
    if (currentStartHour === start) return;
    currentStartHour = start;

    seckilwarp.innerHTML = ''; // 清空旧商品

    for (let i = 0; i < seckill.length; i++) {
      if (seckill[i].time > start && seckill[i].time <= end) {
        const itemCard = document.createElement('div');
        itemCard.className = 'item';
        itemCard.dataset.id = seckill[i].id;
        itemCard.innerHTML = `
        <div data-login-required>
          <div class="picTxt">
            <div class="pictrue">
              <img src="${seckill[i].image}">
            </div>
            <div class="name line1">${seckill[i].name}</div>
            <div class="money">
              <span class="font-color">¥${seckill[i].price.toFixed(2)}</span>
              <span class="y_money">${seckill[i].y_money.toFixed(2)}</span>
            </div>
          </div>
        </div>
      `;
        seckilwarp.appendChild(itemCard);
      }
    }

    // 渲染完成后，重新初始化滑动逻辑
    initSlider();
  }

  // ====== 时间判断 ======
  function getCurrentTimeSlot(now) {
    const timeArr = [0, 8, 10, 12, 14, 16, 18, 20, 22, 24];
    for (let i = 0; i < timeArr.length; i++) {
      if (now.getHours() < timeArr[i]) {
        const start = timeArr[i - 1];
        const end = timeArr[i];
        timetitle[0].innerHTML = start;
        timetitle[1].innerHTML = end + ':00';
        return { start, end };
      }
    }
  }

  // ====== 倒计时逻辑 ======
  function calculateSeckillCountdown() {
    const now = new Date();
    const { start, end } = getCurrentTimeSlot(now);

    // 只在时间段变化时渲染商品
    renderSeckills(start, end);

    // 正确构造 start 和 end 时间（不修改 now）
    const startTime = new Date(now);
    startTime.setHours(start, 0, 0, 0);

    const endTime = new Date(now);
    endTime.setHours(end, 0, 0, 0);

    let countdownTarget;
    let status;

    if (now < startTime) {
      // 秒杀未开始，倒计时到本轮开始
      countdownTarget = startTime;
      status = 'waiting';
    } else if (now >= startTime && now < endTime) {
      // 秒杀进行中，倒计时到本轮结束
      countdownTarget = endTime;
      status = 'active';
    } else {
      // 当前场次已结束，倒计时到下一轮开始（明天）
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(start, 0, 0, 0);
      countdownTarget = tomorrow;
      status = 'ended';
    }

    // 计算剩余时间
    const diff = countdownTarget - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // 更新 DOM
    hour.innerHTML = '';
    hour.innerHTML = String(hours).padStart(2, '0');
    minute.innerHTML = '';
    minute.innerHTML = String(minutes).padStart(2, '0');
    second.innerHTML = '';
    second.innerHTML = String(seconds).padStart(2, '0');

    // 可选：返回状态用于调试
    return { status, countdown: `${hours}:${minutes}:${seconds}`, milliseconds: diff };
  }

  // ====== 滑动逻辑（每次商品渲染后重新绑定）======
  let tabX = 0;
  let step = 0;
  let len = 0;

  function initSlider() {
    const tabitem = seckilwarp.querySelectorAll('.item'); //每次从当前 DOM 获取
    len = Math.max(0, (tabitem.length - 4) * 248);
    tabX = 0;
    step = 0;

    // 启用过渡动画
    tabitem.forEach(tab => {
      tab.style.transition = 'transform 0.3s ease';
    });

    // 更新按钮状态
    updateButtonState();

    // 绑定事件
    pre.onclick = () => {
      if (tabX >= len) return;
      tabX += 248;
      step++;
      updateTransform(tabitem);
      updateButtonState();
    };

    next.onclick = () => {
      if (tabX <= 0) return;
      tabX -= 248;
      step--;
      updateTransform(tabitem);
      updateButtonState();
    };
  }

  function updateTransform(tabitem) {
    tabitem.forEach(tab => {
      tab.style.transform = `translate3d(-${tabX}px, 0, 0)`;
    });
  }

  function updateButtonState() {
    const isAtEnd = tabX >= len;
    const isAtStart = tabX <= 0;
    const items = seckilwarp.querySelectorAll('.item');
    pre.style.cursor = isAtEnd ? 'not-allowed' : 'pointer';
    next.style.cursor = isAtStart ? 'not-allowed' : 'pointer';
    pre.style.opacity = isAtEnd ? 0.5 : 1;
    next.style.opacity = isAtStart ? 0.5 : 1;
  }

  // ====== 启动 ======
  document.addEventListener('DOMContentLoaded', () => {
    calculateSeckillCountdown(); // 首次执行
    setInterval(calculateSeckillCountdown, 1000); // 每秒更新倒计时
  });
  setInterval(() => {
    if (tabX === len) {
      pre.style.cursor = 'not-allowed';
      return;
    }
    if (step == 0) {
      step = 0;
      pre.style.cursor = 'pointer';
      tabX = 0;
    }
  }, 120);//时时监控
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
  //===================播放音乐================================
  function audio_open(src) {
    //创建audio对象
    var audio = new Audio(src);
    audio.play();//自动播放
  }
}
