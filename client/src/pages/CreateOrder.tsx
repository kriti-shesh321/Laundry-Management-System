import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

function CreateOrder() {
    const navigate = useNavigate();

    const [garments, setGarments] = useState<any[]>([]);

    const [items, setItems] = useState([
        {
            garmentTypeId: "",
            quantity: 1,
        },
    ]);

    const fetchGarments = async () => {
        try {
            const response = await api.get("/garment-types");
            setGarments(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchGarments();
    }, []);

    const updateItem = (
        index: number,
        field: string,
        value: string | number
    ) => {
        const updated = [...items];

        updated[index] = {
            ...updated[index],
            [field]: value,
        };

        setItems(updated);
    };

    const addItem = () => {
        setItems([
            ...items,
            {
                garmentTypeId: "",
                quantity: 1,
            },
        ]);
    };

    const handleSubmit = async () => {
        try {
            await api.post("/orders", {
                orderItems: items,
            });

            navigate("/orders");
        } catch (error) {
            alert("Failed to create order");
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto space-y-4">
            <h1 className="text-2xl font-bold">Create Order</h1>

            {items.map((item, index) => (
                <div
                    key={index}
                    className="border p-4 rounded space-y-2"
                >
                    <select
                        className="w-full border p-2 rounded"
                        value={item.garmentTypeId}
                        onChange={(e) =>
                            updateItem(
                                index,
                                "garmentTypeId",
                                e.target.value
                            )
                        }
                    >
                        <option value="">Select Garment</option>

                        {garments.map((garment) => (
                            <option
                                key={garment.id}
                                value={garment.id}
                            >
                                {garment.name} - ₹{garment.basePrice}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        min={1}
                        className="w-full border p-2 rounded"
                        value={item.quantity}
                        onChange={(e) =>
                            updateItem(
                                index,
                                "quantity",
                                Number(e.target.value)
                            )
                        }
                    />
                </div>
            ))}

            <button
                onClick={addItem}
                className="border px-4 py-2 rounded"
            >
                Add Item
            </button>

            <button
                onClick={handleSubmit}
                className="w-full bg-black text-white p-2 rounded"
            >
                Create Order
            </button>
        </div>
    );
}
export default CreateOrder;