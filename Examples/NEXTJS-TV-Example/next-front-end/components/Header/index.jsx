import React from "react";
import { Navbar, Button, Link, Text, Card, Image } from "@nextui-org/react";
const Header = () => {
  return (
    <Navbar
      css={{
        m: 10,
        alignSelf: "center",
        backgroundColor: "transparent",
        shadow: "$xl",
        borderRadius: "$md",
      }}
      borderWeight="bold"
    >
      <Navbar.Brand css={{ justifyContent: "space-between", gap: "$10" }}>
        <Image src="/images/pendax.jpg" width={60} height={60} />
        <Text b color="inherit" hideIn="xs">
          Pendax Trading View
        </Text>
      </Navbar.Brand>
    </Navbar>
  );
};

export default Header;
