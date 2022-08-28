import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className='container mx-auto px-10'>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
