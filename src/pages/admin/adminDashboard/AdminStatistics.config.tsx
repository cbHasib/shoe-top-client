import { AiOutlineShop } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { FiDollarSign } from "react-icons/fi";
import { PiUsers } from "react-icons/pi";
import { TbShoppingBagDiscount } from "react-icons/tb";

export const STATISTIC_CONFIG = [
    {
        key: 'totalUsers',
        TITLE: 'Total Users',
        ICON: <PiUsers />,
        FALLBACK: 0,
        PREFIX: '',
    },
    {
        key: 'productsInStock',
        TITLE: 'In Stock',
        ICON: <AiOutlineShop />,
        FALLBACK: 0,
        PREFIX: '',
    },
    {
        key: 'productsOutOfStock',
        TITLE: 'Out of Stock',
        ICON: <AiOutlineShop />,
        FALLBACK: 0,
        PREFIX: '',
    },
    {
        key: 'totalOrders',
        TITLE: 'Total Orders',
        ICON: <BsCartCheck />,
        FALLBACK: 0,
        PREFIX: '',
    },
    {
        key: 'totalSaleQuantity',
        TITLE: 'Sale Quantity',
        ICON: <TbShoppingBagDiscount />,
        FALLBACK: 0,
        PREFIX: '',
    },
    {
        key: 'totalSales',
        TITLE: 'Total Sales',
        ICON: <FiDollarSign />,
        FALLBACK: 0,
        PREFIX: '$',
    }
];


// get comma separator
export function getCommaSeparator(value: number) {
    return value?.toLocaleString();
}