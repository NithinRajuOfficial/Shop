import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = [
  "SI.No",
  "Description of Goods",
  "Tax(%)",
  "Qty",
  "Rate",
  "Amount",
  "Discount",
  "Total",
];

export function BillTable({ billingDetails }) {
  console.log(billingDetails, "----------");

  return (
    <Card className="md:w-[50vw]  overflow-hidden">
      <table className="table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 px-0.5 py-4 md:px-4 text-center md:text-start"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70 text-xs"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="h-72">
          {/* Loop over billingDetails array */}
          {billingDetails?.map((bill, billIndex) =>
            // Loop over each goods item for the specific bill
            bill?.goods?.map((item, index) => {
              console.log(item)
              const isLast = index === bill?.goods?.length - 1;
              const classes = isLast
                ? "px-0.5 py-4 md:px-4"
                : "px-0.5 py-4 md:px-4 border-b border-blue-gray-50";

              const {
                goodsDetails,
                tax,
                quantity,
                price,
                amount,
                discount,
                total,
              } = item;

              return (
                <tr key={`${billIndex}-${index}`}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-xs"
                    >
                      {index + 1} {/* SI.No */}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-xs"
                    >
                      {goodsDetails}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-xs"
                    >
                      {tax}%
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-xs"
                    >
                      {quantity}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-xs"
                    >
                      ₹{price}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-xs"
                    >
                      ₹{amount}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-xs"
                    >
                      ₹{discount}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-xs"
                    >
                      ₹{total}
                    </Typography>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
        <tfoot className="border-t border-gray-300 text-white">
          <tr>
            <td className="px-1 py-4">
              <Typography
                color="blue-gray"
                variant="small"
                className="font-bold text-xs"
              >
                Total
              </Typography>
            </td>
            {/* Adjust the colspan depending on your footer */}
            <td className="px-1 py-4" colSpan={8}>
              <Typography
                color="blue-gray"
                variant="small"
                className="font-bold text-xs text-right"
              >
                ₹
                {billingDetails.reduce(
                  (total, bill) =>
                    total +
                    bill.goods.reduce(
                      (goodsTotal, item) => goodsTotal + item.total,
                      0
                    ),
                  0
                )}{" "}
                {/* Total of all bills */}
              </Typography>
            </td>
          </tr>
        </tfoot>
      </table>
    </Card>
  );
}
