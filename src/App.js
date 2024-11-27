import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
} from "./redux/reducers/counterSlice";
import {
  deleteProductThunk,
  getProductsThunk,
  postProductThunk,
} from "./redux/reducers/productsSlice";
import { postFormThunk } from "./redux/reducers/formSlice";

const App = () => {
  const [name, setName] = useState("");
  const [des, setDes] = useState("");

  const count = useSelector((state) => state.counter.value);

  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  if (loading) return <p>LLOOAADDIINNGG</p>;
  if (error) return <p>Xeta bas verdi</p>;

  const sendProduct = () => {
    dispatch(postProductThunk({ name: name, description: des }));
  };

  const deleteProduct = (id) => {
    dispatch(deleteProductThunk(id))
  }

  return (
    <div>
      <input
        placeholder="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="name"
        type="text"
        value={des}
        onChange={(e) => setDes(e.target.value)}
      />
      <button onClick={() => sendProduct()}>SEND YOUR NAME</button>

      {products &&
        products.map((item) => {
          return (
            <div>
              <p>{item.name}</p> <button onClick={() => deleteProduct(item.id)}>Delete</button>
            </div>
          );
        })}

      {count}
      <button onClick={() => dispatch(increment())}>+++</button>
      <button onClick={() => dispatch(decrement())}>---</button>
      <button onClick={() => dispatch(incrementByAmount(20))}>+20</button>
    </div>
  );
};

export default App;
