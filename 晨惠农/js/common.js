// 加载 header.html 并插入到容器中
    async function loadHeader(callback) {
      try {
        // 1. 请求独立的导航栏文件（路径根据实际位置调整）
        // 注意：路径是相对于当前页面的，比如 good.html 在 html 文件夹下，请求 ../html/header.html 不对，应该是 ./header.html
        const response = await fetch('../html/component/header.html'); 
        if (!response.ok) throw new Error('导航栏加载失败');

        // 2. 获取导航栏的 HTML 内容
        const headerHtml = await response.text();

        // 3. 找到容器并插入内容
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
          headerContainer.innerHTML = headerHtml;
        }

        // 4. （可选）导航栏加载后，执行其依赖的 JS 逻辑（如 hover 事件）
        // 如果你之前的 index.js 中有导航栏的事件绑定，可在这里调用
        callback(); 
      } catch (error) {
        console.error('加载导航栏出错：', error);
      }
    }

    export default loadHeader;
    // // 页面加载完成后执行加载
    // document.addEventListener('DOMContentLoaded', loadHeader);
