import React, { useRef, useState } from "react";
import { ChakraProvider, Box, Container, Heading, Text, Avatar, HStack, Tag, Button, Flex, Link, Spacer, useDisclosure } from "@chakra-ui/react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import ResumeForm from './ResumeForm'; // Import the form component

function Resume() {
  const [resumeData, setResumeData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const resumeRef = useRef();
  
  const generatePDF = () => {
    html2canvas(resumeRef.current).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF({
        format: 'a4',
        unit: 'mm'
      });
      doc.addImage(imgData, 'PNG', 10, 10, 190, 0);
      doc.save("resume.pdf");
    });
  };

  const handleFormSubmit = (data) => {
    setResumeData(data);
    onClose();
  };

  return (
    <ChakraProvider>
      <Box>
        {/* Navigation Bar */}
        <Flex color="white" p={4} align="center" bg="teal.800">
          <Heading as="h1" size="md" color="white">Resume Builder</Heading>
          <Spacer />
          <Button colorScheme="red" _hover={{ bg: "green.500" }} onClick={generatePDF}>
            Download PDF
          </Button>
          <Button colorScheme="blue" ml={4} onClick={onOpen}>
            Create/Edit Resume
          </Button>
        </Flex>

        {isOpen && (
          <ResumeForm onSubmit={handleFormSubmit} onClose={onClose} />
        )}

        <Box ref={resumeRef} p={4} maxW="600px" mx="auto" fontSize="m">
          {resumeData ? (
            <Container>
              {/* Header Section */}
              <Flex direction="column" mb={6} bg="teal.900" color="white" p={4} borderRadius="md">
                <Flex direction="row" align="center">
                  <Avatar size="lg" src={resumeData.profilePic || require("../assets/profile-pic.png")} alt="Profile Picture" mr={4} />
                  <Box>
                    <Heading as="h1" size="lg" mb={1}>
                      {resumeData.name}
                    </Heading>
                    <Text fontSize="m">{resumeData.jobTitle || 'Full Stack Web Developer'}</Text>
                   
                  </Box>
                </Flex>
              </Flex>

              {/* Experience Section */}
              <Box mb={4}>

              <Heading as="h2" size="sm" mb={2}>Contact</Heading>

              <Text mt={2}>Phone: {resumeData.phone}</Text>
                    <Text>Email: {resumeData.email}</Text>
                    <Link href={resumeData.linkedin} isExternal>
                      <Text color="teal.600" mt={1}>LinkedIn</Text>
                    </Link>
                    <Link href={resumeData.github} isExternal>
                      <Text color="teal.600" mt={1}>GitHub</Text>
                    </Link>
                    <Link href={resumeData.portfolio} isExternal>
                      <Text color="teal.600" mt={1}>Portfolio</Text>
                    </Link>
              
                <Heading as="h2" size="sm" mb={2}>Experience</Heading>
                {resumeData.experiences.map((exp, index) => (
                  <Box key={index} mb={3}>
                    <Text fontWeight="bold">{exp.jobTitle} | {exp.company}</Text>
                    <Text>{exp.startDate} - {exp.endDate}</Text>
                    <Text>{exp.jobDescription}</Text>
                  </Box>
                ))}
              </Box>

              {/* Education Section */}
              <Box mb={4}>
                <Heading as="h2" size="sm" mb={2}>Education</Heading>
                {resumeData.education?.map((edu, index) => (
                  <Box key={index} mb={3}>
                    <Text fontWeight="bold">{edu.degree}</Text>
                    <Text>{edu.institution}</Text>
                    <Text>Graduation Date: {edu.graduationDate}</Text>
                  </Box>
                ))}
              </Box>

              {/* Skills Section */}
              <Box mb={4}>
                <Heading as="h2" size="sm" mb={2}>Skills</Heading>
                <Box mb={2}>
                  <Heading as="h3" size="xs" mb={1}>Technical Skills</Heading>
                  <HStack spacing={2} wrap="wrap">
                    {resumeData.technicalSkills.map((skill, index) => (
                      <Tag size="sm" key={index}>{skill}</Tag>
                    ))}
                  </HStack>
                </Box>
                <Box>
                  <Heading as="h3" size="xs" mb={1}>Soft Skills</Heading>
                  <HStack spacing={2} wrap="wrap">
                    {resumeData.softSkills.map((skill, index) => (
                      <Tag size="sm" key={index}>{skill}</Tag>
                    ))}
                  </HStack>
                </Box>
              </Box>

              {/* Hobbies Section */}
              <Box mb={4}>
                <Heading as="h2" size="sm" mb={2}>Hobbies/Interests</Heading>
                <Text>{resumeData.hobbies}</Text>
              </Box>

              {/* References Section */}
              <Box mb={4}>
                <Heading as="h2" size="sm" mb={2}>References</Heading>
                <Text>{resumeData.references}</Text>
              </Box>
            </Container>
          ) : (
            <Text>Fill in the form to create your resume.</Text>
          )}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default Resume;
