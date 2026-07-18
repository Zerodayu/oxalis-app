"use client";

import {
  CalendarCheck,
  CircleCheck,
  type LucideIcon,
  PenLine,
  Ticket,
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { ClassCode } from "@/components/class-code";
import MiniCal from "@/components/mini-cal";
import { ChartPieDonutText } from "@/components/pie-chart";
import {
  RelativeTime,
  RelativeTimeZoneDate,
  RelativeTimeZoneDisplay,
} from "@/components/static/time";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useHash } from "@/hooks/use-hash";

export default function Page() {
  const males = 14;
  const females = 10;
  const totalStudents = males + females;

  const classData = {
    classCode: "sectionCodes",
    section: "Grade 1: Magic",
    students: { males, females },
    totalStudents,
    presents: totalStudents - 6, // totalStudents - students who have empty or null time-in
  };

  // mockup student lists
  const studentList = [
    {
      id: "1",
      name: "Alice Johnson",
      gender: "Female",
      timein: true,
      timeout: true,
    },
    {
      id: "2",
      name: "Bruno Silva",
      gender: "Male",
      timein: false,
      timeout: true,
    },
    {
      id: "3",
      name: "Clara Mendes",
      gender: "Female",
      timein: true,
      timeout: false,
    },
  ];

  const activeHash = useHash();

  const tabLabels: Record<string, string> = {
    "#board": "Dashboard",
    "#class-record": "Class Record",
    "#docs": "Documentation",
    "#settings": "Settings",
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
              orientation="vertical"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink>Class Section</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {tabLabels[activeHash] ?? "Unknown"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <section className="flex w-full flex-1 flex-col gap-4 p-4 pt-0">
          {activeHash === "#board" && (
            <div className="grid gap-4 md:grid-cols-1" id="board">
              <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <CardSection className="flex flex-col items-center justify-center">
                  <RelativeTime
                    dateFormatOptions={{ weekday: "short" }}
                    timeFormatOptions={{ hour: "2-digit", minute: "2-digit" }}
                  >
                    <span className="flex font-bold text-4xl text-foreground">
                      <RelativeTimeZoneDisplay />
                      <Separator className="mx-4" orientation="vertical" />{" "}
                      <RelativeTimeZoneDate />
                    </span>
                  </RelativeTime>
                  <MiniCal />
                </CardSection>

                <CardSection
                  LabelIcon={CalendarCheck}
                  title="Total Attendance Today"
                >
                  <div className="flex w-full items-center justify-center gap-4 px-6">
                    <div className="flex justify-start">
                      <span className="font-bold text-4xl text-primary">
                        {classData.presents}
                      </span>
                      <span className="mt-1 font-semibold">
                        /{classData.totalStudents}
                      </span>
                    </div>
                    <Progress
                      className="w-full"
                      max={classData.totalStudents}
                      value={classData.presents}
                    />
                  </div>
                  <CardFooter className="pt-4">
                    <span className="w-full px-4 text-start text-muted-foreground italic">
                      — Present Students in Total
                    </span>
                  </CardFooter>
                </CardSection>

                <CardSection LabelIcon={Ticket} title="Class Code">
                  <ClassCode defaultValue={classData.classCode} />
                  <CardFooter className="pt-4">
                    <span className="w-full text-start text-muted-foreground italic">
                      — Use this to invite Parents on your class
                    </span>
                  </CardFooter>
                </CardSection>
              </section>

              <section className="grid gap-4 md:grid-cols-[1fr_1.5fr]">
                <div className="grid grid-cols-1 gap-4">
                  <ChartPieDonutText
                    femaleCount={classData.students.females}
                    maleCount={classData.students.males}
                    sectionName={classData.section}
                  />
                  <CardSection title="Extra">
                    <p>content heree</p>
                  </CardSection>
                </div>
                <div className="col-span-1.5 grid">
                  <CardSection
                    LabelIcon={PenLine}
                    title="Quick Attendance View"
                  >
                    {" "}
                    <TableSection users={studentList} />
                  </CardSection>
                </div>
              </section>
            </div>
          )}
          {activeHash === "#class-record" && (
            <section id="models">
              <p>Class Record content</p>
            </section>
          )}
          {activeHash === "#docs" && (
            <section id="docs">
              <p>Documentation content</p>
            </section>
          )}
          {activeHash === "#settings" && (
            <section id="settings">
              <p>Settings content</p>
            </section>
          )}
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}

const CardSection = ({
  title,
  LabelIcon,
  children,
  className,
}: {
  title?: string;
  LabelIcon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}) => (
  <Card className="flex-1">
    <CardHeader className="pl-0">
      <CardTitle className="flex w-full items-center justify-center gap-4 px-0 font-bold text-2xl">
        <span
          className={`relative rounded-r-full bg-primary ${LabelIcon ? "px-6 py-2" : "px-0 py-0"}`}
        >
          {LabelIcon && <LabelIcon />}
        </span>
        <span className="flex w-full justify-start font-bold text-2xl">
          {title}
        </span>
      </CardTitle>
    </CardHeader>
    <CardContent className={className}>{children}</CardContent>
  </Card>
);

const TableSection = ({
  users,
}: {
  users: {
    id: string;
    name: string;
    gender: string;
    timein?: boolean;
    timeout?: boolean;
  }[];
}) => (
  <Table className="w-full" isHoverable={false} variant="striped">
    <TableCaption className="sr-only">
      Table with row over disabled (isHoverable=false).
    </TableCaption>
    <TableHeader>
      <TableRow className="font-bold">
        <TableHead className="underline underline-offset-4">Name</TableHead>
        <TableHead className="text-center underline underline-offset-4">
          Gender
        </TableHead>
        <TableHead className="text-center underline underline-offset-4">
          Timed-in
        </TableHead>
        <TableHead className="text-center underline underline-offset-4">
          Timed-out
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {users.map((user) => (
        <TableRow key={user.id}>
          <TableCell className="pr-8 font-semibold">{user.name}</TableCell>
          <TableCell
            className={`text-center ${user.gender === "Male" ? "text-chart-male" : "text-chart-female"}`}
          >
            {user.gender}
          </TableCell>
          <TableCell className="text-center">
            <Badge size="lg" variant={user.timein ? "success" : "outline"}>
              {user.timein ? (
                <>
                  <CircleCheck />
                  Timed-in
                </>
              ) : (
                "—"
              )}
            </Badge>
          </TableCell>
          <TableCell className="text-center">
            <Badge size="lg" variant={user.timeout ? "info" : "outline"}>
              {user.timeout ? (
                <>
                  <CircleCheck />
                  Timed-out
                </>
              ) : (
                "—"
              )}
            </Badge>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
