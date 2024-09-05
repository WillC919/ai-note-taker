import React from "react";
import { Container, Box } from "@mui/material";
import { SignIn } from "@clerk/nextjs";
import ResponsiveAppBar from "@/components/navbar";

// SignInPage component definition
const SignInPage: React.FC = () => {
  return (
    <Box>
      {/* App bar with userPresent set to false indicating no user is signed in */}
      <ResponsiveAppBar userPresent={false} />
      
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          paddingTop="100px"
        >
          <SignIn 
            signUpUrl="/sign-up" // Set the sign-up URL
          />
        </Box>
      </Container>
    </Box>
  );
}

export default SignInPage;
