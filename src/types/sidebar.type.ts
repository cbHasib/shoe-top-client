export type TRoute = {
    path: string;
    element: React.ReactNode;
}


export type TUserPaths = {
    name: string;
    path?: string;
    icon?: React.ReactNode;
    element?: React.ReactNode;
    children?: TUserPaths[];
}

export type TMenuItems = {
    key: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    children?: TMenuItems[];
}