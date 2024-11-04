function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.width = sidebar.style.width === '60px' ? '250px' : '60px';
    const menuItems = document.querySelectorAll('.menu a');
    menuItems.forEach(item => item.style.display = sidebar.style.width === '60px' ? 'none' : 'block');
}
