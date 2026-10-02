# Research & Spec: demo.itf-dut.xyz - Trang chủ (Trắc nghiệm online)

## Target Overview
- **Target URL:** `http://www.demo.itf-dut.xyz/`
- **Page Title:** `Trang chủ - Trắc nghiệm online`
- **Account Authenticated State:**
  - MSSV / Username: `123230119`
  - Họ tên: `Lê Võ Thành Nam`
  - Avatar placeholder / icon: Blue circular avatar with stylized student face.

## Layout Architecture & Grid
1. **Sidebar Navigation (Left)**
   - Width: ~230px
   - Background: Dark slate navy `#2A3F54`
   - Top Header / Brand:
     - Logo icon: Blue globe with orbiting rings
     - Title: "Trắc nghiệm online" (White, bold, ~18px)
   - Profile badge card:
     - Avatar circle with cyan border
     - Greeting: "Xin chào" (muted light gray)
     - Name: "Lê Võ Thành Nam" (white font, bold 14px)
   - Nav Menu:
     - "Trang chủ" (Active item: teal accent background `#1ABB9C` or left border with dark highlight, Home icon)
     - "Lớp học phần" (Sitemap / hierarchy icon)
     - "Bài kiểm tra" (Check-square icon + chevron-down accordion)
     - "Bài tập" (Edit / clipboard icon)

2. **Top Navigation Bar (Header)**
   - Height: ~55px
   - Background: `#EDEDED` or clean off-white `#F7F7F7` with subtle bottom border
   - Left side: Hamburger menu button (`☰` icon) to toggle sidebar collapse/expand
   - Right side:
     - Avatar pill badge: blue circular avatar + MSSV `123230119`
     - Dropdown options: Thông tin cá nhân, Đổi mật khẩu, Đăng xuất

3. **Main Content Area**
   - Background: `#F7F7F7`
   - Title breadcrumb: "Trang chủ" (gray `#73879C`, 24px)
   - Calendar Component:
     - Navigation toolbar:
       - Prev `<` / Next `>` navigation buttons
       - "Hôm nay" button
       - Centered Month display: "Tháng 10 2026"
       - View mode switcher right aligned: "Tháng" (Active), "Tuần", "Ngày", "Lịch biểu"
     - Monthly Calendar Grid:
       - Headers: T2, T3, T4, T5, T6, T7, CN
       - 7 columns, 5-6 rows
       - Current day highlight: Friday October 2, 2026 highlighted in soft cream/yellow `#FEFEE9` or active border
       - Grayed-out out-of-month dates (28, 29, 30 Sept; 1 Nov)
       - Hover and slot click handlers for adding events / seeing schedule
