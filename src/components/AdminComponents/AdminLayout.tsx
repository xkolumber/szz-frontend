import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { navbar_admin_data } from "../../lib/functionsClient";

interface LayoutProps {
  children?: ReactNode;
}

function AdminLayout({ children }: LayoutProps) {
  let location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async (e: any) => {
    // setIsLoading(true);
    e.preventDefault();

    // try {
    //   const response = await fetch(`${API_URL_AMIN}/logout`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });

    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }

    //   const responseData = await response.json();
    //   console.log(responseData.message);
    //   if (responseData.message === "Successfully logged out") {
    //     toast.success("Boli ste úspešne odhlásený");
    //     localStorage.removeItem("token");
    //   }
    // } catch (err) {
    //   toast.error("Niečo sa pokaziloo");
    //   console.log(err);
    // }
    // setIsLoading(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-row">
        <div className="bg-[#6b9156] w-[350px] ">
          <div className="flex flex-col min-h-screen justify-between items-center  sticky top-0">
            <div className="flex flex-col items-center">
              <img src={logo} width={90} height={90} className="!mt-8" />

              <Link to={"/admin"}>
                <h5 className="text-white mt-8">Admin</h5>
              </Link>
              <div className="flex flex-col mt-16 gap-4">
                {navbar_admin_data.map((object, index) => (
                  <Link to={object.slug} key={index}>
                    <p
                      className={`text-white ${
                        location.pathname.startsWith(object.slug) &&
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
              onClick={handleLogout}
              className="text-black !font-semibold cursor-pointer btn btn--tertiary !mb-8
               no-print"
            >
              Odhlásiť sa
            </button>
          </div>
        </div>
        <main className="own_edge w-full">
          <div className="main_section "> {children || <Outlet />} </div>
        </main>
      </div>
    </>
  );
}

export default AdminLayout;
