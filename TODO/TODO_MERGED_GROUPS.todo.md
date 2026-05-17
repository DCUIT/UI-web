# Master UI Platform - Consolidated Roadmap

## 1. Core UI & Data Display (Atoms & Molecules)
*Tập trung vào các thành phần đơn lẻ và cách hiển thị dữ liệu.*
- [x] **Buttons**
- [x] **Inputs**
- [x] **Cards**
- [x] **Modals**
- [x] **Hero**
- [x] **Pricing**
- [x] **Footer**
- [x] **Dashboard UI**
- [x] **Ecommerce UI**
- [x] **Skeleton**
- [x] **Progress Bar**
- [x] **Drawer**
- [x] **Alert Dialog**
- [x] **Confirm Dialog**

- [x] **Primitives & States:** Hoàn thiện Modal, Progress Bar và hệ thống trạng thái (Empty/Error/Loading).
- [x] **Card System:** Chuẩn hóa các biến thể Card (Product, User, Blog, Analytics) với slot metadata.
- [x] **Data & Overlays:** Xây dựng Table (sort/search/pagination) và các thành phần Overlay (Drawer, Alert Dialog).
- [x] **Forms:** Xây dựng bộ UI cho Form (Login, Register, Multi-step, Checkout).


## 2. Shell & Navigation (The Framework)
*Tập trung vào khung sườn ứng dụng và trải nghiệm điều hướng.*
- [x] **Global Navigation:** Chuẩn hóa Navbar, Sidebar, Mega Menu và Command Menu (Ctrl+K).
- [x] **Mobile Experience:** Tối ưu Bottom Navbar và các biến thể Mobile UI/Cards.
- [x] **Theme & Accessibility:** Hoàn thiện Dark Mode, Keyboard support và Layout tổng thể.

## 3. Page Templates & Verticals (Organisms)
*Tập trung vào việc lắp ghép các thành phần thành các trang hoàn chỉnh.*
- [x] **Marketing Sections:** Hero, Features, Pricing, Testimonials, FAQ, Footer.
- [x] **Industry Templates:** Xây dựng Dashboard UI, Ecommerce, Portfolio và Auth pages.
- [x] **Product Polish:** Tinh chỉnh Typography, Spacing, SEO và Favicon cho các trang mẫu.

## 4. Platform Discovery UX (The Product Site)
*Tập trung vào trải nghiệm của người dùng khi duyệt và copy component.*
- [x] **Component Preview:** Xây dựng trang `/components`, tab preview code và tính năng copy-to-clipboard.
- [x] **Search & Search UX:** Hệ thống Search/Filter linh hoạt kết hợp với Framer Motion và hiệu ứng hover.

## 5. Ops & Infrastructure
*Các công việc hậu cần và triển khai.*
- [x] **Project Setup:** Cấu trúc folder, GitHub setup và quy trình Deploy.
- [x] **Final Review:** Hoàn thiện Documentation (README) và kiểm tra tổng thể.

## 6. Real Product Experience (The Premium Upgrade)
*Nâng cấp từ một bộ sưu tập UI thành một sản phẩm Frontend thực thụ.*

### 6.1 Component Preview Experience (Priority 1)
- [x] **Live Preview Frame:** Xây dựng container bao ngoài component hỗ trợ resize.
- [x] **Responsive Toggle:** Thêm các nút chuyển đổi Desktop/Mobile/Tablet preview.
- [x] **Theme Switcher:** Cho phép đổi theme (Light/Dark) riêng biệt cho vùng preview.
- [x] **Zoom Control:** Tính năng phóng to/thu nhỏ vùng xem trước UI.

### 6.2 Advanced Search UX (Priority 2)
- [x] **Fuzzy Search:** Cải thiện thuật toán tìm kiếm (gần đúng) trong Command Menu.
- [x] **Search History:** Lưu và hiển thị các tìm kiếm gần đây.
- [x] **Keyboard Nav:** Tối ưu hóa việc dùng phím mũi tên để chọn kết quả search.
- [x] **Highlighted Results:** Làm nổi bật từ khóa trong danh sách kết quả.

### 6.3 Developer-Focused Sidebar (Priority 3)
- [x] **Collapsible Groups:** Cho phép đóng/mở các nhóm category (UI, Sections, App UI).
- [x] **Practical Grouping:** Phân loại lại theo thực tế (Feedback, Marketing, App UI).
- [x] **Compact Mode:** Tối ưu spacing để hiển thị được nhiều mục hơn trên sidebar.

### 6.4 Advanced Code Viewer (Priority 4)
- [x] **Multi-file Tabs:** Hiển thị code theo file (usage.tsx, component.tsx, styles.css).
- [x] **Syntax Highlighting:** Tích hợp cấu trúc hỗ trợ Shiki/Prism để code hiển thị chuyên nghiệp hơn.
- [x] **Expand/Collapse:** Tính năng thu gọn các khối mã nguồn dài.

### 6.5 Mobile UX & Accessibility (Priority 5)
- [x] **Mobile Drawer:** Xây dựng sidebar dạng drawer chuyên dụng cho điện thoại.
- [x] **Horizontal Tabs:** Thay thế các menu dọc bằng tab ngang khi xem trên mobile.
- [x] **Sticky Header:** Cố định navbar mobile khi cuộn trang.

### 6.6 Visual & Metadata System
- [x] **Metadata Schema:** Thêm thông tin `difficulty`, `tags`, `responsive-support` cho data.
- [x] Typography Upgrade: Áp dụng `tracking-tight` cho heading và `text-muted-foreground` cho mô tả.
- [x] Visual Hierarchy: Card đang chọn sẽ có hiệu ứng `glow` hoặc `accent border`.
- [x] Animation Polish: Thêm hiệu ứng `hover lift` và `smooth layout transitions` (Framer Motion).

### 6.7 Bonus Features
- [x] **Open in Playground:** Tích hợp nút mở nhanh trên CodeSandbox hoặc StackBlitz.
- [ ] **Curated Collections:** Tạo các bộ Landing Page Kit, Dashboard Kit sẵn sàng sử dụng.
