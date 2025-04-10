// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const themeSwitch = document.querySelector('.theme-switch');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const skillItems = document.querySelectorAll('.skill-item');
    const sections = document.querySelectorAll('section');
    
    // 主题切换功能
    themeSwitch.addEventListener('click', function() {
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? '' : 'dark';
        
        // 更新图标
        const icon = this.querySelector('i');
        if (document.body.dataset.theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        
        // 保存主题偏好到本地存储
        localStorage.setItem('theme', document.body.dataset.theme || 'light');
    });
    
    // 检查本地存储中的主题偏好
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.dataset.theme = savedTheme === 'light' ? '' : savedTheme;
        
        // 更新图标
        const icon = themeSwitch.querySelector('i');
        if (savedTheme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
    
    // 移动端菜单切换
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // 关闭移动端菜单（当点击链接时）
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // 项目过滤功能
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有按钮的active类
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // 添加当前按钮的active类
            this.classList.add('active');
            
            // 获取过滤类别
            const filterValue = this.getAttribute('data-filter');
            
            // 过滤项目卡片
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // 滚动到顶部按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
        
        // 导航栏高亮当前部分
        highlightNavOnScroll();
        
        // 技能进度条动画
        animateSkillsOnScroll();
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 平滑滚动到锚点
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // 导航栏高亮当前部分
    function highlightNavOnScroll() {
        let scrollPosition = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    // 技能进度条动画
    function animateSkillsOnScroll() {
        skillItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                const progressBar = item.querySelector('.skill-progress');
                progressBar.style.width = progressBar.style.width || '0%';
            }
        });
    }
    
    // 初始化导航高亮
    highlightNavOnScroll();
    
    // 表单提交处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // 这里可以添加表单验证和AJAX提交
            console.log('表单提交:', formValues);
            
            // 显示提交成功消息（实际项目中应该使用AJAX并处理响应）
            alert('消息已发送！我会尽快回复您。');
            
            // 重置表单
            this.reset();
        });
    }
    
    // 添加图片加载错误处理
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // 设置默认图片
            this.src = 'https://via.placeholder.com/300';
            this.alt = '图片加载失败';
        });
    });
    
    // 添加项目卡片悬停效果
    const projectInfos = document.querySelectorAll('.project-info');
    projectInfos.forEach(info => {
        info.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        info.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});