import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library
import {
  CalenderIcon,
  ChevronDownIcon,
  DownloadIcon,
  FileIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  MailIcon,
} from "../icons";
import {
  ArrowUpRight,
  BarChart2,
  Briefcase,
  CreditCard,
  GemIcon,
  GiftIcon,
  Landmark,
  LightbulbIcon,
  List,
  MessageSquare,
  PlusCircle,
  Settings,
  Settings2,
  ShieldCheck,
  TrendingUp,
  Users,
  UsersRound,
} from "lucide-react";

import { useSidebar } from "../context/SidebarContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const dash: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [{ name: "Ecommerce", path: "/", pro: false }],
  },
];

const navItems: NavItem[] = [
  {
    icon: <ListIcon />,
    name: "Task List",
    path: "/", //enter your path
  },
  {
    icon: <CalenderIcon />,
    name: "Calendar",
    path: "/calendar",
  },
  {
    icon: <FileIcon />,
    name: "New files",
    path: "/", //enter your path
  },
  {
    icon: <FileIcon />,
    name: "All files",
    path: "/", //enter your path
  },
];

const actionItems: NavItem[] = [
  {
    icon: <Settings />,
    name: "File actions",
    path: "/", //enter your path
    subItems: [
      { name: "Batch Upload", path: "/", pro: false },
      { name: "Batch Allocation", path: "/", pro: false },
      { name: "Bulk Edit/Update", path: "/", pro: false },
      { name: "Add Extra Attributes", path: "/", pro: false },
      { name: "Remove Balance Locks", path: "/", pro: false },
      { name: "Payments Allocate", path: "/", pro: false },
      { name: "Bulk Move", path: "/", pro: false },
      { name: "Bulk Delete", path: "/", pro: false },
    ],
  },
  {
    icon: <PlusCircle />,
    name: "Bulk upload",
    path: "/", //enter your path
    subItems: [
      { name: "Payments", path: "/", pro: false },
      { name: "MTD Payments", path: "/", pro: false },
      { name: "Next of Kins", path: "/", pro: false },
      { name: "Guarantors", path: "/", pro: false },
      { name: "Employers", path: "/", pro: false },
      { name: "Phones", path: "/", pro: false },
      { name: "Emails", path: "/", pro: false },
      { name: "Notes", path: "/", pro: false },
      { name: "Progress Reports", path: "/", pro: false },
      { name: "Company Directors", path: "/", pro: false },
    ],
  },
  {
    icon: <Users />,
    name: "File pools",
    path: "/", //enter your path
    subItems: [
      { name: "Pool List", path: "/", pro: false },
      { name: "Add/Remove Files", path: "/", pro: false },
      { name: "Pool Settings", path: "/", pro: false },
    ],
  },
  {
    icon: <Settings2 />,
    name: "Segmentation",
    path: "/", //enter your path
    subItems: [
      { name: "Segments", path: "/", pro: false },
      { name: "Add/Remove Files", path: "/", pro: false },
    ],
  },
];

const reportsItems: NavItem[] = [
  {
    icon: <GemIcon />,
    name: "Portfolio",
    path: "/", //enter your path
    subItems: [
      { name: "Active Files", path: "/", pro: false },
      { name: "Non Allocated", path: "/", pro: false },
      { name: "Close Files", path: "/", pro: false },
      { name: "Support Data", path: "/", pro: false },
    ],
  },
  {
    icon: <GiftIcon />,
    name: "Promise to Pay (PTP)",
    path: "/", //enter your path
    subItems: [
      { name: "Today's", path: "/", pro: false },
      { name: "All List", path: "/", pro: false },
      { name: "Payment Plans", path: "/", pro: false },
      { name: "PTP Settings", path: "/", pro: false },
    ],
  },
  {
    icon: <CreditCard />,
    name: "Payments",
    path: "/", //enter your path
    subItems: [
      { name: "Non Confirmed", path: "/", pro: false },
      { name: "Confirmed", path: "/", pro: false },
      { name: "Locked/Final", path: "/", pro: false },
      { name: "MTD Payments", path: "/", pro: false },
      { name: "Settings", path: "/", pro: false },
    ],
  },
  {
    icon: <LightbulbIcon />,
    name: "Progress Report",
    path: "/", //enter your path
    subItems: [
      { name: "Progress List", path: "/", pro: false },
      { name: "From Notes", path: "/", pro: false },
      { name: "Settings", path: "/", pro: false },
    ],
  },
  {
    icon: <TrendingUp />,
    name: "Activity Reports",
    path: "/", //enter your path
    subItems: [
      { name: "Activity List", path: "/", pro: false },
      { name: "Hourly Activity", path: "/", pro: false },
      { name: "Activity Summary", path: "/", pro: false },
      { name: "Settings", path: "/", pro: false },
    ],
  },
  {
    icon: <List />,
    name: "Full Task List",
    path: "/", //enter your path
    subItems: [
      { name: "List", path: "/", pro: false },
      { name: "Settings", path: "/", pro: false },
    ],
  },
];

const advancedaReportItems: NavItem[] = [
  {
    icon: <List />,
    name: "Summaries",
    path: "/", //enter your path
    subItems: [{ name: "Status Outcome", path: "/", pro: false }],
  },
  {
    icon: <BarChart2 />,
    name: "User Perfomance",
    path: "/", //enter your path
    subItems: [
      { name: "By Day", path: "/", pro: false },
      { name: "Cummulative (Monthly)", path: "/", pro: false },
    ],
  },
];
const generalItems: NavItem[] = [
  {
    icon: <MessageSquare />,
    name: "SMS",
    path: "/", //enter your path
    subItems: [
      { name: "Unsent", path: "/", pro: false },
      { name: "Received", path: "/", pro: false },
      { name: "Reports", path: "/", pro: false },
      { name: "Scheduled", path: "/", pro: false },
      { name: "Bulk SMS", path: "/", pro: false },
      { name: "Templates", path: "/", pro: false },
      { name: "Send Text SMS", path: "/", pro: false },
      { name: "Settings", path: "/", pro: false },
    ],
  },
  {
    icon: <MailIcon />,
    name: "Mails",
    path: "/", //enter your path
    subItems: [
      { name: "Reports", path: "/", pro: false },
      { name: "Scheduled", path: "/", pro: false },
      { name: "Bulk Mails", path: "/", pro: false },
    ],
  },
  {
    icon: <ArrowUpRight />,
    name: "Escalation",
    path: "/", //enter your path
    subItems: [
      { name: "Tasks", path: "/", pro: false },
      { name: "PTPs", path: "/", pro: false },
      { name: "Settings", path: "/", pro: false },
    ],
  },
  {
    icon: <UsersRound />,
    name: "Skip Trace",
    path: "/", //enter your path
    subItems: [
      { name: "Files Under Skip Trace", path: "/", pro: false },
      { name: "Skip Trace Sources", path: "/", pro: false },
    ],
  },
  {
    icon: <CalenderIcon />,
    name: "Targets",
    path: "/", //enter your path
    subItems: [
      { name: "Create", path: "/", pro: false },
      { name: "List", path: "/", pro: false },
      { name: "Upload For Users", path: "/", pro: false },
      { name: "Settings", path: "/", pro: false },
    ],
  },
  {
    icon: <Landmark />,
    name: "Clients",
    path: "/", //enter your path
    subItems: [
      { name: "Create", path: "/", pro: false },
      { name: "List", path: "/", pro: false },
      { name: "Client Types", path: "/", pro: false },
      { name: "External Access", path: "/", pro: false },
      { name: "Settings", path: "/", pro: false },
    ],
  },
  {
    icon: <UsersRound />,
    name: "Users",
    path: "/", //enter your path
    subItems: [
      { name: "List", path: "/", pro: false },
      { name: "Create", path: "/", pro: false },
      { name: "Create Bulk", path: "/", pro: false },
      { name: "Teams", path: "/", pro: false },
      { name: "Settings", path: "/", pro: false },
    ],
  },
  {
    icon: <DownloadIcon />,
    name: "Downloads",
    path: "/", //enter your path
    subItems: [
      { name: "Templates", path: "/", pro: false },
      { name: "Settings", path: "/", pro: false },
    ],
  },
];

const configurationItems: NavItem[] = [
  {
    icon: <Settings />,
    name: "Settings",
    path: "/", //enter your path
    subItems: [
      { name: "Debt Types", path: "/", pro: false },
      { name: "Debt Sub-Types", path: "/", pro: false },
      { name: "Debt Categories", path: "/", pro: false },
      { name: "Products", path: "/", pro: false },
      { name: "Contactability", path: "/", pro: false },
      { name: "Contact Types", path: "/", pro: false },
      { name: "Contact Statuses", path: "/", pro: false },
      { name: "Closure Reasons", path: "/", pro: false },
      { name: "Delinquency", path: "/", pro: false },
      { name: "Next Task Actions", path: "/", pro: false },
      { name: "Call Types", path: "/", pro: false },
      { name: "Non Payment Reasons", path: "/", pro: false },
      { name: "Payment channels", path: "/", pro: false },
      { name: "Income Sources", path: "/", pro: false },
      { name: "PTP Reschedule Reasons", path: "/", pro: false },
      { name: "Demand Letters", path: "/", pro: false },
      { name: "Case Files", path: "/", pro: false },
      { name: "Case View", path: "/", pro: false },
      { name: "Daily Reports", path: "/", pro: false },
    ],
  },
  {
    icon: <Briefcase />,
    name: "Company",
    path: "/", //enter your path
    subItems: [
      { name: "Details", path: "/", pro: false },
      { name: "Countries", path: "/", pro: false },
      { name: "Branches", path: "/", pro: false },
      { name: "Currencies", path: "/", pro: false },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    icon: <ShieldCheck />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin", pro: false },
      { name: "Sign Up", path: "/signup", pro: false },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => location.pathname === path;
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/smartcollect-logo.png"
                alt="Logo"
                width={150}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/smartcollect-logo.png"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <img
              src="/images/logo/smartcollect-logo.png"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  ""
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(dash, "main")}
            </div>

            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Accounts"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>

            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Actions"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(actionItems, "others")}
            </div>

            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Reports"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(reportsItems, "others")}
            </div>

            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Advanced Reports"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(advancedaReportItems, "others")}
            </div>

            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "General"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(generalItems, "others")}
            </div>

            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Configuration"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(configurationItems, "others")}
            </div>

            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
