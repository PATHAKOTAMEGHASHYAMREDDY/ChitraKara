import React from "react";
import { FaLinkedin } from "react-icons/fa"; // Import LinkedIn icon
import "../styles/team.css"; // Assuming you'll add a CSS file for styling

function Team() {
  // Sample team data (replace with your actual team info)
  const teamMembers = [
    {
      name: "PATHAKOTA MEGHA SHYAM REDDY",
      linkedin: "https://www.linkedin.com/in/megha-shyam-reddy-pathakota-b0703b265/",
    },
    {
      name: "P MANJUNATH",
      linkedin: "https://www.linkedin.com/in/manjunath-reddy-36972a268",
    },
    {
      name: "K BALA RAJESH",
      linkedin: "https://www.linkedin.com/in/kunapareddy-bala-rajesh-137a21214",
    },
    {
        name: "SAYED ABDUL BIYA BANI",
        linkedin: "http://www.linkedin.com/in/abdul-biya-bani-sayed-4b5b05253",
      },
      {
        name: "R MANI KUMAR",
        linkedin: "https://www.linkedin.com/in/rajana-mani-kumar-2bbb59323/",
      },

  ];

  return (
    <div className="team-container">
      <h1>Meet Our Team</h1>
      <div className="team-list">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <span className="member-name">{member.name}</span>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-link"
            >
              <FaLinkedin className="linkedin-icon" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;