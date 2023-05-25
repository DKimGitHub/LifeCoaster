"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Dropdown, Avatar, Text, Button } from "@nextui-org/react";

export default function AuthButtonHeader() {
  const { data: session } = useSession();
  return session ? (
    <Dropdown placement="bottom-right">
      <Dropdown.Trigger>
        <Avatar
          className="border-[3px] border-[#A66908]"
          size="lg"
          src={`https://api.dicebear.com/5.x/fun-emoji/svg?seed=${session.user?.email}`}
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
            {session.user?.email}
          </Text>
        </Dropdown.Item>
        <Dropdown.Item key="profile" withDivider>
          <button onClick={()=>{console.log(session)}}>My Profile</button>
        </Dropdown.Item>
        <Dropdown.Item key="team_settings">Settings</Dropdown.Item>
        <Dropdown.Item key="logout" color="error" withDivider>
          <button onClick={() => signOut()}>Log Out</button>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ) : (
    //@ts-expect-error
    <Button className="px-3" as="label" htmlFor="my-modal-4" ghost color="primary" auto>
      LOGIN
    </Button>
  );
}
