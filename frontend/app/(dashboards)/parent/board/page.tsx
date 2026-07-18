"use client";

import UserAvatar from "boring-avatars";
import {
  ArrowUpRight,
  BadgeCheckIcon,
  BadgeInfo,
  BellIcon,
  ChevronsUpDownIcon,
  CreditCardIcon,
  Goal,
  House,
  LogOutIcon,
  Megaphone,
  NotebookTabs,
  Radio,
  SparklesIcon,
  SquareDashedText,
  UserCheck,
  UserMinus,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Frame,
  FrameDescription,
  FrameFooter,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/ui/frame";
import { Prose } from "@/components/ui/prose";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  useTabs,
} from "@/components/ui/tabs";
import { type Student, studentLists, user } from "@/utils/types/student-types";

const HomeTab = ({ student }: { student: Student | undefined }) => {
  const tabs = useTabs();
  return (
    <section className="flex w-screen flex-col justify-center gap-6 px-4 sm:w-4xl">
      <div className="grid w-full grid-cols-1 gap-6">
        <Frame className="w-full">
          <FrameHeader>
            <FrameTitle className="flex items-center gap-2">
              <Megaphone />
              Announcements
            </FrameTitle>
            <FrameDescription>Recent Memo's below</FrameDescription>
          </FrameHeader>
          <span className="grid grid-cols-1 gap-2">
            <FramePanel className="flex flex-col justify-center">
              <div className="flex items-center gap-2 text-primary">
                <Goal size={28} />
                <h2 className="flex flex-col items-center justify-start font-semibold">
                  section-name
                  <p className="text-muted-foreground text-xs">
                    — teacher name
                  </p>
                </h2>
              </div>
              <Prose className="flex w-full flex-col pt-6">
                <h3>The Joke Tax</h3>
                <blockquote>
                  "After all," he said, "everyone enjoys a good joke, so it's
                  only fair that they should pay for the privilege."
                </blockquote>
                <Badge className="w-fit self-end" size="md" variant="info">
                  Ongoing — Jul 28
                </Badge>
              </Prose>
            </FramePanel>
          </span>
          <FrameFooter className="flex items-center justify-end">
            <p className="text-muted-foreground text-sm">
              <Button onClick={() => tabs.setValue("3")}>
                See all memo's
                <ArrowUpRight />
              </Button>
            </p>
          </FrameFooter>
        </Frame>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
        {student ? (
          <>
            <Frame className="w-full">
              <FrameHeader>
                <FrameTitle className="flex items-center gap-2">
                  <BadgeInfo />
                  Today's Timestamp
                </FrameTitle>
                <FrameDescription>
                  Attendance of <u>{student.name}</u> for today
                </FrameDescription>
              </FrameHeader>
              <span className="grid grid-cols-2">
                <FramePanel className="flex flex-col items-center justify-center gap-4 text-success">
                  <h2 className="flex items-center gap-2 font-semibold text-sm">
                    <UserCheck />
                    Time-in
                  </h2>
                  <Badge className="font-mono" size="lg" variant="success">
                    {student.data.timein ? student.data.timein : "—"}
                  </Badge>
                </FramePanel>
                <FramePanel className="flex flex-col items-center justify-center gap-4 text-info">
                  <h2 className="flex items-center gap-2 font-semibold text-sm">
                    <UserMinus />
                    Time-out
                  </h2>
                  <Badge className="font-mono" size="lg" variant="info">
                    {student.data.timeout ? student.data.timeout : "—"}
                  </Badge>
                </FramePanel>
              </span>
              <FrameFooter className="flex items-center justify-end">
                <p className="text-muted-foreground text-sm">
                  <Button onClick={() => tabs.setValue("2")}>
                    See full Records
                    <ArrowUpRight />
                  </Button>
                </p>
              </FrameFooter>
            </Frame>
            <Frame className="w-full">
              <FrameHeader>
                <FrameTitle className="flex items-center gap-2">
                  <BadgeInfo />
                  Today's Timestamp
                </FrameTitle>
                <FrameDescription>
                  Timestamp for {student.name}
                </FrameDescription>
              </FrameHeader>
              <span className="grid grid-cols-2">
                <FramePanel className="flex flex-col items-center justify-center gap-4 text-success">
                  <h2 className="flex items-center gap-2 font-semibold text-sm">
                    <UserCheck />
                    Time-in
                  </h2>
                  <Badge className="font-mono" size="lg" variant="success">
                    {student.data.timein ? student.data.timein : "—"}
                  </Badge>
                </FramePanel>
                <FramePanel className="flex flex-col items-center justify-center gap-4 text-info">
                  <h2 className="flex items-center gap-2 font-semibold text-sm">
                    <UserMinus />
                    Time-out
                  </h2>
                  <Badge className="font-mono" size="lg" variant="info">
                    {student.data.timeout ? student.data.timeout : "—"}
                  </Badge>
                </FramePanel>
              </span>
              <FrameFooter className="flex items-center justify-end">
                <p className="text-muted-foreground text-sm">
                  <Button onClick={() => tabs.setValue("2")}>
                    See full Records
                    <ArrowUpRight />
                  </Button>
                </p>
              </FrameFooter>
            </Frame>{" "}
            <Frame className="w-full">
              <FrameHeader>
                <FrameTitle className="flex items-center gap-2">
                  <BadgeInfo />
                  Today's Timestamp
                </FrameTitle>
                <FrameDescription>
                  Timestamp for {student.name}
                </FrameDescription>
              </FrameHeader>
              <span className="grid grid-cols-2">
                <FramePanel className="flex flex-col items-center justify-center gap-4 text-success">
                  <h2 className="flex items-center gap-2 font-semibold text-sm">
                    <UserCheck />
                    Time-in
                  </h2>
                  <Badge className="font-mono" size="lg" variant="success">
                    {student.data.timein ? student.data.timein : "—"}
                  </Badge>
                </FramePanel>
                <FramePanel className="flex flex-col items-center justify-center gap-4 text-info">
                  <h2 className="flex items-center gap-2 font-semibold text-sm">
                    <UserMinus />
                    Time-out
                  </h2>
                  <Badge className="font-mono" size="lg" variant="info">
                    {student.data.timeout ? student.data.timeout : "—"}
                  </Badge>
                </FramePanel>
              </span>
              <FrameFooter className="flex items-center justify-end">
                <p className="text-muted-foreground text-sm">
                  <Button onClick={() => tabs.setValue("2")}>
                    See full Records
                    <ArrowUpRight />
                  </Button>
                </p>
              </FrameFooter>
            </Frame>{" "}
          </>
        ) : (
          <p>No student selected</p>
        )}
      </div>
    </section>
  );
};

const RecordsTab = ({ student }: { student: Student | undefined }) => (
  <section className="w-screen max-w-4xl px-4">
    <Frame className="w-full">
      <FrameHeader>
        <FrameTitle className="flex items-center gap-2">
          <SquareDashedText />
          Student Records
        </FrameTitle>
        <FrameDescription>{student?.name} Records</FrameDescription>
      </FrameHeader>
      <FramePanel>
        {student ? (
          <Table className="w-full" isHoverable={false}>
            <TableCaption className="sr-only">
              Table with row hover disabled (isHoverable=false).
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time-in</TableHead>
                <TableHead>Time-out</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentLists.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.data.timein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No Student Selected</p>
        )}
      </FramePanel>
    </Frame>
  </section>
);

const MemoTab = () => (
  <section className="w-screen max-w-4xl px-4">
    <Frame className="w-full">
      <FrameHeader>
        <FrameTitle className="flex items-center gap-2">
          <Radio />
          Memo's
        </FrameTitle>
        <FrameDescription>View All Memo's below</FrameDescription>
      </FrameHeader>
      <span className="grid grid-cols-1 gap-2">
        <FramePanel className="flex flex-col justify-center">
          <div className="flex items-center gap-2 text-primary">
            <Goal size={28} />
            <h2 className="flex flex-col items-center justify-start font-semibold">
              section-name
              <p className="text-muted-foreground text-xs">— teacher name</p>
            </h2>
          </div>
          <Prose className="flex w-full flex-col pt-6">
            <h3>The Joke Tax</h3>
            <blockquote>
              "After all," he said, "everyone enjoys a good joke, so it's only
              fair that they should pay for the privilege."
            </blockquote>
            <Badge className="w-fit self-end" size="md" variant="info">
              Ongoing — Jul 28
            </Badge>
          </Prose>
        </FramePanel>
      </span>
    </Frame>
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
          <Avatar className="">
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
  value,
  onValueChange,
  label = "Select a student",
}: {
  students: Student[];
  value?: Student;
  onValueChange?: (value: Student | null) => void;
  label?: string;
}) => (
  <Field className="w-full">
    <Select
      items={students.map((s) => ({ label: s.name, value: s }))}
      onValueChange={onValueChange}
      value={value ?? students[0]}
    >
      <SelectTrigger className="rounded-b-xl bg-secondary/50 py-6 font-semibold text-md shadow-2xl shadow-background backdrop-blur-md">
        <SelectValue>
          {(item: Student) => (
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
  const [selectedStudent, setSelectedStudent] = useState(studentLists[0]);
  const navsLink: {
    id: string;
    label: string;
    icon: React.ReactNode;
    component: React.ReactNode;
  }[] = [
    {
      id: "1",
      label: "Home",
      icon: <House />,
      component: <HomeTab student={selectedStudent} />,
    },
    {
      id: "2",
      label: "Records",
      icon: <NotebookTabs />,
      component: <RecordsTab student={selectedStudent} />,
    },
    {
      id: "3",
      label: "Memo",
      icon: <Megaphone />,
      component: <MemoTab />,
    },
  ];
  const [activeTab, setActiveTab] = useState(navsLink[0]?.id);

  return (
    <section className="flex flex-col items-center justify-center gap-4 p-4">
      <Tabs onValueChange={(e) => setActiveTab(e.value)} value={activeTab}>
        {navsLink.map((nav) => (
          <TabsContent className="pb-36" key={nav.id} value={nav.id}>
            {nav.component}
          </TabsContent>
        ))}

        <div className="fixed inset-x-0 top-auto bottom-2 mx-auto w-full flex-col items-center justify-between space-y-2 px-4 transition-all duration-500 sm:w-2xl">
          <SelectStudent
            label="Choose a student"
            onValueChange={(student) => {
              if (student) {
                setSelectedStudent(student);
              }
            }}
            students={studentLists}
            value={selectedStudent}
          />
          <nav
            className={
              "flex w-full items-center justify-evenly gap-6 rounded-t-xl rounded-b-4xl bg-secondary/50 p-4 shadow-2xl shadow-background backdrop-blur-md"
            }
          >
            <TabsList>
              {navsLink.map((nav) => (
                <TabsTrigger
                  className="rounded-full px-4 aria-selected:px-6"
                  key={nav.id}
                  value={nav.id}
                >
                  {nav.icon}
                  <span className="hidden sm:flex">{nav.label}</span>
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
