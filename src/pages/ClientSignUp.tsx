import ClientSignupComponent from "../components/Signup/ClientSignUp";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

const ClientSignUp = () => {
  return (
    <>
      <Navbar />
      <ClientSignupComponent />
      <Footer />
    </>
  );
};

export default ClientSignUp;
