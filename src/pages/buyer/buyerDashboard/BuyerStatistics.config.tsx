import { GrInProgress, GrServices } from "react-icons/gr";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdOutlineCancel, MdOutlinePendingActions } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

export const STATISTIC_CONFIG = [
    {
        key: 'total',
        TITLE: 'Total Service Requests',
        ICON: <GrServices />        ,
        FALLBACK: 0,
        PREFIX: '',
    },
    {
        key: 'pending',
        TITLE: 'Pending Service Requests',
        ICON: <MdOutlinePendingActions />        ,
        FALLBACK: 0,
        PREFIX: '',
    },
    {
        key: 'completed',
        TITLE: 'Completed Service Requests',
        ICON: <IoCheckmarkDoneCircleOutline />,
        FALLBACK: 0,
        PREFIX: '',
    },
    {
        key: 'delivered',
        TITLE: 'Delivered Service Requests',
        ICON: <TbTruckDelivery />        ,
        FALLBACK: 0,
        PREFIX: '',
    },
    {
        key: 'inProgress',
        TITLE: 'In Progress Service Requests',
        ICON: <GrInProgress />        ,
        FALLBACK: 0,
        PREFIX: '',
    },
    {
        key: 'rejected',
        TITLE: 'Rejected Service Requests',
        ICON: <MdOutlineCancel />,
        FALLBACK: 0,
        PREFIX: '',
    }
];


// get comma separator
export function getCommaSeparator(value: number) {
    return value?.toLocaleString();
}