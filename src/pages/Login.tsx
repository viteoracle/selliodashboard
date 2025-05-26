import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { useLoginMutation } from "@/services/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/services/store/slices/authSlice";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials(result));
      
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      
      toast({
        title: "Success",
        description: "You've successfully logged in!",
      });
      
      // Navigate based on user role
      const userRole = result.user?.role;
      if (userRole === 'admin') {
        navigate("/admin/dashboard");
      } else if (userRole === 'seller') {
        navigate("/seller/dashboard");
      }  else if(userRole === 'customer') {
        navigate("/customer/dashboard");
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: error.data?.message || "Failed to login. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-sm border">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Sign in to your account</h1>
            <p className="text-gray-600 mt-2">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-market-600 hover:text-market-700">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[60%] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Remember me for 30 days
                </Label>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account?</span>{" "}
            <Link to="/signup" className="text-market-600 hover:text-market-700 font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
