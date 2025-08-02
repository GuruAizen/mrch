import Footer from "../dashboard/Footer";
import Header from "../dashboard/Header";
import Sidebar from "../dashboard/Sidebar";


export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[274px] bg-[#405189] hidden lg:block">
        <Sidebar />
      </aside>

      {/* Content Layout */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white shadow-md z-10">
          <Header />
        </header>

        {/* Scrollable Main */}
        <main className="flex-1 overflow-y-auto px-4 py-2 scroll-smooth custom-scroll">
          {children}
        </main>

        {/* Footer */}
        <footer className="h-10 bg-[#CACDCF]">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
