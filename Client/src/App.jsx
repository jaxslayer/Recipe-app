import Card from "./components/Card/Card";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <div className="">
      <Header />
      <Card
        url={
          "http://res.cloudinary.com/dlzt4vhb4/image/upload/v1722399456/oqz8br78vavtj9neq5az.webp"
        }
        title={"pizza"}
        rate={4}
      />
      <Footer />
    </div>
  );
};

export default App;
