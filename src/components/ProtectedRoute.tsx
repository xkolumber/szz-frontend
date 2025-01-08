import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AdminLayout from "./AdminComponents/AdminLayout";
import { ClipLoader } from "react-spinners";

const ProtectedRoutes = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  async function checkIfAdmin() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/checkadmin`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      } else {
        throw new Error("Failed to verify admin status");
      }
    } catch (error) {
      console.error(error);
      setIsAdmin(false);
    }
  }

  useEffect(() => {
    checkIfAdmin();
  }, []);

  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <ClipLoader size={80} color={"#000000"} loading={true} />
      </div>
    );
  }

  return isAdmin ? <AdminLayout /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
