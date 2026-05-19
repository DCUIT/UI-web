# 📱 Kế hoạch triển khai Mobile UI Playground

Dưới đây là danh sách công việc (TODO list) được chia thành các giai đoạn để xây dựng một **Mobile Sandbox** mạnh mẽ dành cho React Native, Flutter, và Mobile UI Prototyping.

---

## 🚀 Giai đoạn 1: MVP (Minimum Viable Product) - Cốt lõi
*Mục tiêu: Đạt được tính năng test và preview cơ bản nhất của một Mobile Playground.*

- [x] **Kiến trúc thư mục:** Thiết lập cấu trúc cơ bản:
  - `mobile-playground/preview/`
  - `mobile-playground/editor/`
  - `mobile-playground/devices/`
  - `mobile-playground/runtime/`
  - `mobile-playground/registry/`
- [x] **Phone Frame Preview (Fake Mobile Device):** Tạo component vẽ khung viền thiết bị giả lập (sử dụng CSS).
- [ ] **Live Code Editor:** Tích hợp **Monaco Editor** với khả năng hiển thị code.
- [x] **Device Switcher:** Thêm Dropdown/Nút chọn thiết bị để giả lập kích thước thật:
  - `iPhone 15`
  - `Pixel`
  - `iPad`
- [x] **Responsive Scaling:** Tính năng thay đổi kích thước fake device (Small phone, Medium phone, Tablet).
- [x] **Theme Toggle:** Chuyển đổi Dark Mode / Light Mode cho preview frame.
- [x] **Orientation Toggle:** Chuyển đổi Portrait (Dọc) / Landscape (Ngang).
- [x] **Copy Code:** Nút sao chép nhanh mã nguồn hiện tại trong Editor.

---

## 🎨 Giai đoạn 2: Trải nghiệm & Giao diện (Layout & UI)
*Mục tiêu: Bố cục chuẩn chỉnh giống một Frontend Tooling Product chuyên nghiệp.*

- [ ] **Layout tổng thể:**
  - `Navbar` phía trên cùng (Header, Tools).
  - `Sidebar` (Bên trái) chứa danh sách Component Categories.
  - `Code Editor` (Bên dưới hoặc ở giữa).
  - `Phone Preview` (Bên phải).
- [ ] **Safe Area & Device Features Preview:**
  - Hiển thị Notch / Dynamic Island cho thiết bị iOS.
  - Hiển thị System Status Bar giả.
  - Hiển thị thanh Home Indicator (dưới cùng).
- [ ] **Editor Tabs:** Chia Monaco Editor thành các tab:
  - `[ Preview ]` (nếu xem độc lập)
  - `[ TSX / JSX ]`
  - `[ Styles ]`
  - `[ Usage ]`

---

## ⚡ Giai đoạn 3: Runtime & Testing Mở rộng
*Mục tiêu: Nâng cấp Playground từ HTML/CSS tĩnh sang hỗ trợ biên dịch Code (React/React Native Web).*

- [ ] **Runtime Integration:** Cài đặt và tích hợp **Sandpack** để biên dịch React / React Native Web trực tiếp trên trình duyệt.
- [ ] **Console/Error Box:** Component hiển thị log console và Warning/Error (VD: `Warning: SafeAreaView missing`).
- [ ] **Dependencies Box:** Hiển thị lệnh cài đặt package tương ứng với component đang xem (VD: `npm install react-native-reanimated`).
- [ ] **App State Simulator:** Tạo panel hoặc toggle để giả lập các trạng thái của màn hình:
  - `Loading`
  - `Empty`
  - `Success`
  - `Error`

---

## 📂 Giai đoạn 4: Danh mục Mobile Component
*Mục tiêu: Xây dựng hệ thống UI Library sẵn có cho người dùng kéo thả hoặc tham khảo.*

- [ ] **Components - UI:**
  - Buttons, Inputs, Cards, Bottom Sheets.
- [ ] **Components - Navigation:**
  - Tabs, Drawer, Stack Header.
- [ ] **Components - Screens (Full Layout):**
  - Login Screen, Dashboard, Chat Interface, E-commerce Product Page.

---

## 🌟 Giai đoạn 5: Advanced & Tương lai (Differentiators)
*Mục tiêu: Biến Playground thành một Developer Platform thực thụ.*

- [ ] **Expo Integration:** Tích hợp Expo runtime và hỗ trợ quét mã **QR Code** để preview trực tiếp trên điện thoại thật.
- [ ] **Gesture Testing / Simulator:** Hỗ trợ mô phỏng thao tác vuốt (swipe), kéo thả (drag), và bottom sheet mượt mà trên môi trường giả lập.
- [ ] **Mobile Navigation Testing:** Cấu hình để preview việc chuyển trang bằng Stack Navigation, Bottom Tabs thật.
- [ ] **Lưu & Chia sẻ:** 
  - Tính năng Save Drafts.
  - Tạo Link Share Playground (chia sẻ snippet cho người khác).
- [ ] **AI Mobile UI Generation:** Tích hợp AI để prompt tạo UI ngay trong Editor.

---

## 🎯 Next Steps (Cần làm ngay)
> Khởi tạo thư mục `mobile-playground`, sau đó tập trung làm **Giai đoạn 1: MVP** trước (Frame điện thoại, Monaco Editor cơ bản, và chuyển đổi Device/Orientation).
