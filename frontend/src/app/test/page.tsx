import Link from 'next/link'

export default function TestIndexPage() {
  return (
    <div className="space-y-8 pb-20">
      <div className="rounded-3xl border border-slate-200 bg-white p-12 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none text-center">
        <h1 className="text-4xl font-bold text-slate-950 dark:text-white mb-6">Chọn công cụ Test UI</h1>
        <p className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 mb-10">
          Vui lòng chọn môi trường bạn muốn kiểm tra giao diện người dùng. Chúng tôi cung cấp công cụ giả lập riêng biệt cho cả Desktop và Mobile.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/test/mobile" className="flex flex-col items-center p-8 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all dark:border-slate-800 dark:hover:border-indigo-500 dark:hover:bg-indigo-900/20 group w-full sm:w-64">
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📱</div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Mobile Test</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Giả lập điện thoại</p>
          </Link>
          
          <Link href="/test/web" className="flex flex-col items-center p-8 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all dark:border-slate-800 dark:hover:border-indigo-500 dark:hover:bg-indigo-900/20 group w-full sm:w-64">
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">💻</div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Web Test</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Giao diện máy tính</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
