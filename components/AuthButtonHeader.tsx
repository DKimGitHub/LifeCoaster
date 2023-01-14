"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import headerStyles from "../styles/header.module.css";
import { Dropdown, Avatar, Text, } from "@nextui-org/react";

export default function AuthButtonHeader() {
  const { data: session } = useSession();
  // return !session ? (
  //   <label htmlFor="my-modal-4" className="btn-primary btn-sm btn">
  //     Login
  //   </label>
  // ) : 
  return (
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
          <Dropdown.Menu color="secondary" aria-label="Avatar Actions">
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                Signed in as
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
                zoey@example.com
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider>
              My Settings
            </Dropdown.Item>
            <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
            <Dropdown.Item key="logout" color="error" withDivider>
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
  );
}
