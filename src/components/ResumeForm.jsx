import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast, FormHelperText, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaImage } from 'react-icons/fa';

const ResumeForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
//     phone: '',
//     email: '',
//     jobTitle: '',
//     linkedin: '',
//     github: '',
//     portfolio: '',
//     profilePic: '',
//     experiences: [
//       { jobTitle: '', company: '', startDate: '', endDate: '', jobDescription: '' }
//     ],
//     education: [
//       { degree: '', institution: '', graduationDate: '' }
//     ],
//     technicalSkills: [],
//     softSkills: [],
//     hobbies: '',
//     references: '',
//   });

// using dummy data 

name: "Kuntal Kumar",
phone: "+917908295742",
email: "kuntalkumar789@gmail.com",
jobTitle: "Full Stack Web Developer",
linkedin: "https://www.linkedin.com/in/kuntal-kumar-621205236/",
github: "https://github.com/kuntalkumar",
portfolio: "kuntalkumar.github.io",
profilePic: "../assets/profile-pic.png",
experiences: [
  { jobTitle: "Operation Executive", company: "Finovation Tech Solution Pvt Ltd", startDate: "2022-05-19", endDate: "2024-08-13", jobDescription: "Worked on operations" },
],
education: [
    { degree: "Full Stack Web Development", institution: "Masai School", graduationDate: "2024-04-01" }

    ,
  { degree: "Bachelore in Electronics And Communication Engineering ", institution: "Bengal Institute Of Technology And Management", graduationDate: "2025-05-01" }
],
technicalSkills: ["HTML","CSS","JavaScript", "React", "Node.js","Express", "MongoDB"],
softSkills: ["Communication", "Teamwork", "Problem-Solving", "Adaptability"],
hobbies: "Hiking, Reading, Traveling",
references: "Available upon request"
});


/// till this part


  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const experiences = [...formData.experiences];
    experiences[index] = { ...experiences[index], [name]: value };
    setFormData({ ...formData, experiences });
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const education = [...formData.education];
    education[index] = { ...education[index], [name]: value };
    setFormData({ ...formData, education });
  };

  const handleSkillsChange = (e, type) => {
    setFormData({
      ...formData,
      [type]: e.target.value.split(',').map(skill => skill.trim())
    });
  };



  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, profilePic: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    toast({
      title: "Resume updated.",
      description: "Your resume has been updated successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        {/* Personal Details */}
        <FormControl mb={4}>
          <FormLabel>Name</FormLabel>
          <Input name="name" value={formData.name} onChange={handleChange} required />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Phone</FormLabel>
          <Input name="phone" value={formData.phone} onChange={handleChange} required />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input name="email" value={formData.email} onChange={handleChange} type="email" required />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Job Title</FormLabel>
          <Input name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>LinkedIn Profile</FormLabel>
          <Input name="linkedin" value={formData.linkedin} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>GitHub Profile</FormLabel>
          <Input name="github" value={formData.github} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Portfolio Link</FormLabel>
          <Input name="portfolio" value={formData.portfolio} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Profile Picture</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaImage color="gray.300" />
            </InputLeftElement>
            <Input type="file" accept="image/*" onChange={handleProfilePicChange} />
          </InputGroup>
        </FormControl>

        {/* Experience Section */}
        {formData.experiences.map((exp, index) => (
          <Box key={index} mb={4}>
            <FormLabel>Experience {index + 1}</FormLabel>
            <FormControl mb={2}>
              <FormLabel>Job Title</FormLabel>
              <Input name="jobTitle" value={exp.jobTitle} onChange={(e) => handleExperienceChange(index, e)} required />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Company</FormLabel>
              <Input name="company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} required />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Start Date</FormLabel>
              <Input name="startDate" type="date" value={exp.startDate} onChange={(e) => handleExperienceChange(index, e)} required />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>End Date</FormLabel>
              <Input name="endDate" type="date" value={exp.endDate} onChange={(e) => handleExperienceChange(index, e)} />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Job Description</FormLabel>
              <Textarea name="jobDescription" value={exp.jobDescription} onChange={(e) => handleExperienceChange(index, e)} />
            </FormControl>
          </Box>
        ))}
        <Button type="button" onClick={() => setFormData({
          ...formData,
          experiences: [...formData.experiences, { jobTitle: '', company: '', startDate: '', endDate: '', jobDescription: '' }]
        })}>Add More Experience</Button>

        {/* Education Section */}
        {formData.education.map((edu, index) => (
          <Box key={index} mb={4}>
            <FormLabel>Education {index + 1}</FormLabel>
            <FormControl mb={2}>
              <FormLabel>Degree</FormLabel>
              <Input name="degree" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} required />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Institution</FormLabel>
              <Input name="institution" value={edu.institution} onChange={(e) => handleEducationChange(index, e)} required />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Graduation Date</FormLabel>
              <Input name="graduationDate" type="date" value={edu.graduationDate} onChange={(e) => handleEducationChange(index, e)} required />
            </FormControl>
          </Box>
        ))}
        <Button type="button" onClick={() => setFormData({
          ...formData,
          education: [...formData.education, { degree: '', institution: '', graduationDate: '' }]
        })}>Add More Education</Button>

        {/* Skills Section */}
        <FormControl mb={4}>
          <FormLabel>Technical Skills (comma-separated)</FormLabel>
          <Input value={formData.technicalSkills.join(', ')} onChange={(e) => handleSkillsChange(e, 'technicalSkills')} />
          <FormHelperText>e.g. JavaScript, React, Node.js</FormHelperText>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Soft Skills (comma-separated)</FormLabel>
          <Input value={formData.softSkills.join(', ')} onChange={(e) => handleSkillsChange(e, 'softSkills')} />
          <FormHelperText>e.g. Communication, Teamwork, Problem-Solving</FormHelperText>
        </FormControl>

        {/* Hobbies Section */}
        <FormControl mb={4}>
          <FormLabel>Hobbies/Interests</FormLabel>
          <Textarea name="hobbies" value={formData.hobbies} onChange={handleChange} />
        </FormControl>

        {/* References Section */}
        <FormControl mb={4}>
          <FormLabel>References</FormLabel>
          <Textarea name="references" value={formData.references} onChange={handleChange} />
        </FormControl>

        <Button colorScheme="blue" type="submit">Save Resume</Button>
      </form>
    </Box>
  );
};

export default ResumeForm;
