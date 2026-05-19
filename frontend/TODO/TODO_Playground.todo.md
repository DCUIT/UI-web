# Playground / Sandbox Page TODO

Mục tiêu: biến trang component gallery thành **real frontend developer tool** (giống CodeSandbox/StackBlitz/shadcn/ui Playground), với flow:

1) Chọn UI
2) Paste/Chỉnh code
3) Render thử (live preview)
4) Edit nhanh
5) Copy sang project thật

---

## MVP (Đang triển khai 🚀)

- [x] Live Preview (QUAN TRỌNG NHẤT)
  - [x] Khung preview tách biệt, tự động cập nhật theo code (iframe srcDoc)
  - [x] Hiển thị loading/error trạng thái rõ ràng (Babel compiler error catch)

- [x] Code Editor (Monaco)
  - [x] Tabs system: **[ Preview ] [ TSX ] [ CSS ] [ Usage ]**
  - [x] Syntax highlight, line numbers
  - [x] Auto complete (mức cơ bản qua Monaco core)

- [x] TSX editor + re-render
  - [x] Bảo toàn template code mặc định
  - [x] Khi user chỉnh TSX => cập nhật preview (Debounced 800ms)

- [x] Theme switch
  - [x] Dark mode / Light mode
  - [x] Preview sync với theme hiện tại (dùng `next-themes` / ThemeToggle)

- [x] Responsive / Device Preview Frame
  - [x] Desktop preview
  - [x] Mobile preview (chỉ khung frame, hỗ trợ orientation)
  - [x] Orientation toggle: Portrait / Landscape

- [x] Copy system
  - [x] Copy TSX
  - [x] Copy CSS
  - [x] Copy full component (TSX + CSS + props usage)

- [x] Console / Error viewer
  - [x] Bắt lỗi runtime và hiển thị trong panel (ví dụ: prop thiếu, import sai)

---

## MVP “runtime sandbox” (Hoàn thành ✅)

- [x] Xác định/triển khai sandbox runtime
  - [x] Iframe-based runtime với Babel Standalone (An toàn, không cần server-side bundling)
  - [x] Chặn/whitelist imports (Hiện tại hỗ trợ React & Tailwind từ CDN)
  - [x] Cơ chế truyền code vào sandbox runtime (via srcDoc)
  - [x] Bắt console logs + errors từ sandbox runtime và đẩy lên error viewer (via postMessage)

---

## Next (Hoàn thành ✅)

- [x] Component controls (testing props)
  - [x] Metadata panel: Category, Responsive, Dark Mode, Dependencies
  - [x] Control cho common props (text, boolean, color knobs)
  - [x] Reset controls functionality

- [x] Dependencies box
  - [x] Hiển thị lệnh `npm install ...` tương ứng dependencies (dựa registry/component metadata)

- [x] Tabs system nâng cấp
  - [x] Usage tab: hiển thị ví dụ import + JSX usage (Dynamic based on controls)

- [x] Search components
  - [x] Search theo tên component
  - [x] Search theo category

---

## Advanced

- [ ] Real-time editing (debounce + tối ưu rerender)
- [ ] Save drafts (lưu vào localStorage)
- [x] Share playground (export JSON + share link via URL params)
- [ ] Export component (tải xuống file)
- [ ] AI prompt (future): tạo code theo prompt

---

## Kiến trúc đề xuất (task hóa)

- [ ] `playground/`
  - [ ] `editor/` (Monaco + tabs + state quản lý TSX/CSS)
  - [ ] `preview/` (Live preview container + error/console viewer)
  - [ ] `runtime/` (Sandpack/iframe sandbox)
  - [ ] `registry/` (metadata component/templates + dependencies)
  - [ ] `controls/` (component controls + props binding)

---

## Acceptance checklist

- [ ] Chọn 1 component => code hiển thị sẵn trong editor
- [ ] Chỉnh TSX/CSS => preview cập nhật
- [ ] Bật tắt Dark/Light => preview đổi đúng theme
- [ ] Đổi Desktop/Mobile + Portrait/Landscape => frame đúng kích thước
- [ ] Copy TSX/CSS/full component hoạt động chính xác
- [ ] Lỗi runtime hiển thị trong console/error panel (không làm crash app)

---

## Dev checklist (sau khi code)

- [ ] `frontend` chạy được build
- [ ] `npm run lint` không lỗi
- [ ] Smoke test: mở trang playground, sửa code, copy thành công
