"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import headerStyles from "../styles/header.module.css";
import { Dropdown, Avatar, Text, Button } from "@nextui-org/react";

export default function AuthButtonHeader() {
  // const { data: session } = useSession();
  const session = true;
  // return !session ? (
  //   <label htmlFor="my-modal-4" className="btn-primary btn-sm btn">
  //     Login
  //   </label>
  // ) :
  return session ? (
    <Dropdown placement="bottom-right">
      <Dropdown.Trigger>
        <Avatar
          bordered
          size="lg"
          as="button"
          color="secondary"
          src={`https://api.dicebear.com/5.x/fun-emoji/svg?seed=test`}
        />
      </Dropdown.Trigger>
      <Dropdown.Menu
        color="secondary"
        aria-label="Avatar Actions"
        disabledKeys={["email"]}>
        <Dropdown.Item
          key="email"
          css={{ height: "$18", color: "var(--nextui-colors-text)" }}>
          <Text color="inherit" css={{ d: "flex", fontWeight: "500" }}>
            Signed in as
          </Text>
          <Text color="inherit" css={{ d: "flex", fontWeight: "500" }}>
            zoey@example.com
          </Text>
        </Dropdown.Item>
        <Dropdown.Item key="profile" withDivider>
          My Profile
        </Dropdown.Item>
        <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
        <Dropdown.Item key="logout" color="error" withDivider>
          <button onClick={() => signOut()}>Log Out</button>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ) : (
    //@ts-expect-error
    <Button as="label" htmlFor="my-modal-4" ghost color="primary" auto>
    LOGIN
   </Button>
  );
}
