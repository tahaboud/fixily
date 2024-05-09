import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import ClientLoginComponent from "../components/Login/ClientLogin";

const ClientLogin = () => {
  return (
    <>
      <Navbar />
      <ClientLoginComponent />
      <Footer />
    </>
  );
};

export default ClientLogin;
