"use client";

import { useEffect, useState } from "react";
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
}

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [sortBy, setSortBy] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/students");
        const data = await res.json();
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch student data", error);
      }
    };

    fetchStudents();
  }, []);

  // Sort students
  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === "class10") return b.total10 - a.total10;
    if (sortBy === "class12") return b.total12 - a.total12;
    return 0;
  });

  // Filter students based on search input
  const filteredStudents = sortedStudents.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 lg:p-12 bg-background text-foreground">
      <Card className="max-w-7xl mx-auto border border-muted bg-card shadow-xl rounded-2xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-2xl font-semibold flex items-center gap-2">
              <GraduationCapIcon className="w-6 h-6 text-primary" />
              Registered Students
            </CardTitle>

            {/* 🔍 Search and Sort Controls */}
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
                filteredStudents.map((student) => (
                  <Card
                    key={student.id}
                    className="bg-muted/40 border border-border shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
                  >
                    <CardContent className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
                          <p className="text-sm text-muted-foreground">
                            Class 10 Marks
                          </p>
                          <p className="font-semibold">{student.total10}/500</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <BookOpenIcon className="text-green-500 w-5 h-5 mt-1" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Class 12 Marks
                          </p>
                          <p className="font-semibold">{student.total12}/300</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <GraduationCapIcon className="text-yellow-500 w-5 h-5 mt-1" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            1st Preference
                          </p>
                          <Badge
                            variant="secondary"
                            className="text-sm px-2 py-1 mt-1 bg-primary/10 border border-primary/30 text-primary"
                          >
                            {student.branchChoice1}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
