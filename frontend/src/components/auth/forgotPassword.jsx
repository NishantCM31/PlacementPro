import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import Footer from "../shared/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoadingState] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setEmail(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoadingState(true);
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/forgot-password`, {
        email,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#E6EEF3] to-[#1d3c46]">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md p-8 my-10 bg-white border shadow-lg bg-opacity-20 border-white/30 rounded-xl backdrop-blur-lg"
        >
          <h1 className="mb-5 text-xl font-bold text-white">Forgot Password</h1>

          <div className="my-4">
            <Label className="text-white">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
              className="w-full mt-1"
            />
          </div>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Send Reset Link
            </Button>
          )}

          <span className="text-sm text-white">
            Remembered your password?{" "}
            <Link to="/login" className="text-black underline">
              Login
            </Link>
          </span>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
