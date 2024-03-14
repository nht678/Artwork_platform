import './styles/OrderCards.css';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {XMarkIcon} from "@heroicons/react/24/solid/index.js";
import { API } from "../utils/api.jsx";

function OrderCards({ apiPass }) {

    const [orders, setOrders] = useState([]);

    async function getOrders() {
        
        const res = await API.get("/api/orders", {
            headers: {
            },
          }); 
        const json =  res.data;
        const data = json.data;
        return { data };
    }

    async function removeOrder(artID) {
         await API.delete("/api/orders?id=" + artID, {
            headers: {
            },
          }); 
      
        getOrders().then((res) => { setOrders(res.data); });
    }

    // On load, get the orders
    useEffect(() => {
        getOrders().then((res) => {
            setOrders(res.data);
        });
    }, []);

    if (orders.length === 0) {
        return (
            <p><em>No orders found.</em></p>
        )
    } else {
        return (
            <>
                { orders.map((order) => {
                    return (
                        <div key={order["artID"]} className="order-card">
                            <div className="order-id">
                                <Link to={"/artwork/" + order["artID"]}>
                                    <h2 className="lg:before:content-['Artwork_#']">{order["artID"]}</h2>
                                </Link>
                            </div>
                            <div className="order-details">
                                <p>Name: <span>{order["customerName"]}</span></p>
                                <p>Number: <span>{order["customerNumber"]}</span></p>
                                <p>Email: <span>{order["customerEmail"]}</span></p>
                                <p>Address: <span>{order["customerAddress"]}</span></p>
                            </div>
                            <div className="order-remove" onClick={() => removeOrder(order["artID"])}>
                                <XMarkIcon className="hover-raise" />
                            </div>

                        </div>
                    )
                }) }
            </>
        )
    }

}

export default OrderCards;