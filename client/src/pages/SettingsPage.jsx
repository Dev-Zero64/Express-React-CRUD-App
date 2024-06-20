import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Stock(){
    return(
      <>
        <Navbar/>
        <div className="content-center text-center mt-80">
          This is the settings page
        </div>
        <Footer/>
      </>    
    );
}