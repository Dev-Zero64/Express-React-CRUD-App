import StockTable from "../components/StockTable"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Stock(){
    return(
      <>
        <Navbar/>
        <StockTable/>
        <Footer/>
      </>    
    );
}