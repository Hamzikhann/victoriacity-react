import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";


const SurchargeTable = () => {

    const [baseApiUrl, setBaseApiUrl] = useState(process.env.REACT_APP_API_URL + "/api/");
    const [surchargeData, setSurchargeData] = useState([]);
  
    const fetchSurchargeData = async () => {

        try {
        const response = await axios.get(baseApiUrl + "/surcharge/list")
            .then((res) => {
                setSurchargeData(res.data.data);
            })
            .catch((error) => {
                res.send({ 
                    message: "Error fetching Surcharge list.",
                    data: error,
                })
            })
        } catch (error) {
            res.send({ 
                message: "Surcharge List Not Found.", 
                data: error,
            });
        }

    };

    const getSurchargePdf = async (scid, bkid) => {
        try {
            const surchargePdf = await axios.post(baseApiUrl + "/surcharge/pdf", {scid,bkid})
                .then((res) => {
                    if(res){
                        window.open(res.data.file.url, "_blank");
                    }
                })
                .catch((error) => {
                    res.send({ 
                        message: "Error creating Surcharge PDF.",
                        data: error,
                    })
                })
        } catch (error) {
            res.send({ message: "Surcharge PDF Not Created.", data: error });
        }
    }

    console.log("REsponseeeSurcharge", surchargeData);

    useEffect(() => {
        fetchSurchargeData();
    }, []);

  return (
<div className="container mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4">Surcharge Details</h2>
            {/* Wrapper div for horizontal scrolling */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border">Actions</th>
                            <th className="py-2 px-4 border">Serial#</th>
                            <th className="py-2 px-4 border">Total Surcharges</th>
                            <th className="py-2 px-4 border">Remaining Surcharges</th>
                            <th className="py-2 px-4 border">Paid Surcharges</th>
                            <th className="py-2 px-4 border">Surcharge Paid</th>
                            <th className="py-2 px-4 border">Wave Off</th>
                            <th className="py-2 px-4 border">Paid At</th>
                            <th className="py-2 px-4 border">BK_ID</th>
                            <th className="py-2 px-4 border">Name</th>
                            <th className="py-2 px-4 border">VC_NO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {surchargeData.length > 0 ? (
                            surchargeData.map((surcharge, index) => (
                                <tr key={index} className="text-center">
                                    <td className="py-2 px-4 border">
                                        <div className="dropdown">
                                            <button className="btn btn-light dropdown-toggle" type="button" id={`dropdownMenuButton-${index}`} data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="bi bi-three-dots"></i>
                                            </button>
                                            <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton-${index}`}>
                                                <li>
                                                    <button className="dropdown-item" onClick={() => getSurchargePdf(surcharge.SC_ID, surcharge.BK_ID)}>
                                                        <i className="fa fa-download m-r-5"></i> Download PDF
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {index + 1}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {surcharge.Booking.totalSurcharges}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {surcharge.Booking.remainingSurcharges}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {surcharge.Booking.paidSurcharges}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {surcharge.amount}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {surcharge.waveOff}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {surcharge.paidAt === null ? "NILL" : surcharge.paidAt}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {surcharge.BK_ID}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {surcharge.Booking.Member.BuyerName}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {surcharge.Booking.Reg_Code_Disply}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="py-4 px-4 border text-center">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
  );
};

export default SurchargeTable;
