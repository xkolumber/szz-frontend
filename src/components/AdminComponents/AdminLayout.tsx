import { ReactNode } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { navbar_admin_data } from "../../lib/functionsClient";

interface LayoutProps {
  children?: ReactNode;
}

function AdminLayout({ children }: LayoutProps) {
  let location = useLocation();
  return (
    <>
      <div className="flex flex-row">
        <div className="bg-[#6b9156] w-[350px] ">
          <div className="flex flex-col min-h-screen justify-between items-center  sticky top-0">
            <div className="flex flex-col items-center">
              <img src={logo} width={90} height={90} className="" />

              <Link to={"/admin"}>
                <h5 className="text-white mt-8">Admin</h5>
              </Link>
              <div className="flex flex-col mt-16 gap-4">
                {navbar_admin_data.map((object, index) => (
                  <Link to={object.slug} key={index}>
                    <p
                      className={`text-white ${
                        location.pathname === object.slug &&
                        "!font-bold underline"
                      }`}
                    >
                      {object.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
            <button
              // onClick={handleLogout}
              className="text-black !font-semibold cursor-pointer btn btn--tertiary
               no-print"
            >
              Odhlásiť sa
            </button>
          </div>
        </div>
        <main className="own_edge">
          <div className="main_section !pt-0"> {children || <Outlet />} </div>
        </main>
      </div>
    </>
  );
}

export default AdminLayout;
