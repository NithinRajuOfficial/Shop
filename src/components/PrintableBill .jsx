/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import Logo from "./Logo"
import { BillTable } from "./Table"
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrintableBill = ({billingDetails}) => {
    console.log(billingDetails,"prinlogg")

    const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

    const formattedDate = billingDetails[0].date instanceof Date ? billingDetails[0].date.toLocaleDateString() : billingDetails[0].date;

    return(
        <main className="flex flex-col items-center">
        <article  ref={componentRef} className="border-2 p-2  flex flex-col gap-4 md:gap-10 rounded-md">
            <section className="flex justify-between gap-4 md:ap-10">
           <Logo/>
            <div className="flex flex-col border-2 px-2 py-1 rounded-md text-sm md:text-base">
                <small>No: <strong></strong></small>
                <small>Date: <strong> {formattedDate}</strong></small>
                <small>State: <strong>Kerala</strong></small>
                <small>State Code: <strong>32</strong></small>
                <small>GSTIN: fffffffffffff<strong></strong></small>
            </div>
            </section>
            <div className="border-2 px-4 py-2 rounded-md text-sm md:text-base">
                <small>Name: <small className="text-sm md:text-base">{billingDetails[0]?.customerName}</small></small> <br />
                <small>Address: <small className="text-sm md:text-base">{billingDetails[0]?.customerAddress}</small></small>      
            </div>
            <BillTable billingDetails={billingDetails}/>
        </article>
        <div className="mt-6">
        <Button onClick={handlePrint} className="bg-blue-500">
          Print Bill
        </Button>
      </div>
        </main>
    )
}

export default PrintableBill