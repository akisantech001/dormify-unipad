
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, User, ShieldCheck, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState("student");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    university: "",
    agencyName: "",
    licenseNumber: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, role: userRole });
    // TODO: Implement actual authentication logic
    navigate('/');
  };

  const roleOptions = [
    { value: "student", label: "Student", icon: User, description: "Find your perfect accommodation" },
    { value: "agent", label: "Real Estate Agent", icon: Building2, description: "List properties for students" },
    { value: "admin", label: "Admin", icon: ShieldCheck, description: "Manage and verify properties" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-3 rounded-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Dormify</h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Sign in to your account" : "Create your account"}
          </p>
        </div>

        <Card className="bg-white shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {isLogin ? "Welcome back" : "Get started"}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin ? "Enter your credentials to access your account" : "Choose your role and create your account"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection for Signup */}
              {!isLogin && (
                <div className="space-y-3">
                  <Label htmlFor="role">I am a:</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {roleOptions.map((role) => {
                      const IconComponent = role.icon;
                      return (
                        <div
                          key={role.value}
                          className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                            userRole === role.value
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setUserRole(role.value)}
                        >
                          <div className="flex items-center space-x-3">
                            <IconComponent className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-medium text-gray-900">{role.label}</p>
                              <p className="text-sm text-gray-500">{role.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Basic Information */}
              {!isLogin && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              {!isLogin && (
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              )}

              {/* Role-specific fields */}
              {!isLogin && userRole === "student" && (
                <div>
                  <Label htmlFor="university">University</Label>
                  <Select value={formData.university} onValueChange={(value) => handleInputChange("university", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your university" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="harvard">Harvard University</SelectItem>
                      <SelectItem value="mit">MIT</SelectItem>
                      <SelectItem value="stanford">Stanford University</SelectItem>
                      <SelectItem value="berkeley">UC Berkeley</SelectItem>
                      <SelectItem value="nyu">NYU</SelectItem>
                      <SelectItem value="columbia">Columbia University</SelectItem>
                      <SelectItem value="chicago">University of Chicago</SelectItem>
                      <SelectItem value="ucla">UCLA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {!isLogin && userRole === "agent" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="agencyName">Agency Name</Label>
                    <Input
                      id="agencyName"
                      type="text"
                      value={formData.agencyName}
                      onChange={(e) => handleInputChange("agencyName", e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="licenseNumber">License Number</Label>
                    <Input
                      id="licenseNumber"
                      type="text"
                      value={formData.licenseNumber}
                      onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
              )}

              {!isLogin && (
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              )}

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
