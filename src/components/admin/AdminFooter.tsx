
export const AdminFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto border-t p-4">
      <div className="container mx-auto flex justify-between items-center text-sm text-gray-600">
        <p>© {currentYear} Sellio Admin Portal</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-market-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-market-600 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-market-600 transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
};
