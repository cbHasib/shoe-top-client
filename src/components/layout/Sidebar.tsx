import { Layout, Menu } from "antd";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { useLocation } from "react-router-dom";
import { buyerPaths } from "../../routes/buyer.routes";
import { sellerPaths } from "../../routes/seller.routes";
import { verifyToken } from "../../utils/verifyToken";

const { Sider } = Layout;

const USER_ROLE: { [key: string]: 'admin' | 'seller' | 'buyer' } = {
  ADMIN: 'admin',
  SELLER: 'seller',
  BUYER: 'buyer',
}

interface JwtPayloadUser {
  role: string;
}

const Sidebar = () => {

  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
      user = verifyToken(token) as JwtPayloadUser;
  }
  const role = user?.role as 'admin' | 'seller' | 'buyer';

  const { pathname } = useLocation();

  let sidebarItems;
  switch (role) {
    case USER_ROLE.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, USER_ROLE.ADMIN);
      break;

    case USER_ROLE.BUYER:
      sidebarItems = sidebarItemsGenerator(buyerPaths, USER_ROLE.BUYER);
      break;

    case USER_ROLE.SELLER:
      sidebarItems = sidebarItemsGenerator(sellerPaths, USER_ROLE.SELLER);
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      width={260}
    >
      <div className="demo-logo-vertical" style={{ textAlign: 'center', color: 'white', height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textTransform: 'uppercase' }}>
        <h1>
          Shoe Top
        </h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={[pathname]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;