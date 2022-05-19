import { createContext, useState, useEffect } from "react";

import { fs } from "../Config/Config";
import { auth } from "../Config/Config";
import { useStateValue } from "../StateProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [{}, dispatch] = useStateValue();
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState();
  const [success, setSuccess] = useState(false);
  const [flag, setFlag] = useState(false);
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [converseProducts, setConverseProducts] = useState([]);
  const [vanProducts, setVans] = useState([]);
  const [vansArrivals, setVansArrivals] = useState([]);
  const [converseArrivals, setConverseArrivals] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [value, setValue] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState();

  const [productsPerPage] = useState(9);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentPosts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const filterOptions = [
    {
      value: "None",
      label: "None",
    },
    {
      value: "Under 100$",
      label: "Under 100$",
    },
    {
      value: "From 100$ to 200$",
      label: "From 100$ to 200$",
    },
    {
      value: "Above 200$",
      label: "Above 200$",
    },
    {
      value: "Highest To Lowest",
      label: "Highest To Lowest",
    },
    {
      value: "Lowest To Highest",
      label: "Lowest To Highest",
    },
  ];
  const sizeOptions = [
    {
      value: "SIZE 4.0US – SIZE 36.0VN – 22.0CM",
      label: "SIZE 4.0US – SIZE 36.0VN – 22.0CM",
    },
    {
      value: "SIZE 5.0US – SIZE 37.5VN – 23CM",
      label: "SIZE 5.0US – SIZE 37.5VN – 23CM",
    },
    {
      value: "SIZE 6.0US – SIZE 38.5VN – 24.0CM",
      label: "SIZE 6.0US – SIZE 38.5VN – 24.0CM",
    },
    {
      value: "SIZE 7.0US – SIZE 40.0VN – 25.0CM",
      label: "SIZE 7.0US – SIZE 40.0VN – 25.0CM",
    },
    {
      value: "SIZE 7.5US – SIZE 40.5VN – 25.5CM",
      label: "SIZE 7.5US – SIZE 40.5VN – 25.5CM",
    },
    {
      value: "SIZE 8.0US – SIZE 41.0VN – 26.0CM",
      label: "SIZE 8.0US – SIZE 41.0VN – 26.0CM",
    },
    {
      value: "SIZE 8.5US – SIZE 42.0VN – 26.5CM",
      label: "SIZE 8.5US – SIZE 42.0VN – 26.5CM",
    },
    {
      value: "SIZE 9.0US – SIZE 42.5VN – 27.0CM",
      label: "SIZE 9.0US – SIZE 42.5VN – 27.0CM",
    },
  ];
  toast.configure();
  const navigate = useNavigate();
  const getProducts = async () => {
    const products = await fs.collection("Products").get();
    const productsArray = [];
    for (let snap of products.docs) {
      let data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data,
      });
      if (productsArray.length === products.docs.length) {
        setProducts(productsArray);
      }
    }
  };
  const handleDeleteProduct = async (product) => {
    await fs
      .collection("Products")
      .doc(product.id)
      .delete()
      .then(() => {
        alert(product.id);
      });
  };
  const getFeaturedProducts = async () => {
    const products = await fs
      .collection("Products")
      .where("featured", "==", true)
      .get();
    const productsArray = [];
    for (let snap of products.docs) {
      let data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data,
      });
      if (productsArray.length === products.docs.length) {
        setFeaturedProducts(productsArray);
      }
    }
  };

  const getSaleProducts = async () => {
    const products = await fs
      .collection("Products")
      .where("sale", "==", true)
      .get();
    const productsArray = [];
    for (let snap of products.docs) {
      let data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data,
      });
      if (productsArray.length === products.docs.length) {
        setSaleProducts(productsArray);
      }
    }
  };
  const getConverse = async () => {
    const products = await fs
      .collection("Products")
      .where("type", "==", "Converse")
      .get();
    const productsArray = [];
    for (let snap of products.docs) {
      let data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data,
      });
      if (productsArray.length === products.docs.length) {
        setConverseProducts(productsArray);
      }
    }
  };
  const getVans = async () => {
    const products = await fs
      .collection("Products")
      .where("type", "==", "van")
      .get();
    const productsArray = [];
    for (let snap of products.docs) {
      let data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data,
      });
      if (productsArray.length === products.docs.length) {
        setVans(productsArray);
      }
    }
  };
  const getVansArrival = async () => {
    const products = await fs
      .collection("Products")
      .where("type", "==", "van")
      .orderBy("created", "desc")
      .limit(5)
      .get();
    const productsArray = [];
    for (let snap of products.docs) {
      let data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data,
      });
      if (productsArray.length === products.docs.length) {
        setVansArrivals(productsArray);
      }
    }
  };
  const getFiltered = async () => {
    if (filterValue === "From 100$ to 200$") {
      const products = await fs
        .collection("Products")
        .where("price", ">=", 100)
        .where("price", "<=", 200)
        .get();
      const productsArray = [];
      for (let snap of products.docs) {
        let data = snap.data();
        data.ID = snap.id;
        productsArray.push({
          ...data,
        });
        if (productsArray.length === products.docs.length) {
          setProducts(productsArray);
        }
      }
    } else if (filterValue === "None") {
      getProducts();
    } else if (filterValue === "Under 100$") {
      const products = await fs
        .collection("Products")
        .where("price", "<=", 100)
        .get();
      const productsArray = [];
      for (let snap of products.docs) {
        let data = snap.data();
        data.ID = snap.id;
        productsArray.push({
          ...data,
        });
        if (productsArray.length === products.docs.length) {
          setProducts(productsArray);
        }
      }
    } else if (filterValue === "Above 200$") {
      const products = await fs
        .collection("Products")
        .where("price", ">=", 200)
        .get();
      const productsArray = [];
      for (let snap of products.docs) {
        let data = snap.data();
        data.ID = snap.id;
        productsArray.push({
          ...data,
        });
        if (productsArray.length === products.docs.length) {
          setProducts(productsArray);
        }
      }
    } else if (filterValue === "Highest To Lowest") {
      const products = await fs
        .collection("Products")
        .orderBy("price", "desc")
        .get();
      const productsArray = [];
      for (let snap of products.docs) {
        let data = snap.data();
        data.ID = snap.id;
        productsArray.push({
          ...data,
        });
        if (productsArray.length === products.docs.length) {
          setProducts(productsArray);
        }
      }
    } else if (filterValue === "Lowest To Highest") {
      const products = await fs
        .collection("Products")
        .orderBy("price", "asc")
        .get();
      const productsArray = [];
      for (let snap of products.docs) {
        let data = snap.data();
        data.ID = snap.id;
        productsArray.push({
          ...data,
        });
        if (productsArray.length === products.docs.length) {
          setProducts(productsArray);
        }
      }
    }
  };

  const getVansFiltered = async () => {
    if (filterValue === "From 100$ to 200$") {
      const products = await fs
        .collection("Products")
        .where("type", "==", "van")
        .where("price", ">=", 100)
        .where("price", "<=", 200)
        .get();
      const productsArray = [];
      for (let snap of products.docs) {
        let data = snap.data();
        data.ID = snap.id;
        productsArray.push({
          ...data,
        });
        if (productsArray.length === products.docs.length) {
          setVans(productsArray);
        }
      }
    } else if (filterValue === "None") {
      getProducts();
    } else if (filterValue === "Under 100$") {
      const products = await fs
        .collection("Products")
        .where("type", "==", "van")
        .where("price", "<=", 100)
        .get();
      const productsArray = [];
      for (let snap of products.docs) {
        let data = snap.data();
        data.ID = snap.id;
        productsArray.push({
          ...data,
        });
        if (productsArray.length === products.docs.length) {
          setVans(productsArray);
        }
      }
    } else if (filterValue === "Above 200$") {
      const products = await fs
        .collection("Products")
        .where("type", "==", "van")
        .where("price", ">=", 200)
        .get();
      const productsArray = [];
      for (let snap of products.docs) {
        let data = snap.data();
        data.ID = snap.id;
        productsArray.push({
          ...data,
        });
        if (productsArray.length === products.docs.length) {
          setVans(productsArray);
        }
      }
    } else if (filterValue === "Highest To Lowest") {
      const products = await fs
        .collection("Products")
        .where("type", "==", "van")
        .orderBy("price", "desc")
        .get();
      const productsArray = [];
      for (let snap of products.docs) {
        let data = snap.data();
        data.ID = snap.id;
        productsArray.push({
          ...data,
        });
        if (productsArray.length === products.docs.length) {
          setVans(productsArray);
        }
      }
    } else if (filterValue === "Lowest To Highest") {
      const products = await fs
        .collection("Products")
        .where("type", "==", "van")
        .orderBy("price", "asc")
        .get();
      const productsArray = [];
      for (let snap of products.docs) {
        let data = snap.data();
        data.ID = snap.id;
        productsArray.push({
          ...data,
        });
        if (productsArray.length === products.docs.length) {
          setVans(productsArray);
        }
      }
    }
  };
  const getConverseFiltered = async () => {
    if (filterValue === "From 100$ to 200$") {
      const products = await fs
        .collection("Products")
        .where("type", "==", "Converse")
        .where("price", ">=", 100)
        .where("price", "<=", 200)
        .get();
      const productsArray = [];
      for (let snap of products.docs) {
        let data = snap.data();
        data.ID = snap.id;
        productsArray.push({
          ...data,
        });
        if (productsArray.length === products.docs.length) {
          setConverseProducts(productsArray);
        }
      }
    } else if (filterValue === "None") {
      getConverse();
    } else if (filterValue === "Under 100$") {
      const products = await fs
        .collection("Products")
        .where("type", "==", "Converse")
        .where("price", "<=", 100)
        .get();
      const productsArray = [];
      for (let snap of products.docs) {
        let data = snap.data();
        data.ID = snap.id;
        productsArray.push({
          ...data,
        });
        if (productsArray.length === products.docs.length) {
          setConverseProducts(productsArray);
        }
      }
    } else if (filterValue === "Above 200$") {
      const products = await fs
        .collection("Products")
        .where("type", "==", "Converse")
        .where("price", ">=", 200)
        .get();
      const productsArray = [];
      for (let snap of products.docs) {
        let data = snap.data();
        data.ID = snap.id;
        productsArray.push({
          ...data,
        });
        if (productsArray.length === products.docs.length) {
          setConverseProducts(productsArray);
        }
      }
    } else if (filterValue === "Highest To Lowest") {
      const products = await fs
        .collection("Products")
        .where("type", "==", "Converse")
        .orderBy("price", "desc")
        .get();
      const productsArray = [];
      for (let snap of products.docs) {
        let data = snap.data();
        data.ID = snap.id;
        productsArray.push({
          ...data,
        });
        if (productsArray.length === products.docs.length) {
          setConverseProducts(productsArray);
        }
      }
    } else if (filterValue === "Lowest To Highest") {
      const products = await fs
        .collection("Products")
        .where("type", "==", "Converse")
        .orderBy("price", "asc")
        .get();
      const productsArray = [];
      for (let snap of products.docs) {
        let data = snap.data();
        data.ID = snap.id;
        productsArray.push({
          ...data,
        });
        if (productsArray.length === products.docs.length) {
          setConverseProducts(productsArray);
        }
      }
    }
  };
  const getConverseArrival = async () => {
    const products = await fs
      .collection("Products")
      .where("type", "==", "Converse")
      .orderBy("created", "desc")
      .limit(5)
      .get();
    const productsArray = [];
    for (let snap of products.docs) {
      let data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data,
      });
      if (productsArray.length === products.docs.length) {
        setConverseArrivals(productsArray);
      }
    }
  };
  const [allUsers, setAllUsers] = useState();
  const [allSoldProducts, setAllSoldProducts] = useState();
  const [soldProductsQuantity, setSoldProductsQuantity] = useState();

  const getSoldProducts = async () => {
    const soldProducts = await fs.collection("soldProducts").get();
    const soldProduct = soldProducts.docs.map((doc) => doc.data());
    setAllSoldProducts(soldProduct);
  };
  const getUsers = async () => {
    const users = await fs.collection("users").get();
    const user = users.docs.map((doc) => doc.data());
    setAllUsers(user);
  };
  useEffect(() => {
    getProducts();
    getFeaturedProducts();
    getSaleProducts();
    getConverse();
    getVans();
    getSoldProducts();
    getUsers();
    getVansArrival();
    getConverseArrival();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/searchResults");
    const filteredResults = products.filter(
      (product) =>
        product.type.toLowerCase().includes(search.toLowerCase()) ||
        product.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
    console.log(searchResults);
  };
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  }
  function GetUserEmail() {
    const [currentEmail, setCurrentEmail] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setCurrentEmail(user.email);
        }
      });
    }, []);
    return currentEmail;
  }
  const currentEmail = GetUserEmail();

  const uid = GetUserUid();

  const addToCart = (product) => {
    if (uid !== null) {
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id: product.id,
          title: product.title,
          image: product.url,
          price: product.price,
          url: product.url,
        },
      });
      fs.collection("Cart" + uid)
        .doc(product.id)
        .set(product)
        .then(() => {
          toast.success("Your Item has been successfully added to cart", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
          fs.collection("Cart" + uid)
            .doc(product.id)
            .update({
              Size: value ? value : sizeOptions[0].label,
              quantity: quantity,
            });
          fs.collection("Products")
            .doc(product.id)
            .update({
              quantity: product.quantity - quantity,
            });
        });
    } else {
      navigate("/login");
    }
  };
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setUser(snapshot.data().Email);
            });
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart" + user.uid).onSnapshot((snapshot) => {
          const newCartProduct = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
          }));
          setCartProducts(newCartProduct);
        });
      } else {
        console.log("nope");
      }
    });
  }, []);
  const handleOption = (obj) => {
    setFilterValue(obj);
  };
  return (
    <DataContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        repeatNewPassword,
        setRepeatNewPassword,
        success,
        setSuccess,
        flag,
        setFlag,
        products,
        setProducts,
        featuredProducts,
        setFeaturedProducts,
        saleProducts,
        setSaleProducts,
        converseProducts,
        setConverseProducts,
        vanProducts,
        setVans,
        addToCart,
        cartProducts,
        setCartProducts,
        GetUserUid,
        sizeOptions,
        value,
        setValue,
        currentEmail,
        currentPage,
        setCurrentPage,
        productsPerPage,
        indexOfLastProduct,
        indexOfFirstProduct,
        currentPosts,
        paginate,
        allUsers,
        allSoldProducts,
        search,
        setSearchResults,
        setSearch,
        searchResults,
        handleSearch,
        handleDeleteProduct,
        vansArrivals,
        converseArrivals,
        quantity,
        setQuantity,
        filterProduct,
        getFiltered,
        filterOptions,
        setFilterValue,
        soldProductsQuantity,
        setSoldProductsQuantity,
        getVansFiltered,
        getConverseFiltered,
        handleOption,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
