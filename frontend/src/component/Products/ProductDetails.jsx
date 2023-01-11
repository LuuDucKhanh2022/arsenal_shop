import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductCategory,
  getProductDetails,
} from "../../actions/ProductActions";
import Footer from "../../Footer";
import epl from "../../Assets/premier_league_logo.png";
import euro from "../../Assets/european_logo.png";
import MetaData from "../../more/Metadata";
import Header from "../Home/Header";
import { Rating } from "@material-ui/lab";
import { ToastContainer, toast } from "react-toastify";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "react-toastify/dist/ReactToastify.css";
import { addItemsToCart } from "../../actions/CartAction";
import { addToFavourite } from "../../actions/FavouriteAction";
import Loading from "../../more/Loader";
import Breadcrumbs from "../../more/Breadcrumbs";
import styles from "./Productdetails.module.css";
import ProductSection from "./ProductSection";
import ReviewsTab from "./ReviewTab";

const players = [
  {
    name: "Gabriel jesus",
    number: 9,
  },
  {
    name: "Gabriel Martineli",
    number: 11,
  },
  {
    name: "Martin Odergaad",
    number: 8,
  },
  {
    name: "Bukayo Saka",
    number: 7,
  },
  {
    name: "Granit Xhaka",
    number: 29,
  },
  {
    name: "Thomas Partey",
    number: 5,
  },
  {
    name: "Kieran Tierny",
    number: 3,
  },
  {
    name: "Gabriel Malgahase",
    number: 6,
  },
  {
    name: "Wiliam Saliba",
    number: 5,
  },
  {
    name: "Ben White",
    number: 4,
  },
  {
    name: "Aaron Ramsdale",
    number: 1,
  },
];

const ProductDetails = ({ match, history }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");
  const [varse2Tab, setVarse2Tab] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [playerId, setPlayerId] = useState("select player");
  const [customName, setCustomName] = useState("");
  const [customNumber, setCustomNumber] = useState("");
  const [customPatch, setCustomPatch] = useState("");

  // Increase quantity
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [available, setAvailable] = useState(0);

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { productCategory, error: productCategoryError } = useSelector(
    (state) => state.productCategory
  );

  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (product.category !== undefined && productCategory.length > 0) {
      const relatedProductList = productCategory.find(
        (item) => item.category === product.category.name
      );
      setRelatedProducts(relatedProductList.products);
    }
  }, [product, productCategory]);

  // const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (productCategoryError) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductCategory());
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, match.path, productCategoryError]);

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if (product.size && product.size.length > 0) {
      if (size !== "") {
        const selectedSize = product.size.find((item) => item.name === size);
        if (selectedSize.stock <= quantity)
          return toast.error("Size stock limited");
      } else {
        return toast.error("Please choose a size");
      }
    } else {
      if (product.stock <= quantity)
        return toast.error("Product stock limited");
    }

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    // if (size !== '') {

    // }
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const chooseSize = (name) => {
    const newSize = product.size.find((item) => item.name === name);
    setAvailable(newSize.stock);
    if (newSize.stock < quantity) {
      setQuantity(newSize.stock);
    }
    setSize(name);
  };
  const addToCartHandler = () => {
    if (product.size.length > 0) {
      if (size !== "") {
        const selectedSize = product.size.find((item) => item.name === size);
        if (selectedSize.stock > 0) {
          if (customName !== "" || customNumber !== "" || customPatch !== "") {
            const customProduct = {
              name: customName,
              number: customNumber,
              patch: customPatch,
            };
            dispatch(
              addItemsToCart(
                match.params.id,
                quantity,
                selectedSize,
                customProduct
              )
            );
          } else {
            dispatch(addItemsToCart(match.params.id, quantity, selectedSize));
          }
          toast.success("Product Added to cart");
        } else {
          toast.error("Product stock limited");
        }
      } else {
        toast.error("Please choose a size");
      }
    } else {
      if (product.stock > 0) {
        dispatch(addItemsToCart(match.params.id, quantity));
        toast.success("Product Added to cart");
      } else {
        toast.error("Product stock limited");
      }
    }
  };

  const addToFavouriteHandler = () => {
    dispatch(addToFavourite(match.params.id, quantity));
    toast.success("Product Added to Favourites");
  };

  const changeVarse2Tab = (e, tabName) => {
    let i, tabContent, tabTitle;
    tabContent = document.getElementsByClassName(
      styles.varse2TabContent
    );
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].classList.remove(styles.active);
    }

    tabTitle = document.getElementsByClassName(
      styles.varse2TabTitle
    );
    for (i = 0; i < tabTitle.length; i++) {
      tabTitle[i].classList.remove(styles.active);
    }
    tabContent = document.getElementById(tabName);
    tabContent.classList.add(styles.active);
    // document
    //   .getElementById(tabName)
    //   .classList.add("Productdetails_active__0NK9R");
    e.currentTarget.classList.add(styles.active);
    setVarse2Tab(tabName);
  };

  const changeTab = (e, tabName) => {
    var i, tabContent, tabTitle;
    tabContent = document.getElementsByClassName(
      styles.tabContent
    );
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].classList.remove(styles.active);
    }

    tabTitle = document.getElementsByClassName(
      styles.tabTitle
    );
    for (i = 0; i < tabTitle.length; i++) {
      tabTitle[i].classList.remove(styles.active);
    }

    document
      .getElementById(tabName)
      .classList.add(styles.active);
    e.currentTarget.classList.add(styles.active);
    setTab(tabName);
  };

  const handleCustomName = (e) => {
    if (playerId !== "select player") {
      setPlayerId("select player");
    }
    setCustomName(e.target.value);
  };

  const handleCustomNumber = (e) => {
    if (playerId !== "select player") {
      setPlayerId("select player");
    }
    setCustomNumber(e.target.value);
  };
  // handle select player
  useEffect(() => {
    if (playerId !== "select player") {
      let player = players.find(
        (player, index) => index === parseInt(playerId)
      );
      setCustomName(player.name);
      setCustomNumber(player.number);
    }
  }, [playerId]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`${product.name}`} />
          <Header />
          <Breadcrumbs />
          <div className={clsx(styles.productDetails)}>
            <div className={clsx(styles.firstVarse)}>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <div key={i} className={clsx(styles.carouselImage)}>
                      <img key={i} src={item.url} alt={`${i} Slide`} />
                    </div>
                  ))}
              </Carousel>
            </div>
            <div className={clsx(styles.varse2)}>
              <div className={clsx(styles.varse2Tab)}>
                {product.category && product.category.name !== "Kit" ? (
                  <div className={clsx(styles.varse2TabHeading)}>
                    <span
                      className={clsx(styles.varse2TabTitle, styles.active)}
                    >
                      Details
                    </span>
                  </div>
                ) : (
                  <div className={clsx(styles.varse2TabHeading)}>
                    <span
                      onClick={(e) => changeVarse2Tab(e, "detailsTab")}
                      className={clsx(styles.varse2TabTitle, styles.active)}
                    >
                      Details
                    </span>
                    <span
                      onClick={(e) => changeVarse2Tab(e, "customiseTab")}
                      className={clsx(styles.varse2TabTitle)}
                    >
                      Custom
                    </span>
                  </div>
                )}

                <div
                  id="detailsTab"
                  className={clsx(styles.varse2TabContent, styles.active)}
                >
                  <div className={clsx(styles.detailsBlock1)}>
                    <h2>{product.name}</h2>
                  </div>
                  <div className={clsx(styles.detailsBlock2)}>
                    <Rating {...options} />
                    <span>
                      ({product.numOfReviews && product.numOfReviews.total}{" "}
                      Reviews)
                    </span>
                  </div>
                  {product.state !== 1 ? (
                    <div className={clsx(styles.stopBusinessTitle)}>Stop Business!</div>
                  ) : (
                    <>
                      <>
                        {product.size && product.size.length > 0 ? (
                          <div className={clsx(styles.sizeSection)}>
                            <div className={clsx(styles.title)}>
                              Choose size
                            </div>
                            <div className={clsx(styles.list)}>
                              {product.size.map((sizeItem) => {
                                let returnElement;
                                // size.stoke !== 0
                                //   ? (item = "item")
                                //   : (item = "item--disable");
                                // return <div className={item} onClick= {chooseSize}>{size.name}</div>;
                                sizeItem.stock > 0
                                  ? (returnElement = (
                                      <div
                                        key={sizeItem.name}
                                        className={
                                          sizeItem.name === size
                                            ? clsx(styles.itemActive)
                                            : clsx(styles.item)
                                        }
                                        onClick={() =>
                                          chooseSize(sizeItem.name)
                                        }
                                      >
                                        {sizeItem.name}
                                      </div>
                                    ))
                                  : (returnElement = (
                                      <div className={clsx(styles.itemDisable)}>
                                        {sizeItem.name}
                                      </div>
                                    ));
                                return returnElement;
                              })}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </>

                      <div id="customTab" className={clsx(styles.detailsBlock)}>
                        <div style={{}}>
                          <h1>
                            {quantity === 1
                              ? `$${product.price}`
                              : `$${product.price} x ${quantity} = $${
                                  product.price * quantity
                                }`}
                          </h1>
                          <h1 className={clsx(styles.discountPrice)}>
                            {product.offerPrice > 0 ? (
                              `$${product.offerPrice}`
                            ) : (
                              <></>
                            )}
                          </h1>
                        </div>
                        <div className={clsx(styles.detailsBlock31)}>
                          <span className={clsx(styles.quantity)}>
                            Quantity
                          </span>
                          <div className={clsx(styles.detailsBlock311)}>
                            <button onClick={decreaseQuantity}>-</button>
                            <input type="number" readOnly value={quantity} />
                            <button onClick={increaseQuantity}>+</button>
                          </div>
                          <span>
                            {available !== 0
                              ? `Available : ${available} products`
                              : `Available : ${product.stock} products`}
                          </span>
                          <div></div>
                        </div>
                        <div className={clsx(styles.stockMeta)}>
                          <span
                            className={
                              product.stock < 1
                                ? clsx(styles.outOfStock)
                                : clsx(styles.inStock)
                            }
                          >
                            {product.stock < 1 ? "Out of stock" : "In Stock"}
                          </span>
                        </div>

                        <div className={clsx(styles.action)}>
                          <div
                            className={clsx(styles.addToWishList)}
                            onClick={addToFavouriteHandler}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="bi bi-heart"
                              viewBox="0 0 16 16"
                            >
                              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                            </svg>
                            <button className={clsx(styles.wishListBtn)}>
                              Add to wishlist
                            </button>
                          </div>

                          <div
                            className={
                              product.stock < 1
                                ? clsx(styles.addToCart, styles.disable)
                                : clsx(styles.addToCart)
                            }
                            onClick={addToCartHandler}
                          >
                            <ShoppingCartIcon />
                            <span className={clsx(styles.cartBtn)}>
                              Add to Cart
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div
                  id="customiseTab"
                  className={clsx(styles.varse2TabContent)}
                >
                  <div className={clsx(styles.custombBlock)}>
                    <span className={clsx(styles.customBlockLabel)}>
                      Add your own name and number:
                    </span>

                    <div className={clsx(styles.inputBlock)}>
                      <div className={clsx(styles.formGroup)}>
                        <input
                          placeholder="Your Name"
                          className={clsx(styles.formControl)}
                          onChange={(e) => handleCustomName(e)}
                          maxLength="12"
                          id="customName"
                          autoComplete="off"
                        />
                        <label
                          className={clsx(styles.formGroupLabel)}
                          htmlFor="customName"
                        >
                          Your Name
                        </label>
                      </div>
                      <div className={clsx(styles.formGroup)}>
                        <input
                          placeholder="Your Number"
                          className={clsx(styles.formControl)}
                          onChange={(e) => handleCustomNumber(e)}
                          type="tel"
                          max="99"
                          maxLength="2"
                          id="customNumber"
                        />
                        <label
                          className={clsx(styles.formGroupLabel)}
                          htmlFor="customNumber"
                        >
                          Your Number
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className={clsx(styles.customBlock)}>
                    <span className={clsx(styles.customBlockLabel)}>
                      Or Pick a squad player:
                    </span>
                    <div className={clsx(styles.selectBlock)}>
                      <select
                        value={playerId}
                        name=""
                        id="player"
                        className={clsx(styles.selectPlayer)}
                        onChange={(e) => setPlayerId(e.target.value)}
                        onfocus="this.size=5;"
                        onblur="this.size=1;"
                        onchange="this.size=1; this.blur();"
                      >
                        <option value="select player">Select player</option>
                        {players.map((player, index) => (
                          <option
                            key={index}
                            value={index}
                          >{`${player.name}-${player.number}`}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className={clsx(styles.custombBlock)}>
                    <span className={clsx(styles.customBlockLabel)}>
                      Select patch:
                    </span>
                    <div className={clsx(styles.patchBlock)}>
                      <div
                        onClick={() => setCustomPatch("Premier League")}
                        className={
                          customPatch !== "Premier League"
                            ? clsx(styles.patchItem)
                            : clsx(styles.patchItem, styles.active)
                        }
                      >
                        <div className={clsx(styles.patchItemLogo)}>
                          <img src={epl} alt="epl logo" />
                        </div>
                        <div className={clsx(styles.patchItemName)}>
                          Premier League
                        </div>
                      </div>
                      <div
                        onClick={() => setCustomPatch("European")}
                        className={
                          customPatch !== "European"
                            ? clsx(styles.patchItem)
                            : clsx(styles.patchItem, styles.active)
                        }
                      >
                        <div className={clsx(styles.patchItemLogo)}>
                          <img src={euro} alt="euro logo" />
                        </div>
                        <div className={clsx(styles.patchItemName)}>
                          European
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={() => setCustomPatch("")}
                      className={clsx(styles.clearPatch)}
                    >
                      Clear Patch
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* tab */}
          <div className={clsx(styles.tab)}>
            <div className={clsx(styles.tabHeading)}>
              <span
                onClick={(e) => changeTab(e, "descTab")}
                className={clsx(styles.tabTitle, styles.active)}
              >
                Description
              </span>
              <span
                onClick={(e) => changeTab(e, "reviewTab")}
                className={clsx(styles.tabTitle)}
              >
                Review
              </span>
            </div>

            <div id="reviewTab" className={clsx(styles.tabContent)}>
              {JSON.stringify(product) !== "{}" && (
                <ReviewsTab product={product} match={match} history={history} />
              )}
            </div>
            <div
              id="descTab"
              className={clsx(styles.tabContent, styles.active)}
            >
              <div className={clsx(styles.desc)}>{product.description}</div>
            </div>
          </div>

          {/* related product */}
          <div className={clsx(styles.relatedProducts)}>
            <ProductSection productCategory={relatedProducts} />
          </div>

          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Footer />
        </>
      )}
    </>
  );
};

export default ProductDetails;
