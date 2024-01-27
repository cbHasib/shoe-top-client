import { Layout, Menu } from "antd";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { userPaths } from "../../routes/user.routes";
import { useLocation } from "react-router-dom";

const { Sider } = Layout;

const USER_ROLE : {[key: string]: 'admin' | 'user'} = {
  ADMIN: 'admin',
  USER: 'user',
}

const Sidebar = () => {

  const user = useAppSelector(selectCurrentUser);
  const role = user?.role;

  const {pathname} = useLocation();

  let sidebarItems;
  switch (role) {
    case USER_ROLE.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, USER_ROLE.ADMIN);
      break;
    
    case USER_ROLE.USER:
      sidebarItems = sidebarItemsGenerator(userPaths, USER_ROLE.STUDENT);
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