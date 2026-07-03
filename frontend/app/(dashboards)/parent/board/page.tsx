"use client";

import UserAvatar from "boring-avatars";
import {
  BadgeCheckIcon,
  BellIcon,
  Bolt,
  ChevronsUpDownIcon,
  CreditCardIcon,
  House,
  LogOutIcon,
  type LucideIcon,
  SparklesIcon,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const user = {
  name: "testUser",
  email: "testuser@email.com",
  avatar: "avatar",
};

const studentLists = [
  {
    id: "1",
    name: "Alex Johnson",
  },
  {
    id: "2",
    name: "Sarah Chen",
  },
];

const HomeTab = ({
  student,
}: {
  student:
    | {
        id: string;
        name: string;
        avatar?: string;
      }
    | undefined;
}) => (
  <section>
    <div>
      <p>
        {student
          ? `Home Tab — ${student.name}`
          : "Home Tab — no student selected"}
      </p>
    </div>
  </section>
);

const SettingsTab = () => (
  <section>
    <div>Settingss Tab</div>
  </section>
);

const UserButton = ({
  username,
  email,
  avatar,
}: {
  username: string;
  email: string;
  avatar?: string;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger
      nativeButton={false}
      render={
        <div className="flex cursor-pointer items-center gap-2 rounded-full bg-secondary/50 p-2 hover:bg-secondary/70 aria-expanded:bg-secondary/50">
          <Avatar className="p-0">
            <AvatarImage alt={username} src={avatar} />
            <AvatarFallback className="p-0 [&_svg]:size-full">
              <UserAvatar
                className="object-fill"
                name={username}
                size="100%"
                variant="marble"
              />
            </AvatarFallback>
          </Avatar>
          <div className="hidden flex-1 text-left text-sm leading-tight md:grid">
            <span className="truncate font-medium">{username}</span>
            <span className="truncate text-xs">{email}</span>
          </div>
          <ChevronsUpDownIcon className="ml-auto size-4" />
        </div>
      }
    />
    <DropdownMenuContent
      align="end"
      className="w-fit transition-all duration-500"
      sideOffset={4}
    >
      <DropdownMenuGroup>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left">
            <Avatar>
              <AvatarImage alt={username} src={avatar} />
              <AvatarFallback className="p-0 [&_svg]:size-full">
                <UserAvatar
                  className="object-fill"
                  name={username}
                  size="100%"
                  variant="marble"
                />
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{username}</span>
              <span className="truncate text-xs">{email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <SparklesIcon />
          Upgrade to Pro
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <BadgeCheckIcon />
          Account
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCardIcon />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <BellIcon />
          Notifications
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LogOutIcon />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const SelectStudent = ({
  students,
  defaultValue,
  onValueChange,
  label = "Select a student",
}: {
  students: { id: string; name: string; avatar?: string; initials?: string }[];
  defaultValue?: {
    id: string;
    name: string;
    avatar?: string;
    initials?: string;
  };
  onValueChange?: (
    value: {
      id: string;
      name: string;
      avatar?: string;
      initials?: string;
    } | null
  ) => void;
  label?: string;
}) => (
  <Field className="w-full">
    <Select
      defaultValue={defaultValue ?? students[0]}
      items={students.map((s) => ({ label: s.name, value: s }))}
      onValueChange={onValueChange}
    >
      <SelectTrigger className="rounded-b-xl bg-accent/50 py-6 font-semibold text-md backdrop-blur-md">
        <SelectValue>
          {(item: (typeof students)[number]) => (
            <span className="flex items-center gap-2">
              <UserAvatar name={item.name} variant="beam" />
              <span>{item?.name}</span>
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {students.map((student) => (
            <SelectItem key={student.id} value={student}>
              <span className="flex items-center gap-2">
                <UserAvatar name={student.name} size="6" variant="beam" />
                <span>{student.name}</span>
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </Field>
);

export default function ParentBoard() {
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(
    studentLists[0] ?? null
  );
  const navsLink: {
    id: string;
    label: string;
    icon: LucideIcon;
    url: string;
    component: React.ReactNode;
  }[] = [
    {
      id: "1",
      label: "Home",
      icon: House,
      url: "#home",
      component: <HomeTab student={selectedStudent} />,
    },
    {
      id: "2",
      label: "Settings",
      icon: Bolt,
      url: "#settings",
      component: <SettingsTab />,
    },
  ];

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center gap-4 p-4">
      <Tabs
        className="w-full items-center justify-start"
        defaultValue={navsLink[0]?.id}
      >
        {navsLink.map((nav) => (
          <TabsContent key={nav.id} value={nav.id}>
            {nav.component}
          </TabsContent>
        ))}

        <div className="fixed top-auto bottom-4 flex w-full flex-col items-center justify-between gap-2 px-4 transition-all duration-500 sm:w-lg">
          <SelectStudent
            label="Choose a student"
            onValueChange={(student) => setSelectedStudent(student)}
            students={studentLists}
          />
          <nav
            className={
              "flex w-full items-center justify-evenly gap-6 rounded-t-xl rounded-b-4xl bg-accent/50 p-4 backdrop-blur-md"
            }
          >
            <TabsList>
              {navsLink.map((nav) => (
                <TabsTrigger key={nav.id} value={nav.id}>
                  {nav.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <Separator orientation="vertical" />
            <UserButton email={user.email} username={user.name} />
          </nav>
        </div>
      </Tabs>
    </section>
  );
}
