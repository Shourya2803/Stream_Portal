"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast, { Toaster } from "react-hot-toast";

export default function Form() {
  type FormData = {
    name: string;
    email: string;
    phone: string;
    branch: string;
    english10: string;
    maths10: string;
    science10: string;
    hindi10: string;
    social10: string;
    physics12: string;
    chemistry12: string;
    maths12: string;
  };

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    branch: "",
    english10: "",
    maths10: "",
    science10: "",
    hindi10: "",
    social10: "",
    physics12: "",
    chemistry12: "",
    maths12: ""
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof FormData;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name) newErrors.name = "Required";
    if (!formData.email) newErrors.email = "Required";
    if (!formData.phone) newErrors.phone = "Required";
    if (!formData.branch) newErrors.branch = "Required";

    const class10Fields: (keyof FormData)[] = ["english10", "maths10", "science10", "hindi10", "social10"];
    class10Fields.forEach((field) => {
      const value = parseFloat(formData[field]);
      if (!formData[field] || isNaN(value) || value < 0 || value > 100) {
        newErrors[field] = "Marks must be between 0 and 100";
      }
    });

    const class12Fields: (keyof FormData)[] = ["physics12", "chemistry12", "maths12"];
    class12Fields.forEach((field) => {
      const value = parseFloat(formData[field]);
      if (!formData[field] || isNaN(value) || value < 0 || value > 100) {
        newErrors[field] = "Marks must be between 0 and 100";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

     if (res.ok) {
      toast.success("Form submitted successfully!");
          setFormData({
        name: "",
        email: "",
        phone: "",
        branch: "",
        english10: "",
        maths10: "",
        science10: "",
        hindi10: "",
        social10: "",
        physics12: "",
        chemistry12: "",
        maths12: ""
      });
    } else {
      const errorData = await res.json();
      if (errorData.error === "Student already registered") {
        toast.error("You have already filled the form.");
            setFormData({
        name: "",
        email: "",
        phone: "",
        branch: "",
        english10: "",
        maths10: "",
        science10: "",
        hindi10: "",
        social10: "",
        physics12: "",
        chemistry12: "",
        maths12: ""
      });
      } else {
        toast.error("Submission failed!");
      }
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  const renderInput = (name: keyof FormData, label: string, type = "text") => (
    <div className="space-y-2">
      <Label htmlFor={name}>{label} <span className="text-red-500">*</span></Label>
      <Input
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        placeholder={label}
        required
        max={type === "number" ? 100 : undefined}
        className={`transition hover:border-purple-400 hover:ring-purple-300 ${
          errors[name] ? "border-red-500" : ""
        }`}
      />
      {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen p-6 lg:p-12 bg-gradient-to-br from-purple-900 to-black text-white">
      <Toaster position="top-right" />
      <form className="max-w-5xl mx-auto space-y-8">
        {/* Section 1: Personal Details */}
        <Card className="bg-white/10 border border-white/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-xl text-white">Personal Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput("name", "Full Name")}
            {renderInput("email", "Email", "email")}
            {renderInput("phone", "Phone Number", "tel")}
            {renderInput("branch", "Branch Preference")}
          </CardContent>
        </Card>

        {/* Section 2: Class 10 Marks */}
        <Card className="bg-white/10 border border-white/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-xl text-white">Class 10 Marks</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderInput("english10", "English", "number")}
            {renderInput("maths10", "Mathematics", "number")}
            {renderInput("science10", "Science", "number")}
            {renderInput("hindi10", "Hindi", "number")}
            {renderInput("social10", "Social Science", "number")}
          </CardContent>
        </Card>

        {/* Section 3: Class 12 Marks */}
        <Card className="bg-white/10 border border-white/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-xl text-white">Class 12 Marks</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderInput("physics12", "Physics", "number")}
            {renderInput("chemistry12", "Chemistry", "number")}
            {renderInput("maths12", "Mathematics", "number")}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSubmit} type="button" className="hover:scale-105 transition bg-green-600 hover:bg-green-700 text-white">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
