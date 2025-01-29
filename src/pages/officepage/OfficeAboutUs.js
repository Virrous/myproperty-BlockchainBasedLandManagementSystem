import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./officeaboutus.css";
import OfficeNav from "./OfficeNav";
const OfficeAboutUs = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const officeToken = localStorage.getItem("officeToken");
    if (!officeToken) {
      navigate("/OfficeLogin");
      return;
    }}, [navigate]);
  return (
    <>
    <OfficeNav />
    <div className="about-container">
      <h1>About Us</h1>
      <div className="about-content">
        <p>
          My Property System ensures efficiency and security for users,
          offering the convenience of 24/7 accessibility. Customers can
          initiate and manage property transfers, verify ownership details, and
          access related documentation anytime, eliminating the need for
          frequent visits to government offices. This system streamlines
          processes, reduces paperwork, and ensures that transactions are
          transparent and traceable, saving time and effort for all parties
          involved.
        </p>
        <p>
          Designed with advanced security measures, our platform safeguards
          sensitive information and ensures compliance with legal standards. By
          integrating features like real-time updates, secure document storage,
          and user-friendly interfaces, we aim to provide a seamless experience
          for buyers, sellers, and authorities. Your feedback and trust drive
          us to continually innovate and maintain our commitment to delivering
          a reliable and efficient land management solution.
        </p>
      </div>
      <h2>Meet Our Team</h2>
      <div className="about-team">
        {[
          {
            name: "Nabin Shrestha",
            role: "UI/UX Designer & Frontend",
            img: "https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-6/351456482_1288272632083848_8087138670846797495_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGVqQXjwH5-G23V0nUC7puz1sa17qLdscTWxrXuot2xxIQr144nq1HQo7TzRVwVMwMwsxWuciG0q0OINiJ_jr5T&_nc_ohc=GM8uIh05C28Q7kNvgEvXDNY&_nc_zt=23&_nc_ht=scontent.fktm8-1.fna&_nc_gid=Ae0WJdGuRDHehgt9q9o9JRK&oh=00_AYBJbqDVi1VuZ_3sPs_riAj60z2TSjngC_fYFuxJrZq2GQ&oe=673D579D",
          },
          {
            name: "Ashes Pokhrel",
            role: "Backend Developer",
            img: "https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-1/461495140_1827318691009863_7808022310339617455_n.jpg?stp=dst-jpg_s480x480&_nc_cat=103&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeFXpzGgKuTvlw-nXfKQdmI3DXpHc8Lw6qwNekdzwvDqrODinRfgq96ocTEeR_8B3rqnsxXTSeYy0FXkzdXapVuC&_nc_ohc=yCsVmlH1gEsQ7kNvgHFgDAS&_nc_zt=24&_nc_ht=scontent.fktm8-1.fna&_nc_gid=ACm129qqLynG4YMiiKHyFI-&oh=00_AYAhqEawUXYer0_0IARXRQ1D_JN0UYO3x8VK179FrPcl1g&oe=673D623E",
          },
          {
            name: "Manjil Timsina",
            role: "Backend Developer",
            img: "https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-6/280278469_530160065314508_8101824358480951481_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHb6fZcfihxql8hCbIklaTVMEaZsKurhjMwRpmwq6uGM13UuCQ4I4zGpatZH0nGvaYD3SPWiJ0U6oZXkQ0TRdgY&_nc_ohc=tFxzzi0kVvcQ7kNvgFYjQMj&_nc_zt=23&_nc_ht=scontent.fktm8-1.fna&_nc_gid=AElYHcwZkiA0r03pDW4Qz37&oh=00_AYBH9ZlNVN1MO1nePRqDgOGQFqBNBkocHNrc3stLIGjNCw&oe=673D420E",
          },
          {
            name: "Abiral Acharya",
            role: "Frontend & Tester",
            img: "https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-6/350823463_928360621775298_6442849610103322859_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFL_I7kch1dlOMf2tvLYl5YijLv7_cns_aKMu_v9yez9u0wcImaPD6bblM3GeUqXVxmQlt-US5OmIULhhybT9DX&_nc_ohc=QjlZerXp6o4Q7kNvgEucoHf&_nc_zt=23&_nc_ht=scontent.fktm8-1.fna&_nc_gid=AxErKbSJPygXrg7fk_g1jNO&oh=00_AYAhI6DOQ3w02bzB_edu3S5SySRMzT-x_lv1QJirRoQMPA&oe=673D4DE3",
          },
        ].map((member, index) => (
          <div className="team-member" key={index}>
            <img src={member.img} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
      
    </div>
    <footer>©️ 2024 Our Online System | All Rights Reserved</footer>
    </>
  );
};

export default OfficeAboutUs;
