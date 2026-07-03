"use client";

import { ChartBarBig } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "./ui/badge";
import { Status } from "./ui/status";

export function ChartPieDonutText({
  maleCount = 0,
  femaleCount = 0,
  total = maleCount + femaleCount,
  sectionName = "NONE",
}: {
  maleCount: number;
  femaleCount: number;
  total?: number;
  sectionName: string;
}) {
  const chartData = [
    { gender: "male", total: maleCount, fill: "var(--color-male)" },
    { gender: "female", total: femaleCount, fill: "var(--color-female)" },
  ];

  const chartConfig = {
    total: {
      label: "Students",
    },
    male: {
      label: "Male",
      color: "var(--chart-male)",
    },
    female: {
      label: "Female",
      color: "var(--chart-female)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="pl-0">
        <CardTitle className="flex w-full items-center justify-center gap-4 px-0 font-bold text-2xl">
          <span className="relative rounded-r-full bg-primary px-6 py-2">
            <ChartBarBig />
          </span>
          <span className="flex w-full justify-start font-bold text-2xl">
            Total Students
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          className="mx-auto aspect-square max-h-60"
          config={chartConfig}
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
              cursor={false}
            />
            <Pie
              data={chartData}
              dataKey="total"
              innerRadius={60}
              nameKey="gender"
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        dominantBaseline="middle"
                        textAnchor="middle"
                        x={viewBox.cx}
                        y={viewBox.cy}
                      >
                        <tspan
                          className="fill-foreground font-bold text-3xl"
                          x={viewBox.cx}
                          y={viewBox.cy}
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          className="fill-muted-foreground"
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                        >
                          Students
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex items-center justify-center gap-2 font-medium leading-none">
          <Badge variant="outline">
            <Status className="bg-chart-male" />
            Male — {maleCount}
          </Badge>
          <Badge variant="outline">
            <Status className="bg-chart-female" />
            Female — {femaleCount}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex-col text-sm">
        <span className="w-full text-start text-muted-foreground italic">
          — Total Students of{" "}
          <span className="font-bold underline underline-offset-4">
            {sectionName}
          </span>
        </span>
      </CardFooter>
    </Card>
  );
}
