import { useState } from "react";
import Form from "./components/Form";
import PrintableBill from "./components/PrintableBill ";

function App() {
  const [billingDetails, setBillingDetails] = useState([]);
  console.log(billingDetails, "billingDetails");

  return (
    <main className="h-[140vh] md:h-[100vh] px-3 py-10 md:px-20 md:py-12 flex justify-center items-center bg-black text-white">
      {billingDetails.length > 0 ? (
        <PrintableBill billingDetails={billingDetails} />
      ) : (
        <Form setBillingDetails={setBillingDetails} />
      )}{" "}
    </main>
  );
}

export default App;
