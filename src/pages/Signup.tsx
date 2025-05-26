
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { Shield, User, Mail, Lock, IdCard, UserPlus } from "lucide-react";
import { useRegisterSellerMutation, useRegisterCustomerMutation } from "@/services/api/authApi";

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [userType, setUserType] = useState<'customer' | 'seller'>('customer');
  
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    agreeTerms: false
  });
  
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [idPreview, setIdPreview] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setIdDocument(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setIdPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [registerCustomer, { isLoading: isCustomerLoading }] = useRegisterCustomerMutation();
  const [registerSeller, { isLoading: isSellerLoading }] = useRegisterSellerMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Base validation for all users
    if (!formData.fullName || !formData.email || !formData.password || 
        !formData.confirmPassword || !formData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Seller-specific validation
    if (userType === 'seller' && (!formData.businessName || !formData.address || !idDocument)) {
      toast({
        title: "Error",
        description: "Please complete all seller information",
        variant: "destructive",
      });
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('phoneNumber', formData.phone);

      if (userType === 'seller') {
        formDataToSend.append('businessName', formData.businessName);
        formDataToSend.append('businessAddress', formData.address);
        if (idDocument) {
          formDataToSend.append('governmentId', idDocument);
        }
        await registerSeller(formDataToSend).unwrap();
      } else {
        await registerCustomer(formDataToSend).unwrap();
      }

      toast({
        title: "Success",
        description: userType === 'seller' 
          ? "Registration successful! Proceeding to verification."
          : "Registration successful! Please check your email for OTP verification.",
      });

      // Navigate based on user type
      if (userType === 'seller') {
        navigate("/otp-verification", { 
          state: { 
            email: formData.email,
            phone: formData.phone,
            type: 'seller'
          }
        });
      } else {
        navigate("/otp-verification", { 
          state: { 
            email: formData.email,
            type: 'customer'
          }
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-gradient-to-b from-market-100 to-white">
        <Card className="w-full max-w-xl shadow-xl border-market-200 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-market-400 to-market-600"></div>
          
          <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-market-50 to-white">
            <div className="mx-auto bg-market-100 rounded-full w-16 h-16 flex items-center justify-center mb-2 shadow-md">
              <Shield className="text-market-600 h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold text-market-700">Sellio Registration</h1>
            <p className="text-gray-600 text-sm">
              Join our growing marketplace community
            </p>
            
            <div className="flex justify-center gap-2 mt-4">
              <Button
                type="button"
                variant={userType === 'customer' ? 'default' : 'outline'}
                onClick={() => setUserType('customer')}
                className={userType === 'customer' 
                  ? "bg-market-600 hover:bg-market-700 transition-all duration-300 border-2 border-market-600 px-6" 
                  : "hover:bg-market-50 transition-all duration-300 border-2"}
                size="sm"
              >
                <User className="mr-1 h-4 w-4" /> Customer
              </Button>
              <Button
                type="button"
                variant={userType === 'seller' ? 'default' : 'outline'}
                onClick={() => setUserType('seller')}
                className={userType === 'seller' 
                  ? "bg-market-600 hover:bg-market-700 transition-all duration-300 border-2 border-market-600 px-6" 
                  : "hover:bg-market-50 transition-all duration-300 border-2"}
                size="sm"
              >
                <UserPlus className="mr-1 h-4 w-4" /> Seller
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Personal Information Section */}
              <div className="space-y-4 rounded-lg bg-gray-50 p-4 border border-gray-100">
                <h3 className="font-medium text-market-700 flex items-center gap-2 pb-1 border-b border-gray-200">
                  <User className="h-4 w-4" /> Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="fullName" className="text-gray-700">Full Name*</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="border-gray-200 focus:border-market-300 focus:ring focus:ring-market-200 focus:ring-opacity-50"
                    />
                  </div>
                  
                  {userType === 'seller' && (
                    <div className="space-y-1.5">
                      <Label htmlFor="businessName" className="text-gray-700">Business Name*</Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Your Business LLC"
                        className="border-gray-200 focus:border-market-300 focus:ring focus:ring-market-200 focus:ring-opacity-50"
                      />
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-gray-700">Email Address*</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="pl-10 border-gray-200 focus:border-market-300 focus:ring focus:ring-market-200 focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-gray-700">Phone Number*</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="border-gray-200 focus:border-market-300 focus:ring focus:ring-market-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>

                {userType === 'seller' && (
                  <div className="space-y-1.5">
                    <Label htmlFor="address" className="text-gray-700">Business Address*</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Market St, City, State, ZIP"
                      className="border-gray-200 focus:border-market-300 focus:ring focus:ring-market-200 focus:ring-opacity-50"
                    />
                  </div>
                )}
              </div>
              
              {/* Security Information */}
              <div className="space-y-4 rounded-lg bg-gray-50 p-4 border border-gray-100">
                <h3 className="font-medium text-market-700 flex items-center gap-2 pb-1 border-b border-gray-200">
                  <Lock className="h-4 w-4" /> Security Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="password" className="text-gray-700">Password*</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="pl-10 border-gray-200 focus:border-market-300 focus:ring focus:ring-market-200 focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password*</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="pl-10 border-gray-200 focus:border-market-300 focus:ring focus:ring-market-200 focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* ID Verification */}
              {userType === 'seller' && (
                <div className="space-y-4 rounded-lg bg-gray-50 p-4 border border-gray-100">
                  <h3 className="font-medium text-market-700 flex items-center gap-2 pb-1 border-b border-gray-200">
                    <IdCard className="h-4 w-4" /> Identity Verification
                  </h3>
                  
                  <div className="border-dashed border-2 border-gray-300 rounded-md p-4 text-center bg-white">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                      className="hidden"
                    />
                    
                    {!idPreview ? (
                      <div className="py-6">
                        <IdCard className="mx-auto h-14 w-14 text-market-400" />
                        <p className="mt-2 text-sm text-gray-600">Upload a valid government ID (Passport, Driver's License, ID Card)</p>
                        <Button 
                          type="button"
                          variant="outline" 
                          onClick={() => fileInputRef.current?.click()}
                          className="mt-3 border-market-300 text-market-700 hover:bg-market-50"
                        >
                          Select File
                        </Button>
                      </div>
                    ) : (
                      <div className="py-3">
                        {idDocument?.type.startsWith('image/') ? (
                          <div className="relative">
                            <img src={idPreview} alt="ID Preview" className="max-h-40 mx-auto object-contain rounded-md border border-gray-200" />
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 rounded-md flex items-center justify-center">
                              <Button 
                                type="button"
                                variant="outline" 
                                size="sm"
                                onClick={() => fileInputRef.current?.click()}
                                className="opacity-0 hover:opacity-100 bg-white"
                              >
                                Change
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2 text-market-600 py-3 px-4 bg-market-50 rounded-md">
                            <IdCard className="h-6 w-6" />
                            <span className="font-medium">{idDocument?.name}</span>
                            <Button 
                              type="button"
                              variant="outline" 
                              size="sm"
                              onClick={() => fileInputRef.current?.click()}
                              className="ml-2 border-market-300 text-market-700 hover:bg-market-50"
                            >
                              Change
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2 pt-2 px-1">
                <Checkbox 
                  id="agreeTerms" 
                  checked={formData.agreeTerms} 
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({...prev, agreeTerms: checked === true}))
                  }
                  className="border-market-400 text-market-600 data-[state=checked]:bg-market-600"
                />
                <Label htmlFor="agreeTerms" className="text-sm leading-tight text-gray-700">
                  I agree to the <Link to="#" className="text-market-600 hover:underline">terms and conditions</Link>, including the <Link to="#" className="text-market-600 hover:underline">privacy policy</Link> and <Link to="#" className="text-market-600 hover:underline">seller agreement</Link>.
                </Label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-market-600 hover:bg-market-700 shadow-md hover:shadow-lg transition-all duration-300 mt-4"
                disabled={userType === 'seller' ? isSellerLoading : isCustomerLoading}
              >
                {userType === 'seller' 
                  ? (isSellerLoading ? "Creating Account..." : "Create Seller Account")
                  : (isCustomerLoading ? "Creating Account..." : "Create Customer Account")
                }
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="border-t border-gray-100 bg-gray-50 flex flex-col items-center text-center py-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-market-600 hover:text-market-700 font-medium">
                Sign in
              </Link>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Protected by industry-standard encryption and security measures
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Signup;
