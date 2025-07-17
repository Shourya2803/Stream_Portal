"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  UserIcon,
  GraduationCapIcon,
  BookOpenIcon,
  FilterIcon,
  Search,
  CheckCircleIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Student {
  id: string;
  name: string;
  total10: number;
  total12: number;
  branchChoice1: string;
  seatAccepted?: boolean | string; // Allow both boolean and string
}

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [sortBy, setSortBy] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAccepted, setFilterAccepted] = useState("all");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/students");
        const data = await res.json();
        // console.log("API Response:", data); // Debug: Check what data is being returned
        // console.log("First student:", data[0]); // Debug: Check first student's structure
        // console.log("First student keys:", Object.keys(data[0] || {})); // Debug: Check all available fields
        
        // Debug: Check the seatAccepted values and other possible field names
        data.forEach((student: Student, index: number) => {
          // console.log(`Student ${index} - seatAccepted:`, student.seatAccepted, typeof student.seatAccepted);
          // console.log(`Student ${index} - seat_accepted:`, (student as any).seat_accepted, typeof (student as any).seat_accepted);
          // console.log(`Student ${index} - accepted:`, (student as any).accepted, typeof (student as any).accepted);
          // console.log(`Student ${index} - isAccepted:`, (student as any).isAccepted, typeof (student as any).isAccepted);
        });
        
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch student data", error);
      }
    };

    fetchStudents();
  }, []);

  // Helper function to check if seat is accepted
  const isSeatAccepted = (student: Student) => {
    // Since the DB field is seatAccepted (Boolean), handle undefined as false
    return student.seatAccepted === true;
  };

  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === "class10") return b.total10 - a.total10;
    if (sortBy === "class12") return b.total12 - a.total12;
    return 0;
  });

  const filteredStudents = sortedStudents.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesAccepted = true;
    const isAccepted = isSeatAccepted(student);
    
    if (filterAccepted === "accepted") {
      matchesAccepted = isAccepted;
    } else if (filterAccepted === "not-accepted") {
      matchesAccepted = !isAccepted;
    }
    
    return matchesSearch && matchesAccepted;
  });

  return (
    <div className="min-h-screen p-6 lg:p-12 bg-background text-foreground">
      <Card className="max-w-7xl mx-auto border border-muted bg-card shadow-xl rounded-2xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-2xl font-semibold flex items-center gap-2">
              <GraduationCapIcon className="w-6 h-6 text-primary" />
              Registered Students
            </CardTitle>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 text-sm"
                />
              </div>

              <div className="flex items-center gap-2">
                <FilterIcon className="w-5 h-5 text-muted-foreground" />
                <Select
                  onValueChange={(value) => setSortBy(value)}
                  defaultValue="none"
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Sort</SelectItem>
                    <SelectItem value="class10">Class 10 Marks</SelectItem>
                    <SelectItem value="class12">Class 12 Marks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-muted-foreground" />
                <Select
                  onValueChange={(value) => setFilterAccepted(value)}
                  defaultValue="all"
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="not-accepted">Not Accepted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Separator className="mt-4" />
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[550px] w-full pr-2">
            <div className="grid gap-6">
              {filteredStudents.length === 0 ? (
                <div className="text-center text-muted-foreground py-20 text-lg font-medium">
                  😕 No student found.
                </div>
              ) : (
                filteredStudents.map((student) => {
                  const isAccepted = isSeatAccepted(student);
                  
                  return (
                    <Link
                      key={student.id}
                      href={`/admin/students/${student.id}`}
                      className="block transition-all duration-300 hover:scale-[1.01]"
                    >
                      <Card className="cursor-pointer bg-muted/40 border border-border shadow-md hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                          <div className="flex items-start gap-3">
                            <UserIcon className="text-purple-500 w-5 h-5 mt-1" />
                            <div>
                              <p className="text-sm text-muted-foreground">Name</p>
                              <p className="font-semibold">{student.name}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <BookOpenIcon className="text-indigo-500 w-5 h-5 mt-1" />
                            <div>
                              <p className="text-sm text-muted-foreground">Class 10 Marks</p>
                              <p className="font-semibold">{student.total10}/500</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <BookOpenIcon className="text-green-500 w-5 h-5 mt-1" />
                            <div>
                              <p className="text-sm text-muted-foreground">Class 12 Marks</p>
                              <p className="font-semibold">{student.total12}/300</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <GraduationCapIcon className="text-yellow-500 w-5 h-5 mt-1" />
                            <div>
                              <p className="text-sm text-muted-foreground">1st Preference</p>
                              <Badge
                                variant="secondary"
                                className="text-sm px-2 py-1 mt-1 bg-primary/10 border border-primary/30 text-primary"
                              >
                                {student.branchChoice1}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <CheckCircleIcon className={`w-5 h-5 mt-1 ${isAccepted ? 'text-green-500' : 'text-red-500'}`} />
                            <div>
                              <p className="text-sm text-muted-foreground">Seat Status</p>
                              <Badge
                                variant={isAccepted ? "default" : "secondary"}
                                className={`text-sm px-2 py-1 mt-1 ${
                                  isAccepted 
                                    ? 'bg-green-100 border border-green-300 text-green-800' 
                                    : 'bg-red-100 border border-red-300 text-red-800'
                                }`}
                              >
                                {isAccepted ? 'Accepted' : 'Not Accepted'}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}