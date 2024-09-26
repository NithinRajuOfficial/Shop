import * as Yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const billingSchema = Yup.object().shape({
  customerName: Yup.string().required("Customer name is required"),
  date: Yup.date()
    .nullable() // This allows the field to be null
    .transform((value, originalValue) => {
      // If the original value is an empty string, return null
      return originalValue === "" ? null : value;
    })
    .required("Date is required")
    .min(today, "You cannot select a past date")
    .typeError("Please enter a valid date"),
  customerAddress: Yup.string().required("Customer Address  is required"),
  goodsDetails: Yup.string().required("Goods Description is required"),
  tax: Yup.number()
    .required("Tax is required")
    .transform((value, originalValue) =>
      originalValue.trim() === "" ? 0 : value
    )
    .min(0, "Tax cannot be negative"),
  quantity: Yup.number()
    .required("Quantity is required")
    .min(1, "Quantity must be at least 1")
    .transform((value, originalValue) =>
      originalValue.trim() === "" ? 0 : value
    ),
  price: Yup.number()
    .required("Price is required")
    .min(0.01, "Price must be greater than 0")
    .transform((value, originalValue) =>
      originalValue.trim() === "" ? 0 : value
    ),
});
