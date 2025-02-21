import { TUserData } from "@/types/user";
import axiosInstance from "@/utils/axiosConfig";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<TUserData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getCurrentUser = async (role: string, endpoint: string) => {
    setLoading(true);
    try {
      const token = Cookies.get('access_token');
      if (!token) {
        throw new Error('Token not found');
      }
      
      const response = await axiosInstance.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = response.data.data;
      setCurrentUser(data)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const role = Cookies.get('role');
    if (role === 'admin') {
      getCurrentUser(role, '/api/admin/user/me')
    } else if (role === 'guest') {
      getCurrentUser(role, '/api/guest/user/me')
    } else if (role === 'tc') {
      getCurrentUser(role, '/api/tc/user/me')
    } else if (role === 'esr') {
      getCurrentUser(role, '/api/esr/user/me')
    }
  }, [])

  return { currentUser, loading }
}

export default useCurrentUser