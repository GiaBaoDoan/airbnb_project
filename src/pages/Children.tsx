import { useState } from "react";
import { SidebarItem } from "./SideBar";
import { LifeBuoy, BarChart3, LayoutDashboard, Group, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Children = () => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const navigate = useNavigate();

  const handelActive = (tabIndex) => {
    setTabIndex(tabIndex);
  };
  return (
    <main>
      <SidebarItem
        handelActive={() => {
          handelActive(1);
          navigate("/admin/Post");
        }}
        icon={<LayoutDashboard size={30} />}
        text="DashBorad"
        alert={false}
        active={tabIndex == 1 ? true : false}
      ></SidebarItem>
      <SidebarItem
        handelActive={() => {
          handelActive(2);
          navigate("/admin/users");
        }}
        icon={<BarChart3 size={30} />}
        text="List users"
        alert={false}
        active={tabIndex == 2 ? true : false}
      ></SidebarItem>
      <SidebarItem
        handelActive={() => {
          handelActive(9);
          navigate("/admin/rooms");
        }}
        icon={<Group size={30} />}
        text="List rooms"
        alert={false}
        active={tabIndex == 9 ? true : false}
      ></SidebarItem>

      <SidebarItem
        handelActive={() => {
          handelActive(4);
          navigate("/admin/location");
        }}
        icon={<MapPin size={30} />}
        text="Location"
        alert={false}
        active={tabIndex == 4 ? true : false}
      ></SidebarItem>
      <SidebarItem
        handelActive={() => handelActive(8)}
        icon={<LifeBuoy size={30} />}
        text="Helps"
        alert={false}
        active={tabIndex == 8 ? true : false}
      ></SidebarItem>
    </main>
  );
};

export default Children;
