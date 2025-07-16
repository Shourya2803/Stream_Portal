

import Navbar from '@/components/adminNavbar'
import Footer from '@/components/footer'
import StudentList from '@/components/studentList'
import React from 'react'

const page = () => {
  
  return (
    <>
   <Navbar  />
    <StudentList />
    <Footer/>
    </>
  )
}

export default page