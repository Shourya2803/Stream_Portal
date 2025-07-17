"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
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
  seatAccepted?: boolean | string;
}

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const filterVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.2,
    },
  },
};

const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const studentCardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.6, 1],
    },
  },
};

const cardHoverVariants: Variants = {
  hover: {
    scale: 1.02,
    y: -2,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.1,
    },
  },
};

const badgeVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.2,
    },
  },
};

const searchVariants: Variants = {
  focus: {
    scale: 1.02,
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
    transition: {
      duration: 0.2,
    },
  },
};

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [sortBy, setSortBy] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAccepted, setFilterAccepted] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/students");
        const data = await res.json();
        
        // Debug logs (keep your existing debug code)
        data.forEach((student: Student, index: number) => {
          // console.log(`Student ${index} - seatAccepted:`, student.seatAccepted, typeof student.seatAccepted);
        });
        
        setStudents(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch student data", error);
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Helper function to check if seat is accepted
  const isSeatAccepted = (student: Student) => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen p-6 lg:p-12 bg-background text-foreground">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-lg font-medium text-muted-foreground">Loading students...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen p-6 lg:p-12 bg-background text-foreground"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="max-w-7xl mx-auto border border-muted bg-card shadow-xl rounded-2xl overflow-hidden">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <motion.div variants={headerVariants}>
              <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                <motion.div variants={iconVariants}>
                  <GraduationCapIcon className="w-6 h-6 text-primary" />
                </motion.div>
                Registered Students
              </CardTitle>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
              variants={filterVariants}
            >
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <motion.div
                  whileFocus="focus"
                  variants={searchVariants}
                >
                  <Input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 text-sm"
                  />
                </motion.div>
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
            </motion.div>
          </div>
          <Separator className="mt-4" />
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[550px] w-full pr-2">
            <motion.div 
              className="grid gap-6"
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="wait">
                {filteredStudents.length === 0 ? (
                  <motion.div
                    key="no-students"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center text-muted-foreground py-20 text-lg font-medium"
                  >
                    😕 No student found.
                  </motion.div>
                ) : (
                  filteredStudents.map((student, index) => {
                    const isAccepted = isSeatAccepted(student);
                    
                    return (
                      <motion.div
                        key={student.id}
                        variants={studentCardVariants}
                        layout
                        layoutId={student.id}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <Link href={`/admin/students/${student.id}`}>
                          <motion.div
                            variants={cardHoverVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="block"
                          >
                            <Card className="cursor-pointer bg-muted/40 border border-border shadow-md hover:shadow-lg transition-shadow duration-300">
                              <CardContent className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                                <motion.div 
                                  className="flex items-start gap-3"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 }}
                                >
                                  <motion.div variants={iconVariants}>
                                    <UserIcon className="text-purple-500 w-5 h-5 mt-1" />
                                  </motion.div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Name</p>
                                    <p className="font-semibold">{student.name}</p>
                                  </div>
                                </motion.div>

                                <motion.div 
                                  className="flex items-start gap-3"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.2 }}
                                >
                                  <motion.div variants={iconVariants}>
                                    <BookOpenIcon className="text-indigo-500 w-5 h-5 mt-1" />
                                  </motion.div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Class 10 Marks</p>
                                    <p className="font-semibold">{student.total10}/500</p>
                                  </div>
                                </motion.div>

                                <motion.div 
                                  className="flex items-start gap-3"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.3 }}
                                >
                                  <motion.div variants={iconVariants}>
                                    <BookOpenIcon className="text-green-500 w-5 h-5 mt-1" />
                                  </motion.div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Class 12 Marks</p>
                                    <p className="font-semibold">{student.total12}/300</p>
                                  </div>
                                </motion.div>

                                <motion.div 
                                  className="flex items-start gap-3"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.4 }}
                                >
                                  <motion.div variants={iconVariants}>
                                    <GraduationCapIcon className="text-yellow-500 w-5 h-5 mt-1" />
                                  </motion.div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">1st Preference</p>
                                    <motion.div variants={badgeVariants}>
                                      <Badge
                                        variant="secondary"
                                        className="text-sm px-2 py-1 mt-1 bg-primary/10 border border-primary/30 text-primary"
                                      >
                                        {student.branchChoice1}
                                      </Badge>
                                    </motion.div>
                                  </div>
                                </motion.div>

                                <motion.div 
                                  className="flex items-start gap-3"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.5 }}
                                >
                                  <motion.div variants={iconVariants}>
                                    <CheckCircleIcon className={`w-5 h-5 mt-1 ${isAccepted ? 'text-green-500' : 'text-red-500'}`} />
                                  </motion.div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Seat Status</p>
                                    <motion.div variants={badgeVariants}>
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
                                    </motion.div>
                                  </div>
                                </motion.div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </Link>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </motion.div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
}