import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";

function Orders() {
    const [orders, setOrders] = useState<any[]>([]);

    const fetchOrders = async () => {
        try {
            const response = await api.get("/orders");
            setOrders(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Orders</h1>

                <Link
                    to="/create-order"
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Create Order
                </Link>
            </div>

            <div className="space-y-4">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="border rounded-lg p-4"
                    >
                        <p>
                            <strong>Status:</strong> {order.status}
                        </p>

                        <p>
                            <strong>Total:</strong> ₹{order.totalAmount}
                        </p>

                        <div className="mt-2">
                            <strong>Garments:</strong>

                            <ul className="list-disc ml-6">
                                {order.orderItems?.map((item: any) => (
                                    <li key={item.id}>
                                        {item.garmentType.name} × {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Orders;