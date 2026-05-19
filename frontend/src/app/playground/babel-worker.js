// Babel Worker - Xử lý biên dịch ở luồng phụ
self.importScripts('https://unpkg.com/@babel/standalone/babel.min.js');

self.onmessage = (e) => {
  const { tsxCode } = e.data;
  
  try {
    // @ts-ignore - Babel được nạp từ importScripts
    const result = self.Babel.transform(tsxCode, {
      presets: ['react', 'typescript'],
      filename: 'playground.tsx',
    });

    self.postMessage({ code: result.code });
  } catch (err) {
    // Trả về lỗi biên dịch để hiển thị trên Console panel
    self.postMessage({ error: err.message });
  }
};