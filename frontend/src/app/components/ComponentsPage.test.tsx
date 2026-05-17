import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ComponentsPage from './page';

// Mock framer-motion vì JSDOM không xử lý tốt các hiệu ứng animation
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock ComponentPreview để tránh render quá sâu vào logic preview phức tạp
jest.mock('@/components/discovery/ComponentPreview', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div data-testid="component-preview">{name}</div>,
}));

describe('ComponentsPage Integration - Search & Filter Logic', () => {
  test('nên hiển thị tất cả linh kiện mặc định khi mới load trang', () => {
    render(<ComponentsPage />);
    
    // Kiểm tra tiêu đề trang
    expect(screen.getByText(/Reusable UI Components/i)).toBeInTheDocument();
    
    // Kiểm tra xem có text hiển thị số lượng kết quả hay không
    const resultsCount = screen.getByText(/results available/i);
    expect(resultsCount).toBeInTheDocument();
    
    // "All" category nên được active mặc định (dựa trên class indigo)
    const allCategoryBtn = screen.getByRole('button', { name: /^All$/i });
    expect(allCategoryBtn).toHaveClass('bg-indigo-600');
  });

  test('nên lọc linh kiện chính xác khi nhập từ khóa tìm kiếm', () => {
    render(<ComponentsPage />);
    const searchInput = screen.getByPlaceholderText(/Search components/i);

    // Giả lập nhập "Button"
    fireEvent.change(searchInput, { target: { value: 'Button' } });

    // Kiểm tra kết quả hiển thị (Tên linh kiện nằm trong thẻ p)
    const componentName = screen.queryByText('Button', { selector: 'p' });
    expect(componentName).toBeInTheDocument();

    // Kiểm tra một linh kiện khác không khớp (ví dụ: Avatar) không nên xuất hiện trong danh sách kết quả
    // Lưu ý: data mẫu id:9 là Avatar
    expect(screen.queryByText('Avatar')).not.toBeInTheDocument();
  });

  test('nên lọc linh kiện chính xác khi chọn danh mục (Category)', () => {
    render(<ComponentsPage />);
    
    // Nhấn vào danh mục "Form"
    const formCategoryBtn = screen.getByRole('button', { name: /^Form$/ });
    fireEvent.click(formCategoryBtn);

    // Kiểm tra kết quả: "Input" thuộc category Form nên phải tồn tại
    expect(screen.getByText('Input')).toBeInTheDocument();
    
    // "Pricing Card" thuộc category Cards nên không được tồn tại khi đang lọc Form
    expect(screen.queryByText('Pricing Card')).not.toBeInTheDocument();
  });

  test('nên hiển thị thông báo "0 results" khi không tìm thấy kết quả khớp', () => {
    render(<ComponentsPage />);
    const searchInput = screen.getByPlaceholderText(/Search components/i);

    // Nhập một chuỗi ngẫu nhiên không có trong data
    fireEvent.change(searchInput, { target: { value: 'NonExistentXYZ' } });

    expect(screen.getByText(/0 results available/i)).toBeInTheDocument();
  });

  test('nên kết hợp đồng thời cả lọc Category và Search', () => {
    render(<ComponentsPage />);
    
    // 1. Chọn category "Navigation"
    fireEvent.click(screen.getByRole('button', { name: /^Navigation$/ }));
    
    // 2. Tìm kiếm "Tabs" (thuộc Navigation)
    const searchInput = screen.getByPlaceholderText(/Search components/i);
    fireEvent.change(searchInput, { target: { value: 'Tabs' } });
    expect(screen.getByText('Tabs')).toBeInTheDocument();

    // 3. Tìm kiếm "Button" (không thuộc Navigation) -> Không tìm thấy
    fireEvent.change(searchInput, { target: { value: 'Button' } });
    expect(screen.queryByText('Button')).not.toBeInTheDocument();
  });
});