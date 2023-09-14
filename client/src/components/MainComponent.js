import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Route, useLocation } from "react-router-dom";
import { Routes } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import ManufacturersScreen from "../screens/ManufacturersScreen";
import InfoScreen from "../screens/InfoScreen";
import EditScreen from "../screens/EditScreen";
import AddBeerScreen from "../screens/AddBeerScreen";
import UpdateBeerScreen from "../screens/UpdateBeerScreen";
import AddManufacturerScreen from "../screens/AddManufacturerScreen";
import UpdateManufacturerScreen from "../screens/UpdateManufacturerScreen";
import BeerDetailsScreen from "../screens/BeerDetailsScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";

import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContextProvider } from "../context/userContext";
import ErrorScreen from "../screens/ErrorScreen";
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;
const MainComponent = () => {
  const [user, setUser] = useState();
  const [auth, setAuth] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const navigate = useNavigate();
  let location = useLocation();
  const [cookies, removeCookie] = useCookies(null);
  const getUser = async () => {
    if (cookies.access_token) {
      try {
        const { data } = await axios.post(
          "/",
          {},
          {
            withCredentials: true,
          }
        );
        setUser(data);
        setIsAdmin(data.user.isAdmin);
        setAuth(true);
        if (data.status === false) {
          removeCookie("access_token");
          setAuth(false);
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setAuth(false);
      navigate("/login");
    }
  };
  useEffect(() => {
    getUser();
  }, [cookies, removeCookie, auth]);

  return (
    <UserContextProvider>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      {location.pathname === "/login" || location.pathname === "/" ? null : (
        <Header />
      )}
      <Routes>
        {auth ? (
          <>
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/manufacturers" element={<ManufacturersScreen />} />

            <Route path="/beerDetails/:id" element={<BeerDetailsScreen />} />
            <Route path="/info" element={<InfoScreen />} />
            <Route path="/" element={<RegisterScreen />} exact />
            <Route path="/login" element={<LoginScreen />} />
            {isAdmin && (
              <>
                <Route path="/edit" element={<EditScreen />} />
                <Route path="/addBeer" element={<AddBeerScreen />} />
                <Route
                  path="/addManufacturer"
                  element={<AddManufacturerScreen />}
                />
                <Route path="/updateBeer/:id" element={<UpdateBeerScreen />} />
                <Route
                  path="/updateManufacturer/:id"
                  element={<UpdateManufacturerScreen />}
                />
              </>
            )}
          </>
        ) : (
          <>
            <Route path="/" element={<RegisterScreen />} exact />
            <Route path="/login" element={<LoginScreen />} />
          </>
        )}
        <Route path="*" element={<ErrorScreen />} />
      </Routes>
      {location.pathname === "/login" || location.pathname === "/" ? null : (
        <Footer />
      )}
    </UserContextProvider>
  );
};

export default MainComponent;
