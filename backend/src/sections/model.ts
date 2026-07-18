import { t, Static } from "elysia";

const attendanceToday = t.Object({
  timeIn: t.Union([t.Date(), t.Null()]),
  timeOut: t.Union([t.Date(), t.Null()]),
});

const studentWithAttendance = t.Object({
  id: t.Number(),
  name: t.String(),
  gender: t.String(),
  attendanceToday: t.Union([attendanceToday, t.Null()]),
});

export const sectionModel = {
  createSectionBody: t.Object({
    name: t.String({ minLength: 1, maxLength: 100, description: "Section name (e.g. Grade 3 - Sampaguita)" }),
  }),

  createSectionResponse: t.Object({
    id: t.Number(),
    name: t.String(),
    classCode: t.String(),
    teacherId: t.Number(),
    createdAt: t.Date(),
  }),

  teacherSectionsResponse: t.Array(
    t.Object({
      id: t.Number(),
      name: t.String(),
      classCode: t.String(),
      createdAt: t.Date(),
      students: t.Array(studentWithAttendance),
    }),
  ),

  dateQuery: t.Object({
    date: t.Optional(t.String({ description: "Date in YYYY-MM-DD format (defaults to today)" })),
  }),
};

export type CreateSectionBody = Static<typeof sectionModel.createSectionBody>;
export type CreateSectionResponse = Static<typeof sectionModel.createSectionResponse>;
export type TeacherSectionsResponse = Static<typeof sectionModel.teacherSectionsResponse>;
