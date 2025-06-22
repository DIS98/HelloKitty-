// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const mainNav = document.getElementById('mainNav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });

    // 平滑滚动导航
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 关闭移动导航菜单
                if (mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                }
            }
        });
    });

    // 移动导航菜单
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('open');
    });

    // 音乐播放器
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const mobileMusicToggle = document.getElementById('mobileMusicToggle');
    
    // 初始状态：音乐暂停
    let isMusicPlaying = false;
    
    function toggleMusic() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            mobileMusicToggle.classList.remove('playing');
        } else {
            bgMusic.play();
            musicToggle.classList.add('playing');
            mobileMusicToggle.classList.add('playing');
        }
        isMusicPlaying = !isMusicPlaying;
    }
    
    musicToggle.addEventListener('click', toggleMusic);
    mobileMusicToggle.addEventListener('click', toggleMusic);

    // 时钟显示
    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        
        document.getElementById('clock').textContent = timeString;
        document.getElementById('mobileClock').textContent = timeString;
    }
    
    // 立即更新时钟
    updateClock();
    // 每秒更新一次
    setInterval(updateClock, 1000);

    // 定时播放音乐
    const musicAlert = document.getElementById('musicAlert');
    
    function checkMusicTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        
        // 设置18:00播放音乐
        if (hours === 18 && minutes === 0) {
            if (!isMusicPlaying) {
                toggleMusic();
                showNotification('音乐播放', '现在是18:00，播放Hello Kitty主题音乐');
            }
        }
        
        // 17:55显示提醒
        if (hours === 17 && minutes === 55) {
            musicAlert.classList.add('active');
            
            // 5分钟后自动隐藏提醒
            setTimeout(() => {
                musicAlert.classList.remove('active');
            }, 5 * 60 * 1000);
        }
    }
    
    // 每分钟检查一次
    setInterval(checkMusicTime, 60 * 1000);
    // 页面加载时立即检查一次
    checkMusicTime();

    // 作品过滤
    const workFilters = document.querySelectorAll('.work-filter');
    const workItems = document.querySelectorAll('.work-item');
    
    workFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // 移除所有过滤器的活动状态
            workFilters.forEach(f => f.classList.remove('active', 'bg-primary', 'text-white'));
            workFilters.forEach(f => f.classList.add('bg-white', 'text-primary', 'border', 'border-primary', 'hover:bg-primary/5'));
            
            // 添加当前过滤器的活动状态
            this.classList.add('active', 'bg-primary', 'text-white');
            this.classList.remove('bg-white', 'text-primary', 'border', 'border-primary', 'hover:bg-primary/5');
            
            const filterValue = this.getAttribute('data-filter');
            
            workItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // 商品过滤
    const shopFilters = document.querySelectorAll('.shop-filter');
    const shopItems = document.querySelectorAll('.shop-item');
    
    shopFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // 移除所有过滤器的活动状态
            shopFilters.forEach(f => f.classList.remove('active', 'bg-primary', 'text-white'));
            shopFilters.forEach(f => f.classList.add('bg-white', 'text-primary', 'border', 'border-primary', 'hover:bg-primary/5'));
            
            // 添加当前过滤器的活动状态
            this.classList.add('active', 'bg-primary', 'text-white');
            this.classList.remove('bg-white', 'text-primary', 'border', 'border-primary', 'hover:bg-primary/5');
            
            const filterValue = this.getAttribute('data-filter');
            
            shopItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // 购物车功能
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.getElementById('closeCart');
    const cartItems = document.getElementById('cartItems');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    let cart = [];
    
    function openCart() {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('open');
    }
    
    function closeCartSidebar() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('open');
    }
    
    closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);
    
    function updateCart() {
        // 清空购物车显示
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="text-center text-dark/50 py-10">
                    <i class="fa fa-shopping-cart text-4xl mb-4"></i>
                    <p>购物车是空的</p>
                </div>
            `;
            cartSubtotal.textContent = '¥0.00';
            cartTotal.textContent = '¥10.00';
            return;
        }
        
        let subtotal = 0;
        
        // 添加商品到购物车
        cart.forEach((item, index) => {
            subtotal += item.price;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'flex items-center p-3 border-b border-gray-100';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg mr-4">
                <div class="flex-1">
                    <h4 class="font-medium text-dark">${item.name}</h4>
                    <div class="flex justify-between items-center mt-1">
                        <span class="text-primary font-bold">¥${item.price.toFixed(2)}</span>
                        <div class="flex items-center">
                            <button class="cart-quantity-btn minus p-1 text-dark/50 hover:text-dark" data-index="${index}">
                                <i class="fa fa-minus"></i>
                            </button>
                            <span class="mx-2">${item.quantity}</span>
                            <button class="cart-quantity-btn plus p-1 text-dark/50 hover:text-dark" data-index="${index}">
                                <i class="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <button class="remove-from-cart p-2 text-dark/50 hover:text-red-500" data-index="${index}">
                    <i class="fa fa-trash"></i>
                </button>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        // 更新总价
        const shipping = 10; // 运费
        const total = subtotal + shipping;
        
        cartSubtotal.textContent = `¥${subtotal.toFixed(2)}`;
        cartTotal.textContent = `¥${total.toFixed(2)}`;
        
        // 添加事件监听器
        document.querySelectorAll('.remove-from-cart').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeFromCart(index);
            });
        });
        
        document.querySelectorAll('.cart-quantity-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const isPlus = this.classList.contains('plus');
                
                if (isPlus) {
                    increaseQuantity(index);
                } else {
                    decreaseQuantity(index);
                }
            });
        });
    }
    
    function addToCart(name, price, image) {
        // 检查商品是否已在购物车中
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }
        
        updateCart();
        showNotification('添加成功', `${name} 已添加到购物车`);
    }
    
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
        showNotification('移除成功', '商品已从购物车中移除');
    }
    
    function increaseQuantity(index) {
        cart[index].quantity += 1;
        updateCart();
    }
    
    function decreaseQuantity(index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            removeFromCart(index);
        }
        updateCart();
    }
    
    // 添加到购物车按钮事件
    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.shop-item');
            const name = productCard.querySelector('h3').textContent;
            const priceText = productCard.querySelector('.font-bold.text-primary').textContent;
            const price = parseFloat(priceText.replace('¥', ''));
            const image = productCard.querySelector('img').src;
            
            addToCart(name, price, image);
            
            // 添加成功动画
            this.classList.add('success');
            setTimeout(() => {
                this.classList.remove('success');
            }, 500);
            
            // 打开购物车
            openCart();
        });
    });

    // 通知弹窗
    const notification = document.getElementById('notification');
    const notificationTitle = document.getElementById('notificationTitle');
    const notificationMessage = document.getElementById('notificationMessage');
    const notificationIcon = document.getElementById('notificationIcon');
    const closeNotification = document.getElementById('closeNotification');
    
    function showNotification(title, message, type = 'success') {
        notificationTitle.textContent = title;
        notificationMessage.textContent = message;
        
        // 设置图标
        if (type === 'success') {
            notificationIcon.className = 'fa fa-check text-primary';
        } else if (type === 'error') {
            notificationIcon.className = 'fa fa-times text-red-500';
        } else if (type === 'warning') {
            notificationIcon.className = 'fa fa-exclamation text-yellow-500';
        } else if (type === 'info') {
            notificationIcon.className = 'fa fa-info text-blue-500';
        }
        
        // 显示通知
        notification.classList.add('active');
        
        // 5秒后自动隐藏
        setTimeout(() => {
            notification.classList.remove('active');
        }, 5000);
    }
    
    closeNotification.addEventListener('click', function() {
        notification.classList.remove('active');
    });

    // 联系表单提交
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // 简单验证
        if (!name || !email || !subject || !message) {
            showNotification('表单错误', '请填写所有字段', 'error');
            return;
        }
        
        // 显示加载状态
        contactForm.classList.add('loading');
        
        // 模拟提交
        setTimeout(() => {
            // 重置表单
            contactForm.reset();
            contactForm.classList.remove('loading');
            
            // 显示成功消息
            showNotification('提交成功', '感谢您的留言，我们会尽快回复您');
        }, 1500);
    });

    // 返回顶部按钮
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 作品统计图表
    const ctx = document.getElementById('worksChart').getContext('2d');
    const worksChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['电视动画', '电影', '游戏', '漫画', '其他'],
            datasets: [{
                label: '作品数量',
                data: [45, 12, 30, 25, 18],
                backgroundColor: [
                    'rgba(255, 105, 180, 0.7)',
                    'rgba(255, 182, 193, 0.7)',
                    'rgba(255, 192, 203, 0.7)',
                    'rgba(255, 228, 225, 0.7)',
                    'rgba(255, 240, 245, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 105, 180, 1)',
                    'rgba(255, 182, 193, 1)',
                    'rgba(255, 192, 203, 1)',
                    'rgba(255, 228, 225, 1)',
                    'rgba(255, 240, 245, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // 页面加载动画
    document.body.classList.add('loaded');
});
