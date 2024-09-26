import { Button, Input, Textarea } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { billingSchema } from "../utils/yupValidations";
import { useCallback, useEffect, useState } from "react";

const BillingForm = ({ setBillingDetails }) => {
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [goodsList, setGoodsList] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(billingSchema),
    mode: "onChange",
  });

  const calculateTotalPrice = useCallback((discount) => {
    if (discount >= 0 && amount > 0) {
      setTotalAmount(amount - discount);
    }
  }, [amount]);

  // Calculate the amount whenever price, quantity, or tax changes
  useEffect(() => {
    calculatePrice(price, quantity, tax);
    calculateTotalPrice(discount);

  }, [price, quantity, tax, discount, calculateTotalPrice]);


  const calculatePrice = (price, quantity, tax) => {
    if (price > 0 && quantity > 0) {
      const totalWithoutTax = price * quantity;
      const taxAmount = (totalWithoutTax * tax) / 100;
      const result = totalWithoutTax + taxAmount;
      setAmount(Math.floor(result));
    }
  };

 
  

  const addNewProduct = (data) => {
    // Calculate the amount using the form values
    const totalWithoutTax = data.price * data.quantity;
    const taxAmount = (totalWithoutTax * data.tax) / 100;
    const calculatedAmount = Math.floor(totalWithoutTax + taxAmount);
  
    // Calculate the total amount after discount
    const calculatedTotalAmount = calculatedAmount - data.discount;
  
    const product = {
      goodsDetails: data.goodsDetails,
      price: data.price,
      quantity: data.quantity,
      tax: data.tax,
      discount: data.discount,
      amount: calculatedAmount,       
      total: calculatedTotalAmount,  
    };
  
    // Update the goods list with the new product
    const updatedGoodsList = [...goodsList, product];
    setGoodsList(updatedGoodsList);
  
    reset({
      goodsDetails: "",
      price: "",
      quantity: "",
      tax: "",
      discount: "",
    });

    setAmount(0);
    setTotalAmount(0);
    return updatedGoodsList;
  };
  
  const onSubmit = (data) => {
    // Add the new product and get the updated goods list
    const updatedGoodsList = addNewProduct(data);

    // Now use the updated goods list to create the final billing data
    const finalBillingData = {
      customerName: data.customerName,
      date: data.date,
      customerAddress: data.customerAddress,
      goods: updatedGoodsList, // Ensure the latest goodsList is used
    };

    setBillingDetails((prev) => [...prev, finalBillingData]);

    // Reset the form and clear goods list
    reset();
    setGoodsList([]);
    setAmount(null);
    setTotalAmount(null);
  };

  return (
    <article className="px-3 py-4 md:px-10 md:py-10 border-2 border-gray-300 rounded-2xl w-full xl:w-[50%]">
      <h1 className="text-white text-center mb-4 md:mb-8 text-xl md:text-3xl">
        Billing
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <div className="w-full flex flex-col md:flex-row gap-4 mb-4">
            <div className="w-full">
              <Input
                label="Customer Name"
                color="white"
                className="w-full"
                {...register("customerName")}
              />
              {errors.customerName && (
                <small className="text-red-500">
                  {errors.customerName.message}
                </small>
              )}
            </div>
            <div className="w-full">
              <Input
                type="date"
                label="Date"
                color="white"
                className="w-full "
                {...register("date")}
              />
              {errors.date && (
                <small className="text-red-500">{errors.date.message}</small>
              )}
            </div>
          </div>
          <Textarea
            label="Customer Address"
            color="white"
            className="w-full "
            {...register("customerAddress")}
          />
          {errors.customerAddress && (
            <small className="text-red-500">
              {errors.customerAddress.message}
            </small>
          )}
        </section>
        <section className="mt-2">
          <Textarea
            label="Description of Goods"
            color="white"
            className="w-full "
            {...register("goodsDetails")}
          />
          {errors.goodsDetails && (
            <small className="text-red-500">
              {errors.goodsDetails.message}
            </small>
          )}

          <div className="w-full flex  justify-between  gap-4 flex-wrap mt-2">
            <div className="w-full flex flex-col md:flex-row  justify-between gap-4">
              <Input
                type="number"
                label="Rate (₹)"
                color="white"
                min="0"
                className="w-full"
                {...register("price")}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors.price && (
                <small className="text-red-500">{errors.price.message}</small>
              )}

              <Input
                type="number"
                label="Qty (units)"
                color="white"
                min="0"
                className="w-full"
                {...register("quantity")}
                onChange={(e) => setQuantity(e.target.value)}
              />
              {errors.quantity && (
                <small className="text-red-500">
                  {errors.quantity.message}
                </small>
              )}
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between gap-4 ">
              <Input
                type="number"
                label="Tax (%)"
                color="white"
                min="0"
                className="w-full"
                {...register("tax")}
                onChange={(e) => setTax(e.target.value)}
              />
              {errors.tax && (
                <small className="text-red-500">{errors.tax.message}</small>
              )}

              <Input
                type="number"
                label="Discount (₹)"
                color="white"
                min="0"
                className="w-full"
                {...register("discount")}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 mt-6 text-white">
            {/* <div className="flex gap-4">
              <div className="flex flex-col text-center">
                <span className="min-w-24 min-h-9  bg-white text-red-500 text-center px-2 py-1 rounded-lg text-2xl">
                  {amount ? `₹${amount}` : ""}
                </span>
                <small>Amount</small>
              </div>
              {discount > 0 ? (
                <div className="flex flex-col text-center">
                  <span className="min-w-24 min-h-9 bg-white text-red-500 text-center px-2 py-1 rounded-lg text-2xl">
                    {discount ? `₹${totalAmount}` : ""}
                  </span>
                  <small>Total</small>
                </div>
              ) : (
                ""
              )}
            </div> */}
            <div>
              <Button
                className="text-2xl px-3 py-1 mr-5 hover:scale-105 duration-300"
                onClick={handleSubmit(addNewProduct)}
              >
                +
              </Button>
              <Button type="submit" className="hover:scale-105 duration-300">
                Generate Bill
              </Button>
            </div>
          </div>
        </section>
      </form>
    </article>
  );
};

export default BillingForm;
