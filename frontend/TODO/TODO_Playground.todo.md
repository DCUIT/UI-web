# Playground / Sandbox Page TODO

Mục tiêu: biến trang component gallery thành **real frontend developer tool** (giống CodeSandbox/StackBlitz/shadcn/ui Playground), với flow:

1) Chọn UI
2) Paste/Chỉnh code
3) Render thử (live preview)
4) Edit nhanh
5) Copy sang project thật

---

## MVP (bắt buộc triển khai trước)

- [ ] Live Preview (QUAN TRỌNG NHẤT)
  - [ ] Khung preview tách biệt, tự động cập nhật theo code
  - [ ] Hiển thị loading/error trạng thái rõ ràng

- [ ] Code Editor (Monaco)
  - [ ] Tabs system: **[ Preview ] [ TSX ] [ CSS ] [ Usage ]**
  - [ ] Syntax highlight, line numbers
  - [ ] Auto complete (mức cơ bản)

- [ ] TSX editor + re-render
  - [ ] Bảo toàn template code mặc định
  - [ ] Khi user chỉnh TSX => cập nhật preview

- [ ] Theme switch
  - [ ] Dark mode / Light mode
  - [ ] Preview sync với theme hiện tại (dùng `next-themes` / ThemeToggle)

- [ ] Responsive / Device Preview Frame
  - [ ] Desktop preview
  - [ ] Mobile preview (chỉ khung frame, hỗ trợ orientation)
  - [ ] Orientation toggle: Portrait / Landscape

- [ ] Copy system
  - [ ] Copy TSX
  - [ ] Copy CSS
  - [ ] Copy full component (TSX + CSS + props usage)

- [ ] Console / Error viewer
  - [ ] Bắt lỗi runtime và hiển thị trong panel (ví dụ: prop thiếu, import sai)

---

## MVP “runtime sandbox” (phần quyết định)

- [ ] Xác định/triển khai sandbox runtime
  - [ ] Sandpack-based runtime (ưu tiên) **hoặc** fallback: render an toàn trong iframe với bundling
  - [ ] Chặn/whitelist imports (whitelist những gì project cho phép)
  - [ ] Cơ chế truyền code vào sandbox runtime
  - [ ] Bắt console logs + errors từ sandbox runtime và đẩy lên error viewer

---

## Next (tính năng mạnh hơn)

- [ ] Component controls (testing props)
  - [ ] Metadata panel: Category, Responsive, Dark Mode, Dependencies
  - [ ] Control cho common props (button size/state/variant...)

- [ ] Dependencies box
  - [ ] Hiển thị lệnh `npm install ...` tương ứng dependencies (dựa registry/component metadata)

- [ ] Tabs system nâng cấp
  - [ ] Usage tab: hiển thị ví dụ import + JSX usage

- [ ] Search components
  - [ ] Search theo tên component
  - [ ] Search theo category

---

## Advanced

- [ ] Real-time editing (debounce + tối ưu rerender)
- [ ] Save drafts (lưu vào localStorage)
- [ ] Share playground (export JSON + share link)
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

