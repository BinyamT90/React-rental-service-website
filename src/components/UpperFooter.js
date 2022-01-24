import React from "react";
import HomeIcon from '@material-ui/icons/Home'
import {
    Box,
    Container,
    Row,
    Column,
    FooterLink,
    Heading,
} from "./FooterStyle";

const UpperFooter = () => {
    return (
        <Box>

            <h1 style={{ color: "#443f3f",
                textAlign: "center",
                marginTop: "-50px" }}>

                <HomeIcon style={{color:'#B0C6BB',width:'80px',height:'70px',marginBottom:'-20px'}}> </HomeIcon>
                <span style={{color: '#ee662d'}}>A</span>genagn
            </h1>
            <Container>
                <Row>
                    <Column>
                        <Heading>About Us</Heading>
                        <FooterLink href="/About">Aim</FooterLink>
                        <FooterLink href="/About">Vision</FooterLink>
                        <FooterLink href="/ABout">BackGround</FooterLink>
                    </Column>
                    <Column>
                        <Heading>Services</Heading>
                        <FooterLink href="#">Contact with Owner</FooterLink>
                        <FooterLink href="#">Accept User Calls</FooterLink>
                        <FooterLink href="#">Contact with Broker</FooterLink>
                        <FooterLink href="#">Find less Press Houses</FooterLink>
                    </Column>
                    <Column>
                        <Heading>Contact Us</Heading>
                        <FooterLink href="#">Direct call</FooterLink>
                        <FooterLink href="#">Telegram Channel</FooterLink>
                        <FooterLink href="#">Facebook</FooterLink>
                        <FooterLink href="#">LinkedIn</FooterLink>
                    </Column>
                    <Column>
                        <Heading>Social Media</Heading>
                        <FooterLink href="#">
                            <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Facebook
                </span>
                            </i>
                        </FooterLink>
                        <FooterLink href="#">
                            <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  Instagram
                </span>
                            </i>
                        </FooterLink>
                        <FooterLink href="#">
                            <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Twitter
                </span>
                            </i>
                        </FooterLink>
                        <FooterLink href="#">
                            <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>
                  Youtube
                </span>
                            </i>
                        </FooterLink>
                    </Column>
                </Row>
            </Container>
        </Box>
    );
};
export default UpperFooter;
