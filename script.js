// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 ZK 的欢迎页面已加载');
    
    // 初始化导航栏活动状态
    initNavigation();
    
    // 初始化表单提交
    initContactForm();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 显示部署信息
    showDeploymentInfo();
});

// 初始化导航栏
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav a');
    const sections = document.querySelectorAll('section');
    
    // 点击导航链接
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有活动状态
            navLinks.forEach(l => l.classList.remove('active'));
            
            // 添加当前活动状态
            this.classList.add('active');
            
            // 滚动到对应区域
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 滚动时更新导航状态
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// 初始化联系表单
function initContactForm() {
    const form = document.getElementById('messageForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(form);
        const name = formData.get('name') || form.querySelector('input[type="text"]').value;
        const email = formData.get('email') || form.querySelector('input[type="email"]').value;
        const message = formData.get('message') || form.querySelector('textarea').value;
        
        // 简单的表单验证
        if (!name || !email || !message) {
            showNotification('请填写所有必填字段', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('请输入有效的邮箱地址', 'error');
            return;
        }
        
        // 模拟表单提交（实际部署时替换为真实API）
        showNotification('消息发送中...', 'info');
        
        setTimeout(() => {
            // 清空表单
            form.reset();
            
            // 显示成功消息
            showNotification('消息发送成功！我会尽快回复你。', 'success');
            
            // 这里可以添加实际的表单提交逻辑
            console.log('📧 表单提交:', { name, email, message });
            
            // 实际部署时，可以调用 Cloudflare Workers 或第三方服务
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ name, email, message })
            // });
        }, 1500);
    });
}

// 邮箱验证
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 显示通知
function showNotification(message, type = 'info') {
    // 移除现有的通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    // 添加动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            font-size: 1rem;
        }
    `;
    document.head.appendChild(style);
    
    // 关闭按钮事件
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // 自动消失
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// 获取通知图标
function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// 获取通知颜色
function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#10b981';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#3b82f6';
    }
}

// 初始化滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    document.querySelectorAll('.about-card, .project-card, .contact-item').forEach(el => {
        observer.observe(el);
    });
    
    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .about-card,
        .project-card,
        .contact-item {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
}

// 显示部署信息
function showDeploymentInfo() {
    const deploymentInfo = {
        platform: 'Cloudflare Pages',
        deployedAt: new Date().toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        features: ['全球CDN', '自动HTTPS', '边缘计算', '完全免费']
    };
    
    console.log('🚀 部署信息:', deploymentInfo);
    
    // 在控制台显示欢迎信息
    console.log(`
    ╔══════════════════════════════════════════════════════════╗
    ║                                                          ║
    ║   🎉 欢迎访问 ZK 的个人空间！                            ║
    ║                                                          ║
    ║   📍 部署平台: ${deploymentInfo.platform}                ║
    ║   🕐 部署时间: ${deploymentInfo.deployedAt}              ║
    ║   ✨ 特色功能: ${deploymentInfo.features.join(' · ')}    ║
    ║                                                          ║
    ╚══════════════════════════════════════════════════════════╝
    `);
}

// 添加一些交互效果
document.addEventListener('DOMContentLoaded', function() {
    // 代码窗口的语法高亮效果
    const codeElement = document.querySelector('.window-content code');
    if (codeElement) {
        const code = codeElement.textContent;
        const highlighted = code
            .replace(/console\.log/g, '<span class="function">console.log</span>')
            .replace(/(".*?")/g, '<span class="string">$1</span>')
            .replace(/(\d{4}-\d{2}-\d{2})/g, '<span class="string">$1</span>')
            .replace(/(HTML5|CSS3|JavaScript)/g, '<span class="keyword">$1</span>');
        codeElement.innerHTML = highlighted;
    }
    
    // 添加鼠标跟随效果
    document.addEventListener('mousemove', function(e) {
        const cards = document.querySelectorAll('.about-card, .project-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
    
    // 鼠标离开时重置
    document.addEventListener('mouseleave', function() {
        const cards = document.querySelectorAll('.about-card, .project-card');
        cards.forEach(card => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});